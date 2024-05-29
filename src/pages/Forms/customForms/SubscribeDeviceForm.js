import React, { useState } from 'react'
import { Form, Label, Input, FormFeedback } from "reactstrap";

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { addModuleToUserState, isValidIDToSubscribe } from 'helpers/modulesHelper';
import { addModuleToUserOnFireBase } from 'helpers/firebase_helper';

/**
 * The SubscribeDeviceForm component in JavaScript handles subscription validation and form submission
 * for adding modules to a user's account.
 * @returns The `SubscribeDeviceForm` component is being returned. It is a form component that allows a
 * user to subscribe to a module by entering its ID. The form includes input fields for the module ID,
 * validation messages for the input field, and a submit button. The form also displays a message if
 * the module ID is not valid for subscription.
 */
const SubscribeDeviceForm = ({allModules, userModules, setUserModules, user, toggle}) => {
  const [isValidID, setIsValidID] = useState("")
  const subscribeValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      id: '',
    },
    validationSchema: Yup.object().shape({
      id: Yup.string().required("Please Enter id"),
    }),
    onSubmit: (values) => {
      if (isValidIDToSubscribe(values.id, allModules, user)) {
        addModuleToUserOnFireBase(user.uid, values.id, user.modules)
        addModuleToUserState(userModules, setUserModules, values.id, allModules)
        toggle()
      } else {
        setIsValidID("The module is not on stock or It belongs to you already")
      }
    //  createGroup(values.groupName, values.id, user, groups, setGroups)
    }
  });

  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        subscribeValidation.handleSubmit();
        return false;
      }}
        action="#">

        <div className="mb-3">
          <Label className="form-label" htmlFor="id">module ID</Label>
          <Input
            name="id"
            className="form-control"
            placeholder="Enter ID"
            type="text"
            id="id"
            onChange={subscribeValidation.handleChange}
            onBlur={subscribeValidation.handleBlur}
            value={subscribeValidation.values.id || ""}
            invalid={
              subscribeValidation.touched.id && subscribeValidation.errors.id ? true : false
            }
          />
          {subscribeValidation.touched.id && subscribeValidation.errors.id ? (
            <FormFeedback type="invalid">{subscribeValidation.errors.id}</FormFeedback>
          ) : null}
          {isValidID}
        </div>

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn w-md waves-effect waves-light" style={{backgroundColor: '#9AC1D8', color: 'white'}} type="submit">Submit</button>
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

export default SubscribeDeviceForm