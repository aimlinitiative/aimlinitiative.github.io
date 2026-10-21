import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";

// Committed summit partners only; never list an organisation that is still
// "in conversation". `h` is the logo height in px at full size, which
// balances the marks' visual weight.
export const PARTNERS = [
    { name: "Google DeepMind", logo: deepmind, h: 22, role: "Keynote", what: "A keynote on the morning stage" },
    { name: "Microsoft", logo: microsoft, h: 24, role: "Keynote", what: "A keynote on the morning stage" },
    { name: "Google", logo: google, h: 28, role: "Keynote", what: "A keynote on the morning stage" },
    { name: "Snap Inc.", logo: snap, h: 32, role: "Keynote · Sponsor", what: "A keynote and event sponsorship" },
    { name: "Discovery Education", logo: discovery, h: 28, role: "Event partner", what: "Co-branding, promotion to LA teachers, a speaker and prizes" },
    { name: "Jane Street", logo: janestreet, h: 32, role: "Sponsor", what: "Prizes for the top five hackathon teams" },
    { name: "MongoDB", logo: mongodb, h: 26, role: "Sponsor", what: "Prizes and Atlas credits for the hackathon" },
    { name: "Confluent", logo: confluent, h: 21, role: "Speaker · Mentors", what: "A speaker and mentors for the hackathon floor" },
    { name: "Hacker Fund", logo: hackerfund, h: 19, role: "Sponsor", what: "In-kind support for the hackathon" },
    { name: "aiEDU", h: 24, role: "Partner", what: "Supporting the summit" },
];

// Behind the course and the organisation rather than the event day.
export const SUPPORTERS = [
    { name: "Hack Club", role: "Fiscal sponsor", what: "Through The Hack Foundation, a 501(c)(3). Every sponsorship dollar runs through it." },
    { name: "Arm", role: "Curriculum feedback", what: "Feedback on the course material." },
    { name: "PhET, CU Boulder", role: "Curriculum feedback", what: "Feedback on the course material." },
];
