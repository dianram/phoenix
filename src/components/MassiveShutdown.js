import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';

import { modulesShutDownOnFireStore } from 'helpers/firebase_helper'
import { fewModulesStateUpdate, modulesStateUpdate } from 'helpers/modulesHelper';
/**
 * The MassiveShutdown function in JavaScript handles a modal for initiating a massive shutdown process
 * for devices.
 * @returns The `MassiveShutdown` component is being returned. It consists of a button labeled "Massive
 * ShutDown" that triggers a modal when clicked. The modal displays a warning message about shutting
 * down all devices and provides options to either proceed with the shutdown or cancel.
 */
const MassiveShutdown = ({ allModules, modulesToUpdate, setModules, areAllModules, setUserModules = "" }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    modulesShutDownOnFireStore(modulesToUpdate)
    if (areAllModules) {
      modulesStateUpdate(allModules, setModules)
    } else {
      fewModulesStateUpdate(allModules, modulesToUpdate, setModules, setUserModules)
    }
    toggle()
  }
  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 d-flex justify-content-center'>
        <Button onClick={toggle} style={{ backgroundColor: '#ED1C24', border: 'none' }}>
          Massive ShutDown
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Massive ShutDown</ModalHeader>
        <ModalBody>
          WARING!! If you press "I understand" all the devices will be setup to off and each user will must to power on.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            I understand
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}


export default MassiveShutdown