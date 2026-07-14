import { localTestProfiles } from "@/stubs/local-test-profiles";
import type { CatReport } from "@/types/cat-report";

function hashString(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function personalizeReport(base: CatReport, uri: string): CatReport {
  const hash = hashString(uri);
  const presentationHints = [
    "The pose reads patient and composed.",
    "The face suggests a curious cat with good environmental awareness.",
    "The body language hints at a cat that likes to observe before acting."
  ];
  const careBonus = [
    "Take a few photos in different lighting before you later compare paid-model results.",
    "Save a side-profile shot too if you want a better future breed-comparison pass.",
    "Keep notes on coat texture and vocal habits so future analysis has extra context."
  ];

  return {
    ...base,
    visualSummary: `${base.visualSummary} ${presentationHints[hash % presentationHints.length]}`,
    careTips: [...base.careTips, careBonus[hash % careBonus.length]]
  };
}

export async function analyzeWithLocalTest(uri: string): Promise<CatReport> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const profile = localTestProfiles[hashString(uri) % localTestProfiles.length];
  return personalizeReport(profile.report, uri);
}
