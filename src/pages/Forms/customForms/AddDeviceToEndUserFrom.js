import React, { useEffect, useState } from 'react'
import { Form, Label, Input, FormFeedback, Alert } from "reactstrap";

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { addModuleToUserState, isValidIDToSubscribe, moduleIsInBD } from 'helpers/modulesHelper';
import { addDeviceToEndUser, addEndUserToDevice, addModuleToUserOnFireBase, getAllDeviceEndUsers, isDeviceAssignedToThisDealer } from 'helpers/firebase_helper';
import CustomAlert from 'components/CustomAlert';
import { userTypes } from 'constants/userTypes';

/**
 * The SubscribeDeviceForm component in JavaScript handles subscription validation and form submission
 * for adding modules to a user's account.
 * @returns The `SubscribeDeviceForm` component is being returned. It is a form component that allows a
 * user to subscribe to a module by entering its ID. The form includes input fields for the module ID,
 * validation messages for the input field, and a submit button. The form also displays a message if
 * the module ID is not valid for subscription.
 */
const AddDeviceToEndUserForm = ({ allDevices, endUserId, deviceId, toggle, isDealer, dealerID }) => {
  const [ editFeedBack, setEditFeedBack ] = useState("")
  const [editFeedBackVisible, setEditFeedBackVisible] = useState(true)

  // const [isValidID, setIsValidID] = useState("")
  const subscribeValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      deviceId: '',
    },
    validationSchema: Yup.object().shape({
      deviceId: Yup.string().required("Please Enter Device Serial Number"),
    }),
    onSubmit: (values) => {
      const deviceExist = moduleIsInBD(values.deviceId, allDevices)
      if (!deviceExist) {
        setEditFeedBack({
          message:'The device does not exist',
          typeOfAlert: 'danger'
        })
        setEditFeedBackVisible(true)
      } else if (isDealer) {
        try {
          isDeviceAssignedToThisDealer(values.deviceId, dealerID)
          .then(isDealerOwner => {
            console.log({isDealerOwner})
            if (isDealerOwner) {
              getAllDeviceEndUsers(values.deviceId)
              .then(deviceUsers => {
                if (deviceUsers.length > 0) {
                  setEditFeedBack({
                    message:'The device is assigned already',
                    typeOfAlert: 'danger'
                  })
                  setEditFeedBackVisible(true)
                } else {
                  addEndUserToDevice(values.deviceId, endUserId)
                  addDeviceToEndUser(values.deviceId, endUserId)
                  setEditFeedBack({
                    message:'The device has been assigned correctly',
                    typeOfAlert: 'success'
                  })
                  setEditFeedBackVisible(true)
                }
              })
            } else {
              setEditFeedBack({
                message:'The device is not assigned to you as a dealer',
                typeOfAlert: 'danger'
              })
              setEditFeedBackVisible(true)
            }
          })
        } catch(error) {
          console.log(error)
        }
      } else {
        try {
          getAllDeviceEndUsers(values.deviceId)
          .then(deviceUsers => {
            if (deviceUsers.length > 0) {
              setEditFeedBack({
                message:'The device is assigned already',
                typeOfAlert: 'danger'
              })
            } else {
              addEndUserToDevice(values.deviceId, endUserId)
              addDeviceToEndUser(values.deviceId, endUserId)
              setEditFeedBack({
                message:'The device has been assigned correctly',
                typeOfAlert: 'success'
              })
              setEditFeedBackVisible(true)
            }
          })
        } catch(error) {
          console.log(error)
        }
      }
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
          <Label className="form-label" htmlFor="deviceId">Device Serial Number</Label>
          <Input
            name="deviceId"
            className="form-control"
            placeholder="Enter ID"
            type="text"
            id="deviceId"
            onChange={subscribeValidation.handleChange}
            onBlur={subscribeValidation.handleBlur}
            value={subscribeValidation.values.deviceId || ""}
            invalid={
              subscribeValidation.touched.deviceId && subscribeValidation.errors.deviceId ? true : false
            }
          />
          {subscribeValidation.touched.deviceId && subscribeValidation.errors.deviceId ? (
            <FormFeedback type="invalid">{subscribeValidation.errors.deviceId}</FormFeedback>
          ) : null}
          {editFeedBack && <CustomAlert message={editFeedBack.message} typeOfAlert={editFeedBack.typeOfAlert} editFeedBackVisible={editFeedBackVisible} setEditFeedBackVisible={setEditFeedBackVisible}/>}
        </div>

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn w-md waves-effect waves-light" style={{backgroundColor: '#9AC1D8', color: 'white'}} type="submit">Add Device</button>
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

export default AddDeviceToEndUserForm