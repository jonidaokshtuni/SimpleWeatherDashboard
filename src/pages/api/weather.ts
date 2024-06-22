import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { country } = req.query;

  try {
    const response = await axios.get(API_ENDPOINT, {
      params: {
        q: country,
        appid: API_KEY,
        units: 'metric'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};