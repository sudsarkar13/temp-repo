import { PageProps } from 'next';

export interface EditPageProps extends PageProps {
  params: {
    id: string;
  };
}
