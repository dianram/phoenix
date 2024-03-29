import CreateGroupForm from 'pages/Forms/CreateGroupForm';
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';

const CreateGroup = ({ user, groups, setGroups }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 d-flex justify-content-center'>
        <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }} onClick={toggle}>
          Add a new group
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Device</ModalHeader>
        <ModalBody>
          <CreateGroupForm toggle={toggle} user={user} groups={groups} setGroups={setGroups}/>
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

export default CreateGroup