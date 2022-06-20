import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Search from '../component/forms/Search';
import { searchListings } from '../actions/hotel';
import SmallCard from '../component/cards/SmallCard';

function SearchResult() {
   // state
   const [searchLocation, setSearchLocation] = useState('');
   const [searchdate, setSearchtDate] = useState('');
   const [hotels, setHotels] = useState([]);

   // when components mounts, get search params from url and use to send search query to backend
   useEffect(() => {
      const { location, date, bed } = queryString.parse(window.location.search);
      console.table({ location, date, bed });
      searchListings({ location, date, bed }).then((res) => {
         console.log('SEARCH RESULS ==>', res.data);
         setHotels(res.data);
      });
   }, [window.location.search]);

   return (
      <>
         <div className='col'>
            <br />
            <Search />
         </div>
         <div className='container'>
            <div className='row'>
               {hotels.map((h) => (
                  <SmallCard key={h._id} h={h} />
               ))}
            </div>
         </div>
      </>
   );
}

export default SearchResult;
