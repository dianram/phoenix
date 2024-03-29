import SubscribeDeviceForm from 'pages/Forms/customForms/SubscribeDeviceForm';
import React, { useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddDeviceToDealer = ({ allModules, userModules, user, setUserModules }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 pt-2 d-flex justify-content-center'>
        <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }}  onClick={toggle}>
          Subscribe a device
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Subcribe Device</ModalHeader>
        <ModalBody>
          <SubscribeDeviceForm toggle={toggle} user={user}  userModules={userModules} setUserModules={setUserModules} allModules={allModules}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddDeviceToDealer