export type CardProjectAllApiProps = {
  projectAll: {
    data: [{ id: number; name: string; user_count: number }];
  };
  width?: string;
  height?: string;
};
