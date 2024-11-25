import { UAParser } from 'ua-parser-js';
import { hash } from 'bcryptjs';

export interface DeviceInfo {
  deviceId: string;
  browser: string;
  os: string;
  device: string;
  lastUsed: Date;
  ipAddress: string;
  trusted: boolean;
}

export async function generateDeviceId(userAgent: string, ipAddress: string): Promise<string> {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  // Create a unique fingerprint from device characteristics
  const fingerprint = JSON.stringify({
    browser: `${browser.name || 'Unknown'}${browser.version ? ' ' + browser.version : ''}`,
    os: `${os.name || 'Unknown'}${os.version ? ' ' + os.version : ''}`,
    device: `${device.vendor || ''}${device.model ? ' ' + device.model : 'Unknown Device'}`,
    ip: ipAddress,
  });

  // Hash the fingerprint
  return await hash(fingerprint, 8);
}

export function parseDeviceInfo(userAgent: string, ipAddress: string): Omit<DeviceInfo, 'deviceId' | 'trusted' | 'lastUsed'> {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  return {
    browser: `${browser.name || 'Unknown'} ${browser.version || ''}`.trim(),
    os: `${os.name || 'Unknown'} ${os.version || ''}`.trim(),
    device: device.vendor || device.model ? `${device.vendor || ''} ${device.model || ''}`.trim() : 'Unknown Device',
    ipAddress,
  };
}

export function isSuspiciousLogin(
  currentDevice: Partial<DeviceInfo>,
  trustedDevices: DeviceInfo[],
  ipAddress: string
): { suspicious: boolean; reason?: string } {
  // Check if this is a known device
  const knownDevice = trustedDevices.find(d => d.deviceId === currentDevice.deviceId);
  if (knownDevice?.trusted) {
    return { suspicious: false };
  }

  // Check for IP address changes
  const knownIPs = new Set(trustedDevices.map(d => d.ipAddress));
  if (!knownIPs.has(ipAddress)) {
    return {
      suspicious: true,
      reason: 'New IP address detected',
    };
  }

  // Check for unusual browser/OS combinations
  const knownBrowsers = new Set(trustedDevices.map(d => d.browser));
  const knownOS = new Set(trustedDevices.map(d => d.os));
  
  if (!knownBrowsers.has(currentDevice.browser || '') || !knownOS.has(currentDevice.os || '')) {
    return {
      suspicious: true,
      reason: 'Unusual browser or operating system',
    };
  }

  // Check login frequency
  const recentLogins = trustedDevices.filter(d => {
    const timeDiff = Date.now() - d.lastUsed.getTime();
    return timeDiff < 24 * 60 * 60 * 1000; // 24 hours
  });

  if (recentLogins.length > 10) { // More than 10 different devices in 24 hours
    return {
      suspicious: true,
      reason: 'Unusual number of login attempts',
    };
  }

  return { suspicious: false };
}

export function shouldRequire2FA(
  currentDevice: Partial<DeviceInfo>,
  trustedDevices: DeviceInfo[],
  ipAddress: string,
  twoFactorEnabled: boolean
): boolean {
  // Always require 2FA if it's enabled and device is not trusted
  if (twoFactorEnabled) {
    const device = trustedDevices.find(d => d.deviceId === currentDevice.deviceId);
    if (!device?.trusted) {
      return true;
    }
  }

  // Check for suspicious activity
  const { suspicious } = isSuspiciousLogin(currentDevice, trustedDevices, ipAddress);
  return suspicious;
}

export function getDeviceIcon(deviceInfo: Partial<DeviceInfo>): string {
  const os = deviceInfo.os?.toLowerCase() || '';
  
  if (os.includes('android')) return '📱';
  if (os.includes('ios') || os.includes('iphone') || os.includes('ipad')) return '📱';
  if (os.includes('windows')) return '💻';
  if (os.includes('mac')) return '🖥️';
  if (os.includes('linux')) return '🐧';
  
  return '🔌';
}
