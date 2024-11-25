'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import QRCode from 'qrcode';

interface TwoFactorSetupProps {
  enabled: boolean;
  onUpdate: () => void;
}

export function TwoFactorSetup({ enabled, onUpdate }: TwoFactorSetupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [secret, setSecret] = useState('');
  const { toast } = useToast();

  const handleToggle = async () => {
    if (enabled) {
      // Disable 2FA
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/settings/2fa', {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Two-factor authentication disabled',
          });
          onUpdate();
        } else {
          throw new Error('Failed to disable 2FA');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to disable two-factor authentication',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Start 2FA setup
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/settings/2fa', {
          method: 'POST',
        });

        const data = await response.json();

        if (response.ok) {
          // Generate QR code
          const qr = await QRCode.toDataURL(data.qrCodeUrl);
          setQrCode(qr);
          setSecret(data.secret);
          setShowQR(true);
        } else {
          throw new Error('Failed to initialize 2FA setup');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to setup two-factor authentication',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/settings/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Two-factor authentication enabled',
        });
        setShowQR(false);
        onUpdate();
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify code',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setVerificationCode('');
    }
  };

  return (
    <>
      <Card className="bg-[#27272c] border-none text-white">
        <CardHeader>
          <CardTitle className="text-accent">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-muted-foreground">
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {enabled ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-sm text-muted-foreground">
                {enabled
                  ? 'Your account is protected by 2FA'
                  : 'Enable 2FA for enhanced security'}
              </p>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={handleToggle}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQR} onOpenChange={(open) => !isLoading && setShowQR(open)}>
        <DialogContent className="bg-[#27272c] border-none text-white">
          <DialogHeader>
            <DialogTitle className="text-accent">Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Scan the QR code with your authenticator app
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {qrCode && (
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <img src={qrCode} alt="2FA QR Code" width={200} height={200} />
                </div>
              </div>
            )}
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Or enter this code manually:
              </p>
              <code className="bg-white/5 px-2 py-1 rounded text-accent">
                {secret}
              </code>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                maxLength={6}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleVerify}
              className="w-full bg-accent hover:bg-accent/90 text-primary"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Enable'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
