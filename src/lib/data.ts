/**
 * Content registry — all ten product families in the Blue Star catalogue.
 * Each entry drives one landing page rendered by the shared page template.
 */
import type { Family } from "./drawings";

export interface ShowcaseItem {
  variant: string;
  code: string;
  name: string;
  tag?: string;
  dimLabel: string;
  desc: string;
  specs: string[];
}

export interface Product {
  slug: string;
  code: string;
  family: "FRP" | "GRC";
  name: string;
  navLabel: string;
  registerLine: string;
  hero: {
    kicker: string;
    lines: { text: string; underline?: boolean }[];
    sub: string;
    media: "photo" | "drawing";
    img?: string;
    imgAlt?: string;
    drawingVariant: string;
    stamp: string;
    dimLabel: string;
    tag: { kicker: string; title: string; body: string };
    watermark: string;
  };
  ticker: string[];
  features: { icon: string; title: string; lead: string; points: string[]; note: string }[];
  applications?: { icon: string; title: string; desc: string; chip: string }[];
  familyLabel: string;
  familyDim: string;
  showcase: ShowcaseItem[];
  showcaseCols: "2/3" | "2/3/4" | "2/3/5";
  anatomy?: {
    kicker: string;
    lines: string[];
    intro: string;
    drawing: "cornice" | "column";
    caption: string;
    parts: { title: string; desc: string }[];
  };
  sizer?: {
    kicker: string;
    lines: string[];
    intro: string;
  };
  study?: {
    kicker: string;
    lines: string[];
    intro: string;
  };
  comparison: {
    kicker: string;
    title: string[];
    highlight: string;
    cols: string[];
    rows: { label: string; cells: string[] }[];
    note: string;
  };
  stats: { value: number; suffix: string; label: string }[];
  process: {
    kicker: string;
    title: string[];
    intro: string;
    steps: { title: string; desc: string }[];
    media: "photo" | "drawing";
    img?: string;
    imgAlt?: string;
    drawingVariant: string;
    caption: string;
  };
  quote: {
    heading: string;
    sub: string;
    selects: { label: string; options: string[] }[];
    qtyLabel: string;
    qtyOptions: string[];
  };
}

const HERO_CHAJJA =
  "https://image.qwenlm.ai/generated-images/cb9d06be-7c2f-4cc3-81a3-0e60f00a2076/_result.png";
const WORKSHOP_CHAJJA =
  "https://image.qwenlm.ai/generated-images/1df56e0c-c10e-4418-a9e3-f73f828891d0/_result.png";
const FACADE_JALI =
  "https://image.qwenlm.ai/generated-images/30e84dfa-f3fb-45e3-b0f6-6d76cd66cf47/_result.png";
const WORKSHOP_JALI =
  "https://image.qwenlm.ai/generated-images/c6b2b6ed-aa33-4062-b0a5-2a29e0761084/_result.png";
const FACADE_CORNICE =
  "https://image.qwenlm.ai/generated-images/4dc461ed-c520-441a-8b97-cc69fa6ee5db/_result.png";
const WORKSHOP_CORNICE =
  "https://image.qwenlm.ai/generated-images/21271d87-3ca7-4dae-b463-bdc2173bfd37/_result.png";
const VILLA_COLUMN =
  "https://image.qwenlm.ai/generated-images/355d1d94-bbd7-4595-93fa-89b37b319a9f/_result.png";
const WORKSHOP_COLUMN =
  "https://image.qwenlm.ai/generated-images/2b176097-f5d6-43f5-9e81-851ca96f5ef3/_result.png";

