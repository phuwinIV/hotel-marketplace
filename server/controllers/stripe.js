import User from '../models/user';
import stripe from 'stripe';

const Stripe = stripe(
   'sk_test_51K8h9xBTOP4yEq1l0LJ1SrQubkvI56wPlbmXPPqPm3PASMHrke8RhsaMlBi6J2RD3cR1A1PvXvvnzikvXvMMqSoN00JPM9NKEF'
);

export const createConnectAccount = async (req, res) => {
   // find user from db
   const user = await User.findById(req.user._id).exec();
   console.log('USER : ', user);

   // if user don't have stripe_account_id yet , create now
   const account = await Stripe.accounts.create({
      type: 'express',
   });
   console.log('ACCOUNT : ', account);
};
