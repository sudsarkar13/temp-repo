'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Shield, ShieldAlert, Trash2 } from 'lucide-react';
import { DeviceInfo, getDeviceIcon } from '@/lib/security/device';
import { format } from 'date-fns';

interface DeviceManagementProps {
  currentDeviceId?: string;
}

export function DeviceManagement({ currentDeviceId }: DeviceManagementProps) {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/admin/devices');
      if (response.ok) {
        const data = await response.json();
        setDevices(data.devices);
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load devices',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrustDevice = async (deviceId: string, trusted: boolean) => {
    try {
      const response = await fetch(`/api/admin/devices/${deviceId}/trust`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trusted }),
      });

      if (response.ok) {
        setDevices(devices.map(d => 
          d.deviceId === deviceId ? { ...d, trusted } : d
        ));
        toast({
          title: 'Success',
          description: `Device ${trusted ? 'trusted' : 'untrusted'}`,
        });
      } else {
        throw new Error('Failed to update device trust status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update device',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveDevice = async () => {
    if (!selectedDevice) return;

    try {
      const response = await fetch(`/api/admin/devices/${selectedDevice}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDevices(devices.filter(d => d.deviceId !== selectedDevice));
        toast({
          title: 'Success',
          description: 'Device removed',
        });
      } else {
        throw new Error('Failed to remove device');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove device',
        variant: 'destructive',
      });
    } finally {
      setSelectedDevice(null);
    }
  };

  return (
    <>
      <Card className="bg-[#27272c] border-none text-white">
        <CardHeader>
          <CardTitle className="text-accent flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Device Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your trusted devices and active sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white">Device</TableHead>
                    <TableHead className="text-white">Last Used</TableHead>
                    <TableHead className="text-white">Location</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow
                      key={device.deviceId}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getDeviceIcon(device)}</span>
                          <div>
                            <div>{device.browser}</div>
                            <div className="text-sm text-muted-foreground">
                              {device.os}
                            </div>
                          </div>
                          {device.deviceId === currentDeviceId && (
                            <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(device.lastUsed), 'PPp')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.ipAddress}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {device.trusted ? (
                            <Shield className="h-4 w-4 text-green-500" />
                          ) : (
                            <ShieldAlert className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className={device.trusted ? 'text-green-500' : 'text-yellow-500'}>
                            {device.trusted ? 'Trusted' : 'Not Trusted'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Switch
                            checked={device.trusted}
                            onCheckedChange={(checked) => handleTrustDevice(device.deviceId, checked)}
                            disabled={device.deviceId === currentDeviceId}
                          />
                          {device.deviceId !== currentDeviceId && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedDevice(device.deviceId)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {devices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No devices found
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
        <AlertDialogContent className="bg-[#27272c] border-none text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Device</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will remove the device and revoke its access. The user will need to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveDevice}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
