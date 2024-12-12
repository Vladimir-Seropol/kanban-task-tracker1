export type CardProjectAllApiProps = {
  projectAll?: {
    data: [{ id: number; name: string; user_count: number; slug: string }];
  };
  width?: string;
  height?: string;
};
