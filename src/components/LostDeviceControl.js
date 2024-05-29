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

/**
 * The `LostDeviceControl` component in JavaScript handles the functionality for a user to remove a
 * module from their profile and lose control of it.
 * @returns The `LostDeviceControl` component is being returned. It consists of a button labeled "Lost
 * Control" that triggers a modal when clicked. The modal displays a warning message about losing
 * control of a device/module and provides options to either proceed with "Lost Device Control" or
 * cancel. The component handles the state of the modal and the actions to be taken when the buttons
 * are clicked.
 */
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