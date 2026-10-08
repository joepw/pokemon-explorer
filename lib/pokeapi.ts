// Shared PokéAPI list shapes. Both libraries paginate `{ name, url }`
// results, so one small type covers both.
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
