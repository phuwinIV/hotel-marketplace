import expressJwt from 'express-jwt';
import Hotel from '../models/hotel';

// req.user
export const requiredSignin = expressJwt({
   // secret , expiredDate
   secret: process.env.JWT_SECRET,
   algorithms: ['HS256'],
});

export const hotelOwner = async (req, res, next) => {
   let hotel = await Hotel.findById(req.params.hotelId).exec();
   let owner = hotel.postedBy._id == req.user._id;
   if (!owner) {
      return res.status(403).send('Unauthorized');
   }
   next();
};

export const admin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401);
      throw new Error('Not AUTH as admin');
   }
};
