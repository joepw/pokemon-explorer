export type ListItem = {
  name: string;
  url: string;
};

export type ListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListItem[];
};
