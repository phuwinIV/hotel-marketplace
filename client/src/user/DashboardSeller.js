import { useState, useEffect } from 'react';
import DashboardNav from '../component/DashboardNav';
import ConnectNav from '../component/ConnectNav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { createConnectAccount } from '../actions/stripe';
import { toast } from 'react-toastify';
import { sellerHotels, deleteHotel } from '../actions/hotel';
import SmallCard from '../component/cards/SmallCard';

const DashboardSeller = () => {
   const [hotels, setHotels] = useState([]);
   const { auth } = useSelector((state) => ({ ...state }));
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      loadSellersHotels();
   }, []);

   const loadSellersHotels = async () => {
      let { data } = await sellerHotels(auth.token);
      setHotels(data);
   };

   const handleClick = async () => {
      setLoading(true);
      try {
         let res = await createConnectAccount(auth.token);
         console.log(res); // get login link
      } catch (err) {
         console.log(err);
         toast.error('Stripe connect failed, Try again.');
         setLoading(false);
      }
   };

   const handleHotelDelete = async (hotelId) => {
      if (!window.confirm('Are you sure? ')) return;

      deleteHotel(auth.token, hotelId).then((res) => {
         toast.success('Hotel Deleted');
         loadSellersHotels();
      });
   };

   const connected = () => (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-10'>
               <h2> Your Hotels </h2>
            </div>
            <div className='col-md-2'>
               <Link className='btn btn-danger' to='/hotels/new'>
                  + Add New
               </Link>
            </div>
         </div>

         <div className='row'>
            {hotels.map((h) => (
               <SmallCard
                  key={h._id}
                  h={h}
                  showViewMoreButton={false}
                  owner={true}
                  handleHotelDelete={handleHotelDelete}
               />
            ))}
         </div>
      </div>
   );

   const notConnected = () => (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-6 offset-md-3 text-center'>
               <HomeOutlined className='h1 p-2 text-primary box-shadow-hov' />
               <h4>Setup payouts to post hotel rooms</h4>
               <p className='lead'>
                  {' '}
                  MERN partners with stripe to transfer earnings to your bank
                  account{' '}
               </p>
               <button
                  disabled={loading}
                  onClick={handleClick}
                  className='btn btn-primary mb-3'>
                  {' '}
                  {loading ? 'Processing...' : 'Setup Payouts'}
               </button>
               <p className='tetxt-muted'>
                  {' '}
                  <small>
                     {' '}
                     You'll be redirect to Stripe to complete the onbaoarding
                     process.{' '}
                  </small>{' '}
               </p>
            </div>
         </div>
      </div>
   );

   return (
      <>
         <div className='container-fluid bg-secondary p-5'>
            <ConnectNav />
         </div>

         <div className='container-fluid p-4'>
            <DashboardNav />
         </div>
         {connected()}
         {/* 
         {auth &&
         auth.user &&
         auth.user.stripe_seller &&
         auth.user.stripe_seller.charges_enabled
            ? connected()
            : notConnected()} */}

         {/* <pre> {JSON.stringify(auth, null, 4)} </pre> */}
      </>
   );
};

export default DashboardSeller;
