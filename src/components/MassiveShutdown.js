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
import { modulesStateUpdate } from 'helpers/modulesHelper';
const MassiveShutdown = ({ modules, setModules }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    modulesShutDownOnFireStore(modules)
    modulesStateUpdate(modules, setModules)
    toggle()
  }
  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 border d-flex justify-content-center'>
        <Button color="danger" onClick={toggle}>
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