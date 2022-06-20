import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
   {
      hotel: {
         type: ObjectId,
         ref: 'Hotel',
      },
      orderedBy: {
         type: ObjectId,
         ref: 'User',
      },
      isPaid: {
         type: Boolean,
         required: true,
         default: false,
      },
      paidAt: {
         type: Date,
      },
   },
   { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);

export default Order;
