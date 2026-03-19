export type Url = string;
export type PokeListRes = {
  count: number;
  next: Url | null;
  previous: Url | null;
  results: { name: string; url: Url }[];
};
