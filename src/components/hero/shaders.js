/* GLSL for the hero network (additive light on a dark stage). Everything is
 * driven by uniforms, so the CPU only touches a few numbers per frame.
 *
 * A "wave" is one forward pass. Its phase u runs 0 -> layers + 1 over uPeriod
 * seconds: the signal leaves layer i at u = i and lands on layer i + 1 at
 * u = i + 1; the last stretch is a rest. Waves are offset evenly and each has
 * its own colour from the spotlight family (blue, violet, cyan).
 *
 * The look is deliberately quiet (DESIGN.md: nothing competes with the words):
 * crisp points with tight halos, gentle arrival flashes, comets that stay in
 * their hue instead of going white-hot. */

const common = /* glsl */ `
uniform float uTime;
uniform float uPeriod;
uniform float uLayers;
uniform float uWaves;
uniform float uPixelRatio;
uniform float uSizeScale;
uniform float uFadeNear;
uniform float uFadeFar;
uniform float uIntensity;
uniform vec3 uWave0;
uniform vec3 uWave1;
uniform vec3 uWave2;
uniform float uVeil;
uniform vec2 uVeilSize;

float wavePhase(float w) {
    return fract(uTime / uPeriod + w / uWaves) * (uLayers + 1.0);
}
float ease(float t) { return t * t * (3.0 - 2.0 * t); }
vec3 waveColor(float w) {
    return w < 0.5 ? uWave0 : (w < 1.5 ? uWave1 : uWave2);
}
// Dim whatever projects behind the headline so the copy stays readable.
float veil(vec4 clip) {
    vec2 ndc = clip.xy / max(clip.w, 1e-3);
    float r = length(ndc / uVeilSize);
    return mix(1.0 - uVeil, 1.0, smoothstep(0.3, 1.1, r));
}
// Depth fog: far things sink into the dark; things right at the lens thin out
// so the fly-through never fills the screen with one blob.
float depthFade(float depth) {
    return mix(1.0, 0.0, smoothstep(uFadeNear, uFadeFar, depth)) * smoothstep(0.6, 2.4, depth);
}
`;

export const nodeVert = /* glsl */ `
${common}
attribute vec3 aColor;
attribute float aSize;
attribute float aLayer;
attribute vec3 aWaves;
attribute float aSeed;
varying vec3 vColor;
varying vec3 vFlashColor;
varying float vAlpha;
varying float vFlash;

float arrival(float w, float on) {
    if (on < 0.5 || w >= uWaves) return 0.0;
    float d = wavePhase(w) - aLayer;
    // quick swell as the signal lands, long soft decay after
    return d < 0.0 ? exp(-d * d * 60.0) : exp(-d * 1.6);
}

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = -mv.z;
    float f0 = arrival(0.0, aWaves.x);
    float f1 = arrival(1.0, aWaves.y);
    float f2 = arrival(2.0, aWaves.z);
    float flash = max(max(f0, f1), f2);
    vFlashColor = (uWave0 * f0 + uWave1 * f1 + uWave2 * f2) / max(f0 + f1 + f2, 1e-4);
    float twinkle = 0.84 + 0.16 * sin(uTime * 0.7 + aSeed * 6.2831);
    float dust = step(aLayer, -1.0);
    vFlash = flash;
    vColor = aColor;
    vAlpha = depthFade(depth) * twinkle * mix(1.0, 0.5, dust) * uIntensity;
    float size = aSize * (1.0 + flash * 0.6) * uPixelRatio * (uSizeScale / depth);
    gl_PointSize = min(size, 120.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
    vAlpha *= veil(gl_Position);
}
`;

export const nodeFrag = /* glsl */ `
varying vec3 vColor;
varying vec3 vFlashColor;
varying float vAlpha;
varying float vFlash;

void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    // crisp core + tight halo (a softer, wider bloom reads as fog behind type)
    float core = 1.0 - smoothstep(0.1, 0.22, d);
    float glow = pow(1.0 - d, 3.2);
    vec3 base = mix(vColor, vFlashColor, vFlash);
    vec3 col = base * glow * (0.42 + 0.75 * vFlash) + mix(base, vec3(1.0), 0.4 + 0.3 * vFlash) * core * (0.5 + 0.4 * vFlash);
    vec3 outC = col * vAlpha;
    gl_FragColor = vec4(outC, max(outC.r, max(outC.g, outC.b)));
}
`;

export const edgeVert = /* glsl */ `
${common}
attribute float aAlpha;
varying float vAlpha;
void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vAlpha = aAlpha * depthFade(-mv.z) * uIntensity;
    gl_Position = projectionMatrix * mv;
    vAlpha *= veil(gl_Position);
}
`;

export const edgeFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
void main() {
    vec3 outC = uColor * uOpacity * vAlpha;
    gl_FragColor = vec4(outC, max(outC.r, max(outC.g, outC.b)));
}
`;

// A comet of light racing along an edge: white-hot head, coloured tail.
export const pulseLineVert = /* glsl */ `
${common}
attribute float aT;
attribute float aLayer;
attribute float aWave;
varying float vT;
varying float vLocal;
varying float vAlpha;
varying vec3 vColor;
void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vT = aT;
    vLocal = wavePhase(aWave) - aLayer;
    vColor = waveColor(aWave);
    vAlpha = depthFade(-mv.z) * uIntensity;
    gl_Position = projectionMatrix * mv;
    vAlpha *= veil(gl_Position);
}
`;

export const pulseLineFrag = /* glsl */ `
varying float vT;
varying float vLocal;
varying float vAlpha;
varying vec3 vColor;
float ease(float t) { return t * t * (3.0 - 2.0 * t); }
void main() {
    if (vLocal < 0.0 || vLocal > 1.45) discard;
    float head = ease(clamp(vLocal, 0.0, 1.0));
    float tail = 0.6 * (1.0 - smoothstep(1.0, 1.45, vLocal));
    float behind = head - vT;
    if (behind < 0.0 || behind > tail) discard;
    float g = 1.0 - behind / max(tail, 1e-4);
    vec3 col = mix(vColor, vec3(1.0), g * g * 0.3) * g * g * 1.15;
    vec3 outC = col * vAlpha;
    gl_FragColor = vec4(outC, max(outC.r, max(outC.g, outC.b)));
}
`;

export const headVert = /* glsl */ `
${common}
attribute vec3 aEnd;
attribute float aLayer;
attribute float aWave;
varying float vAlpha;
varying vec3 vColor;
void main() {
    float local = wavePhase(aWave) - aLayer;
    float vis = smoothstep(0.0, 0.08, local) * (1.0 - smoothstep(0.92, 1.05, local));
    vec3 p = mix(position, aEnd, ease(clamp(local, 0.0, 1.0)));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;
    vColor = waveColor(aWave);
    vAlpha = vis * depthFade(depth) * uIntensity;
    float size = 30.0 * uPixelRatio * (uSizeScale / depth);
    gl_PointSize = vis > 0.001 ? min(size, 110.0 * uPixelRatio) : 0.0;
    gl_Position = projectionMatrix * mv;
    vAlpha *= veil(gl_Position);
}
`;

export const headFrag = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = 1.0 - smoothstep(0.06, 0.16, d);
    float glow = pow(1.0 - d, 3.0);
    vec3 col = vColor * glow * 0.95 + mix(vColor, vec3(1.0), 0.6) * core * 0.85;
    vec3 outC = col * vAlpha;
    gl_FragColor = vec4(outC, max(outC.r, max(outC.g, outC.b)));
}
`;
