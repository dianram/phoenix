import AddDeviceForm from 'pages/Forms/customForms/AddDeviceForm';
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
const AddDevice = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 border d-flex justify-content-center'>
        <Button color="danger" onClick={toggle}>
          Add a new device
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Device</ModalHeader>
        <ModalBody>
          <AddDeviceForm toggle={toggle}/>
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

export default AddDevice