import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import moment from 'moment';

const { Meta } = Card;

const ConnectNav = () => {
   const { auth } = useSelector((state) => ({ ...state }));
   const { user } = auth;

   return (
      <div className='d-flex justify-content-around'>
         <Card>
            <Meta
               avatar={<Avatar>{user.name[0]}</Avatar>}
               title={user.name}
               description={`Joined ${moment(
                  user.createdAt
               ).fromNow()}`}></Meta>
         </Card>
         {auth &&
            auth.user &&
            auth.user.stripe_seller &&
            auth.user.stripe_seller.charges_enabled && (
               <>
                  <div>Pendinng balance</div>
                  <div>Payout setting</div>
               </>
            )}
      </div>
   );
};

export default ConnectNav;
