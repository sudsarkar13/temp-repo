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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, History, Pencil, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface Version {
  _id: string;
  title: string;
  modifiedAt: string;
  modifiedBy: string;
  changes: string;
}

interface Project {
  _id: string;
  num: string;
  title: string;
  category: string;
  state: 'draft' | 'in_review' | 'published' | 'archived';
  versions: Version[];
  analytics: {
    views: number;
    clicks: number;
    lastViewed?: string;
  };
  updatedAt: string;
}

interface ProjectManagementProps {
  projects: Project[];
  onStateChange: (projectId: string, newState: string) => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectManagement({
  projects,
  onStateChange,
  onDelete,
}: ProjectManagementProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStateBadgeColor = (state: string) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[state as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Manage your portfolio projects and their versions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.num}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={project.state}
                      onValueChange={(value) => onStateChange(project._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          <Badge className={getStateBadgeColor(project.state)}>
                            {project.state.replace('_', ' ')}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      {project.analytics.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.updatedAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedProject(project)}
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(project._id)}
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

      {/* Version History Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>
              View all versions of {selectedProject?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProject?.versions.map((version) => (
              <Card key={version._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {version.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {format(new Date(version.modifiedAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    Modified by {version.modifiedBy}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {version.changes}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
