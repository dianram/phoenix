import React, { useEffect, useState } from 'react'
import { Form, Label, Input, FormFeedback, Alert } from "reactstrap";

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { addModuleToUserState, isValidIDToSubscribe } from 'helpers/modulesHelper';
import { addDealerIdToDevice, addDeviceToDealer, addDeviceToEndUser, addEndUserToDevice, addModuleToUserOnFireBase, getAllDeviceEndUsers, isDeviceAssignedToDealer } from 'helpers/firebase_helper';
import CustomAlert from 'components/CustomAlert';

/**
 * The SubscribeDeviceForm component in JavaScript handles subscription validation and form submission
 * for adding modules to a user's account.
 * @returns The `SubscribeDeviceForm` component is being returned. It is a form component that allows a
 * user to subscribe to a module by entering its ID. The form includes input fields for the module ID,
 * validation messages for the input field, and a submit button. The form also displays a message if
 * the module ID is not valid for subscription.
 */
const AddDeviceToDealerForm = ({allDevices, dealerId, toggle }) => {
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
    onSubmit: async (values) => {
      try {
        const isAssigned = await isDeviceAssignedToDealer(values.deviceId);
        
        if (isAssigned) {
          console.log('El dispositivo ya está asignado');
          setEditFeedBack({
            message: 'The device is assigned already',
            typeOfAlert: 'danger'
          });
        } else {
          console.log('Asignando el dispositivo');
          await addDealerIdToDevice(values.deviceId, dealerId);
          await addDeviceToDealer(values.deviceId, dealerId);
          
          setEditFeedBack({
            message: 'The device has been assigned correctly',
            typeOfAlert: 'success'
          });
        }
      
        setEditFeedBackVisible(true);
      } catch (error) {
        console.log(error);
        setEditFeedBack({
          message: 'An error occurred while assigning the device',
          typeOfAlert: 'danger'
        });
        setEditFeedBackVisible(true);
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

export default AddDeviceToDealerForm