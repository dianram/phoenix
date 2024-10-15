import React, { useState } from 'react'
import { Form, Label, Input, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { createDeviceGroup } from 'helpers/firebase_helper';
import CustomAlert from 'components/CustomAlert';

/**
 * The CreateGroupForm component is a form that allows users to input a group name and select devices,
 * with validation using Formik and Yup, and onSubmit function to create a group and toggle the form.
 * @returns The `CreateGroupForm` component is being returned.
 */
const CreateGroupForm = ({ toggle, user, groups, setGroups }) => {
  const [ editFeedBack, setEditFeedBack ] = useState("")
  const [editFeedBackVisible, setEditFeedBackVisible] = useState(true)
  const groupValidation = useFormik({
    enableReinitialize: true,
  
    initialValues: {
      groupName: '',
      devices: [],  // array para manejar selección múltiple
    },
    validationSchema: Yup.object().shape({
      groupName: Yup.string().required("Please Enter Group Name"),
      devices: Yup.array().min(1, "Please choose at least one device").required("Please choose group devices"),
    }),
    onSubmit: (values, { resetForm }) => {
      createDeviceGroup(values.groupName, user.id, values.devices, setGroups, groups)
      .then(() => {
        setEditFeedBack({
          message: 'the group was created successfully',
          typeOfAlert: 'success'
        })
        setEditFeedBackVisible(true)
        resetForm()
      })
      .catch(error => {
        console.error("Error:", error);
      });
      // createGroup(values.groupName, values.devices, user, groups, setGroups)
    }
  });

  // Manejador para los checkboxes
  const handleDeviceChange = (e) => {
    const { value, checked } = e.target;
    const { devices } = groupValidation.values;

    if (checked) {
      groupValidation.setFieldValue("devices", [...devices, value]);
    } else {
      groupValidation.setFieldValue(
        "devices",
        devices.filter((device) => device !== value)
      );
    }
  };

  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        groupValidation.handleSubmit();
        return false;
      }}>
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
          <Label for="devices">Select devices</Label>
          {user.subCollections.dealer_devices.map((device, index) => (
            <div key={index} className="form-check">
              <Input
                name="devices"
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${index}`}
                value={device.id}
                onChange={handleDeviceChange}  // Manejador personalizado
                onBlur={groupValidation.handleBlur}
                checked={groupValidation.values.devices.includes(device.id)}
                invalid={
                  groupValidation.touched.devices && groupValidation.errors.devices ? true : false
                }
              />
              <Label for={`checkbox-${index}`} className="form-check-label">
                {device.id}
              </Label>
            </div>
          ))}
          {groupValidation.touched.devices && groupValidation.errors.devices && (
            <FormFeedback type="invalid">{groupValidation.errors.devices}</FormFeedback>
          )}
        </div>

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn w-md waves-effect waves-light" style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }} type="submit">Submit</button>
          </div>
        </div>

        <div className="mt-2 mb-0 row">
          <div className="col-12 mt-4">
            <p className="mb-0">By registering you agree to the Phoenix <Link to="#" className="text-primary">Terms of Use</Link></p>
          </div>
        </div>
        {editFeedBack && (
          <CustomAlert
            message={editFeedBack.message}
            typeOfAlert={editFeedBack.typeOfAlert}
            editFeedBackVisible={editFeedBackVisible}
            setEditFeedBackVisible={setEditFeedBackVisible}
          />
        )}
      </Form>
    </>
  )
}

export default CreateGroupForm
