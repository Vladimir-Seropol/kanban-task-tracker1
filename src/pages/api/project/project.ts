import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/utils/config';
import { ProjectResponseType } from '@/types/ProjectResponseType/ProjectResponseType';
export default async function project(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const response = await fetch(`${config.API_URL}/project`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      return res.status(response.status).json({ error: errorMessage });
    }
    const data: ProjectResponseType = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
