import AddDeviceToEndUserForm from 'pages/Forms/customForms/AddDeviceToEndUserFrom'
import React, { useState } from 'react'
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const UserSmallCard = ({ name, uid }) => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal);

  return (
    <>
      <Card>
        <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline'}}>
          <div>
            {name}
          </div>
          <Button  onClick={toggle} style={{backgroundColor: '#9AC1D8', color: 'white', border: 'none'}}>Add Device</Button>
        </CardBody>
      </Card>
      <Modal
      isOpen={modal}
      toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Select the user</ModalHeader>
        <ModalBody>
          < AddDeviceToEndUserForm allDevices={''} endUserId={uid} toggle/>
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

export default UserSmallCard