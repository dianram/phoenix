import { removeModuleFromUserOnFirestore } from 'helpers/firebase_helper';
import { removeModuleFromUserState } from 'helpers/modulesHelper';
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';

const LostDeviceControl = ({ user, module, setUserModules, userModules }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleLostControl = (e) => {
    removeModuleFromUserOnFirestore(user, module)
    removeModuleFromUserState(userModules, setUserModules, module)
    toggle()
  }

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 d-flex justify-content-center'>
        <Button color="secondary" onClick={toggle}>
          Lost Control
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Lost Device Control</ModalHeader>
        <ModalBody>
          WARING!! If you press "Lost Device Control" You will be removing the module from your profile and you will lost the control of it.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleLostControl}>
            Lost Device Control
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default LostDeviceControl