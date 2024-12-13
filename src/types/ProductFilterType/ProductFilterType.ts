export type ProductFilterType = [
  {
    id: number;
    name: string;
    slug: string;
    user_count: number;
    is_archive: number;
    is_favorite: boolean;
  },
];

export type ProductFilterItemType = {
  name: string;
};
