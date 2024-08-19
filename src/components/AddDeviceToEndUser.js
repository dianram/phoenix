import { getCollectionFromFirestore } from 'helpers/firebase_helper';
import SubscribeDeviceForm from 'pages/Forms/customForms/SubscribeDeviceForm';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import UserSmallCard from './UserSmallCard';

/**
 * The function `AddDeviceToEndUser` renders a form with a button to subscribe a device, which opens a
 * modal for subscribing a device with additional form fields.
 * @returns The `AddDeviceToEndUser` component is being returned. It consists of a form with a button to
 * subscribe a device. When the button is clicked, a modal opens up with a form to subscribe a device.
 * The modal includes a header, body with the subscription form, and a footer with a cancel button.
 */
const AddDeviceToEndUser = () => {
  const [modal, setModal] = useState(false)
  const [ users, setUsers ] = useState([])
  useEffect(() => {
    getCollectionFromFirestore("users")
      .then(res => {
        const endUsers = res.filter(endUser => endUser.role === 'end_user')
        setUsers(endUsers)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])

  const toggle = () => setModal(!modal);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} className='my-4 p-4 pt-2 d-flex justify-content-center'>
        <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }}  onClick={toggle}>
          Add Device to a End User
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Select the user</ModalHeader>
        <ModalBody  style={{maxHeight: '500px', overflowY: 'auto'}}>
          {users.map(user => <UserSmallCard name={user.name} uid={user.uid} key={user.uid}/>)}
          {/* <SubscribeDeviceForm toggle={toggle} user={user}  userModules={userModules} setUserModules={setUserModules} allModules={allModules}/> */}
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

export default AddDeviceToEndUser
