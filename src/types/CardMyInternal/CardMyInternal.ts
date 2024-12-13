export type CardMyInternalProps = {
  archived: {
    data: [
      {
        id: number;
        name: string;
        slug: string;
        is_archived: number;
        user_count: number;
      },
    ];
  };
};
