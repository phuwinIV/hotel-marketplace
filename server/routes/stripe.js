import express from 'express';

const router = express.Router();
// middleware
import { requiredSignin } from '../middleware';
//controllers
import { createConnectAccount } from '../controllers/stripe';

router.post('/create-connect-account', requiredSignin, createConnectAccount);

module.exports = router;
