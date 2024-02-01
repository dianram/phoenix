import React from 'react'
import { Form, Label, Input, FormFeedback } from "reactstrap";

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { createGroup } from 'helpers/firebase_helper';


const CreateGroupForm = ({ toggle, user, groups, setGroups }) => {
  console.log("user from creategroup form: ", user)
  const groupValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      groupName: '',
      id: '',
    },
    validationSchema: Yup.object().shape({
      groupName: Yup.string().required("Please Enter Group Name"),
      id: Yup.string().required("Please Enter id"),
    }),
    onSubmit: (values) => {
     createGroup(values.groupName, values.id, user, groups, setGroups)
     toggle()
    }
  });

  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        groupValidation.handleSubmit();
        return false;
      }}
        action="#">

        <div className="mb-3">
          <Label className="form-label" htmlFor="groupName">Group Name</Label>
          <Input
            name="groupName"
            className="form-control"
            placeholder="Enter Group Name"
            type="text"
            id="groupName"
            onChange={groupValidation.handleChange}
            onBlur={groupValidation.handleBlur}
            value={groupValidation.values.groupName || ""}
            invalid={
              groupValidation.touched.groupName && groupValidation.errors.groupName ? true : false
            }
          />
          {groupValidation.touched.groupName && groupValidation.errors.groupName ? (
            <FormFeedback type="invalid">{groupValidation.errors.groupName}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="id">id/user ID</Label>
          <Input
            name="id"
            className="form-control"
            placeholder="Enter item/user ID"
            type="text"
            id="id"
            onChange={groupValidation.handleChange}
            onBlur={groupValidation.handleBlur}
            value={groupValidation.values.id || ""}
            invalid={
              groupValidation.touched.id && groupValidation.errors.id ? true : false
            }
          />
          {groupValidation.touched.id && groupValidation.errors.id ? (
            <FormFeedback type="invalid">{groupValidation.errors.id}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Submit</button>
          </div>
        </div>

        <div className="mt-2 mb-0 row">
          <div className="col-12 mt-4">
            <p className="mb-0">By registering you agree to the Phoenix <Link to="#" className="text-primary">Terms of Use</Link></p>
          </div>
        </div>
      </Form>
    </>
  )
}

export default CreateGroupForm