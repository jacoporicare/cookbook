import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/health+json');
  res.status(200).json({ status: 'pass' });
};
