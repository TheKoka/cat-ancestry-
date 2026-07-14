import type { CatReport } from "@/types/cat-report";

export type LocalTestProfile = {
  id: string;
  matchHint: string;
  report: CatReport;
};

export const localTestProfiles: LocalTestProfile[] = [
  {
    id: "sunroom-tabby",
    matchHint: "default mixed tabby profile",
    report: {
      headline: "Velvet Cartographer of the Eastern Sunrooms",
      likelyBreed: "Domestic shorthair with possible British Shorthair and tabby lineage influence",
      confidence: "Moderate",
      originRegion: "Likely mixed lineage with European house-cat roots",
      originStory:
        "This look points less to a single pedigree and more to the long history of adaptable domestic cats that spread through trading ports, farmhouses, and city streets across Europe. The plush coat, rounded face, and balanced proportions hint at generations of companion breeding rather than one strict purebred line.",
      visualSummary:
        "A composed cat with a dense coat, alert eyes, and a settled expression that suggests a sturdy companion type rather than an ultra-specialized show breed.",
      personalityRead:
        "The overall presentation suggests a cat that may be observant first, affectionate on its own terms, and comfortable holding court from the best seat in the room.",
      notableTraits: [
        "Likely a resilient mixed-breed ancestry rather than a narrow purebred profile",
        "Rounded features and coat density may track with companion-bred domestic lines",
        "Balanced body language suggests a calm but curious temperament"
      ],
      careTips: [
        "Use regular brushing if the coat is dense to keep shedding under control",
        "Watch weight and activity levels since sturdy companion cats can become sedentary indoors",
        "Pair puzzle play with vertical climbing spots to support curiosity and confidence"
      ],
      caveat:
        "Local test mode is generating a realistic sample report, not truly analyzing the image. A paid backend or future model provider can replace this without changing the app UI."
    }
  },
  {
    id: "silver-cloud",
    matchHint: "plush gray or blue-cat profile",
    report: {
      headline: "Silver Cloud Keeper of Quiet Parlors",
      likelyBreed: "Domestic mediumhair with possible Russian Blue or Chartreux-style influence",
      confidence: "Low to moderate",
      originRegion: "Mixed domestic lineage with possible Northern or Western European visual influence",
      originStory:
        "The soft blue-gray look evokes breeds that became beloved for dense coats and composed expressions, but most cats with this appearance are mixed-breed descendants of ordinary house cats rather than documented pedigrees. Over generations, those traits can still echo the old working and companion cats of colder climates.",
      visualSummary:
        "A plush-looking cat with a cool-toned coat, calm expression, and sturdy elegance that gives off a classic indoor aristocrat feel.",
      personalityRead:
        "This profile suggests a cat that may be reserved at first, selective with affection, and happiest when it can supervise the room without being rushed.",
      notableTraits: [
        "Dense-looking coat and cooler color palette often read as refined or reserved",
        "Mixed-breed cats can still visually echo famous gray-coated breeds",
        "The face and posture suggest steadiness more than hyperactivity"
      ],
      careTips: [
        "Use interactive play to keep a calm indoor cat mentally engaged",
        "Brush weekly if the coat thickens seasonally",
        "Give the cat elevated observation spots and quiet retreat areas"
      ],
      caveat:
        "Local test mode is generating a realistic sample report, not truly analyzing the image. A paid backend or future model provider can replace this without changing the app UI."
    }
  },
  {
    id: "desert-lantern",
    matchHint: "lean short-haired profile with angular features",
    report: {
      headline: "Desert Lantern of the Courtyard Walls",
      likelyBreed: "Domestic shorthair with possible Oriental, Siamese, or Abyssinian-style influence",
      confidence: "Low to moderate",
      originRegion: "Visual cues loosely associated with North African, Middle Eastern, and Southeast Asian cat lineages",
      originStory:
        "Long before pedigree registries, sleek short-haired cats thrived around ports, courtyards, and trading routes where agility mattered more than paperwork. A lean build and alert look can recall those older landrace cat types, even when the modern cat is simply a mixed household companion.",
      visualSummary:
        "A lighter-framed cat with alert posture, tidy coat, and bright attention that suggests speed, curiosity, and quick pattern recognition.",
      personalityRead:
        "This look often reads as social, clever, and restless in the best way, like a cat that wants both companionship and something to investigate.",
      notableTraits: [
        "Lean body language can visually resemble active, vocal companion breeds",
        "Alert expression often pairs well with high curiosity and environmental awareness",
        "Many mixed-breed cats borrow one or two elegant cues without being a purebred"
      ],
      careTips: [
        "Offer puzzle feeders and climbing routes for mental stimulation",
        "Rotate toys often to keep a curious cat from getting bored",
        "Provide warm lounging spots if the coat is short and fine"
      ],
      caveat:
        "Local test mode is generating a realistic sample report, not truly analyzing the image. A paid backend or future model provider can replace this without changing the app UI."
    }
  }
];
