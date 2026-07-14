import type { CatReport } from "@/types/cat-report";
import { ApiError } from "@/services/providers/errors";
import { getBase64FromDataUrl, uriToDataUrl } from "@/services/providers/image-data";

type OllamaResponse = {
  message?: {
    content?: string;
  };
};

const OLLAMA_URL = process.env.EXPO_PUBLIC_OLLAMA_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.EXPO_PUBLIC_OLLAMA_MODEL || "qwen2.5vl:3b";

const OLLAMA_PROMPT = [
  "You are a careful cat breed and appearance analyst.",
  "Look at the cat photo and return only JSON.",
  "Do not wrap the JSON in markdown fences.",
  "Be honest about uncertainty.",
  "If the cat looks mixed-breed, say so clearly.",
  "Use this exact schema:",
  '{',
  '"headline": "string",',
  '"likelyBreed": "string",',
  '"confidence": "string",',
  '"originRegion": "string",',
  '"originStory": "string",',
  '"visualSummary": "string",',
  '"personalityRead": "string",',
  '"notableTraits": ["string"],',
  '"careTips": ["string"],',
  '"caveat": "string"',
  "}"
].join(" ");

function parseOllamaJson(rawContent: string): CatReport {
  const trimmed = rawContent.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced?.[1] ?? trimmed;

  let parsed: unknown;

  try {
    parsed = JSON.parse(candidate);
  } catch {
    throw new ApiError(
      "The Ollama model responded, but not in the JSON format this app expects. Try a stronger vision model or adjust the prompt later.",
      502
    );
  }

  if (!parsed || typeof parsed !== "object") {
    throw new ApiError("The Ollama model returned an invalid report object.", 502);
  }

  const report = parsed as Partial<CatReport>;

  if (
    typeof report.headline !== "string" ||
    typeof report.likelyBreed !== "string" ||
    typeof report.confidence !== "string" ||
    typeof report.originRegion !== "string" ||
    typeof report.originStory !== "string" ||
    typeof report.visualSummary !== "string" ||
    typeof report.personalityRead !== "string" ||
    !Array.isArray(report.notableTraits) ||
    !Array.isArray(report.careTips) ||
    typeof report.caveat !== "string"
  ) {
    throw new ApiError(
      "The Ollama model response was missing one or more required report fields.",
      502
    );
  }

  return {
    headline: report.headline,
    likelyBreed: report.likelyBreed,
    confidence: report.confidence,
    originRegion: report.originRegion,
    originStory: report.originStory,
    visualSummary: report.visualSummary,
    personalityRead: report.personalityRead,
    notableTraits: report.notableTraits.map(String),
    careTips: report.careTips.map(String),
    caveat: report.caveat
  };
}

export async function analyzeWithOllama(uri: string): Promise<CatReport> {
  const imageDataUrl = await uriToDataUrl(uri);
  const imageBase64 = getBase64FromDataUrl(imageDataUrl);

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        {
          role: "user",
          content: OLLAMA_PROMPT,
          images: [imageBase64]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new ApiError(
      `Ollama request failed with HTTP ${response.status}. Make sure Ollama is running and reachable at ${OLLAMA_URL}.`,
      response.status
    );
  }

  let payload: OllamaResponse;

  try {
    payload = (await response.json()) as OllamaResponse;
  } catch {
    throw new ApiError("Ollama returned an unreadable response.", response.status);
  }

  const content = payload.message?.content;
  if (!content) {
    throw new ApiError("Ollama did not return any report content.", response.status);
  }

  return parseOllamaJson(content);
}
