import express from 'express';
import formidable from 'express-formidable';
import { addOrderItems } from '../controllers/order';

const router = express.Router();

// middleware
import { hotelOwner, requiredSignin } from '../middleware';

//controllers

router.post('/order', requiredSignin, addOrderItems);

module.exports = router;
