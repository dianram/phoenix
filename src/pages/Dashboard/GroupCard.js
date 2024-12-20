import React, { useEffect, useState } from 'react'
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
import getReferenceInfo, { addItemToGroup, getReferenceInfoWithSubcollections } from 'helpers/firebase_helper';
import MassiveShutdown from 'components/MassiveShutdown';
import { getFullModules, getModules } from "../../helpers/modulesHelper"
import GroupsControl from 'components/GroupsControl';

/**
 * The GroupCard component renders a card displaying group information and allows users to add new
 * items to the group.
 * @returns The `GroupCard` component is being returned. It consists of a Card component that displays
 * group information, group items, and a button to add a new item to the group. The component also
 * includes a Modal component that allows users to input an ID for the new item to be added to the
 * group. The Modal has input validation for the ID field. Additionally, MassiveShutdown component.
 */
const GroupCard = ({ group, user }) => {
  const [modal, setModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState('')

  // const toggle = () => setModal(!modal);

  useEffect(() => {
    getReferenceInfoWithSubcollections(group.devices_group_id)
    .then(groupData => {
      setGroupInfo(groupData)
    })
  }, [])
  // const idValidation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,
  
  //   initialValues: {
  //     id: '',
  //   },
  //   validationSchema: Yup.object().shape({
  //     id: Yup.string().required("Please Enter ID"),
  //   }),
  //   onSubmit: (values) => {
  //   addItemToGroup(groupName, values.id, user, groups, setGroups, groupItems)
  //   toggle()
  //   }
  // });

  return (
    <Col xl={4} md={6}>
    <Card className='mt-4 shadow' color="light">
      <CardBody>
        <CardHeader className='mb-4 border-bottom'>
          <b>{groupInfo.group_name}</b>
        </CardHeader>
        <p>GROUP ITEMS:</p>
        {groupInfo.group_devices 
          ? groupInfo.group_devices.map(groupItem => (
          <GroupItem
            key={groupItem.id}
            item={groupItem.id}
            groupName={groupInfo.group_name}
            // user={user}
            // setGroups={setGroups}
            // groups={groups}
            // groupItems={groupItems}
          />
          ))
          : <CardText className="border-bottom">No members or items in this group</CardText>
        }
        <CardFooter>
          <GroupsControl user={user} devices={groupInfo.group_devices }/>
          {/* <div className='d-inline-flex justify-content-center'>
            <Form 
              className='my-2 d-flex justify-content-center'
              onSubmit={(e) => e.preventDefault()}
            >
              <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }} onClick={toggle}>
                Add Item
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
                <Button style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }} onClick={e => idValidation.handleSubmit()}>
                  Add
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div> */}
        </CardFooter>       
        {/* <MassiveShutdown allModules={modules} modulesToUpdate={getFullModules(groupItems, modules)} setModules={setModules} areAllModules={false}/> */}
      </CardBody>      
    </Card>
  </Col>
  )
}

export default GroupCard