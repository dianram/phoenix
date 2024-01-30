import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
} from 'reactstrap';

const GroupCard = ({ groupName, groupItems }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Col xl={3} md={6}>
    <Card className='mt-4 shadow' color="light">
      <CardBody>
        <CardHeader className='mb-4 border-bottom'>
          {groupName}
        </CardHeader>
        {groupItems 
          ? groupItems.map(groupItem => (
          <CardText className="border-bottom" key={groupItem}>{groupItem}</CardText>
          ))
          : <CardText className="border-bottom">No members or items in this group</CardText>
        }
        <CardFooter>
          <div className='d-inline-flex justify-content-center'>
            <Form onSubmit={(e) => e.preventDefault()} className='my-2 p-2 d-flex justify-content-center'>
              <Button color="primary" onClick={toggle}>
                Add Member/Item
              </Button>
            </Form>
            <Modal
              isOpen={modal}
              toggle={toggle}
            >
              <ModalHeader toggle={toggle}>Add to group</ModalHeader>
              <ModalBody>
                Add a new member/item to this group.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  Add
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardFooter>       
      </CardBody>
      
    </Card>
  </Col>
  )
}

export default GroupCard