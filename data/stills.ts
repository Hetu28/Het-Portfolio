import { ProjectStill } from "@/data/projects";

export interface StillItem {
  id: string;
  title: string;
  category: string;
  categories: string[];
  description: string;
  tags: string[];
  image: string;
  fullImage: string;
  isPortrait?: boolean;
  aspectRatio?: string;
  camera?: string;
  stills?: ProjectStill[];
}

export interface StillCategoryFilter {
  id: string;
  label: string;
}

export const stillsCategories: StillCategoryFilter[] = [
  { id: "all", label: "All Stills" },
  { id: "portrait", label: "Portraits" },
  { id: "editorial", label: "Editorial" },
  { id: "travel", label: "Travel & Street" },
  { id: "cinematography", label: "Cinematography" },
  { id: "architecture", label: "Architecture" },
];

export const allStillsList: StillItem[] = [
  // =========================================================================
  // ROW 1: PORTRAIT PAIR (Festive Radiance & Fashion Editorial Multi-Lookbooks)
  // =========================================================================
  {
    id: "festive-radiance",
    title: "FESTIVE RADIANCE",
    category: "Festive Editorial • Portrait",
    categories: ["portrait", "editorial"],
    description: "Candid traditional festive portrait capturing a gentle smile illuminated by the warm flame of a handheld clay diya, framed with intricate gold lehenga embroidery and heritage jewelry.",
    tags: ["FESTIVE EDITORIAL", "TRADITIONAL LOOKBOOK", "CANDID PORTRAIT", "NATURAL LIGHT"],
    image: "/images/festive-radiance/festive-01.jpg",
    fullImage: "/images/festive-radiance/festive-01.jpg",
    isPortrait: true,
    camera: "Sony FX3 · 85mm Prime",
    stills: [
      {
        id: "festive-01",
        url: "/images/festive-radiance/festive-01.jpg",
        title: "LOOK 01 — THE WARM FLAME & SMILE",
        caption: "Candid traditional festive portrait capturing a gentle smile illuminated by the warm flame of a handheld clay diya, framed with intricate gold lehenga embroidery and heritage jewelry.",
        lighting: "Clay Diya Flame & Natural Ambient Window Daylight",
        aspect: "portrait",
      },
      {
        id: "festive-02",
        url: "/images/festive-radiance/festive-02.jpg",
        title: "LOOK 02 — FAIRY LIGHT ILLUMINATION",
        caption: "Playful festive framing with warm micro-LED practical fairy lights weaving specular bokeh across embroidered sleeves.",
        lighting: "Warm Micro-LED Practicals & Soft Window Fill",
        aspect: "portrait",
      },
      {
        id: "festive-03",
        url: "/images/festive-radiance/festive-03.jpg",
        title: "LOOK 03 — CANDID STRING LIGHT STUDY",
        caption: "Intimate composition exploring tactile silk fabric textures and sparkling string light reflections.",
        lighting: "Fairy Light Practicals & Diffused Ambient Daylight",
        aspect: "portrait",
      },
      {
        id: "festive-04",
        url: "/images/festive-radiance/festive-04.jpg",
        title: "LOOK 04 — SEATED DIYA HARMONY",
        caption: "Full environmental portrait capturing graceful traditional seating posture, intricate jewelry sets, and peaceful festive aura.",
        lighting: "Palm Diya Flame & Soft Side Light",
        aspect: "portrait",
      },
      {
        id: "festive-05",
        url: "/images/festive-radiance/festive-05.jpg",
        title: "LOOK 05 — SERENE FESTIVE GAZE",
        caption: "Medium framing focusing on maang tikka, braided hair detailing, and delicate traditional gold embroidery.",
        lighting: "Gentle Natural Daylight & Warm Flame Fill",
        aspect: "portrait",
      },
      {
        id: "festive-06",
        url: "/images/festive-radiance/festive-06.jpg",
        title: "LOOK 06 — JOYFUL CLOSE-UP RADIANCE",
        caption: "Close-up character study filled with genuine joy, warm skin tones, and bright specular catchlights from the clay flame.",
        lighting: "Single Diya Flame Key Light",
        aspect: "portrait",
      },
      {
        id: "festive-07",
        url: "/images/festive-radiance/festive-07.jpg",
        title: "LOOK 07 — THE HERITAGE PORTRAIT",
        caption: "Closing traditional lookbook frame honoring Indian cultural heritage, craftsmanship, and timeless festive warmth.",
        lighting: "Diffused Ambient & Soft Natural Kicker",
        aspect: "portrait",
      },
    ],
  },
  {
    id: "fashion-editorial",
    title: "FASHION EDITORIAL",
    category: "Studio Editorial • Lookbook",
    categories: ["editorial", "portrait"],
    description: "High-end studio fashion lookbook session capturing garment texture, floral daisy sequin embroidery, and dynamic editorial posing on Sony FX3.",
    tags: ["STUDIO LOOKBOOK", "SONY FX3", "FASHION", "LIGHTING"],
    image: "/images/fashion-editorial/fashion-01.jpg",
    fullImage: "/images/fashion-editorial/fashion-01.jpg",
    isPortrait: true,
    camera: "Sony FX3 · Studio Strobes",
    stills: [
      {
        id: "fashion-01",
        url: "/images/fashion-editorial/fashion-01.jpg",
        title: "LOOK 01 — DAISY SEQUIN COCKTAIL DRESS",
        caption: "High-end studio fashion lookbook session capturing garment texture, floral daisy sequin embroidery, and dynamic editorial posing on Sony FX3.",
        lighting: "Key Beauty Dish & Rim Strobes",
        aspect: "portrait",
      },
      {
        id: "fashion-02",
        url: "/images/fashion-editorial/fashion-02.jpg",
        title: "LOOK 02 — ARCHITECTURAL SILHOUETTE",
        caption: "Full-length editorial framing highlighting garment draping, stiletto heels, and sculpted clean studio backdrop falloff.",
        lighting: "Overhead Softbox & Fill Diffuser",
        aspect: "portrait",
      },
      {
        id: "fashion-03",
        url: "/images/fashion-editorial/fashion-03.jpg",
        title: "LOOK 03 — SUNSET COPPER ASYMMETRY",
        caption: "Rich copper metallic satin one-shoulder mini dress adorned with hand-embellished crystal paillettes under controlled directional lighting.",
        lighting: "High-Angle Key & Subtle Kicker",
        aspect: "portrait",
      },
      {
        id: "fashion-04",
        url: "/images/fashion-editorial/fashion-04.jpg",
        title: "LOOK 04 — SCULPTED TEXTURE & GAZE",
        caption: "Expressive beauty portrait capturing specular catchlights in hair and eyes, emphasizing warm bronze dress tones.",
        lighting: "Studio Strobe with Octabox Diffuser",
        aspect: "portrait",
      },
      {
        id: "fashion-05",
        url: "/images/fashion-editorial/fashion-05.jpg",
        title: "LOOK 05 — REFLECTIVE ELEGANCE",
        caption: "Intimate half-profile framing capturing delicate sequin gradients and soft skin tones on Sony FX3.",
        lighting: "Feathered Softbox & Silver Reflector",
        aspect: "portrait",
      },
      {
        id: "fashion-06",
        url: "/images/fashion-editorial/fashion-06.jpg",
        title: "LOOK 06 — NOIR SILK & PEARL BUSTIER",
        caption: "Regal studio portrait showcasing pearl and rhinestone embellishments across the neckline of an obsidian silk slip dress.",
        lighting: "Neutral Studio Key & Rim Light",
        aspect: "portrait",
      },
      {
        id: "fashion-07",
        url: "/images/fashion-editorial/fashion-07.jpg",
        title: "LOOK 07 — RADIANT MINIMALISM",
        caption: "Close study of hand-stitched crystal detailing with warm expression and gentle shadow roll-off.",
        lighting: "Diffused Key & Negative Fill",
        aspect: "portrait",
      },
      {
        id: "fashion-08",
        url: "/images/fashion-editorial/fashion-08.jpg",
        title: "LOOK 08 — POISED FULL-LENGTH LOOKBOOK",
        caption: "Balanced editorial composition capturing complete ensemble proportions and clean seamless studio cove.",
        lighting: "Twin Strip Softboxes & Floor Fill",
        aspect: "portrait",
      },
      {
        id: "fashion-09",
        url: "/images/fashion-editorial/fashion-09.jpg",
        title: "LOOK 09 — THE FINAL EDITORIAL FRAME",
        caption: "Closing editorial frame combining tactile silk texture, intricate jewel work, and timeless fashion photography aesthetic.",
        lighting: "Directional Key & Ambient Studio Wash",
        aspect: "portrait",
      },
    ],
  },

  // =========================================================================
  // ROW 2: LANDSCAPE PAIR (Travel Cinema & Candid Frame)
  // =========================================================================
  {
    id: "travel-cinema",
    title: "TRAVEL CINEMA",
    category: "Travel & Heritage • Architecture",
    categories: ["travel", "cinematography", "architecture"],
    description: "Panoramic golden sunset over sacred architectural palace waters with morning mist, soft light diffusion, and reflective symmetry.",
    tags: ["TRAVEL CINEMA", "ARCHITECTURE", "SUNSET"],
    image: "/images/masonry-raw-capture.jpg",
    fullImage: "/images/source/source-raw-capture.jpg",
    camera: "Sony FX3 · Natural Dawn Ambient",
  },
  {
    id: "candid-frame",
    title: "CANDID FRAME",
    category: "Street Study • Observational",
    categories: ["portrait", "travel"],
    description: "Observational candid composition capturing quiet conversation on a park bench under natural daylight and palm trees.",
    tags: ["CANDID", "NATURAL LIGHT", "STREET STUDY", "CINEMATOGRAPHY"],
    image: "/images/masonry-bench-conversation.jpg",
    fullImage: "/images/source/source-bench-conversation.jpg",
    camera: "Telephoto Prime · Natural Sunlight",
  },

  // =========================================================================
  // ROW 3: LANDSCAPE PAIR (Urban Monoliths Case Study & South Mumbai Heritage)
  // =========================================================================
  {
    id: "urban-monoliths",
    title: "OVERCAST CRANE & URBAN MONOLITHS",
    category: "Architecture • Urban Monoliths",
    categories: ["architecture", "cinematography", "travel"],
    description: "A comprehensive architectural cinematography series exploring Mumbai's towering modern monolithic high-rises, construction cranes, and raw concrete skeletons under monsoon overcast skies.",
    tags: ["CANON EOS", "MUMBAI ARCHITECTURE", "MONOLITHS", "CINEMATOGRAPHY"],
    image: "/images/stills/landscape-1.jpg",
    fullImage: "/images/stills/landscape-1.jpg",
    camera: "Canon EOS Cinema · Prime Glass",
    stills: [
      {
        id: "monoliths-01",
        url: "/images/stills/landscape-1.jpg",
        title: "FRAME 01 — MONOLITHIC RESIDENCES UNDER STORM CLOUDS",
        caption: "Symmetrical telephoto study of towering residential skyscrapers contrasting with low-hanging monsoon storm clouds.",
        lighting: "Low-Hanging Monsoon Clouds & Ambient Grey Light",
        aspect: "wide",
      },
      {
        id: "monoliths-02",
        url: "/images/stills/landscape-2.jpg",
        title: "FRAME 02 — OVERCAST CRANE & RISING MONOLITHS",
        caption: "Muted overcast study of tower cranes and concrete skeletons transforming the dense vertical skyline of contemporary Mumbai.",
        lighting: "Diffused Monsoon Overcast Sky",
        aspect: "wide",
      },
      {
        id: "monoliths-03",
        url: "/images/stills/landscape-3.jpg",
        title: "FRAME 03 — RAW CONCRETE SKELETON",
        caption: "Intimate architectural detail of the upper concrete crown, rebar pillars, and green safety netting of a high-rise tower under grey mist.",
        lighting: "Soft Diffused Natural Mist",
        aspect: "wide",
      },
    ],
  },
  {
    id: "south-mumbai-heritage",
    title: "SOUTH MUMBAI HERITAGE ARCHITECTURE",
    category: "Travel & Heritage • Classical Architecture",
    categories: ["travel", "architecture", "cinematography"],
    description: "South Mumbai architectural heritage series capturing the Neo-Gothic spires of Flora Fountain at twilight and the classical carved stone archways of Fort heritage district.",
    tags: ["SOUTH MUMBAI", "FLORA FOUNTAIN", "FORT HERITAGE", "SONY FX30"],
    image: "/images/stills/sony-flora-fountain-dusk.jpg",
    fullImage: "/images/stills/sony-flora-fountain-dusk.jpg",
    camera: "Sony Cinema Line FX30 · Twilight & Morning Ambient",
    stills: [
      {
        id: "heritage-01",
        url: "/images/stills/sony-flora-fountain-dusk.jpg",
        title: "FRAME 01 — FLORA FOUNTAIN AT DUSK",
        caption: "Atmospheric twilight study of South Mumbai's iconic Flora Fountain monument silhouetted against soft evening clouds, Gothic spires, and tropical palm canopies.",
        lighting: "Twilight Ambient & Blue Hour Sky",
        aspect: "wide",
      },
      {
        id: "heritage-02",
        url: "/images/stills/sony-fort-heritage-architecture.jpg",
        title: "FRAME 02 — FORT HERITAGE ARCHITECTURE",
        caption: "Low-angle architectural perspective highlighting the classical carved stone arches, Corinthian pilasters, and ornate pediment of the historic Fort heritage district.",
        lighting: "Clean Ambient Morning Daylight",
        aspect: "wide",
      },
    ],
  },

  // =========================================================================
  // ROW 4: LANDSCAPE PAIR (Golden Hour Bokeh & Twilight Birds on Streetlamp)
  // =========================================================================
  {
    id: "sony-bokeh-street-portrait",
    title: "GOLDEN HOUR STREET BOKEH",
    category: "Portrait • Street Candids",
    categories: ["portrait", "cinematography"],
    description: "Cinematic side-profile framing capturing a quiet moment bathed in warm late-afternoon sunlight, accented by soft specular foliage bokeh and gold wrist watch accents.",
    tags: ["GOLDEN HOUR", "NATURAL BOKEH", "STREET PORTRAIT", "SONY FX30"],
    image: "/images/stills/sony-bokeh-street-portrait.jpg",
    fullImage: "/images/stills/sony-bokeh-street-portrait.jpg",
    camera: "Sony Cinema Line FX30 · Prime Glass · Natural Backlight",
  },
  {
    id: "twilight-birds-streetlamp",
    title: "TWILIGHT PERCH ON THE ARTERY",
    category: "Observational • Minimalist Twilight",
    categories: ["travel", "cinematography"],
    description: "Minimalist twilight composition featuring a row of silhouetted birds roosting along the arm of an illuminated streetlamp against deep gradient blue skies.",
    tags: ["MINIMALIST", "TWILIGHT BLUE", "SILHOUETTE", "OBSERVATIONAL"],
    image: "/images/stills/twilight-birds-streetlamp.jpg",
    fullImage: "/images/stills/twilight-birds-streetlamp.jpg",
    camera: "Telephoto Framing · Twilight Ambient",
  },

  // =========================================================================
  // ROW 5: LANDSCAPE PAIR (Monsoon Rickshaw POV & Juhu Beach Sunset)
  // =========================================================================
  {
    id: "monsoon-autorickshaw-pov",
    title: "MONSOON AUTO-RICKSHAW POV",
    category: "Street Study • Cinematic Narrative",
    categories: ["travel", "cinematography"],
    description: "Intimate driver-perspective framing through rain-spotted auto-rickshaw glass overlooking glistening asphalt, monsoon traffic, and dark monsoon storm clouds.",
    tags: ["RICKSHAW POV", "MUMBAI RAINS", "STREET CINEMA", "REFLECTIVE ASPHALT"],
    image: "/images/stills/monsoon-autorickshaw-pov.jpg",
    fullImage: "/images/stills/monsoon-autorickshaw-pov.jpg",
    camera: "Wide Lens · Monsoon Rain Lighting",
  },
  {
    id: "juhu-beach-sunset-reflections",
    title: "JUHU BEACH DUSK HORIZON",
    category: "Travel & Heritage • Twilight Coastline",
    categories: ["travel", "cinematography"],
    description: "Magical twilight beachscape where glowing toy balloon vendors, strolling families, and an amber sunset glow reflect on wet ocean sands.",
    tags: ["JUHU BEACH", "DUSK HORIZON", "STREET LIFE", "COASTAL TWILIGHT"],
    image: "/images/stills/juhu-beach-sunset-reflections.jpg",
    fullImage: "/images/stills/juhu-beach-sunset-reflections.jpg",
    camera: "Ambient Dusk Exposure · Coastal Lighting",
  },

  // =========================================================================
  // ROW 6: LANDSCAPE PAIR (The Window Observer Multi-Look & Katra Alpine Peaks)
  // =========================================================================
  {
    id: "the-window-observer",
    title: "THE WINDOW OBSERVER",
    category: "Cinematography • Narrative Character Study",
    categories: ["portrait", "cinematography"],
    description: "Moody narrative cinematography series capturing contemplative character studies through architectural window geometry and subtle spectacle reflections.",
    tags: ["CANON EOS", "NARRATIVE CINEMA", "WINDOW FRAMING", "CHARACTER STUDY"],
    image: "/images/stills/window-observer-1.jpg",
    fullImage: "/images/stills/window-observer-1.jpg",
    camera: "Canon EOS Cinema · Prime Glass",
    stills: [
      {
        id: "window-01",
        url: "/images/stills/window-observer-1.jpg",
        title: "FRAME 01 — THE WINDOW FRAMING",
        caption: "Moody narrative portrait capturing a young man in round spectacles peering contemplatively out through a clean sliding window frame.",
        aspect: "wide",
      },
      {
        id: "window-02",
        url: "/images/stills/window-observer-2.jpg",
        title: "FRAME 02 — THE INTIMATE PROFILE",
        caption: "Intimate close-up profile highlighting facial contours, spectacle reflections, and contemplative character expression.",
        aspect: "wide",
      },
    ],
  },
  {
    id: "katra-alpine-peaks-morning",
    title: "KATRA ALPINE PEAKS IN MORNING LIGHT",
    category: "Travel & Heritage • Mountain Cinema",
    categories: ["travel", "cinematography"],
    description: "Expansive mountain landscape capturing the rugged limestone ridges and alpine morning shadows surrounding the Himalayan foothills of Katra.",
    tags: ["HIMALAYAN FOOTHILLS", "KATRA", "MOUNTAIN CINEMA", "RUGGED PEAKS"],
    image: "/images/stills/katra-alpine-peaks-morning.jpg",
    fullImage: "/images/stills/katra-alpine-peaks-morning.jpg",
    camera: "Wide Panoramic Perspective · Alpine Morning Light",
  },

  // =========================================================================
  // ROW 7: LANDSCAPE PAIR (Teal Canopy Skyline & Solitary Corridor)
  // =========================================================================
  {
    id: "cinematic-teal-silhouette-canopy",
    title: "TEAL CANOPY SKYLINE",
    category: "Cinematography • Color Study",
    categories: ["cinematography"],
    description: "Atmospheric low-angle silhouette study tracing the intricate, web-like geometry of bare treetop branches fracturing sweeping cloud cover against a rich, moody teal sky.",
    tags: ["TEAL & BLACK", "COLOR STUDY", "ORGANIC FORMS", "CINEMATIC 16:9"],
    image: "/images/stills/cinematic-teal-silhouette-canopy.jpg",
    fullImage: "/images/stills/cinematic-teal-silhouette-canopy.jpg",
    camera: "Cinematic 16:9 Aspect · Stylized Color Grade",
  },
  {
    id: "hospital-corridor-solitude",
    title: "SOLITARY CORRIDOR SUNLIGHT",
    category: "Cinematography • Architectural Light Study",
    categories: ["cinematography", "architecture"],
    description: "Evocative cinematography study of silent waiting chairs along a tiled corridor pierced by diagonal morning sunlight and deep geometric shadows.",
    tags: ["GEOMETRIC SHADOWS", "CORRIDOR STUDY", "CINEMATIC MOOD", "INTERIOR LIGHT"],
    image: "/images/stills/hospital-corridor-solitude.jpg",
    fullImage: "/images/stills/hospital-corridor-solitude.jpg",
    camera: "Linear Perspective · Low-Angle Natural Rays",
  },

  // =========================================================================
  // ROW 8: LANDSCAPE PAIR (Abandoned Hall & Station Overpass Sunset)
  // =========================================================================
  {
    id: "abandoned-hall-sunlight-grids",
    title: "ABANDONED HALL WINDOW GRID BEAMS",
    category: "Cinematography • Architectural Spaces",
    categories: ["cinematography", "architecture"],
    description: "Cavernous empty hall illuminated by dramatic latticed window shadows cast across weathered plaster walls and dusty concrete floors.",
    tags: ["ABANDONED ARCHITECTURE", "WINDOW GRIDS", "LIGHT & SHADOW", "CINEMATIC SPACES"],
    image: "/images/stills/abandoned-hall-sunlight-grids.jpg",
    fullImage: "/images/stills/abandoned-hall-sunlight-grids.jpg",
    camera: "Wide Architectural Angle · Direct Sunlight",
  },
  {
    id: "railway-platform-sunset-palms",
    title: "STATION OVERPASS SUNSET PALMS",
    category: "Street & Urban • Golden Hour Transit",
    categories: ["travel", "cinematography"],
    description: "16:9 sunset panorama from a railway overbridge capturing candy-striped platform roofs, shimmering train tracks, and a lone palm tree against golden clouds.",
    tags: ["SUNSET TRANSIT", "RAILWAY PERSPECTIVE", "GOLDEN CLOUDS", "MUMBAI STREETS"],
    image: "/images/stills/railway-platform-sunset-palms.jpg",
    fullImage: "/images/stills/railway-platform-sunset-palms.jpg",
    camera: "16:9 Framing · Golden Hour Glow",
  },

  // =========================================================================
  // ROW 9: FEATURED MONSOON PORTRAIT
  // =========================================================================
  {
    id: "monsoon-railway-overbridge",
    title: "MONSOON OVERPASS & RAILS",
    category: "Street & Urban • Monsoon Cinema",
    categories: ["travel", "cinematography"],
    description: "Dramatic vertical perspective from an elevated skywalk overlooking rain-soaked suburban rail tracks, commuter platforms, and moody monsoon overcast skies.",
    tags: ["MUMBAI LOCAL", "MONSOON TRACKS", "URBAN OVERPASS", "ATMOSPHERIC"],
    image: "/images/stills/monsoon-railway-overbridge.jpg",
    fullImage: "/images/stills/monsoon-railway-overbridge.jpg",
    isPortrait: true,
    camera: "Overhead Framing · Diffused Monsoon Overcast",
  },
];
