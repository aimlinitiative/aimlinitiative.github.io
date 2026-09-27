/* Builds the hero's neural-network geometry as flat typed arrays.
 *
 * Layout: `layers` discs of nodes spaced along the x axis (a feed-forward net).
 * Each node connects to a few near neighbours in the next layer. "Waves" are
 * forward passes: a handful of paths that start in layer 0 and branch forward;
 * a signal races along each path hop by hop and the nodes on it light up as it
 * arrives. All animation happens in the shaders from these static attributes,
 * so nothing is rebuilt per frame. */

import { dim, mix, SPOT, WHITE } from "./color";

export const NET_LENGTH = 12;

// Node base colours from the spotlight family: blue carries the network (with
// a couple of lighter tints for depth); violet and cyan are rare accents.
const NODE_COLORS = [SPOT.blue, mix(SPOT.blue, WHITE, 0.22), mix(SPOT.blue, WHITE, 0.45), mix(SPOT.blue, SPOT.violet, 0.4), SPOT.violet, SPOT.cyan];
const NODE_WEIGHTS = [5, 3, 1.2, 1.4, 1, 0.7];
// Dust sits far back: the same hues, dimmed.
const DUST_COLORS = [dim(SPOT.blue, 0.5), dim(SPOT.blue, 0.36), dim(SPOT.violet, 0.45), dim(SPOT.cyan, 0.32)];

function rng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffle(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function weighted(items, weights, rnd) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rnd() * total;
    for (let i = 0; i < items.length; i++) {
        r -= weights[i];
        if (r <= 0) return items[i];
    }
    return items[items.length - 1];
}

export function buildNetwork({ layers, waves = 3, startsPerWave = 3, dust = 120, seed = 11 }) {
    const rnd = rng(seed);
    const L = layers.length;
    const nodes = [];
    const byLayer = [];

    layers.forEach((count, li) => {
        const u = li / (L - 1);
        const x = -NET_LENGTH / 2 + NET_LENGTH * u;
        const radius = 1.7 + 0.9 * Math.sin(Math.PI * u);
        const ids = [];
        for (let k = 0; k < count; k++) {
            // Sunflower disc: even but organic spacing.
            const r = radius * Math.sqrt((k + 0.5) / count);
            const a = k * 2.399963 + li * 0.9;
            nodes.push({
                x: x + (rnd() - 0.5) * 0.3,
                y: r * Math.cos(a) + (rnd() - 0.5) * 0.24,
                z: r * Math.sin(a) + (rnd() - 0.5) * 0.24,
                layer: li,
                waves: [0, 0, 0],
            });
            ids.push(nodes.length - 1);
        }
        byLayer.push(ids);
    });

    // Edges to a few of the nearest nodes in the next layer.
    const edges = [];
    const out = nodes.map(() => []);
    for (let li = 0; li < L - 1; li++) {
        for (const a of byLayer[li]) {
            const A = nodes[a];
            const near = byLayer[li + 1]
                .map((b) => [b, (A.y - nodes[b].y) ** 2 + (A.z - nodes[b].z) ** 2])
                .sort((p, q) => p[1] - q[1])
                .slice(0, 7);
            const k = rnd() < 0.3 ? 3 : 2;
            for (const [b] of shuffle(near, rnd).slice(0, k)) {
                out[a].push(edges.length);
                edges.push([a, b, li]);
            }
        }
    }

    // Forward-pass paths, one set per wave.
    const pulses = [];
    for (let w = 0; w < waves; w++) {
        let frontier = shuffle(byLayer[0].slice(), rnd).slice(0, startsPerWave);
        frontier.forEach((n) => (nodes[n].waves[w] = 1));
        for (let li = 0; li < L - 1; li++) {
            const next = new Set();
            for (const n of frontier) {
                const opts = shuffle(out[n].slice(), rnd);
                const take = rnd() < 0.4 && next.size < startsPerWave + 2 ? 2 : 1;
                for (const e of opts.slice(0, take)) {
                    const b = edges[e][1];
                    pulses.push([n, b, li, w]);
                    next.add(b);
                }
            }
            next.forEach((b) => (nodes[b].waves[w] = 1));
            frontier = [...next];
        }
    }

    // ---- Typed arrays ----
    const nCount = nodes.length + dust;
    const nodePos = new Float32Array(nCount * 3);
    const nodeColor = new Float32Array(nCount * 3);
    const nodeSize = new Float32Array(nCount);
    const nodeLayer = new Float32Array(nCount);
    const nodeWaves = new Float32Array(nCount * 3);
    const nodeSeed = new Float32Array(nCount);

    nodes.forEach((n, i) => {
        nodePos.set([n.x, n.y, n.z], i * 3);
        nodeColor.set(weighted(NODE_COLORS, NODE_WEIGHTS, rnd), i * 3);
        nodeSize[i] = 16 + rnd() * 14;
        nodeLayer[i] = n.layer;
        nodeWaves.set(n.waves, i * 3);
        nodeSeed[i] = rnd();
    });
    // Ambient dust: tiny, faint points in a wider volume for depth and speed
    // cues during the fly-through.
    for (let d = 0; d < dust; d++) {
        const i = nodes.length + d;
        nodePos.set([(rnd() - 0.5) * NET_LENGTH * 1.9, (rnd() - 0.5) * 11, (rnd() - 0.5) * 11], i * 3);
        nodeColor.set(DUST_COLORS[Math.floor(rnd() * DUST_COLORS.length)], i * 3);
        nodeSize[i] = 5 + rnd() * 6;
        nodeLayer[i] = -99;
        nodeSeed[i] = rnd();
    }

    const edgePos = new Float32Array(edges.length * 6);
    const edgeAlpha = new Float32Array(edges.length * 2);
    edges.forEach(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        edgePos.set([A.x, A.y, A.z, B.x, B.y, B.z], i * 6);
        const alpha = 0.35 + rnd() * 0.65;
        edgeAlpha[i * 2] = alpha;
        edgeAlpha[i * 2 + 1] = alpha;
    });

    const P = pulses.length;
    const pulseLinePos = new Float32Array(P * 6);
    const pulseLineT = new Float32Array(P * 2);
    const pulseLineLayer = new Float32Array(P * 2);
    const pulseLineWave = new Float32Array(P * 2);
    const headStart = new Float32Array(P * 3);
    const headEnd = new Float32Array(P * 3);
    const headLayer = new Float32Array(P);
    const headWave = new Float32Array(P);
    pulses.forEach(([a, b, li, w], i) => {
        const A = nodes[a];
        const B = nodes[b];
        pulseLinePos.set([A.x, A.y, A.z, B.x, B.y, B.z], i * 6);
        pulseLineT.set([0, 1], i * 2);
        pulseLineLayer.set([li, li], i * 2);
        pulseLineWave.set([w, w], i * 2);
        headStart.set([A.x, A.y, A.z], i * 3);
        headEnd.set([B.x, B.y, B.z], i * 3);
        headLayer[i] = li;
        headWave[i] = w;
    });

    return {
        layers: L,
        waves,
        nodes: { position: nodePos, aColor: nodeColor, aSize: nodeSize, aLayer: nodeLayer, aWaves: nodeWaves, aSeed: nodeSeed },
        edges: { position: edgePos, aAlpha: edgeAlpha },
        pulseLines: { position: pulseLinePos, aT: pulseLineT, aLayer: pulseLineLayer, aWave: pulseLineWave },
        heads: { position: headStart, aEnd: headEnd, aLayer: headLayer, aWave: headWave },
    };
}
