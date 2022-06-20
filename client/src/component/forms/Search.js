import React, { useState } from 'react';
import { DatePicker, Select, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Autocomplete from 'react-google-autocomplete';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select;

function Search() {
   const navigate = useNavigate();

   const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

   const [location, setLocation] = useState('');
   const [date, setDate] = useState('');
   const [bed, setBed] = useState('');

   const handleSubmit = () => {
      navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
   };

   const options = [
      {
         value: 'Phuket',
      },
      {
         value: 'chiangmai',
      },
      {
         value: 'Pattaya',
      },
      {
         value: 'khaoyai',
      },
   ];

   return (
      <div className='d-flex pb-4'>
         <div className='w-100'>
            <AutoComplete
               style={{
                  width: 500,
                  height: 50,
               }}
               options={options}
               onSelect={(value) => {
                  setLocation(value);
               }}
               placeholder='Location'
               filterOption={(inputValue, option) =>
                  option.value
                     .toUpperCase()
                     .indexOf(inputValue.toUpperCase()) !== -1
               }
            />
         </div>
         <RangePicker
            onChange={(value, dateString) => setDate(dateString)}
            disabledDate={(current) =>
               current && current.valueOf() < moment().subtract(1, 'days')
            }
            className='w-100 '
         />

         <Select
            onChange={(value) => setBed(value)}
            className='w-100'
            size='large'
            placeholder='Number of beds'>
            <Option key={1}> {1} </Option>
            <Option key={2}> {2} </Option>
            <Option key={3}> {3} </Option>
            <Option key={4}> {4} </Option>
         </Select>

         <SearchOutlined
            onClick={handleSubmit}
            className='btn btn-primary p-3 btn-square'
         />
      </div>
   );
}

export default Search;
