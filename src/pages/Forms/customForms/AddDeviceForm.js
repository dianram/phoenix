import React from 'react'
import { Form, Label, Input, FormFeedback } from "reactstrap";
import { useNavigate } from 'react-router-dom';

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { addNewDeviceToFirestore } from 'helpers/firebase_helper';


/**
 * The AddDeviceForm component in JavaScript handles form validation and submission for adding a new
 * device to Firestore.
 * @returns The `AddDeviceForm` component is being returned. It is a form component that allows users
 * to input information about a new device. The form includes fields for asset description, asset name,
 * asset status, batch number, battery voltage, module install date, module owner, module PIN, module
 * state, USB input voltage, and VIN number.
 */
const AddDeviceForm = ({ toggle }) => {
  const navigate = useNavigate()
  const deviceValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      assetDescription: '',
      assetName: '',
      assetStatus: '',
      batchNumber: '',
      batteryVoltage: '',
      moduleInstallDate: '',
      moduleOwner: '',
      modulePIN: '',
      moduleState: '',
      usbInputVoltage: '',
      vinNumber: ''
    },
    validationSchema: Yup.object().shape({
      assetDescription: Yup.string().required("Please Enter Asset Description"),
      assetName: Yup.string().required("Please Enter Your Asset Name"),
      assetStatus: Yup.string().required("Please Enter Your Asset Status"),
      batchNumber: Yup.string().required("Please Enter Batch Number"),
      batteryVoltage: Yup.string().required("Please Enter Battery Voltage"),
      moduleInstallDate: Yup.date().required("Please Enter Module Install Date"),
      moduleOwner: Yup.string().required("Please Enter Module Owner ID"),
      modulePIN: Yup.string().required("Please Enter Your Module PIN"),
      moduleState: Yup.string().required("Please Enter Module Location"),
      usbInputVoltage: Yup.string().required("Please Enter Your USB Input Voltage"),
      vinNumber: Yup.string().required("Please Enter Vin Number"),
    }),
    onSubmit: async (values) => {
      await addNewDeviceToFirestore(values)
      toggle()
      navigate(0)
    }
  });

  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        deviceValidation.handleSubmit();
        return false;
      }}
        action="#">

        <div className="mb-3">
          <Label className="form-label" htmlFor="assetDescription">Asset Description</Label>
          <Input
            name="assetDescription"
            className="form-control"
            placeholder="Enter Asset Description"
            type="text"
            id="assetDescription"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            value={deviceValidation.values.assetDescription || ""}
            invalid={
              deviceValidation.touched.assetDescription && deviceValidation.errors.assetDescription ? true : false
            }
          />
          {deviceValidation.touched.assetDescription && deviceValidation.errors.assetDescription ? (
            <FormFeedback type="invalid">{deviceValidation.errors.assetDescription}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="assetName">Asset Name</Label>
          <Input
            name="assetName"
            className="form-control"
            placeholder="Enter Asset Name"
            type="text"
            id="assetName"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            value={deviceValidation.values.assetName || ""}
            invalid={
              deviceValidation.touched.assetName && deviceValidation.errors.assetName ? true : false
            }
          />
          {deviceValidation.touched.assetName && deviceValidation.errors.assetName ? (
            <FormFeedback type="invalid">{deviceValidation.errors.assetName}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="assetStatus">Asset Status</Label>
          <Input
            name="assetStatus"
            value={deviceValidation.values.assetStatus || ""}
            type="text"
            id="assetStatus"
            className="form-control"
            placeholder="Enter Password"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.assetStatus && deviceValidation.errors.assetStatus ? true : false
            }
          />
          {deviceValidation.touched.assetStatus && deviceValidation.errors.assetStatus ? (
            <FormFeedback type="invalid">{deviceValidation.errors.assetStatus}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="batchNumber">Batch Number</Label>
          <Input
            name="batchNumber"
            value={deviceValidation.values.batchNumber || ""}
            type="text"
            id="batchNumber"
            className="form-control"
            placeholder="Enter Batch Number"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.batchNumber && deviceValidation.errors.batchNumber ? true : false
            }
          />
          {deviceValidation.touched.batchNumber && deviceValidation.errors.batchNumber ? (
            <FormFeedback type="invalid">{deviceValidation.errors.batchNumber}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="moduleInstallDate">Module Install Date</Label>
          <Input
            name="moduleInstallDate"
            value={deviceValidation.values.moduleInstallDate || ""}
            type="date"
            id="moduleInstallDate"
            className="form-control"
            placeholder="Enter Phone"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.moduleInstallDate && deviceValidation.errors.moduleInstallDate ? true : false
            }
          />
          {deviceValidation.touched.moduleInstallDate && deviceValidation.errors.moduleInstallDate ? (
            <FormFeedback type="invalid">{deviceValidation.errors.moduleInstallDate}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="moduleOwner">Module Owner</Label>
          <Input
            name="moduleOwner"
            value={deviceValidation.values.moduleOwner || ""}
            type="text"
            id="moduleOwner"
            className="form-control"
            placeholder="Enter State"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.moduleOwner && deviceValidation.errors.moduleOwner ? true : false
            }
          />
          {deviceValidation.touched.moduleOwner && deviceValidation.errors.moduleOwner ? (
            <FormFeedback type="invalid">{deviceValidation.errors.moduleOwner}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="modulePIN">Module PIN</Label>
          <Input
            name="modulePIN"
            value={deviceValidation.values.modulePIN || ""}
            type="text"
            id="modulePIN"
            className="form-control"
            placeholder="Enter Module PIN"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.modulePIN && deviceValidation.errors.modulePIN ? true : false
            }
          />
          {deviceValidation.touched.modulePIN && deviceValidation.errors.modulePIN ? (
            <FormFeedback type="invalid">{deviceValidation.errors.modulePIN}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="moduleState">Module Location</Label>
          <Input
            name="moduleState"
            value={deviceValidation.values.moduleState || ""}
            type="text"
            id="moduleState"
            className="form-control"
            placeholder="Enter Module Location"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.moduleState && deviceValidation.errors.moduleState ? true : false
            }
          />
          {deviceValidation.touched.moduleState && deviceValidation.errors.moduleState ? (
            <FormFeedback type="invalid">{deviceValidation.errors.moduleState}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="vinNumber">Vin Number</Label>
          <Input
            name="vinNumber"
            value={deviceValidation.values.vinNumber || ""}
            type="text"
            id="vinNumber"
            className="form-control"
            placeholder="Enter Vin Number"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.vinNumber && deviceValidation.errors.vinNumber ? true : false
            }
          />
          {deviceValidation.touched.vinNumber && deviceValidation.errors.vinNumber ? (
            <FormFeedback type="invalid">{deviceValidation.errors.vinNumber}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="batteryVoltage">Battery Voltage</Label>
          <Input
            name="batteryVoltage"
            value={deviceValidation.values.batteryVoltage || ""}
            type="text"
            id="batteryVoltage"
            className="form-control"
            placeholder="Enter Battery Voltage"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.batteryVoltage && deviceValidation.errors.batteryVoltage ? true : false
            }
          />
          {deviceValidation.touched.batteryVoltage && deviceValidation.errors.batteryVoltage ? (
            <FormFeedback type="invalid">{deviceValidation.errors.batteryVoltage}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="usbInputVoltage">USB Input Voltage</Label>
          <Input
            name="usbInputVoltage"
            value={deviceValidation.values.usbInputVoltage || ""}
            type="text"
            id="usbInputVoltage"
            className="form-control"
            placeholder="Enter USB Input Voltage"
            onChange={deviceValidation.handleChange}
            onBlur={deviceValidation.handleBlur}
            invalid={
              deviceValidation.touched.usbInputVoltage && deviceValidation.errors.usbInputVoltage ? true : false
            }
          />
          {deviceValidation.touched.usbInputVoltage && deviceValidation.errors.usbInputVoltage ? (
            <FormFeedback type="invalid">{deviceValidation.errors.usbInputVoltage}</FormFeedback>
          ) : null}
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

export default AddDeviceForm