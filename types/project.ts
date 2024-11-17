export interface ProjectStack {
  name: string;
}

export interface Project {
  _id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  stack: ProjectStack[];
  image: string;
  live: string;
  github: string;
}