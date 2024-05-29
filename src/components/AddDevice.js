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
/**
 * The AddDevice function creates a modal for adding a new device with a form inside.
 * @returns The `AddDevice` component is being returned. It consists of a button labeled "Add a new
 * device" that, when clicked, opens a modal with a form to add a new device. The modal includes a
 * header "New Device", the form itself, and a "Cancel" button to close the modal.
 */
const AddDevice = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='p-4 pt-1 d-flex justify-content-center'>
        <Button style={{backgroundColor: '#9AC1D8', color: 'white', border: 'none' }} onClick={toggle}>
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