import { userTypes } from 'constants/userTypes'
import AddDeviceToDealerForm from 'pages/Forms/customForms/AddDeviceToDealerForm'
import AddDeviceToEndUserForm from 'pages/Forms/customForms/AddDeviceToEndUserFrom'
import React, { useState } from 'react'
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const UserSmallCard = ({ name, uid, userRole, setActionsFlag, mainToggle, isDealer, currentUserID }) => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  const handleClick = () => {
    setActionsFlag(true)
    toggle()
    mainToggle()
  }

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
          {userRole === userTypes.COSTUMER && < AddDeviceToEndUserForm allDevices={''} endUserId={uid} toggle isDealer dealerID={currentUserID}/>}
          {userRole === userTypes.DEALER && < AddDeviceToDealerForm allDevices={''} dealerId={uid} toggle />}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClick}>
            {setActionsFlag ?  'Done' : 'Cancel'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UserSmallCard