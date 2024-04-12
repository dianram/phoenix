import React from 'react';
import { Alert } from 'reactstrap';

const CustomAlert = ({ message, typeOfAlert, editFeedBackVisible, setEditFeedBackVisible }) => {

  const onDismiss = () => setEditFeedBackVisible(false);

  return (
    <Alert className='mt-4' color={typeOfAlert} isOpen={editFeedBackVisible} toggle={onDismiss}>
      {message}
    </Alert>
  );
}

export default CustomAlert;
