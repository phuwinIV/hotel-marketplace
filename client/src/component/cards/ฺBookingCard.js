import { diffDays } from '../../actions/hotel';
import { useNavigate, Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import OrderModal from '../../component/modals/OrderModal';

let formatter = new Intl.NumberFormat('th-TH', {
   style: 'currency',
   currency: 'THB',
});

const BookingCard = ({ hotel, orderedBy, isPaid }) => {
   const [showModal, setShowModal] = useState(false);

   const navigate = useNavigate();

   return (
      <>
         <div className='card mb-3 '>
            <div className='row no-gutters'>
               <div className='col-md-4'>
                  {hotel.image && hotel.image.contentType ? (
                     <img
                        src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                        alt='hotel image'
                        className='card-image img img-fluid mt-3 '
                     />
                  ) : (
                     <img
                        src='https://via.placeholder.com/900x500.png?text=image+hotel'
                        alt='hotel image'
                        className='card-image img img-fluid'
                     />
                  )}
               </div>
               <div className='col-md-8'>
                  <div className='card-body'>
                     <h3 className='card-title'>
                        {hotel.title}
                        <span className='float-right text-primary'>
                           {' '}
                           {formatter.format(hotel.price)}
                        </span>
                     </h3>
                     <p className='alert alert-secondary'> {hotel.location} </p>
                     <p className='card-text'>
                        {' '}
                        {`${hotel.content.substring(1, 200)}...`}{' '}
                     </p>
                     <p className='card-text'>
                        <span className='float-right text-primary'>
                           {' '}
                           for {diffDays(hotel.from, hotel.to)}{' '}
                           {diffDays(hotel.from, hotel.to) <= 1
                              ? ' day'
                              : ' days'}
                        </span>
                     </p>
                     <p className='card-text'> {orderedBy.name} </p>
                     <p className='card-text'> {hotel.bed} bed </p>
                     <p className='card-text'>
                        payment status {isPaid ? 'Paid' : 'Not Paid'}
                     </p>
                     <p className='card-text'>
                        Available from{' '}
                        {new Date(hotel.from).toLocaleDateString()}
                     </p>

                     {showModal && (
                        <OrderModal
                           orderedBy={orderedBy}
                           showModal={showModal}
                           hotel={hotel}
                           setShowModal={setShowModal}
                        />
                     )}

                     <div className='d-flex justify-content-between h4'>
                        <button
                           onClick={() => setShowModal(!showModal)}
                           className='btn btn-primary'>
                           {' '}
                           ข้อมูลการชำระเงิน{' '}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default BookingCard;
