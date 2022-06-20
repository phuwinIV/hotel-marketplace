import { Modal } from 'antd';

const OrderModal = ({ orderedBy, showModal, setShowModal, hotel }) => {
   return (
      <Modal
         visible={showModal}
         title='Order Payment info'
         onCancel={() => setShowModal(!showModal)}>
         <p> Payment status: {orderedBy.isPaid} </p>
      </Modal>
   );
};

export default OrderModal;
