import { removeItemFromGroup } from 'helpers/firebase_helper';
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  CardText,
} from 'reactstrap';

const GroupItem = ({ item, groupName, user, setGroups, groups, groupItems }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleRemove = () => {
    removeItemFromGroup(user, item, groupName, groups, setGroups, groupItems)
    toggle()
  }

  return (
    <div className='d-flex justify-content-between align-items-baseline border-bottom'>
      <CardText key={item}>{item}</CardText>
      <Form 
        className='mb-2 p-1 d-flex justify-content-center'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Button color="secondary" onClick={toggle}>
        -
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Remove user/item from the group</ModalHeader>
        <ModalBody>
          Are you sure you want to remove {item} from {groupName} ?.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Remove
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default GroupItem