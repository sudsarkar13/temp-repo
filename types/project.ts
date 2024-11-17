export interface Project {
  _id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  stack: {
    name: string;
  }[];
  image: string;
  live: string;
  github: string;
} 