export const PRODUCTS: Product[] = [
  /* ---------------- 01 · FRP CHAJJAS ---------------- */
  {
    slug: "frp-chajjas",
    code: "BSP-01",
    family: "FRP",
    name: "FRP Chajjas",
    navLabel: "Chajjas",
    registerLine: "Window canopies that never rust, rot or need paint.",
    hero: {
      kicker: "PREMIUM FRP ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "Premium FRP Chajjas —" },
        { text: "Protection That Lasts," },
        { text: "Style That Stays.", underline: true },
      ],
      sub: "Weather-resistant, lightweight, and maintenance-free roofing solutions for modern construction.",
      media: "photo",
      img: HERO_CHAJJA,
      imgAlt: "Modern building facade fitted with white FRP chajjas above every window",
      drawingVariant: "plain",
      stamp: "DWG NO. BSP-CJ-01",
      dimLabel: "PROJ. 600–1500 MM",
      tag: {
        kicker: "SPEC 04-A · FINISH",
        title: "Gelcoat finish, moulded-in colour",
        body: "UV-stable RAL shades that never peel, blister or need repainting.",
      },
      watermark: "CHAJJA",
    },
    ticker: [
      "UV-STABILISED GELCOAT FINISH",
      "ZERO RUST · ZERO ROT · ZERO PAINT",
      "10-YEAR STRUCTURAL WARRANTY",
      "CUSTOM RAL COLOURS, MOULDED-IN",
      "PAN-INDIA SUPPLY & FIXING SUPPORT",
      "3–4 KG/M² — A FRACTION OF RCC",
      "IS 12086 TESTED COMPOSITE",
    ],
    features: [
      {
        icon: "shield",
        title: "Weather Resistant",
        lead: "Shields from sun, rain, UV rays",
        points: [
          "UV-stable gelcoat skin — colour never chalks or peels",
          "Performs from −20 °C to +80 °C without warping",
          "Monsoon-proof: zero water absorption, zero swelling",
        ],
        note: "2000-H QUV WEATHERING TESTED",
      },
      {
        icon: "dropcross",
        title: "Low Maintenance",
        lead: "No rust, no rot, no painting",
        points: [
          "Non-corrosive composite — immune to salt air & pollution",
          "Wipe clean with water; no repainting cycles, ever",
          "No termite or fungal attack on the substrate",
        ],
        note: "NSS SALT-SPRAY: NO CORROSION",
      },
      {
        icon: "leaf",
        title: "Eco-Friendly",
        lead: "Sustainable choice",
        points: [
          "100% recyclable FRP at end of a 20-year+ service life",
          "Lower embodied energy than steel or RCC canopies",
          "Moulded-in colour means zero paint VOCs on site",
        ],
        note: "LOW-VOC · RECYCLABLE COMPOSITE",
      },
    ],
    familyLabel: "FRP CHAJJA",
    familyDim: "TYP. 900 MM PROJECTION",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "plain",
        code: "BSP-CJ-01",
        name: "Plain Chajja",
        tag: "BEST SELLER",
        dimLabel: "PROJ. 600–1500 MM",
        desc: "A crisp horizontal slab on concealed SS brackets — the minimalist default for grid facades and apartment towers.",
        specs: ["Projection 600–1500 mm", "Fascia depth 40–60 mm", "Gelcoat, any RAL shade"],
      },
      {
        variant: "sloped",
        code: "BSP-CJ-02",
        name: "Sloped Chajja",
        dimLabel: "PITCH 10°–15°",
        desc: "Pitched to throw monsoon rain clear of the sill, with a tie-rod for confident long spans over entrances.",
        specs: ["Pitch 10°–15°", "Span up to 1800 mm", "Tie-rod kit included"],
      },
      {
        variant: "curved",
        code: "BSP-CJ-03",
        name: "Curved Chajja",
        tag: "ARCHITECT PICK",
        dimLabel: "RADIUS: CUSTOM",
        desc: "A barrel-arch profile that softens hard elevations — radius matched to your opening and facade rhythm.",
        specs: ["Radius matched to opening", "Projection 600–1200 mm", "Seamless moulded curve"],
      },
      {
        variant: "decorative",
        code: "BSP-CJ-04",
        name: "Decorative Chajja",
        dimLabel: "SCALLOP 90 MM MODULE",
        desc: "Scalloped fascia and moulded brackets for villas, bungalows and heritage-style street elevations.",
        specs: ["Scalloped front edge", "Bracket set included", "Antique or gloss finish"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["FRP AGAINST", "THE OLD GUARD."],
      highlight: "FRP CHAJJA",
      cols: ["MS STEEL", "RCC / WOOD"],
      rows: [
        { label: "Unit weight (per m²)", cells: ["3–4 kg", "18–22 kg", "55–70 kg"] },
        { label: "Rust & corrosion", cells: ["Immune", "Prone — repaint yearly", "Rebar spalling"] },
        { label: "Maintenance", cells: ["Wipe-clean. Nil.", "Sand + repaint, 2-yr cycle", "Crack patching"] },
        { label: "Installation", cells: ["< 60 min / unit, SS screws", "Weld + grind + paint", "Cast-in-situ + 21-day cure"] },
        { label: "Shapes & profiles", cells: ["Moulded — any profile", "Flat / folded only", "Plain slab"] },
        { label: "Design life", cells: ["20+ years", "8–10 years", "Varies with cover"] },
      ],
      note: "* INDICATIVE VALUES FOR A 1200 × 900 MM WINDOW CANOPY. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 25, suffix: "+", label: "Years in FRP composites" },
      { value: 40000, suffix: "+", label: "Chajjas delivered" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / HOW WE WORK",
      title: ["DRAWING TO", "FIXING, IN", "FOUR STEPS."],
      intro: "No CAD expertise needed on your side — a photo of the window and a tape-measure reading is enough to start.",
      steps: [
        { title: "Share your opening sizes", desc: "Send window widths, preferred projection and a facade photo or drawing — WhatsApp or email, both work." },
        { title: "Get a custom quote in 24 h", desc: "Per-unit pricing, colour options and a CAD profile of your chosen chajja for sign-off before we mould." },
        { title: "We mould & finish", desc: "Hand-laid FRP with gelcoat colour and brass inserts — cured, demoulded and QC-checked at our Taloja works." },
        { title: "Deliver & install", desc: "Pan-India dispatch with SS fixture kits; our engineer supports your site team on call through fixing." },
      ],
      media: "photo",
      img: WORKSHOP_CHAJJA,
      imgAlt: "Technician inspecting a moulded FRP chajja panel at the Blue Star workshop",
      drawingVariant: "plain",
      caption: "HAND-LAID FRP SHOP — TALOJA MIDC, NAVI MUMBAI",
    },
    quote: {
      heading: "TELL US YOUR SPAN.",
      sub: "Share your window sizes and city — our sales engineer replies with per-unit pricing, colour options and a CAD profile of your chajja.",
      selects: [
        { label: "CHAJJA TYPE", options: ["Plain Chajja", "Sloped Chajja", "Curved Chajja", "Decorative Chajja", "Multiple / custom profile"] },
        { label: "APPROX. PROJECTION", options: ["600 mm", "900 mm (standard)", "1200 mm", "1500 mm", "Custom / not sure"] },
      ],
      qtyLabel: "QUANTITY",
      qtyOptions: ["1–10 units", "10–50 units", "50–200 units", "200+ (project supply)"],
    },
  },

  /* ---------------- 02 · GRC JALI PANELS ---------------- */
  {
    slug: "grc-jali-panels",
    code: "BSP-02",
    family: "GRC",
    name: "GRC Jali Panels",
    navLabel: "Jali Panels",
    registerLine: "Ventilated screen walls in five woven lattice patterns.",
    hero: {
      kicker: "PREMIUM GRC ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "Premium GRC Jali Panels —" },
        { text: "Strength Meets", },
        { text: "Elegance.", underline: true },
      ],
      sub: "Perfect for modern façades, ventilation, partition walls, balconies, and landscape enhancements.",
      media: "drawing",
      drawingVariant: "star",
      stamp: "DWG NO. BSP-JL-02",
      dimLabel: "MODULE 300 × 300 MM",
      tag: {
        kicker: "SPEC 02-B · OPEN AREA",
        title: "Up to 42% open area, zero privacy lost",
        body: "Pattern geometry tuned for airflow and light while screening the interior.",
      },
      watermark: "JALI",
    },
    ticker: [
      "FIVE WOVEN PATTERNS",
      "42% OPEN AREA VENTILATION",
      "GRC — GLASSFIBRE REINFORCED CONCRETE",
      "FIRE-RATED · NON-COMBUSTIBLE",
      "MODULAR 300 / 600 MM GRID",
      "CAST-IN COLOUR, NO PAINT",
      "CUSTOM PATTERNS ON REQUEST",
    ],
    features: [
      {
        icon: "wall",
        title: "High Strength & Durable",
        lead: "Glassfibre-reinforced, impact-safe",
        points: [
          "High flexural strength — survives handling and site life",
          "Does not crack under thermal cycling like plain concrete",
          "50-year design life with no strength decay",
        ],
        note: "FLEXURAL STRENGTH ≥ 18 MPa",
      },
      {
        icon: "storm",
        title: "Weather & Corrosion Resistant",
        lead: "Built for sun, salt and monsoon",
        points: [
          "Zero corrosion — alkali-resistant glass fibre, no rebar",
          "Frost-proof and UV-stable in every climate zone",
          "Colour is cast in, not painted on",
        ],
        note: "100 CYCLES FREEZE–THAW: PASS",
      },
      {
        icon: "feather",
        title: "Lightweight & Easy to Install",
        lead: "Thin-shell panels, fast fixing",
        points: [
          "12–18 mm thin-shell sections cut dead load dramatically",
          "Mechanical fixing to MS angles — no wet trades",
          "Modular grid panels swap out individually if ever damaged",
        ],
        note: "40–60 KG/M² AS INSTALLED",
      },
    ],
    applications: [
      { icon: "sun", title: "Modern Façades", desc: "Sun-breaker screens that give a building its texture and cut solar gain.", chip: "FACADE SCREENS" },
      { icon: "wind", title: "Ventilation", desc: "Cross-ventilated walls for stairwells, parking and service cores.", chip: "CROSS-VENTILATION" },
      { icon: "partition", title: "Partition Walls", desc: "Light-filtering interior partitions with acoustic shadow play.", chip: "INTERIOR PARTITIONS" },
      { icon: "railing", title: "Balconies", desc: "Privacy screens for balconies that still let the breeze through.", chip: "BALCONY SCREENS" },
      { icon: "tree", title: "Landscape Enhancements", desc: "Garden walls, pergola screens and boundary features.", chip: "LANDSCAPE WALLS" },
    ],
    familyLabel: "GRC JALI",
    familyDim: "MODULE 300 × 300 MM",
    showcaseCols: "2/3",
    showcase: [
      {
        variant: "basket",
        code: "BSP-JL-01",
        name: "Basket Weave",
        tag: "BEST SELLER",
        dimLabel: "STRAND 40 MM",
        desc: "An over-under weave that reads soft and textile-like — the warm default for residential screens.",
        specs: ["Module 300 × 300 mm", "38% open area", "Ideal: balconies, partitions"],
      },
      {
        variant: "star",
        code: "BSP-JL-02",
        name: "Geometric Star",
        dimLabel: "STAR Ø 160 MM",
        desc: "Eight-point stars in a lattice — the pattern of courtyards, now cast for high-rise facades.",
        specs: ["Module 400 × 400 mm", "42% open area", "Ideal: facades, lobbies"],
      },
      {
        variant: "maze",
        code: "BSP-JL-03",
        name: "Square Maze",
        dimLabel: "MEANDER 30 MM",
        desc: "A squared Greek-key meander with a crisp, contemporary rhythm for minimalist elevations.",
        specs: ["Module 300 × 300 mm", "34% open area", "Ideal: stair cores, screens"],
      },
      {
        variant: "leaf",
        code: "BSP-JL-04",
        name: "Leaf Pattern",
        dimLabel: "QUATREFOIL Ø 120 MM",
        desc: "Quatrefoil leaves in a diagonal field — organic softness for landscape and lounge walls.",
        specs: ["Module 340 × 340 mm", "36% open area", "Ideal: gardens, pergolas"],
      },
      {
        variant: "brick",
        code: "BSP-JL-05",
        name: "Brick Link",
        tag: "ARCHITECT PICK",
        dimLabel: "LINK Ø 44 MM",
        desc: "Running-bond bricks joined by circular links — a contemporary riff on the old load-bearing wall.",
        specs: ["Module 350 × 350 mm", "30% open area", "Ideal: boundaries, plinths"],
      },
      {
        variant: "custom",
        code: "BSP-JL-CX",
        name: "Custom Pattern",
        dimLabel: "YOUR PATTERN",
        desc: "Send a motif — logo, jaali sketch, parametric grid — we machine the mould and cast your panel.",
        specs: ["Any motif or grid", "Mould cost amortised", "Sample tile in 10 days"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE SCREEN THAT", "OUTLASTS THEM ALL."],
      highlight: "GRC JALI",
      cols: ["BRICK JAALI", "MS SCREENS", "TERRACOTTA"],
      rows: [
        { label: "Panel weight", cells: ["12–18 mm shell", "Full brick bond, heavy", "Welded sheet, medium", "Kiln-fired, brittle"] },
        { label: "Pattern sharpness", cells: ["Mould-perfect, repeatable", "Mortar joints show", "CNC — but rusts", "Hand-pressed, varies"] },
        { label: "Weathering", cells: ["50 years, colour cast-in", "Efflorescence + seepage", "Annual anti-rust paint", "Spalls in frost"] },
        { label: "Installation", cells: ["Bolt to MS angle grid", "Masons, slow, wet", "Welding on site", "Mortar + skilled hands"] },
        { label: "Replacement", cells: ["Swap one modular panel", "Break & rebuild", "Cut + re-weld", "Never matches"] },
      ],
      note: "* INDICATIVE VALUES FOR A 300 MM MODULE AT 40% OPEN AREA. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 5, suffix: "", label: "Signature patterns" },
      { value: 120000, suffix: "+", label: "Panels cast" },
      { value: 42, suffix: "%", label: "Max open area" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / FROM PATTERN TO WALL",
      title: ["YOUR SCREEN,", "FOUR STEPS", "AWAY."],
      intro: "Pick a pattern from the register or send your own motif — a 300 mm sample tile reaches you before bulk casting begins.",
      steps: [
        { title: "Choose pattern & modules", desc: "Select from five weaves or share a custom motif with your module size and open-area target." },
        { title: "Sample tile in 10 days", desc: "A cast sample tile for approval — check pattern sharpness, colour and edge finish in your own light." },
        { title: "Mould & batch casting", desc: "CNC-machined moulds, spray-cast GRC shells and 7-day curing at our Taloja works." },
        { title: "Deliver & fix to grid", desc: "Panels ship on pallets with the MS angle grid; fixing is mechanical, fast and dry." },
      ],
      media: "photo",
      img: WORKSHOP_JALI,
      imgAlt: "Craftsman casting a GRC jali panel in the Blue Star workshop",
      drawingVariant: "basket",
      caption: "CASTING SHOP — TALOJA MIDC, NAVI MUMBAI",
    },
    quote: {
      heading: "TELL US YOUR WALL.",
      sub: "Share wall area, pattern and city — our sales engineer replies with per-panel pricing, a module layout drawing and a sample-tile plan.",
      selects: [
        { label: "PATTERN", options: ["Basket Weave", "Geometric Star", "Square Maze", "Leaf Pattern", "Brick Link", "Custom pattern"] },
        { label: "MODULE SIZE", options: ["300 × 300 mm", "350 × 350 mm", "400 × 400 mm", "Custom / not sure"] },
      ],
      qtyLabel: "APPROX. AREA",
      qtyOptions: ["Upto 20 m²", "20–100 m²", "100–500 m²", "500+ m² (project)"],
    },
  },

  /* ---------------- 03 · GRC CORNICES ---------------- */
  {
    slug: "grc-cornices",
    code: "BSP-03",
    family: "GRC",
    name: "GRC Cornices",
    navLabel: "Cornices",
    registerLine: "Crown mouldings with classical profiles, cast light.",
    hero: {
      kicker: "PREMIUM GRC ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "GRC Cornice —" },
        { text: "Elegant Finish.", },
        { text: "Stronger Performance.", underline: true },
      ],
      sub: "Lightweight yet strong cornices offering superior durability and a premium finish for modern and classical designs.",
      media: "photo",
      img: FACADE_CORNICE,
      imgAlt: "Classical facade crowned with white GRC cornices and mouldings",
      drawingVariant: "classical",
      stamp: "DWG NO. BSP-CR-01",
      dimLabel: "DROP 150–400 MM",
      tag: {
        kicker: "SPEC 03-A · PROFILE",
        title: "Cyma recta crown, dentil course, bed moulding",
        body: "Every classical member cast sharp from a CNC-machined master mould.",
      },
      watermark: "CORNICE",
    },
    ticker: [
      "CLASSICAL & CONTEMPORARY PROFILES",
      "DROP 150–400 MM",
      "GLASSFIBRE REINFORCED CONCRETE",
      "PRE-FINISHED — PAINT OR POLISH",
      "SEAMLESS JOINTS ON SITE",
      "FIRE-RATED · NON-COMBUSTIBLE",
      "HERITAGE-GRADE DETAIL",
    ],
    features: [
      {
        icon: "trowel",
        title: "Premium Finish",
        lead: "Mould-perfect classical detail",
        points: [
          "Cyma, dentil and bead profiles cast razor-sharp",
          "Seamless site joints — runs read as one moulding",
          "Paint-ready or polished straight off the mould",
        ],
        note: "SURFACE: MOULD-FAIR, CLASS A",
      },
      {
        icon: "shieldcheck",
        title: "Superior Durability",
        lead: "Fifty years on the parapet",
        points: [
          "GRC does not rust, rot or feed termites",
          "Frost-proof and UV-stable at the roofline",
          "No cracking under thermal cycling",
        ],
        note: "50-YEAR DESIGN LIFE",
      },
      {
        icon: "feather",
        title: "Lightweight & Strong",
        lead: "A fraction of stone's weight",
        points: [
          "15–20 mm thin-shell sections keep parapets light",
          "High flexural strength for cantilevered runs",
          "Safer seismic load than RCC or stone cornices",
        ],
        note: "30–45 KG PER RUNNING M",
      },
    ],
    applications: [
      { icon: "home", title: "Residential Projects", desc: "Apartment towers and row houses that deserve a finished crown line.", chip: "TOWERS & ROW HOUSES" },
      { icon: "tower", title: "Commercial Buildings", desc: "Offices and retail blocks with a confident cornice edge.", chip: "OFFICE & RETAIL" },
      { icon: "keystone", title: "Heritage Structures", desc: "Profile-matched replacement cornices for restoration work.", chip: "RESTORATION" },
      { icon: "villa", title: "Villas & Bungalows", desc: "Classical crowns for verandahs, porches and parapets.", chip: "VERANDAHS & PORCHES" },
    ],
    anatomy: {
      kicker: "02 / ANATOMY OF A MOULDING",
      lines: ["EVERY CLASSICAL", "MEMBER, CAST."],
      intro: "Hover the legend — each member of the cornice lights up on the section. Nothing is cosmetic; everything is cast.",
      drawing: "cornice",
      caption: "SECTION A–A · CLASSICAL PROFILE · DROP 260 MM",
      parts: [
        { title: "Cyma recta crown", desc: "The S-curved top member that catches evening light — cast from a CNC-machined master." },
        { title: "Corona with drip", desc: "The projecting flat member that throws rainwater clear of the wall face below." },
        { title: "Dentil course", desc: "Toothed blocks spaced to module — the classical rhythm under the corona." },
        { title: "Bed moulding", desc: "The transition curve that seats the dentils onto the soffit." },
        { title: "Soffit", desc: "The underside of the cornice — finished fair, since the street sees it." },
        { title: "Wall / frieze", desc: "Fixing face: the cornice anchors back to the wall with concealed SS pins." },
      ],
    },
    familyLabel: "GRC CORNICE",
    familyDim: "DROP 150–400 MM",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "classical",
        code: "BSP-CR-01",
        name: "Classical Cornice",
        tag: "HERITAGE GRADE",
        dimLabel: "DROP 260 MM",
        desc: "Cyma recta over a dentil course — the canonical crown for classical elevations and restoration work.",
        specs: ["Drop 200–320 mm", "Dentil course included", "Profile-match on request"],
      },
      {
        variant: "decorative",
        code: "BSP-CR-02",
        name: "Decorative Cornice",
        dimLabel: "DROP 220 MM",
        desc: "Ogee crown with a scalloped fascia and bead course — ornament for villas and banquet facades.",
        specs: ["Drop 180–280 mm", "Scallop 80 mm module", "Bead course cast-in"],
      },
      {
        variant: "layered",
        code: "BSP-CR-03",
        name: "Layered Cornice",
        tag: "TRENDING",
        dimLabel: "DROP 200 MM",
        desc: "Three stepped reveals that shadow-line the parapet — the contemporary favourite for towers.",
        specs: ["Drop 160–300 mm", "2–4 layers to order", "Shadow-gap detailing"],
      },
      {
        variant: "simple",
        code: "BSP-CR-04",
        name: "Simple Cornice",
        tag: "BEST VALUE",
        dimLabel: "DROP 150 MM",
        desc: "A single bullnose slab with a clean drip — quiet, economical, and perfect at scale.",
        specs: ["Drop 120–200 mm", "Bullnose front edge", "Fastest lead time"],
      },
    ],
    comparison: {
      kicker: "03 / WHY SWITCH",
      title: ["THE CROWN WITHOUT", "THE CRANE."],
      highlight: "GRC CORNICE",
      cols: ["PLASTER / POP", "CARVED STONE", "RCC CAST"],
      rows: [
        { label: "Weight per running m", cells: ["30–45 kg", "8–12 kg (indoor only)", "350+ kg", "180–250 kg"] },
        { label: "Weather life", cells: ["50+ years outdoors", "Indoor — damp kills it", "Erodes, needs care", "Cracks at joints"] },
        { label: "Detail sharpness", cells: ["Mould-perfect repeats", "Softens with age", "Hand-carved, costly", "Timber-shutter rough"] },
        { label: "Installation", cells: ["Mechanical fix + joint", "Adhesive only", "Cranes & masons", "Shuttering at height"] },
        { label: "Seismic safety", cells: ["Light shell, pinned fix", "Light but fragile", "Heavy, risky at height", "Heavy, monolithic"] },
      ],
      note: "* INDICATIVE VALUES FOR A 260 MM DROP CLASSICAL PROFILE. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 300000, suffix: "+", label: "Running feet supplied" },
      { value: 400, suffix: " MM", label: "Max profile drop" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "05 / FROM PROFILE TO PARAPET",
      title: ["FOUR STEPS TO", "A FINISHED", "CROWN LINE."],
      intro: "Send an elevation or even a photograph of a cornice you admire — we match the profile and quote per running foot.",
      steps: [
        { title: "Share profile & lengths", desc: "Pick from the register or send a profile sketch; tell us total running feet and corner counts." },
        { title: "CAD section + quote in 24 h", desc: "An approved section drawing with per-running-foot pricing and joint detailing." },
        { title: "Cast & cure", desc: "Spray-cast GRC from the master mould, 7-day cure, then QC on a flat check table." },
        { title: "Fix & joint", desc: "Mechanical fixing with concealed SS pins; joints filled and faired so runs read seamless." },
      ],
      media: "photo",
      img: WORKSHOP_CORNICE,
      imgAlt: "Craftsman demoulding a GRC cornice profile in the Blue Star workshop",
      drawingVariant: "classical",
      caption: "MOULD SHOP — TALOJA MIDC, NAVI MUMBAI",
    },
    quote: {
      heading: "TELL US YOUR RUN.",
      sub: "Share profile, running feet and city — our sales engineer replies with per-foot pricing, a CAD section and joint details.",
      selects: [
        { label: "PROFILE", options: ["Classical Cornice", "Decorative Cornice", "Layered Cornice", "Simple Cornice", "Custom / heritage match"] },
        { label: "DROP", options: ["120–160 mm", "160–240 mm", "240–320 mm", "320–400 mm", "Custom / not sure"] },
      ],
      qtyLabel: "RUNNING FEET",
      qtyOptions: ["Upto 200 rft", "200–1000 rft", "1000–5000 rft", "5000+ rft (project)"],
    },
  },

  /* ---------------- 04 · GRC COLUMNS ---------------- */
  {
    slug: "grc-columns",
    code: "BSP-04",
    family: "GRC",
    name: "GRC Columns",
    navLabel: "Columns",
    registerLine: "All six classical orders, cast on galvanized cores.",
    hero: {
      kicker: "PREMIUM GRC ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "GRC Columns —" },
        { text: "Timeless Beauty.", underline: true },
        { text: "Built to Last." },
      ],
      sub: "Crafted to bring classical elegance and modern performance to your spaces.",
      media: "drawing",
      drawingVariant: "corinthian",
      stamp: "DWG NO. BSP-COL-01",
      dimLabel: "TYP. 3600 MM",
      tag: {
        kicker: "CONSTRUCTION",
        title: "18 mm GRC shell over a galvanized steel core",
        body: "The skin carries the beauty; the steel carries the load.",
      },
      watermark: "ORDERS",
    },
    ticker: [
      "SIX CLASSICAL ORDERS",
      "SPLIT-SHELL CASTING",
      "GALVANIZED STEEL CORE",
      "FLUTED OR PLAIN SHAFTS",
      "HEIGHTS TO 6 METRES",
      "ENTASIS TURNED TO CANON",
      "PAINT-READY OR POLISHED FINISH",
    ],
    features: [
      {
        icon: "compass",
        title: "Timeless Classical Detail",
        lead: "Every order drawn to its canon",
        points: [
          "Acanthus capitals, volutes and flutes cast mould-perfect",
          "Entasis and proportions follow the classical canons",
          "Heritage-grade sharpness for restoration projects",
        ],
        note: "MASTER MOULDS FROM SCULPTED ORIGINALS",
      },
      {
        icon: "ibeam",
        title: "Structural Steel Core",
        lead: "Beauty hung on galvanized steel",
        points: [
          "Split GRC shells bolt to a galvanized MS core",
          "Seismic-safe — the cladding never carries load",
          "Plumbable on site; no wet trades at height",
        ],
        note: "CORE: 80 × 80 GALVANIZED MS",
      },
      {
        icon: "wrench",
        title: "Rapid Dry Installation",
        lead: "A portico in days, not months",
        points: [
          "Core fixes first; shells bolt on course by course",
          "No carving crew, no crane hire, no curing downtime",
          "Joints grout out and disappear after finishing",
        ],
        note: "TYP. COLUMN: 4 HOURS TO ERECT",
      },
    ],
    anatomy: {
      kicker: "02 / SPLIT-SHELL ANATOMY",
      lines: ["BEAUTY ON THE", "OUTSIDE. STEEL", "ON THE INSIDE."],
      intro: "A Blue Star column is never solid GRC. Hover the list — every stone you see hangs off a galvanized core.",
      drawing: "column",
      caption: "SECTION THROUGH SHAFT · SHELL 18 MM · CORE 80 × 80 MS",
      parts: [
        { title: "Split-shell GRC halves", desc: "Two 18 mm GRC shells, spray-cast from a single master mould and joined with polymer mortar — the seam disappears after finishing." },
        { title: "Galvanized steel core", desc: "A structural MS post carries every load; the GRC is cladding, never structure. Seismic-safe at any height." },
        { title: "SS fixing brackets", desc: "Adjustable stainless brackets tie each shell course to the core — plumbable on site, no wet trades required." },
        { title: "Cast base shoe", desc: "A moulded shoe covers the fixing ring at floor level and sheds water away from the core." },
      ],
    },
    familyLabel: "GRC COLUMN",
    familyDim: "Ø 250–600 MM · H TO 6 M",
    showcaseCols: "2/3",
    showcase: [
      {
        variant: "corinthian",
        code: "BSP-COL-01",
        name: "Corinthian Column",
        tag: "MOST REQUESTED",
        dimLabel: "CANON · H = 10D",
        desc: "The ornate order — twin rows of acanthus leaves under corner volutes. The default for porticos, temples and grand lobbies.",
        specs: ["Acanthus capital, two leaf rows", "24 flutes with fillets", "Dia 250–600 mm"],
      },
      {
        variant: "ionic",
        code: "BSP-COL-02",
        name: "Ionic Column",
        dimLabel: "CANON · H = 9D",
        desc: "Paired volutes over an egg-and-dart echinus. Graceful, scholarly proportions for verandahs and clubhouse colonnades.",
        specs: ["Paired corner volutes", "Egg-and-dart echinus", "Dia 250–500 mm"],
      },
      {
        variant: "doric",
        code: "BSP-COL-03",
        name: "Doric Column",
        dimLabel: "CANON · H = 8D",
        desc: "The stout Greek original — fluted shaft, plain capital, no base. Honest strength for gates and minimalist porticos.",
        specs: ["Plain echinus + abacus", "20 shallow flutes, no base", "Dia 300–600 mm"],
      },
      {
        variant: "tuscan",
        code: "BSP-COL-04",
        name: "Tuscan Column",
        tag: "BEST VALUE",
        dimLabel: "CANON · H = 7D",
        desc: "Rome's plainer Doric: a smooth, unfluted shaft on a simple torus base. Quiet elegance that never competes with the facade.",
        specs: ["Smooth unfluted shaft", "Simple torus base", "Dia 250–500 mm"],
      },
      {
        variant: "roman",
        code: "BSP-COL-05",
        name: "Roman Column",
        dimLabel: "CANON · H = 8D",
        desc: "Roman Doric with a moulded base and beaded echinus — closer-set flutes on a slender canon. Civic gravitas out of the box.",
        specs: ["Beaded echinus moulding", "24 flutes on moulded base", "Dia 250–550 mm"],
      },
      {
        variant: "composite",
        code: "BSP-COL-06",
        name: "Composite Column",
        tag: "GRANDEST",
        dimLabel: "CANON · H = 10D",
        desc: "Ionic volutes stacked over Corinthian acanthus — the grandest order in the canon, reserved for statement entrances.",
        specs: ["Volute + acanthus capital", "24 flutes with fillets", "Dia 300–600 mm"],
      },
    ],
    comparison: {
      kicker: "03 / WHY GRC",
      title: ["THE LOOK OF STONE.", "NONE OF THE STONE."],
      highlight: "GRC COLUMN",
      cols: ["CARVED STONE", "PLASTER / POP", "TIMBER"],
      rows: [
        { label: "Weight per running foot", cells: ["35–50 kg", "300–400 kg", "12–18 kg", "25–30 kg"] },
        { label: "Detail sharpness", cells: ["Mould-perfect acanthus & flutes", "Hand-carved — at a price", "Softens with age", "Limited profiles"] },
        { label: "Weather & life", cells: ["50+ years outdoors", "Centuries, but erodes", "Indoor only", "Rots · termites"] },
        { label: "Installation", cells: ["Dry-fix to steel core", "Cranes + masons", "Cast in situ", "Carpentry crew"] },
        { label: "Cost vs stone", cells: ["30–40% of carved stone", "Baseline", "Cheapest — and fragile", "Premium joinery"] },
      ],
      note: "* INDICATIVE VALUES FOR A 300 MM DIA × 3.6 M COLUMN. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 6, suffix: "", label: "Orders in canon" },
      { value: 40000, suffix: "+", label: "Columns cast" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / FROM MOULD TO PORTICO",
      title: ["FOUR STEPS", "TO YOUR", "COLONNADE."],
      intro: "No carving crew, no crane hire, no curing downtime on site — the stone arrives finished and bolts straight onto the core.",
      steps: [
        { title: "Pick your order & sizes", desc: "Choose from the six canons and share heights, diameters and counts — a facade photo is enough to start." },
        { title: "CAD elevation + quote in 24 h", desc: "An approved elevation and section of your column, with per-unit pricing and finish options." },
        { title: "Spray-cast & cure", desc: "18 mm GRC shells from the master mould, seven-day cure, then demould and QC at our Taloja works." },
        { title: "Erect the core, hang the shells", desc: "Your site team fixes the galvanized core; shells bolt on, joints grout out. Our engineer stays on call." },
      ],
      media: "photo",
      img: WORKSHOP_COLUMN,
      imgAlt: "Craftsman hand-finishing the flutes of a GRC column shaft in the Blue Star workshop",
      drawingVariant: "corinthian",
      caption: "FLUTE FINISHING BY HAND — TALOJA MIDC, NAVI MUMBAI",
    },
    quote: {
      heading: "TELL US YOUR ORDER.",
      sub: "Share the order, height and count — our sales engineer replies with per-column pricing, a CAD elevation and a fixing plan.",
      selects: [
        {
          label: "ORDER",
          options: ["Corinthian Column", "Ionic Column", "Doric Column", "Tuscan Column", "Roman Column", "Composite Column", "Multiple orders / custom"],
        },
        { label: "COLUMN HEIGHT", options: ["Upto 2.4 m", "2.4–3.6 m", "3.6–4.8 m", "4.8–6 m", "Custom / not sure"] },
      ],
      qtyLabel: "QUANTITY",
      qtyOptions: ["1–4 columns", "4–12 columns", "12–50 columns", "50+ (project supply)"],
    },
  },

  /* ---------------- 05 · FRP DOMES ---------------- */
  {
    slug: "frp-domes",
    code: "BSP-05",
    family: "FRP",
    name: "FRP Domes",
    navLabel: "Domes",
    registerLine: "Skylight and architectural domes, moulded seamless.",
    hero: {
      kicker: "PREMIUM FRP ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "FRP Domes —" },
        { text: "Seamless Curves.", underline: true },
        { text: "Limitless Light." },
      ],
      sub: "Lightweight FRP skylight and architectural domes that flood spaces with daylight — watertight, impact-safe and effortless to install.",
      media: "drawing",
      drawingVariant: "hemispherical",
      stamp: "DWG NO. BSP-DM-01",
      dimLabel: "Ø UPTO 6000 MM",
      tag: {
        kicker: "SPEC 05-A · CROWN",
        title: "Seamless one-piece moulded crown",
        body: "No field joints at the apex — the most common leak point, engineered away.",
      },
      watermark: "DOMES",
    },
    ticker: [
      "SEAMLESS MOULDED CROWNS",
      "DIAMETERS TO 6 METRES",
      "SOLID OR GLAZED SECTIONS",
      "HAIL & IMPACT SAFE",
      "EPDM GASKET BASE RINGS",
      "UV-STABLE GELCOAT SHELL",
      "LIGHT TRANSMISSION OPTIONS",
    ],
    features: [
      {
        icon: "shieldcheck",
        title: "Impact & Hail Safe",
        lead: "Tougher than the sky above",
        points: [
          "FRP shell shrugs off hail and falling debris",
          "No shatter — no risk over heads or atria",
          "Optional polycarbonate glazing bands for daylight",
        ],
        note: "HAIL TEST: 25 MM ICE @ 23 M/S",
      },
      {
        icon: "drop",
        title: "100% Watertight",
        lead: "Seamless where it matters",
        points: [
          "One-piece moulded crown — no apex joint to leak",
          "EPDM gasket base ring seats onto any curb",
          "Ribbed profiles shed water, never pond it",
        ],
        note: "DRIVE-RAIN TESTED, ZERO INGRESS",
      },
      {
        icon: "feather",
        title: "Featherlight Structure",
        lead: "Light where glass is heavy",
        points: [
          "A fraction of the weight of glass + MS framing",
          "No heavy structural support needed in the roof",
          "Two installers can set a dome in under an hour",
        ],
        note: "8–15 KG/M² SHELL WEIGHT",
      },
    ],
    applications: [
      { icon: "domebase", title: "Places of Worship", desc: "Onion and ribbed domes for temples, mosques and gurdwaras.", chip: "ONION & RIBBED" },
      { icon: "villa", title: "Villas & Courtyards", desc: "Skylight domes that turn courtyards and stairwells bright.", chip: "SKYLIGHT DOMES" },
      { icon: "tower", title: "Hotels & Atriums", desc: "Grand atrium crowns with glazing bands for soft daylight.", chip: "ATRIUM CROWNS" },
      { icon: "factory", title: "Commercial Roofs", desc: "Ventilated monitor domes for offices and retail blocks.", chip: "MONITOR DOMES" },
    ],
    familyLabel: "FRP DOME",
    familyDim: "Ø 900–6000 MM",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "hemispherical",
        code: "BSP-DM-01",
        name: "Hemispherical Dome",
        tag: "BEST SELLER",
        dimLabel: "Ø 900–3000 MM",
        desc: "The pure half-sphere with radial ribs — the classic crown for rotundas and stairwells.",
        specs: ["Ø 900–3000 mm", "Radial rib stiffening", "Solid or glazed bands"],
      },
      {
        variant: "onion",
        code: "BSP-DM-02",
        name: "Onion Dome",
        tag: "HERITAGE GRADE",
        dimLabel: "Ø 1200–4000 MM",
        desc: "The pinched, rising profile of temple and palace architecture — now cast feather-light.",
        specs: ["Ø 1200–4000 mm", "Finial included", "Metallic gelcoat options"],
      },
      {
        variant: "segmental",
        code: "BSP-DM-03",
        name: "Segmental Dome",
        dimLabel: "Ø UPTO 6000 MM",
        desc: "A shallow ribbed arc for wide atriums and lobbies — big span, low rise.",
        specs: ["Ø up to 6000 mm", "Low rise-to-span ratio", "Walk-on options"],
      },
      {
        variant: "lowprofile",
        code: "BSP-DM-04",
        name: "Low-Profile Skylight",
        tag: "TRENDING",
        dimLabel: "Ø 600–1500 MM",
        desc: "A slim daylight dome over standard curbs — the fastest way to bring light into a dark room.",
        specs: ["Fits standard curbs", "Diffused light finish", "Ventilated option"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["DAYLIGHT WITHOUT", "THE DOWNSIDE."],
      highlight: "FRP DOME",
      cols: ["GLASS + MS FRAME", "POLYCARBONATE SHEET", "RCC DOME"],
      rows: [
        { label: "Weight per m²", cells: ["8–15 kg", "45–70 kg", "3–4 kg (but flimsy)", "600+ kg"] },
        { label: "Impact safety", cells: ["Hail-safe, no shatter", "Shatters — safety risk", "Hail dents & crazes", "Cracks leak"] },
        { label: "Watertightness", cells: ["Seamless crown + gasket", "Sealant joints fail", "Fastener leaks", "Membrane patches"] },
        { label: "Installation", cells: ["2 people, < 1 hour", "Glaziers + crane", "Screws + tapes", "Shuttering + weeks"] },
        { label: "Design life", cells: ["20+ years, UV-stable", "15–20 years", "5–8 years, yellows", "Lifetime, high upkeep"] },
      ],
      note: "* INDICATIVE VALUES FOR A 1500 MM DIAMETER DOME ON STANDARD CURB. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 12000, suffix: "+", label: "Domes installed" },
      { value: 6, suffix: " M", label: "Max diameter" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / FROM ROOF OPENING TO CROWN",
      title: ["FOUR STEPS", "TO DAYLIGHT."],
      intro: "Send the roof opening size and a photo — we match the dome profile and ship it ready to seat on your curb.",
      steps: [
        { title: "Share the opening size", desc: "Roof opening diameter, curb details and a photo — that's all we need to start." },
        { title: "Profile + quote in 24 h", desc: "Dome profile drawing with per-unit pricing, glazing options and curb adapter details." },
        { title: "Mould, cure & finish", desc: "One-piece lay-up with UV-stable gelcoat, demoulded and QC'd at our Taloja works." },
        { title: "Seat & seal", desc: "Dome seats onto the curb with the EPDM gasket ring — two people, under an hour." },
      ],
      media: "drawing",
      drawingVariant: "hemispherical",
      caption: "HEMISPHERICAL PROFILE · Ø 1500 MM TYPICAL",
    },
    quote: {
      heading: "TELL US YOUR ROOF.",
      sub: "Share the opening size and city — our sales engineer replies with per-unit pricing, curb adapter details and glazing options.",
      selects: [
        { label: "DOME TYPE", options: ["Hemispherical Dome", "Onion Dome", "Segmental Dome", "Low-Profile Skylight", "Custom profile"] },
        { label: "DIAMETER", options: ["Upto 1200 mm", "1200–2400 mm", "2400–4000 mm", "4000–6000 mm", "Custom / not sure"] },
      ],
      qtyLabel: "QUANTITY",
      qtyOptions: ["1–5 domes", "5–20 domes", "20–100 domes", "100+ (project supply)"],
    },
  },

  /* ---------------- 06 · GRC BALUSTRADES ---------------- */
  {
    slug: "grc-balustrades",
    code: "BSP-06",
    family: "GRC",
    name: "GRC Balustrades",
    navLabel: "Balustrades",
    registerLine: "Railings with stature — balusters, panels and copings.",
    hero: {
      kicker: "PREMIUM GRC ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "GRC Balustrades —" },
        { text: "Safety With", },
        { text: "Stature.", underline: true },
      ],
      sub: "Moulded GRC railing systems for balconies, terraces and staircases — classical balusters or crisp modern panels, cast to last fifty years.",
      media: "drawing",
      drawingVariant: "classic",
      stamp: "DWG NO. BSP-BL-01",
      dimLabel: "RAIL H 900–1100 MM",
      tag: {
        kicker: "SPEC 06-A · LOAD",
        title: "Handrail load tested as a system",
        body: "Balusters, rail and fixing brackets certified together — not just the moulding.",
      },
      watermark: "RAILS",
    },
    ticker: [
      "CLASSICAL & MODERN SYSTEMS",
      "HANDRAIL LOAD TESTED",
      "HEIGHTS 900–1100 MM",
      "ZERO RUST · ZERO ROT",
      "CAST-IN COLOUR FINISH",
      "MODULAR — REPLACE ONE RUN",
      "STAIRS · TERRACES · BALCONIES",
    ],
    features: [
      {
        icon: "wall",
        title: "High Strength & Load-Rated",
        lead: "Certified as a complete system",
        points: [
          "Handrail loads tested with the fixing system",
          "Balusters cast around SS pins for impact safety",
          "Complies with IS code railing heights",
        ],
        note: "0.75 KN/M HORIZONTAL: PASS",
      },
      {
        icon: "dropcross",
        title: "Weather & Corrosion Proof",
        lead: "Nothing to rust at the edge",
        points: [
          "No steel exposed at the parapet — GRC never rusts",
          "Frost, salt spray and monsoon all shrugged off",
          "Colour is cast in; no repainting at height",
        ],
        note: "NSS SALT-SPRAY: NO DEGRADATION",
      },
      {
        icon: "trowel",
        title: "Cast-In Colour & Finish",
        lead: "Painted by the mould itself",
        points: [
          "Mould-fair finish straight off the casting",
          "Any RAL shade cast in, or paint-ready white",
          "Stone-like textures available on request",
        ],
        note: "FINISH: MOULD-FAIR · CLASS A",
      },
    ],
    applications: [
      { icon: "tower", title: "Apartments & Towers", desc: "Balcony railings that survive decades of monsoon without a repaint.", chip: "BALCONY RAILS" },
      { icon: "villa", title: "Villas & Bungalows", desc: "Classical baluster rails for verandahs, terraces and staircases.", chip: "VERANDAH RAILS" },
      { icon: "tower", title: "Hotels & Resorts", desc: "Statement railings for terraces, poolsides and promenades.", chip: "TERRACE RAILS" },
      { icon: "keystone", title: "Heritage Restoration", desc: "Profile-matched balusters for listed buildings and old havelis.", chip: "RESTORATION" },
    ],
    familyLabel: "GRC BALUSTRADE",
    familyDim: "RAIL H 900–1100 MM",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "classic",
        code: "BSP-BL-01",
        name: "Classic Baluster Rail",
        tag: "BEST SELLER",
        dimLabel: "BALUSTER 120 MM",
        desc: "Waisted balusters between moulded rails — the timeless villa railing, cast to code heights.",
        specs: ["Height 900–1100 mm", "Balusters at 110 mm c/c", "Corner & end pieces included"],
      },
      {
        variant: "panel",
        code: "BSP-BL-02",
        name: "Roman Panel Rail",
        dimLabel: "PANEL 600 × 600 MM",
        desc: "Recessed panels with a circular motif inside chunky posts — stately, for terraces and promenades.",
        specs: ["Panels 600 × 600 mm", "Motif cast both faces", "Posts every 1800 mm"],
      },
      {
        variant: "modern",
        code: "BSP-BL-03",
        name: "Modern Square Rail",
        tag: "TRENDING",
        dimLabel: "BALUSTER 40 × 40 MM",
        desc: "Crisp square balusters under a slim rail — the contemporary railing for towers and minimalist homes.",
        specs: ["Square 40 × 40 mm", "Slim 60 mm top rail", "Shadow-gap plinth"],
      },
      {
        variant: "plinth",
        code: "BSP-BL-04",
        name: "Coping & Plinth Set",
        dimLabel: "COPING 150–300 MM",
        desc: "The finishing kit: moulded coping, plinth blocks and recessed panels to complete any parapet.",
        specs: ["Coping 150–300 mm wide", "Plinth blocks 300 mm", "Matches all rail systems"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE RAILING THAT", "NEVER REPINTS."],
      highlight: "GRC RAILING",
      cols: ["MS RAILING", "RCC CAST", "TIMBER"],
      rows: [
        { label: "Corrosion", cells: ["Immune — no steel exposed", "Rusts from inside out", "Cover spalls", "Rots at joints"] },
        { label: "Maintenance", cells: ["Nil — cast-in colour", "Repaint every 2–3 years", "Crack patching", "Annual treatment"] },
        { label: "Aesthetics", cells: ["Moulded classical detail", "Welded tubes only", "Plain, heavy", "Craft, but perishes"] },
        { label: "Replacement", cells: ["Swap one baluster", "Cut + re-weld + paint", "Break & recast", "Never matches"] },
        { label: "Design life", cells: ["50 years", "8–12 years", "20 years with care", "10–15 years"] },
      ],
      note: "* INDICATIVE VALUES FOR A 1000 MM HIGH BALCONY RAIL. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 80000, suffix: "+", label: "Running feet supplied" },
      { value: 4, suffix: "", label: "Railing systems" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / FROM PARAPET TO PROMENADE",
      title: ["FOUR STEPS TO", "A FINISHED", "RAIL LINE."],
      intro: "Share the run length and a photo of the edge — we quote per running foot including corners, posts and fixings.",
      steps: [
        { title: "Share lengths & photos", desc: "Run lengths, heights, corner counts and a photo of the parapet edge." },
        { title: "Layout drawing + quote", desc: "A baluster layout with per-running-foot pricing, corner and end-piece counts." },
        { title: "Cast & cure", desc: "Balusters, rails and posts cast in matched batches for colour consistency." },
        { title: "Fix & fair", desc: "SS-pinned fixing to the parapet; joints faired so the run reads monolithic." },
      ],
      media: "drawing",
      drawingVariant: "classic",
      caption: "CLASSIC BALUSTER SYSTEM · 1000 MM RAIL HEIGHT",
    },
    quote: {
      heading: "TELL US YOUR RUN.",
      sub: "Share system, lengths and city — our sales engineer replies with per-foot pricing and a baluster layout drawing.",
      selects: [
        { label: "SYSTEM", options: ["Classic Baluster Rail", "Roman Panel Rail", "Modern Square Rail", "Coping & Plinth Set", "Multiple / custom"] },
        { label: "RAIL HEIGHT", options: ["900 mm", "1000 mm (standard)", "1100 mm", "Custom / not sure"] },
      ],
      qtyLabel: "RUNNING FEET",
      qtyOptions: ["Upto 100 rft", "100–500 rft", "500–2000 rft", "2000+ rft (project)"],
    },
  },

  /* ---------------- 07 · FRP WATER TANKS ---------------- */
  {
    slug: "frp-water-tanks",
    code: "BSP-07",
    family: "FRP",
    name: "FRP Water Tanks",
    navLabel: "Water Tanks",
    registerLine: "Food-grade storage that never rusts, leaks or leaches.",
    hero: {
      kicker: "PREMIUM FRP ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "FRP Water Tanks —" },
        { text: "Pure Water.", underline: true },
        { text: "Zero Contamination." },
      ],
      sub: "Food-grade FRP storage tanks that never rust, never leach and never need lining — from loft sizes to 50,000-litre project supply.",
      media: "drawing",
      drawingVariant: "vertical",
      stamp: "DWG NO. BSP-WT-01",
      dimLabel: "500–50000 L",
      tag: {
        kicker: "SPEC 07-A · LINER",
        title: "Food-grade gelcoat, moulded in",
        body: "The inner surface is the mould itself — no liners to delaminate, no coatings to scratch.",
      },
      watermark: "TANKS",
    },
    ticker: [
      "FOOD-GRADE INNER SURFACE",
      "500 – 50,000 LITRES",
      "ONE-PIECE MOULDED BODIES",
      "NEVER RUSTS · NEVER LEACHES",
      "UV-STABILISED OUTER SHELL",
      "LOFT TO UNDERGROUND GRADES",
      "10-YEAR TANK WARRANTY",
    ],
    features: [
      {
        icon: "drop",
        title: "Food-Grade & Hygienic",
        lead: "Water stays water",
        points: [
          "Food-grade gelcoat surface, moulded in — never lined",
          "No leaching, no taste, no algal growth on the walls",
          "Easy to drain and clean through the manhole",
        ],
        note: "FOOD-CONTACT RESIN SYSTEM",
      },
      {
        icon: "storm",
        title: "Corrosion-Proof",
        lead: "Immune to water and weather",
        points: [
          "FRP cannot rust — hard water and chlorine included",
          "UV-stabilised shell for exposed terrace siting",
          "Underground and chemical-service grades available",
        ],
        note: "10-YEAR SHELL WARRANTY",
      },
      {
        icon: "shield",
        title: "One-Piece Moulded",
        lead: "No seams, no leaks",
        points: [
          "Bodies moulded in one piece — no welded or bolted seams",
          "Ribbed walls resist hydrostatic bulging",
          "Light enough for loft slabs and rooftop lifts",
        ],
        note: "HYDROSTATIC TEST: 1.5× RATED",
      },
    ],
    applications: [
      { icon: "home", title: "Homes & Lofts", desc: "Loft and terrace tanks sized for the family, lifted by hand.", chip: "LOFT & TERRACE" },
      { icon: "tower", title: "Apartments & Societies", desc: "Battery banks of tanks for societies and gated communities.", chip: "SOCIETY SUPPLY" },
      { icon: "factory", title: "Industry & Process", desc: "Chemical-resistant FRP for process water and effluent.", chip: "PROCESS WATER" },
      { icon: "cross", title: "Institutions & Hospitals", desc: "Hygienic storage for hospitals, schools and hostels.", chip: "HYGIENIC STORAGE" },
    ],
    familyLabel: "FRP TANK",
    familyDim: "500–50000 L",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "vertical",
        code: "BSP-WT-01",
        name: "Vertical Cylindrical",
        tag: "BEST SELLER",
        dimLabel: "1000–20000 L",
        desc: "The terrace classic — ribbed vertical cylinder with manhole and float-ready lid.",
        specs: ["1000–20000 L", "Ribbed anti-bulge walls", "Manhole + inlet/outlet kit"],
      },
      {
        variant: "horizontal",
        code: "BSP-WT-02",
        name: "Horizontal Tank",
        dimLabel: "2000–10000 L",
        desc: "Low-slung cylinder on saddle cradles — for low headroom, vehicles and underground siting.",
        specs: ["2000–10000 L", "Saddle cradle included", "Underground grade option"],
      },
      {
        variant: "loft",
        code: "BSP-WT-03",
        name: "Loft / Square Tank",
        tag: "TRENDING",
        dimLabel: "500–2000 L",
        desc: "Compact square body that fits tight lofts and utilises every corner of the slab.",
        specs: ["500–2000 L", "Fits standard loft hatches", "Low dead load"],
      },
      {
        variant: "sectional",
        code: "BSP-WT-04",
        name: "Sectional Panel Tank",
        dimLabel: "20000–50000 L",
        desc: "Bolted GRC-FRP panels assembled on site — big capacity where one-piece tanks can't reach.",
        specs: ["20000–50000 L", "Assembled through doors", "SS tie-rod framework"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE TANK THAT", "STAYS CLEAN."],
      highlight: "FRP TANK",
      cols: ["MS / STEEL TANK", "RCC TANK", "POLYETHYLENE"],
      rows: [
        { label: "Inner surface", cells: ["Food-grade gelcoat", "Rusts, needs lining", "Leaches & cracks", "OK, but algae-prone"] },
        { label: "Corrosion", cells: ["Immune", "Guaranteed rust", "Rebar corrosion", "UV degrades"] },
        { label: "Weight", cells: ["~1/8th of steel", "Heavy, craned in", "Monolithic, massive", "Light but flimsy"] },
        { label: "Siting", cells: ["Loft to underground", "Loft & ground only", "Ground only", "Loft & ground"] },
        { label: "Design life", cells: ["20+ years", "10–12 years", "Lifetime, high upkeep", "8–10 years"] },
      ],
      note: "* INDICATIVE VALUES FOR A 5000 L VERTICAL TANK. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 60000, suffix: "+", label: "Tanks in service" },
      { value: 50000, suffix: " L", label: "Max single capacity" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Shell warranty" },
    ],
    process: {
      kicker: "04 / FROM ORDER TO OVERFLOW",
      title: ["FOUR STEPS", "TO PURE", "STORAGE."],
      intro: "Tell us the litres and the spot — loft, terrace or underground — and we size the tank and ship it with the fitting kit.",
      steps: [
        { title: "Share capacity & siting", desc: "Litres required, siting location and access constraints — loft hatch sizes matter more than you think." },
        { title: "Sizing + quote in 24 h", desc: "Recommended tank profile with per-unit pricing, fitting kit and delivery plan." },
        { title: "Mould & test", desc: "One-piece moulding, gelcoat cure, then hydrostatic testing at 1.5× rated capacity." },
        { title: "Deliver & connect", desc: "Pan-India delivery with inlet/outlet/overflow kit; plumbing connects in under an hour." },
      ],
      media: "drawing",
      drawingVariant: "vertical",
      caption: "VERTICAL CYLINDRICAL · 5000 L TYPICAL",
    },
    quote: {
      heading: "TELL US YOUR LITRES.",
      sub: "Share capacity, siting and city — our sales engineer replies with per-unit pricing and a fitting-kit list.",
      selects: [
        { label: "TANK TYPE", options: ["Vertical Cylindrical", "Horizontal Tank", "Loft / Square Tank", "Sectional Panel Tank", "Custom / not sure"] },
        { label: "CAPACITY", options: ["500–2000 L", "2000–10000 L", "10000–20000 L", "20000+ L", "Not sure — advise me"] },
      ],
      qtyLabel: "QUANTITY",
      qtyOptions: ["1 tank", "2–5 tanks", "5–20 tanks", "20+ (project supply)"],
    },
  },

  /* ---------------- 08 · GRC FACADE PANELS ---------------- */
  {
    slug: "grc-facade-panels",
    code: "BSP-08",
    family: "GRC",
    name: "GRC Facade Panels",
    navLabel: "Facade Panels",
    registerLine: "Thin-shell cladding in flat, ribbed and carved finishes.",
    hero: {
      kicker: "PREMIUM GRC ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "GRC Facade Panels —" },
        { text: "Skin That Defines", underline: true },
        { text: "the Building." },
      ],
      sub: "Thin-shell GRC cladding in flat, ribbed, perforated and carved finishes — rainscreen-ready, seismically light and cast to your design.",
      media: "drawing",
      drawingVariant: "ribbed",
      stamp: "DWG NO. BSP-FP-01",
      dimLabel: "PANELS TO 1200 × 3600 MM",
      tag: {
        kicker: "SPEC 08-A · SYSTEM",
        title: "Rainscreen-ready fixing system",
        body: "Ventilated cavity, SS brackets and EPDM seals — the full envelope system, not just panels.",
      },
      watermark: "FACADE",
    },
    ticker: [
      "PANELS TO 1200 × 3600 MM",
      "FLAT · RIBBED · PERFORATED · CARVED",
      "A1 NON-COMBUSTIBLE",
      "RAINSCREEN CAVITY SYSTEMS",
      "SEISMICALLY LIGHT ENVELOPE",
      "ANY RAL OR STONE FINISH",
      "SHOP DRAWINGS IN 72 H",
    ],
    features: [
      {
        icon: "compass",
        title: "Design Freedom",
        lead: "If you can draw it, we can cast it",
        points: [
          "Flat, ribbed, perforated and relief-carved finishes",
          "Panels up to 1200 × 3600 mm, any shape in plan",
          "Any RAL colour or stone-like texture cast in",
        ],
        note: "CUSTOM MOULDS FROM YOUR CAD",
      },
      {
        icon: "grid",
        title: "Rainscreen-Ready",
        lead: "A complete envelope system",
        points: [
          "Ventilated cavity keeps the structure dry",
          "SS bracket fixing with thermal-break pads",
          "EPDM seals at every joint, detailed in shop drawings",
        ],
        note: "DRIVE-RAIN TESTED ASSEMBLY",
      },
      {
        icon: "flame",
        title: "Fire-Rated & Durable",
        lead: "A1 non-combustible cladding",
        points: [
          "GRC is mineral — it does not burn or smoke",
          "No coatings to delaminate in a fire",
          "50-year design life with zero façade repaints",
        ],
        note: "A1 TO EN 13501-1",
      },
    ],
    applications: [
      { icon: "tower", title: "High-Rise Towers", desc: "Light envelope panels that shave dead load off tall structures.", chip: "LIGHT ENVELOPE" },
      { icon: "villa", title: "Villas & Residences", desc: "Ribbed and carved feature walls for premium homes.", chip: "FEATURE WALLS" },
      { icon: "tower", title: "Commercial & Retail", desc: "Branded reliefs and signature finishes for flagship facades.", chip: "BRAND FACADES" },
      { icon: "keystone", title: "Heritage & Civic", desc: "Profile-matched cladding for restoration and civic buildings.", chip: "RESTORATION" },
    ],
    familyLabel: "GRC FACADE PANEL",
    familyDim: "1200 × 3600 MM MAX",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "flat",
        code: "BSP-FP-01",
        name: "Flat Panel",
        tag: "BEST SELLER",
        dimLabel: "1200 × 2400 MM",
        desc: "Crisp, mould-fair flat panels with shadow-gap joints — the minimalist canvas for any tower.",
        specs: ["Up to 1200 × 2400 mm", "Shadow-gap or sealed joints", "Any RAL colour cast-in"],
      },
      {
        variant: "ribbed",
        code: "BSP-FP-02",
        name: "Ribbed Panel",
        dimLabel: "RIB PITCH 50–150 MM",
        desc: "Vertical fins that catch the sun all day — rhythm and depth without a single bracket showing.",
        specs: ["Rib pitch 50–150 mm", "Fin depths to 80 mm", "Horizontal options"],
      },
      {
        variant: "perforated",
        code: "BSP-FP-03",
        name: "Perforated Screen",
        tag: "ARCHITECT PICK",
        dimLabel: "PERF Ø 20–60 MM",
        desc: "Cast perforation for sun-breaker skins and media facades — night lighting turns it inside out.",
        specs: ["Perforation Ø 20–60 mm", "Open area to 40%", "Backlit options"],
      },
      {
        variant: "carved",
        code: "BSP-FP-04",
        name: "Carved Relief Panel",
        dimLabel: "RELIEF TO 60 MM",
        desc: "Bas-relief motifs, logotypes and pattern fields — sculpture at building scale.",
        specs: ["Relief depth to 60 mm", "From your artwork / CAD", "Single or repeat motifs"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE ENVELOPE THAT", "OUTPERFORMS ACP."],
      highlight: "GRC PANEL",
      cols: ["ACP CLADDING", "NATURAL STONE", "PRECAST CONCRETE"],
      rows: [
        { label: "Fire rating", cells: ["A1 non-combustible", "Core-dependent", "Non-combustible", "A1 but heavy"] },
        { label: "Panel weight", cells: ["40–60 kg/m²", "15–25 kg/m²", "80–120 kg/m²", "150+ kg/m²"] },
        { label: "Relief & texture", cells: ["Cast to 60 mm relief", "Flat + routed only", "Honed finish only", "Mould-limited"] },
        { label: "Durability", cells: ["50 years, no repaint", "15–20 years, dents", "Stains, erodes", "Cracks at joints"] },
        { label: "Seismic load", cells: ["Light shell system", "Light", "Very heavy", "Heaviest option"] },
      ],
      note: "* INDICATIVE VALUES FOR A 1200 × 2400 MM RIBBED PANEL. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 250000, suffix: "+", label: "m² clad to date" },
      { value: 3600, suffix: " MM", label: "Max panel length" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "System warranty" },
    ],
    process: {
      kicker: "04 / FROM ELEVATION TO ENVELOPE",
      title: ["FOUR STEPS", "TO A CAST", "FACADE."],
      intro: "Send elevations or even a mood image — shop drawings with panel splits and bracket layout come back in 72 hours.",
      steps: [
        { title: "Share elevations & finishes", desc: "CAD elevations, finish references and any relief artwork you want cast." },
        { title: "Shop drawings in 72 h", desc: "Panel splits, bracket layout and joint detailing for architect sign-off." },
        { title: "Moulds & batch casting", desc: "CNC-machined moulds; panels cast in colour-matched batches with QC templates." },
        { title: "Install the system", desc: "Brackets, panels and seals installed by certified crews with survey support." },
      ],
      media: "drawing",
      drawingVariant: "ribbed",
      caption: "RIBBED PANEL · PITCH 100 MM · FIN 60 MM",
    },
    quote: {
      heading: "TELL US YOUR FACADE.",
      sub: "Share facade area, finish and city — our sales engineer replies with per-m² pricing and a panel-split drawing.",
      selects: [
        { label: "PANEL TYPE", options: ["Flat Panel", "Ribbed Panel", "Perforated Screen", "Carved Relief Panel", "Mixed / custom"] },
        { label: "FINISH", options: ["Paint-ready white", "Any RAL cast-in", "Stone-like texture", "Polished fair-face", "Not sure — advise me"] },
      ],
      qtyLabel: "FACADE AREA",
      qtyOptions: ["Upto 500 m²", "500–2000 m²", "2000–10000 m²", "10000+ m² (project)"],
    },
  },

  /* ---------------- 09 · FRP DOOR FRAMES ---------------- */
  {
    slug: "frp-door-frames",
    code: "BSP-09",
    family: "FRP",
    name: "FRP Door Frames",
    navLabel: "Door Frames",
    registerLine: "Rot-proof frames that stay plumb for life.",
    hero: {
      kicker: "PREMIUM FRP ARCHITECTURAL PRODUCTS",
      lines: [
        { text: "FRP Door Frames —" },
        { text: "The Last Frame", underline: true },
        { text: "You'll Fit." },
      ],
      sub: "Rot-proof, termite-proof door frames that stay plumb for life — factory-finished, ready to hang in minutes.",
      media: "drawing",
      drawingVariant: "standard",
      stamp: "DWG NO. BSP-DF-01",
      dimLabel: "800 × 2100 MM TYP.",
      tag: {
        kicker: "SPEC 09-A · CORE",
        title: "Pultruded FRP section, solid throughout",
        body: "Not a skin over something else — the whole section is rot-proof composite, screw-holds like hardwood.",
      },
      watermark: "FRAMES",
    },
    ticker: [
      "ROT-PROOF · TERMITE-PROOF",
      "STAYS PLUMB FOR LIFE",
      "SCREW-HOLDS LIKE HARDWOOD",
      "FACTORY FINISH OPTIONS",
      "WET-WALL IMMUNE",
      "FITS ALL STANDARD SHUTTERS",
      "BATHROOMS TO MAIN DOORS",
    ],
    features: [
      {
        icon: "bug",
        title: "Termite & Rot Proof",
        lead: "Nothing for them to eat",
        points: [
          "Composite throughout — zero cellulose for termites",
          "Immune to the rot that kills frames at floor level",
          "Ideal for bathrooms, kitchens and coastal sites",
        ],
        note: "ZERO SWELLING AFTER 30-DAY SOAK",
      },
      {
        icon: "shieldcheck",
        title: "Waterproof & Stable",
        lead: "Plumb on day one, plumb in year twenty",
        points: [
          "No swelling, no warping, no seasonal sticking doors",
          "Dimensionally stable from 0 °C to 60 °C",
          "Wet-wall and plaster contact cause no harm",
        ],
        note: "MOISTURE ABSORPTION < 0.5%",
      },
      {
        icon: "trowel",
        title: "Factory Finished",
        lead: "Hang the shutter, you're done",
        points: [
          "Moulded-in woodgrain or paint-ready surfaces",
          "Pre-drilled hinge and lock positions on request",
          "Matches FRP, WPC, flush and wooden shutters",
        ],
        note: "LEAD TIME: 7–10 DAYS",
      },
    ],
    applications: [
      { icon: "home", title: "Homes & Apartments", desc: "Main doors to bathrooms — one frame material for the whole home.", chip: "FULL-HOME FRAMES" },
      { icon: "cross", title: "Hospitals & Labs", desc: "Hygienic, washable frames for wet and sterile zones.", chip: "WET & STERILE ZONES" },
      { icon: "waves", title: "Coastal Projects", desc: "Salt air eats steel and wood; FRP doesn't notice.", chip: "SALT-AIR IMMUNE" },
      { icon: "factory", title: "Institutions & Industry", desc: "High-traffic frames for hostels, factories and offices.", chip: "HEAVY TRAFFIC" },
    ],
    familyLabel: "FRP DOOR FRAME",
    familyDim: "800 × 2100 MM TYP.",
    showcaseCols: "2/3/4",
    showcase: [
      {
        variant: "standard",
        code: "BSP-DF-01",
        name: "Standard Frame",
        tag: "BEST SELLER",
        dimLabel: "800 × 2100 MM",
        desc: "The everyday 4-inch frame for single shutters — pre-drilled, plug-ready and paint-ready.",
        specs: ["4\" × 3\" section", "Pre-drilled hinge points", "All standard shutter sizes"],
      },
      {
        variant: "arched",
        code: "BSP-DF-02",
        name: "Arched Frame",
        dimLabel: "ARCH R 400–600 MM",
        desc: "A moulded arched head for entrances and pooja rooms — no site-bent sections, ever.",
        specs: ["Radius 400–600 mm", "One-piece arched head", "Fanlight option"],
      },
      {
        variant: "french",
        code: "BSP-DF-03",
        name: "French (Double) Frame",
        tag: "TRENDING",
        dimLabel: "1500 × 2100 MM",
        desc: "Twin-leaf frame with a moulded centre mullion — for balconies, lawns and living rooms.",
        specs: ["Twin-leaf with mullion", "Astragal strip included", "Widths to 1800 mm"],
      },
      {
        variant: "sliding",
        code: "BSP-DF-04",
        name: "Sliding Frame",
        dimLabel: "TRACK 1800–3000 MM",
        desc: "Top-track frame for sliding shutters and wardrobes — smooth running, no floor channel.",
        specs: ["Top-hung track system", "No floor channel", "Widths to 3000 mm"],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE FRAME THAT", "RETIRIES NO ONE."],
      highlight: "FRP FRAME",
      cols: ["WOOD FRAME", "STEEL FRAME", "WPC / ALUMINIUM"],
      rows: [
        { label: "Termites & rot", cells: ["Immune", "Termite food", "Rusts at floor", "OK, but skins peel"] },
        { label: "Water exposure", cells: ["Zero swelling", "Swells & warps", "Rusts", "Core can wick"] },
        { label: "Screw holding", cells: ["Like hardwood", "Good", "Poor on sheet steel", "Varies widely"] },
        { label: "Maintenance", cells: ["Nil", "Seasonal oiling", "Repainting", "Touch-ups"] },
        { label: "Design life", cells: ["30+ years", "10–15 years", "15–20 years", "10–20 years"] },
      ],
      note: "* INDICATIVE VALUES FOR A 4\" × 3\" STANDARD FRAME. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 500000, suffix: "+", label: "Frames supplied" },
      { value: 30, suffix: "+", label: "Years design life" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Frame warranty" },
    ],
    process: {
      kicker: "04 / FROM OPENING TO HUNG DOOR",
      title: ["FOUR STEPS", "TO A PLUMB", "DOOR."],
      intro: "Share the opening schedule from your drawing — frames arrive numbered, pre-drilled and ready to fix.",
      steps: [
        { title: "Send the door schedule", desc: "Opening sizes, shutter types and finish preference — a plan PDF is enough." },
        { title: "Schedule + quote in 24 h", desc: "Per-frame pricing with pre-drilling options and delivery batching." },
        { title: "Pultrude & finish", desc: "Sections pultruded, cut to schedule, numbered and finished at our works." },
        { title: "Fix & hang", desc: "Frames plug-fix into the opening; shutters hang straight with zero planing." },
      ],
      media: "drawing",
      drawingVariant: "standard",
      caption: "STANDARD 4\" × 3\" FRAME · 800 × 2100 MM",
    },
    quote: {
      heading: "TELL US YOUR SCHEDULE.",
      sub: "Share sizes, counts and city — our sales engineer replies with per-frame pricing and a numbered schedule.",
      selects: [
        { label: "FRAME TYPE", options: ["Standard Frame", "Arched Frame", "French (Double) Frame", "Sliding Frame", "Mixed / custom"] },
        { label: "FINISH", options: ["Paint-ready white", "Moulded woodgrain", "Lamination-ready", "Custom colour", "Not sure — advise me"] },
      ],
      qtyLabel: "FRAME COUNT",
      qtyOptions: ["1–10 frames", "10–50 frames", "50–200 frames", "200+ (project supply)"],
    },
  },

  /* ---------------- 10 · FRP RECTANGULAR PLANTERS ---------------- */
  {
    slug: "frp-planters",
    code: "BSP-10",
    family: "FRP",
    name: "FRP Rectangular Planters",
    navLabel: "Planters",
    registerLine: "Selenge & Hudson — featherweight FRP planters for indoors and out.",
    hero: {
      kicker: "PREMIUM FRP LANDSCAPE PRODUCTS",
      lines: [
        { text: "Premium FRP" },
        { text: "Rectangular Planters —", underline: true },
        { text: "Elegant, Durable, Lightweight." },
      ],
      sub: "Modern FRP planters designed to add beauty, greenery and style to any indoor or outdoor space.",
      media: "drawing",
      drawingVariant: "selenge",
      stamp: "DWG NO. BSP-FP-01",
      dimLabel: "SELONGE · 600 × 600 H",
      tag: {
        kicker: "SPEC 10-A · SHELL",
        title: "One-piece moulded shell",
        body: "No seams, no liner, no rusting corners — drainage and feet are moulded in.",
      },
      watermark: "PLANTERS",
    },
    ticker: [
      "TWO MODEL LINES — SELONGE & HUDSON",
      "≈ 6 KG EMPTY — ONE-HAND MOVE",
      "UV-STABLE GELCOAT COLOURS",
      "FROST-PROOF · RUST-IMMUNE",
      "BUILT-IN DRAINAGE + FEET",
      "CUSTOM LENGTHS TO ORDER",
      "INDOOR & OUTDOOR RATED",
    ],
    features: [
      {
        icon: "feather",
        title: "Lightweight & Movable",
        lead: "Reposition it, don't rebuild it",
        points: [
          "≈ 6–8 kg empty — one person moves a planted Selenge",
          "Terrace and balcony safe: a fraction of concrete's load",
          "Moulded-in feet protect floors and allow airflow",
        ],
        note: "1/6TH THE WEIGHT OF CONCRETE",
      },
      {
        icon: "shield",
        title: "Durable in All Weather",
        lead: "Sun, frost and monsoon proof",
        points: [
          "UV-stable gelcoat — colour never chalks or peels",
          "No rust, no rot, no frost cracking, no efflorescence",
          "Tough composite shell shrugs off knocks and trolleys",
        ],
        note: "−20 °C TO +80 °C RATED",
      },
      {
        icon: "dropcross",
        title: "Zero Maintenance",
        lead: "No painting, no sealing",
        points: [
          "Colour is moulded-in — no repaint cycles, ever",
          "Hose it down; stains wipe off the gelcoat skin",
          "Self-draining base keeps soil and roots healthy",
        ],
        note: "WIPE-CLEAN GELCOAT FINISH",
      },
    ],
    applications: [
      { icon: "railing", title: "Balconies & Terraces", desc: "Feather-light greens where floor load is the enemy.", chip: "ROOFTOP SAFE" },
      { icon: "tower", title: "Corporate Lobbies", desc: "Branded planter runs in any RAL colour, moved for events.", chip: "OFFICES" },
      { icon: "keystone", title: "Hotels, Cafés & Retail", desc: "Hard-wearing greenery for entrances, decks and food courts.", chip: "HOSPITALITY" },
      { icon: "home", title: "Residential Entrances", desc: "Framing for porches, driveways and courtyard gardens.", chip: "HOMES" },
    ],
    familyLabel: "FRP PLANTER",
    familyDim: "SELONGE & HUDSON",
    showcaseCols: "2/3",
    showcase: [
      {
        variant: "selenge",
        code: "BSP-FP-01",
        name: "Selenge",
        tag: "BEST SELLER",
        dimLabel: "600 × 300 × 600 H MM",
        desc: "The tall, slim modernist — a crisp tapered box with a shadow-gap base. Pairs beautifully in runs along railings, walkways and window walls.",
        specs: [
          "600 × 300 × 600 h mm",
          "≈ 6 kg empty · 42 L soil",
          "Tapered wall, shadow-gap base",
          "Moulded-in drainage + feet",
        ],
      },
      {
        variant: "hudson",
        code: "BSP-FP-02",
        name: "Hudson",
        tag: "WIDE PROFILE",
        dimLabel: "900 × 350 × 450 H MM",
        desc: "The low, generous one — a lipped wide box for shrubs and statement plants. Doubles as a soft green divider in open plans and decks.",
        specs: [
          "900 × 350 × 450 h mm",
          "≈ 8 kg empty · 68 L soil",
          "Rolled lip rim detail",
          "Concealed recessed base",
        ],
      },
    ],
    comparison: {
      kicker: "02 / WHY SWITCH",
      title: ["THE PLANTER THAT", "STAYS NEW."],
      highlight: "FRP PLANTER",
      cols: ["CONCRETE", "TERRACOTTA", "MS METAL"],
      rows: [
        { label: "Empty weight", cells: ["6–8 kg", "60–90 kg", "25–35 kg", "8–12 kg"] },
        { label: "Cracking & frost", cells: ["Never cracks", "Spalls in frost", "Crazes & chips", "Fine — but rusts"] },
        { label: "Finish life", cells: ["Gelcoat, fade-proof", "Stains & salts", "Glaze crazes", "Paint flakes yearly"] },
        { label: "Moving it planted", cells: ["One person", "Four people + risk", "Two people", "Dents on handling"] },
        { label: "Design life", cells: ["20+ years", "10–15 years", "5–8 years", "8–10 years"] },
      ],
      note: "* INDICATIVE VALUES FOR A 900 MM RECTANGULAR PLANTER. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 25000, suffix: "+", label: "Planters delivered" },
      { value: 40, suffix: "+", label: "Colours & sizes" },
      { value: 18, suffix: "", label: "States served pan-India" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "04 / FROM IDEA TO PLANTED",
      title: ["FOUR STEPS", "TO GREENER", "SPACES."],
      intro: "Send a count and a colour — or just a photo of the space. We match model, size and finish, and deliver ready to plant.",
      steps: [
        { title: "Pick model & sizes", desc: "Selenge, Hudson, or both in a run — share counts, colours and indoor/outdoor use." },
        { title: "Quote + samples in 24 h", desc: "Per-unit pricing with colour chips; custom lengths quoted the same day." },
        { title: "Mould & gelcoat", desc: "One-piece FRP shells with moulded-in colour, drainage and feet — cured at our Taloja works." },
        { title: "Deliver ready to plant", desc: "Bubble-wrapped, palletised, pan-India. Fill, plant, done — no curing, no sealing." },
      ],
      media: "drawing",
      drawingVariant: "hudson",
      caption: "HUDSON · 900 MM TYPICAL",
    },
    quote: {
      heading: "TELL US YOUR SPACE.",
      sub: "Share model, counts and city — our sales engineer replies with pricing and colour samples.",
      selects: [
        { label: "MODEL", options: ["Selenge", "Hudson", "Selenge + Hudson mix", "Custom size"] },
        { label: "COLOUR / FINISH", options: ["Matte black", "Stone grey", "Terracotta tone", "Any RAL colour", "Not sure — send samples"] },
      ],
      qtyLabel: "UNIT COUNT",
      qtyOptions: ["1–10 units", "10–50 units", "50–200 units", "200+ (project supply)"],
    },
  },

  /* ---------------- 11 · FRP SQUARE PLANTERS (MONTROY CUBE) ---------------- */
  {
    slug: "frp-square-planters",
    code: "BSP-11",
    family: "FRP",
    name: "FRP Square Planters",
    navLabel: "Square Planters",
    registerLine: "Montroy Cube — one profile in five sizes, 16″ to 40″.",
    hero: {
      kicker: "PREMIUM FRP LANDSCAPE PRODUCTS",
      lines: [
        { text: "Premium FRP" },
        { text: "Square Planter —", underline: true },
        { text: "Modern, Durable, Elegant." },
      ],
      sub: "Stylish square planters that blend functionality with contemporary design to enhance any space.",
      media: "drawing",
      drawingVariant: "montroy",
      stamp: "DWG NO. BSP-FP-03",
      dimLabel: "SIZE RUN · 16–40 IN",
      tag: {
        kicker: "SPEC 11-A · PROFILE",
        title: "One mould, five sizes",
        body: "The Montroy profile is drawn once, then scaled to 16, 20, 24, 30 and 40 inches — a family, not five products.",
      },
      watermark: "CUBES",
    },
    ticker: [
      "MONTROY CUBE · 16″–40″",
      "5 SIZES, ONE PROFILE",
      "≈ 3–14 KG EMPTY",
      "UV-STABLE GELCOAT COLOURS",
      "STACKS FLAT WHEN EMPTY",
      "BUILT-IN DRAINAGE SUMP",
      "INDOOR & OUTDOOR RATED",
    ],
    features: [
      {
        icon: "feather",
        title: "Feather-Light Cube",
        lead: "A 40″ cube still weighs just 14 kg",
        points: [
          "16″ starts at ≈ 3 kg — carry it planted",
          "Roof, balcony and podium safe at every size",
          "Moulded-in feet keep floors dry and level",
        ],
        note: "1/6TH THE WEIGHT OF CONCRETE",
      },
      {
        icon: "shield",
        title: "Durable in All Weather",
        lead: "Modern outside, engineered inside",
        points: [
          "UV-stable gelcoat — colour never chalks or fades",
          "No rust, no rot, no frost cracking, no staining",
          "Composite shell shrugs off knocks and trolleys",
        ],
        note: "−20 °C TO +80 °C RATED",
      },
      {
        icon: "dropcross",
        title: "Elegant & Maintenance-Free",
        lead: "The finish is the structure",
        points: [
          "Colour moulded in — no painting, no sealing",
          "Sharp, shadow-gap lines stay crisp for decades",
          "Hose it down; the gelcoat wipes clean",
        ],
        note: "40+ COLOURS & FINISHES",
      },
    ],
    sizer: {
      kicker: "02 / THE SIZE RUN",
      lines: ["ONE CUBE.", "FIVE SIZES."],
      intro: "Pick a size and watch the Montroy Cube scale. Every cube keeps the same profile, lip and shadow-gap base — so sizes mix into clean modular runs.",
    },
    applications: [
      { icon: "railing", title: "Balconies & Terraces", desc: "Feather-light cubes where floor load is the enemy.", chip: "ROOFTOP SAFE" },
      { icon: "tower", title: "Corporate Lobbies", desc: "Branded cube runs in any RAL colour, moved for events.", chip: "OFFICES" },
      { icon: "keystone", title: "Hotels, Cafés & Retail", desc: "Hard-wearing greens for entrances, decks and food courts.", chip: "HOSPITALITY" },
      { icon: "grid", title: "Modular Runs & Screens", desc: "Line cubes up as hedges, privacy screens and wayfinding greens.", chip: "MODULE SYSTEM" },
    ],
    familyLabel: "MONTROY CUBE",
    familyDim: "16–40 IN",
    showcaseCols: "2/3/5",
    showcase: [
      {
        variant: "m16",
        code: "BSP-FP-03A",
        name: "Montroy Cube 16″",
        tag: "COMPACT",
        dimLabel: "400 × 400 H MM",
        desc: "The entry cube — windowsills, desks, café tables and step runs of green.",
        specs: ["400 mm square", "≈ 3 kg · 25 L soil", "Herbs & succulents"],
      },
      {
        variant: "m20",
        code: "BSP-FP-03B",
        name: "Montroy Cube 20″",
        dimLabel: "500 × 500 H MM",
        desc: "The balcony standard — seasonal flowers and compact evergreens.",
        specs: ["500 mm square", "≈ 5 kg · 45 L soil", "Seasonal planting"],
      },
      {
        variant: "m24",
        code: "BSP-FP-03C",
        name: "Montroy Cube 24″",
        tag: "BEST SELLER",
        dimLabel: "600 × 600 H MM",
        desc: "The all-rounder — porches, lobbies and long hedge lines.",
        specs: ["600 mm square", "≈ 7 kg · 80 L soil", "All-rounder greens"],
      },
      {
        variant: "m30",
        code: "BSP-FP-03D",
        name: "Montroy Cube 30″",
        dimLabel: "750 × 750 H MM",
        desc: "The statement cube — entrances, palms and sculptural planting.",
        specs: ["750 mm square", "≈ 10 kg · 150 L soil", "Palms & statements"],
      },
      {
        variant: "m40",
        code: "BSP-FP-03E",
        name: "Montroy Cube 40″",
        tag: "GRANDEST",
        dimLabel: "1000 × 1000 H MM",
        desc: "The anchor cube — small trees, feature corners and courtyards.",
        specs: ["1000 mm square", "≈ 14 kg · 330 L soil", "Small trees"],
      },
    ],
    comparison: {
      kicker: "05 / WHY SWITCH",
      title: ["THE CUBE THAT", "OUTLASTS THE REST."],
      highlight: "FRP CUBE",
      cols: ["CONCRETE CUBE", "TERRACOTTA", "MS METAL BOX"],
      rows: [
        { label: "24″ cube weight", cells: ["≈ 7 kg empty", "≈ 45 kg", "≈ 25 kg — cracks", "≈ 12 kg — rusts"] },
        { label: "Frost & sun", cells: ["UV gelcoat, frost-proof", "Spalls & stains", "Cracks in frost", "Bakes roots, rusts"] },
        { label: "Finish life", cells: ["Moulded-in, 25+ yrs", "Paint peels", "Glaze crazes", "Repaint yearly"] },
        { label: "Move it planted", cells: ["One person", "Two people + a trolley", "Risk of shatter", "Dents on edges"] },
        { label: "Drainage", cells: ["Moulded sump + feet", "Drill yourself", "Single hole", "Rusts at the hole"] },
      ],
      note: "* INDICATIVE VALUES FOR A 600 MM (24″) CUBE. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 15000, suffix: "+", label: "Montroy cubes shipped" },
      { value: 5, suffix: "", label: "Sizes · 16–40 in" },
      { value: 40, suffix: "+", label: "Colours & finishes" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "06 / FROM IDEA TO PLANTED",
      title: ["FOUR STEPS", "TO YOUR", "CUBE RUN."],
      intro: "Send sizes and a colour — or just a photo of the space. We match the run, quote per cube and deliver ready to plant.",
      steps: [
        { title: "Pick sizes & colour", desc: "Mix the five Montroy sizes freely; share counts, colour and indoor/outdoor use." },
        { title: "Quote + chips in 24 h", desc: "Per-cube pricing with colour chips; mixed-run discounts quoted the same day." },
        { title: "Mould & gelcoat", desc: "One-piece FRP shells with moulded-in colour, drainage sump and feet." },
        { title: "Deliver ready to plant", desc: "Bubble-wrapped, palletised, pan-India. Fill, plant, done — no curing, no sealing." },
      ],
      media: "drawing",
      drawingVariant: "montroy",
      caption: "MONTROY CUBE · SIZE RUN 16–40 IN",
    },
    quote: {
      heading: "TELL US YOUR RUN.",
      sub: "Share sizes, counts and city — our sales engineer replies with per-cube pricing and colour samples.",
      selects: [
        { label: "CUBE SIZE", options: ["24″ (600 mm)", "16″ (400 mm)", "20″ (500 mm)", "30″ (750 mm)", "40″ (1000 mm)", "Mixed size run"] },
        { label: "COLOUR / FINISH", options: ["Matte black", "Stone grey", "Terracotta tone", "Any RAL colour", "Not sure — send samples"] },
      ],
      qtyLabel: "CUBE COUNT",
      qtyOptions: ["1–10 cubes", "10–50 cubes", "50–200 cubes", "200+ (project supply)"],
    },
  },

  /* ---------------- 12 · FRP VERTICAL CYLINDER PLANTERS (RIO GRANDE & CORRY) ---------------- */
  {
    slug: "frp-cylinder-planters",
    code: "BSP-12",
    family: "FRP",
    name: "FRP Vertical Cylinder Planters",
    navLabel: "Cylinder Planters",
    registerLine: "Rio Grande & Corry — true-cylinder FRP planters, wide or tall.",
    hero: {
      kicker: "PREMIUM FRP LANDSCAPE PRODUCTS",
      lines: [
        { text: "FRP Vertical" },
        { text: "Cylinder Planters —", underline: true },
        { text: "Modern. Durable. Elegant." },
      ],
      sub: "Sleek cylindrical planters that add a touch of sophistication to any indoor or outdoor space.",
      media: "drawing",
      drawingVariant: "cylpair",
      stamp: "DWG NO. BSP-FP-05",
      dimLabel: "RIO GRANDE & CORRY · TO SCALE",
      tag: {
        kicker: "SPEC 12-A · FORM",
        title: "Two silhouettes, one geometry",
        body: "Wide and low, or tall and sleek — both turned on the same true-cylinder axis with an identical rim detail.",
      },
      watermark: "CYLINDERS",
    },
    ticker: [
      "RIO GRANDE · WIDE CYLINDER",
      "CORRY · TALL & SLEEK",
      "≈ 5–6 KG EMPTY",
      "UV-STABLE GELCOAT",
      "BUILT-IN DRAINAGE SUMP",
      "FROST & RUST IMMUNE",
      "INDOOR & OUTDOOR RATED",
    ],
    features: [
      {
        icon: "compass",
        title: "Precision Cylinder Form",
        lead: "Turned, not folded",
        points: [
          "True-cylinder moulds — the rim line stays dead straight for years",
          "Seamless one-piece shell: no welds, folds or seam marks",
          "Architectural Ø-to-height proportions on both silhouettes",
        ],
        note: "TRUE-CYLINDER MOULD",
      },
      {
        icon: "shield",
        title: "Durable in All Weather",
        lead: "Modern outside, engineered inside",
        points: [
          "UV-stable gelcoat — colour never chalks, fades or peels",
          "No rust, no rot, no frost cracking, no staining",
          "Composite shell shrugs off knocks, trolleys and weather",
        ],
        note: "−20 °C TO +80 °C RATED",
      },
      {
        icon: "dropcross",
        title: "Elegant & Easy Care",
        lead: "Sophistication that wipes clean",
        points: [
          "Colour moulded in — no painting, no sealing, ever",
          "Hose it down or wipe; the gelcoat skin repels stains",
          "Self-draining sump keeps soil and roots healthy",
        ],
        note: "40+ COLOURS & FINISHES",
      },
    ],
    study: {
      kicker: "02 / PROPORTION STUDY",
      lines: ["WIDE OR TALL.", "SAME DNA."],
      intro: "Click a silhouette — or use the buttons — and read its proportions. Both cylinders share the same rim detail, gelcoat skin and shadow-gap base, so they pair cleanly in a single scheme.",
    },
    applications: [
      { icon: "railing", title: "Balconies & Pool Decks", desc: "Feather-light cylinders safe on edges and rooftop slabs.", chip: "ROOFTOP SAFE" },
      { icon: "keystone", title: "Hotels & Resorts", desc: "Entry pairs and lobby columns that survive luggage and monsoon.", chip: "HOSPITALITY" },
      { icon: "tower", title: "Corporate Lobbies", desc: "Branded colour runs for atriums, boardrooms and receptions.", chip: "OFFICES" },
      { icon: "home", title: "Restaurants & Cafés", desc: "Warm greens for decks, counters and courtyard seating.", chip: "F&B" },
    ],
    familyLabel: "FRP CYLINDER",
    familyDim: "RIO & CORRY",
    showcaseCols: "2/3",
    showcase: [
      {
        variant: "rio",
        code: "BSP-FP-05A",
        name: "Rio Grande",
        tag: "CLASSIC WIDE",
        dimLabel: "Ø 450 × H 400 MM",
        desc: "The classic wide cylinder — a generous rim and a low, grounded stance for wide-canopy planting and paired entries.",
        specs: ["Ø 450 × H 400 mm", "≈ 5.5 kg · 47 L soil", "Wide-canopy greens"],
      },
      {
        variant: "corry",
        code: "BSP-FP-05B",
        name: "Corry",
        tag: "TALL & SLEEK",
        dimLabel: "Ø 300 × H 900 MM",
        desc: "Tall and sleek — a slim vertical that draws the eye up, made for palms, grasses and privacy columns.",
        specs: ["Ø 300 × H 900 mm", "≈ 6 kg · 52 L soil", "Palms & grasses"],
      },
    ],
    comparison: {
      kicker: "05 / WHY SWITCH",
      title: ["THE CYLINDER THAT", "STAYS TRUE."],
      highlight: "FRP CYLINDER",
      cols: ["TERRACOTTA", "FIBRECLAY", "MS METAL"],
      rows: [
        { label: "Ø 450 cylinder, empty", cells: ["≈ 5.5 kg", "≈ 18 kg", "≈ 9 kg — warps", "≈ 8 kg — rusts"] },
        { label: "Frost & sun", cells: ["UV gelcoat, frost-proof", "Cracks in frost", "Coat flakes off", "Bakes roots, rusts"] },
        { label: "Shape integrity", cells: ["Mould stays true", "Wobbles on kiln warp", "Rim chips easily", "Dents show"] },
        { label: "Finish life", cells: ["Moulded-in, 25+ yrs", "Glaze crazes", "Repaint the coat", "Repaint yearly"] },
        { label: "Move it planted", cells: ["One person", "Two people", "Chips on edges", "Dents on edges"] },
      ],
      note: "* INDICATIVE VALUES FOR A 450 MM CYLINDER. TEST REPORTS AVAILABLE ON REQUEST.",
    },
    stats: [
      { value: 12000, suffix: "+", label: "Cylinders shipped" },
      { value: 2, suffix: "", label: "Silhouettes — Rio & Corry" },
      { value: 40, suffix: "+", label: "Colours & finishes" },
      { value: 10, suffix: "-YR", label: "Structural warranty" },
    ],
    process: {
      kicker: "06 / FROM IDEA TO PLANTED",
      title: ["FOUR STEPS", "TO SLEEK", "GREENS."],
      intro: "Tell us Rio, Corry or both — with counts and a colour. We quote per cylinder and deliver ready to plant.",
      steps: [
        { title: "Pick silhouettes & colour", desc: "Rio Grande, Corry or a mixed run; share counts, colour and indoor/outdoor use." },
        { title: "Quote + chips in 24 h", desc: "Per-cylinder pricing with colour chips; mixed-run discounts quoted the same day." },
        { title: "Turn & gelcoat", desc: "One-piece shells turned on true-cylinder moulds, gelcoat-finished with sump and feet." },
        { title: "Deliver ready to plant", desc: "Bubble-wrapped, palletised, pan-India. Fill, plant, done — no curing, no sealing." },
      ],
      media: "drawing",
      drawingVariant: "rio",
      caption: "RIO GRANDE · Ø 450 MM TYPICAL",
    },
    quote: {
      heading: "TELL US YOUR RUN.",
      sub: "Share silhouettes, counts and city — our sales engineer replies with per-cylinder pricing and colour samples.",
      selects: [
        { label: "MODEL", options: ["Rio Grande", "Corry", "Rio + Corry mix", "Custom diameter"] },
        { label: "COLOUR / FINISH", options: ["Matte black", "Stone grey", "Terracotta tone", "Any RAL colour", "Not sure — send samples"] },
      ],
      qtyLabel: "CYLINDER COUNT",
      qtyOptions: ["1–10 cylinders", "10–50 cylinders", "50–200 cylinders", "200+ (project supply)"],
    },
  },
];

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
