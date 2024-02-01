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

const GroupCard = ({ groupName, groupItems }) => {
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
    //  addNewDeviceToFirestore(values)
     toggle()
    }
  });

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
                    idValidation.handleSubmit()
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
                      value={idValidation.values.assetDescription || ""}
                      invalid={
                        idValidation.touched.assetDescription && idValidation.errors.assetDescription ? true : false
                      }
                    />
                    {idValidation.touched.assetDescription && idValidation.errors.assetDescription ? (
                      <FormFeedback type="invalid">{idValidation.errors.assetDescription}</FormFeedback>
                    ) : null}
                  </div>
                </Form>
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