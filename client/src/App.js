import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './component/TopNav';
import PrivateRoute from './component/PrivateRoute';
// components
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import SearchResult from './hotels/SearchResult';

function App() {
   return (
      <Router>
         <TopNav />
         <ToastContainer position='top-center' />
         <div className='container'>
            <Routes>
               <Route exact path='/' element={<Home />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route
                  path='/dashboard'
                  element={
                     <PrivateRoute>
                        <Dashboard />
                     </PrivateRoute>
                  }
               />
               <Route
                  path='/dashboard/seller'
                  element={
                     <PrivateRoute>
                        <DashboardSeller />
                     </PrivateRoute>
                  }
               />
               <Route
                  path='/hotels/new'
                  element={
                     <PrivateRoute>
                        <NewHotel />
                     </PrivateRoute>
                  }
               />
               <Route
                  path='/hotel/edit/:hotelId'
                  element={
                     <PrivateRoute>
                        <EditHotel />
                     </PrivateRoute>
                  }
               />
               <Route exact path='/hotel/:hotelId' element={<ViewHotel />} />
               <Route exact path='/search-result' element={<SearchResult />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
