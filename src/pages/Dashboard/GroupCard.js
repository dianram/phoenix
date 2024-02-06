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
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import GroupItem from 'components/GroupItem';
import { addItemToGroup } from 'helpers/firebase_helper';
import MassiveShutdown from 'components/MassiveShutdown';
import { getModules } from "../../helpers/modulesHelper"

const GroupCard = ({ groupName, groupItems, user, setGroups, groups }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const idValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      id: '',
    },
    validationSchema: Yup.object().shape({
      id: Yup.string().required("Please Enter ID"),
    }),
    onSubmit: (values) => {
    addItemToGroup(groupName, values.id, user, groups, setGroups, groupItems)
    toggle()
    }
  });

  return (
    <Col xl={4} md={6}>
    <Card className='mt-4 shadow' color="light">
      <CardBody>
        <CardHeader className='mb-4 border-bottom'>
          {groupName.toUpperCase()}
        </CardHeader>
        {groupItems 
          ? groupItems.map(groupItem => (
          <GroupItem
            key={groupItem}
            item={groupItem}
            groupName={groupName}
            user={user}
            setGroups={setGroups}
            groups={groups}
            groupItems={groupItems}
          />
          ))
          : <CardText className="border-bottom">No members or items in this group</CardText>
        }
        <CardFooter>
          <div className='d-inline-flex justify-content-center'>
            <Form 
              className='my-2 p-2 d-flex justify-content-center'
              onSubmit={(e) => e.preventDefault()}
            >
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
                <Form 
                  className='my-2 p-2 d-flex justify-content-center'
                  onSubmit={(e) => {
                    e.preventDefault()
                    return false;
                  }}
                >
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="id">ID</Label>
                    <Input
                      name="id"
                      className="form-control"
                      placeholder="Enter ID"
                      type="text"
                      id="id"
                      onChange={idValidation.handleChange}
                      onBlur={idValidation.handleBlur}
                      value={idValidation.values.id || ""}
                      invalid={
                        idValidation.touched.id && idValidation.errors.id ? true : false
                      }
                    />
                    {idValidation.touched.id && idValidation.errors.id ? (
                      <FormFeedback type="invalid">{idValidation.errors.id}</FormFeedback>
                    ) : null}
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={e => idValidation.handleSubmit()}>
                  Add
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <MassiveShutdown modules={getModules(groupItems)}/>
        </CardFooter>       
      </CardBody>
      
    </Card>
  </Col>
  )
}

export default GroupCard