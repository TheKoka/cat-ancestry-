export type AnalysisProvider = "local-test" | "ollama" | "backend";

const rawProvider = process.env.EXPO_PUBLIC_ANALYSIS_PROVIDER;

export const analysisProvider: AnalysisProvider =
  rawProvider === "backend" || rawProvider === "ollama" ? rawProvider : "local-test";

export function getAnalysisModeLabel() {
  if (analysisProvider === "backend") {
    return "Live backend mode";
  }

  if (analysisProvider === "ollama") {
    return "Free open-source Ollama mode";
  }

  return "Free local test mode";
}
