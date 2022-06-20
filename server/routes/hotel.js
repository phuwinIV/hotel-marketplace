import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { hotelOwner, requiredSignin } from '../middleware';

//controllers
import {
   create,
   hotels,
   image,
   sellerHotels,
   remove,
   read,
   update,
   userHotelBookings,
   isAlreadyBook,
   searchListings,
} from '../controllers/hotel';

router.post('/create-hotel', requiredSignin, formidable(), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requiredSignin, sellerHotels);
router.delete('/delete-hotel/:hotelId', requiredSignin, hotelOwner, remove);
router.get('/hotel/:hotelId', read);
router.put(
   '/update-hotel/:hotelId',
   requiredSignin,
   hotelOwner,
   formidable(),
   update
);
router.post('/search-listings', searchListings);

// orders
router.get('/user-hotel-bookings', requiredSignin, userHotelBookings);
router.get('/is-already-booked/:hotelId', requiredSignin, isAlreadyBook);

module.exports = router;
