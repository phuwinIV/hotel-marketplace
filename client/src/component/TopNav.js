import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => ({ ...state }));
   let navigate = useNavigate();

   const logout = () => {
      dispatch({
         type: 'LOGOUT',
         payload: null,
      });
      window.localStorage.removeItem('auth');
      navigate('/login');
   };

   return (
      <div className='nav  bg-light d-flex justify-content-center'>
         <Link className='nav-link  text-dark ' to='/'>
            {' '}
            Home
         </Link>

         {auth !== null && (
            <Link className='nav-link  text-dark' to='/dashboard'>
               {' '}
               Dashboard
            </Link>
         )}

         {auth !== null && (
            <a className='nav-link  text-dark' onClick={logout}>
               {' '}
               Logout
            </a>
         )}

         {auth === null && (
            <>
               {' '}
               <Link className='nav-link  text-dark' to='/login'>
                  {' '}
                  Login
               </Link>
               <Link className='nav-link  text-dark' to='/register'>
                  {' '}
                  Reister
               </Link>{' '}
            </>
         )}
      </div>
   );
};

export default TopNav;
