import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DatePicker, Select } from 'antd';
import { read, updateHotel } from '../actions/hotel';
import { useSelector } from 'react-redux';
import HotelEditForm from '../component/forms/HotelEditForm';

const { Option } = Select;

const EditHotel = () => {
   const { hotelId } = useParams();
   //redux
   const { auth } = useSelector((state) => ({ ...state }));
   const { token } = auth;
   // state
   const [values, setValues] = useState({
      title: '',
      content: '',
      location: '',
      price: '',
      from: '',
      to: '',
      bed: '',
   });

   const [image, setImage] = useState('');

   const [preview, setPreview] = useState(
      'https://via.placeholder.com/100x100.png?text=PREVIEW'
   );
   // destructuring variabbles from statet
   const { title, content, price, from, to, bed, location } = values;

   useEffect(() => {
      loadSellerHotel();
   }, []);

   const loadSellerHotel = async () => {
      let res = await read(hotelId);
      setValues({ ...values, ...res.data });
      setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      let hotelData = new FormData();
      hotelData.append('title', title);
      hotelData.append('content', content);
      hotelData.append('price', price);
      hotelData.append('location', location);
      image && hotelData.append('image', image);
      hotelData.append('from', from);
      hotelData.append('to', to);
      hotelData.append('bed', bed);

      try {
         let res = await updateHotel(token, hotelData, hotelId);
         console.log('HOEL UPDATE RES', res);
         toast.success(`${res.data.title} is updated`);
      } catch (err) {
         console.log(err);
         toast.error(err.response.data.err);
      }
   };

   const handleImageChange = (e) => {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
   };

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   return (
      <>
         <div className='container-fluid bg-success  p-5 text-center'>
            <h2> EDIT hotel </h2>
         </div>
         <div className='container-fluid'>
            <div className='row'>
               <div className='col-md-10'>
                  <br />
                  <HotelEditForm
                     values={values}
                     setValues={setValues}
                     handleChange={handleChange}
                     handleImageChange={handleImageChange}
                     handleSubmit={handleSubmit}
                  />
               </div>
               <div className='col-md-2'>
                  <img
                     src={preview}
                     alt='preview_image'
                     className='img img-fluid m-2'
                  />
                  <pre>{JSON.stringify(values, null, 4)}</pre>{' '}
               </div>
            </div>
         </div>
      </>
   );
};

export default EditHotel;
