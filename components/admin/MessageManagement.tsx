import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import {
  AlertTriangle,
  Archive,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Trash,
} from 'lucide-react';

interface Response {
  _id: string;
  content: string;
  sentAt: string;
  sentBy: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'high' | 'normal' | 'low';
  category: 'business' | 'project' | 'general' | 'support';
  status: 'new' | 'in_progress' | 'responded' | 'archived';
  responses: Response[];
  createdAt: string;
  analytics: {
    responseTime?: number;
    totalResponses: number;
    lastResponseDate?: string;
  };
}

interface MessageManagementProps {
  messages: Message[];
  onStatusChange: (messageId: string, newStatus: string) => void;
  onRespond: (messageId: string, response: string) => void;
  onArchive: (messageId: string) => void;
  onDelete: (messageId: string) => void;
}

export default function MessageManagement({
  messages,
  onStatusChange,
  onRespond,
  onArchive,
  onDelete,
}: MessageManagementProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [response, setResponse] = useState('');

  const getPriorityBadgeColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      normal: 'bg-blue-100 text-blue-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[priority as keyof typeof colors] || colors.normal;
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      business: 'bg-purple-100 text-purple-800',
      project: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800',
      support: 'bg-orange-100 text-orange-800',
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const handleSendResponse = () => {
    if (selectedMessage && response.trim()) {
      onRespond(selectedMessage._id, response);
      setResponse('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>
            Manage incoming messages and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message._id}>
                  <TableCell>
                    {format(new Date(message.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadgeColor(message.priority)}>
                      {message.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadgeColor(message.category)}>
                      {message.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={message.status}
                      onValueChange={(value) => onStatusChange(message._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {message.analytics.responseTime ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {Math.round(message.analytics.responseTime)} min
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onArchive(message._id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(message._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              View and respond to message from {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      {selectedMessage?.subject}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      From: {selectedMessage?.name} ({selectedMessage?.email})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedMessage?.priority === 'high' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {selectedMessage?.message}
                </p>
              </CardContent>
            </Card>

            {/* Response History */}
            {selectedMessage?.responses.map((response) => (
              <Card key={response._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs">
                      Response by {response.sentBy}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {format(new Date(response.sentAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {response.content}
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* New Response */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Send Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="min-h-[100px]"
                  />
                  <Button
                    className="w-full"
                    onClick={handleSendResponse}
                    disabled={!response.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
