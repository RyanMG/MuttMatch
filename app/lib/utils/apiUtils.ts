export function parsePayload(payload: Response): Promise<any> {
  if (!payload.ok) {
    return payload.text();
  }

  return payload.json();
}
