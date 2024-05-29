import React from 'react';
import { Alert } from 'reactstrap';

/**
 * The CustomAlert function is a React component that displays an alert message with a specified type
 * and visibility status.
 * @returns The CustomAlert component is being returned, which renders an Alert component with the
 * specified message, type of alert, visibility, and dismiss functionality.
 */
const CustomAlert = ({ message, typeOfAlert, editFeedBackVisible, setEditFeedBackVisible }) => {

  const onDismiss = () => setEditFeedBackVisible(false);

  return (
    <Alert className='mt-4' color={typeOfAlert} isOpen={editFeedBackVisible} toggle={onDismiss}>
      {message}
    </Alert>
  );
}

export default CustomAlert;
