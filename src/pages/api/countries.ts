import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const API_ENDPOINT = 'https://restcountries.com/v3.1/all';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(API_ENDPOINT);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch countries data:', error);
    res.status(500).json({ error: 'Failed to fetch countries data' });
  }
};