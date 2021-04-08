import { NextApiRequest, NextApiResponse } from 'next';

const serverHealth = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/health+json');
  res.status(200).json({ status: 'pass' });
};

export default serverHealth;
