import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
   try {
      console.log(req.body);
      const { name, email, password } = req.body;

      // validation
      if (!name) return res.status(400).send('Name is requied');
      if (!password || password.length < 6)
         return res
            .status(400)
            .send('Password is requied and min 6 characters long');
      let userExist = await User.findOne({ email }).exec();
      if (userExist) return res.status(400).send('Enail is taken');

      // register
       const user = new User(req.body);
       await user.save();
       console.log('USER CREATE', user);
  
      return res.json({ ok: true });
   } catch {
      console.log('CREATE USER FALIED', err);
      return res.status(400).send('Error. Try again');
   }
};

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      // check if user with that email exist
      let user = await User.findOne({ email }).exec();

      if (!user) return res.status(400).send('User with that email not found');
      // compare password
      user.comparePassword(password, (err, match) => {
         console.log('COMPARE PASSWORD IN LOGIN ERR', err);
         if (!match || err) return res.status(400).send('wrong password');
         //  GENERATE A TOKE THEN SEND AS RESPONSE TO CLIENT
         let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
         });

         res.json({
            token,
            user: {
               _id: user._id,
               name: user.name,
               email: user.email,
               createdAt: user.createdAt,
               updatedAt: user.updatedAt,
            },
         });
      });
   } catch (err) {
      console.log('LOGIN ERR', err);
      res.status(400).send('Signin fail');
   }
};
