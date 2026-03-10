import { APIError } from './errors.js';

export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof APIError) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
}
