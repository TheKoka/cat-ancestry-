import { ApiError } from "@/services/providers/errors";

export async function uriToDataUrl(uri: string): Promise<string> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new ApiError("Could not load the selected image.", response.status);
  }

  const blob = await response.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(new ApiError("Could not prepare the image for upload.", 0));
    reader.readAsDataURL(blob);
  });
}

export function getBase64FromDataUrl(dataUrl: string): string {
  const parts = dataUrl.split(",", 2);

  if (parts.length < 2 || !parts[1]) {
    throw new ApiError("Could not convert the image into the format the provider needs.", 0);
  }

  return parts[1];
}
