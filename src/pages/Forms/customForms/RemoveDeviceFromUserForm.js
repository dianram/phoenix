import React, { useState } from 'react'
import { Form, Label, Input, FormFeedback } from "reactstrap";

// Formik deviceValidation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';

const RemoveDeviceFromUserForm = ({ toggle, user, setUserModules, module }) => {

  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        subscribeValidation.handleSubmit();
        return false;
      }}
        action="#">
        

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn btn-danger w-md waves-effect waves-light" style={{ backgroundColor:'#ED1C24' }} type="submit">Lost Device Control</button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default RemoveDeviceFromUserForm