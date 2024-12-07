import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/utils/config';
import { UserResponseType } from '@/types/UserResponseType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseType | { error: string }>,
) {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(`${config.API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return res.status(response.status).json({ error: errorMessage });
    }

    const data: UserResponseType = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
