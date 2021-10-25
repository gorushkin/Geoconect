// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPosts } from '../../services';

const handler = async (req, res) => {
  const posts = await getPosts();
  res.status(200).json({ posts });
};

export default handler;
