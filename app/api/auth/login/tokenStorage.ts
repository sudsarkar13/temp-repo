// Store the current token in memory (Note: this will reset on server restart)
let currentAdminToken: string | null = null;

export function getCurrentAdminToken(): string | null {
  return currentAdminToken;
}

export function setCurrentAdminToken(token: string | null): void {
  currentAdminToken = token;
}

export function clearCurrentAdminToken(): void {
  currentAdminToken = null;
}
