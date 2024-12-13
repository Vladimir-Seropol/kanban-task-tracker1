export type CardProjectAllApiProps = {
  projectAll?: {
    data: [
      {
        id: number;
        name: string;
        user_count: number;
        slug: string;
        logo: null | { link: string };
      },
    ];
  };
  width?: string;
  height?: string;
};
