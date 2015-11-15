import express from 'express';
import firstRes from './middleware/firstRes';
import midRes from './middleware/midRes';
const router = express.Router();

router.get(
  '/',
  firstRes,
  midRes
);

export default router;
