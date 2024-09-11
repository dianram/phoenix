import { getCollectionFromFirestore } from 'helpers/firebase_helper';
import SubscribeDeviceForm from 'pages/Forms/customForms/SubscribeDeviceForm';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import UserSmallCard from './UserSmallCard';
import { userTypes } from 'constants/userTypes';

/**
 * The function `AddDeviceToEndUser` renders a form with a button to subscribe a device, which opens a
 * modal for subscribing a device with additional form fields.
 * @returns The `AddDeviceToEndUser` component is being returned. It consists of a form with a button to
 * subscribe a device. When the button is clicked, a modal opens up with a form to subscribe a device.
 * The modal includes a header, body with the subscription form, and a footer with a cancel button.
 */
const AddDeviceToEndUser = ({ setActionsFlag, isDealer=false, currentUserID='', allModules, currentUser}) => {
  const [modal, setModal] = useState(false)
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("users")
      .then(res => {
        const endUsers = res.filter(endUser => endUser.role === userTypes.COSTUMER)
        setUsers(endUsers)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])


  const mainToggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 pt-2 d-flex justify-content-center'>
        <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }}  onClick={mainToggle}>
          Add Device to a End User
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={mainToggle}
      >
        <ModalHeader toggle={mainToggle}>Select the user</ModalHeader>
        <ModalBody  style={{maxHeight: '500px', overflowY: 'auto'}}>
          {users.map(user => <UserSmallCard name={user.name} uid={user.uid} key={user.uid} userRole={user.role} setActionsFlag={setActionsFlag} mainToggle={mainToggle} isDealer currentUserID={currentUserID} allModules={allModules} currentUser={currentUser}/>)}
          {/* <SubscribeDeviceForm toggle={toggle} user={user}  userModules={userModules} setUserModules={setUserModules} allModules={allModules}/> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={mainToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddDeviceToEndUser
