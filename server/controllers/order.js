import User from '../models/user';
import Order from '../models/order';

export const addOrderItems = async (req, res) => {
   try {
      const { hotelId } = req.body;
      const user = await User.findById(req.user._id).exec();

      const orderExist = await Order.findOne().exec();

      // else create new order and send success true
      let newOrder = await new Order({
         hotel: hotelId,
         orderedBy: user._id,
      }).save((error, result) => {
         if (error) {
            console.log('Create order err:', error);
            res.status(400).send('Err ');
         }
         res.json(result);
      });
   } catch (error) {
      console.log('ERR create order', error);
   }
};

export const updateOrderToPaid = async (req, res) => {
   const order = await Order.findById(req.params.id);
   // get hotel ID from req.body
   const { hotelId } = req.body;

   // find currently logged in user
   const user = User.findById(req.user._id).exec();

   if (order) {
      if (req.body.action === 'Paid') {
         order.isPaid = true;
      }
      const updatedOrder = await order.save();
      res.send({ message: 'Done' });
   } else {
      req.status(404).message('Order not found');
   }
};
