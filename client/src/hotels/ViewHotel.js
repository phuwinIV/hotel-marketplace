import React, { useState, useEffect } from 'react';
import { read, diffDays, isAlreadyBooked } from '../actions/hotel';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { orderCreate } from '../actions/order';

const ViewHotetl = () => {
   let formatter = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
   });

   const { hotelId } = useParams();
   const navigate = useNavigate();

   const [hotel, setHotel] = useState({});
   const [image, setImage] = useState('');
   const [loading, setLoading] = useState(false);
   const [alreadyBooked, setAlreadyBooked] = useState(false);

   const { auth } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadSellerHotel();
   }, []);

   useEffect(() => {
      if (auth && auth.token) {
         isAlreadyBooked(auth.token, hotelId).then((res) => {
            // console.log(res);
            if (res.data.ok) setAlreadyBooked(true);
         });
      }
   }, []);

   const loadSellerHotel = async () => {
      let res = await read(hotelId);
      setHotel(res.data);
      setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
   };

   const handleClick = async (e) => {
      e.preventDefault();

      if (!auth || !auth.token) {
         navigate('/login');
         return;
      }

      try {
         setLoading(true);
         if (!auth) navigate('/login');
         let res = await orderCreate(auth.token, hotelId);
         console.log('Order booked', res);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className='container-fluid bg-success  p-5 text-center'>
            <h2> {hotel.title} </h2>
         </div>
         <div className='conainer-fluid'>
            <div className='row'>
               <div className='col-md-6'>
                  <br />
                  <img
                     src={image}
                     alt={hotel.title}
                     className='img img-fluid m-2'
                  />
               </div>
               <div className='col-md-6'>
                  <br />
                  <b> {hotel.content} </b>
                  <p className='alert alert-info mt-3'>
                     {' '}
                     {formatter.format(hotel.price)}{' '}
                  </p>
                  <p className='card-text'>
                     <span className='float-right text-primary'>
                        {' '}
                        for {diffDays(hotel.from, hotel.to)}{' '}
                        {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                     </span>
                  </p>
                  <p>
                     {' '}
                     From <br />
                     {moment(new Date(hotel.from)).format(
                        'MMMM Do YYYY, h:mm:ss a'
                     )}
                  </p>
                  <p>
                     {' '}
                     To <br />
                     {moment(new Date(hotel.to)).format(
                        'MMMM Do YYYY, h:mm:ss a'
                     )}
                  </p>
                  <i>Posted by {hotel.postedBy && hotel.postedBy.name} </i>
                  <br />
                  <button
                     onClick={handleClick}
                     disabled={loading || alreadyBooked}
                     className='btn btn-block btn-lg btn-primary mt-3'>
                     {loading
                        ? 'Loading...'
                        : alreadyBooked
                        ? 'Already Booked'
                        : auth && auth.token
                        ? 'Book Now'
                        : 'Login to Book'}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default ViewHotetl;
