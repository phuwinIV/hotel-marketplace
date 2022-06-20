import axios from 'axios';

export const orderCreate = async (token, hotelId) => {
   await axios.post(
      `${process.env.REACT_APP_API}/order`,
      { hotelId },
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
};
