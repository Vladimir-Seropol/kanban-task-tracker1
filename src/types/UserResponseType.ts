export type UserResponseType = {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  position: string;
  is_active: boolean;
  is_admin: boolean;
  is_manager: boolean;
  email: string;
  projects: [
    {
      id: number;
      capabilities: string[];
      role: {
        id: number;
        name: string;
      };
    },
    {
      id: number;
      capabilities: string[];
      role: {
        id: number;
        name: string;
      };
    },
  ];
  gender: {
    id: number;
    name: string;
  };
  avatar: string | null;
  telegram: string;
  created_at: string;
  updated_at: string;
  can_grade: boolean;
  nota_email: string | null;
};
