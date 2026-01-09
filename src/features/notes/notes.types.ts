export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
  archived: boolean;
  deletedAt?: string | null;
};
