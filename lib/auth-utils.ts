import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { UAParser } from 'ua-parser-js';

export async function generateTwoFactorSecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `Portfolio Admin (${email})`,
  });

  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    secret: secret.base32,
    qrCode: qrCodeUrl,
  };
}

export function verifyTwoFactorToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // Allow 30 seconds window
  });
}

export function generateRecoveryCodes(): string[] {
  return Array.from({ length: 10 }, () =>
    Math.random().toString(36).substring(2, 15).toUpperCase()
  );
}

export function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    browser: `${result.browser.name} ${result.browser.version}`,
    os: `${result.os.name} ${result.os.version}`,
    device: result.device.type || 'desktop',
  };
}

export function isSessionExpired(expiresAt: Date): boolean {
  return new Date() > new Date(expiresAt);
}

export function calculateSessionExpiry(rememberMe: boolean = false): Date {
  const now = new Date();
  // Set expiry to 24 hours or 30 days if remember me is checked
  const expiryHours = rememberMe ? 24 * 30 : 24;
  return new Date(now.setHours(now.getHours() + expiryHours));
}
