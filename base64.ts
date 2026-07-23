export function base64Decode(base64: string): string {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) ?? 0);
  return new TextDecoder().decode(bytes);
}

export function base64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(binString);
}
