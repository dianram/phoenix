import React from 'react'
import { Form, FormFeedback, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";

/**
 * The DealerRegistrationForm component is a form for registering dealers with input fields for email,
 * full name, password, address, phone, location, manager, and manager phone, along with validation
 * handling.
 * @returns The `DealerRegistrationForm` component is being returned. It is a form component that
 * includes input fields for dealer registration information such as email, full name, password,
 * address, phone, location, manager, and manager phone. The form also includes validation logic using
 * the `validation` prop which handles form submission and error display. Finally, there is a submit
 * button for registering the dealer and a link to login.
 */
const DealerRegistrationForm = ({ validation }) => {
  
  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
        action="#">

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerEmail">Email</Label>
          <Input
            name="dealerEmail"
            className="form-control"
            placeholder="Enter Email"
            type="email"
            id="dealerEmail"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.dealerEmail || ""}
            invalid={
              validation.touched.dealerEmail && validation.errors.dealerEmail ? true : false
            }
          />
          {validation.touched.dealerEmail && validation.errors.dealerEmail ? (
            <FormFeedback type="invalid">{validation.errors.dealerEmail}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerName">Dealer Name</Label>
          <Input
            name="dealerName"
            className="form-control"
            placeholder="Enter User Full Name"
            type="text"
            id="dealerName"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.dealerName || ""}
            invalid={
              validation.touched.dealerName && validation.errors.dealerName ? true : false
            }
          />
          {validation.touched.dealerName && validation.errors.dealerName ? (
            <FormFeedback type="invalid">{validation.errors.dealerName}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerPassword">Password</Label>
          <Input
            name="dealerPassword"
            value={validation.values.dealerPassword || ""}
            type="password"
            id="dealerPassword"
            className="form-control"
            placeholder="Enter Password"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerPassword && validation.errors.dealerPassword ? true : false
            }
          />
          {validation.touched.dealerPassword && validation.errors.dealerPassword ? (
            <FormFeedback type="invalid">{validation.errors.dealerPassword}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerAddress">Address</Label>
          <Input
            name="dealerAddress"
            value={validation.values.dealerAddress || ""}
            type="text"
            id="dealerAddress"
            className="form-control"
            placeholder="Enter Address"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerAddress && validation.errors.dealerAddress ? true : false
            }
          />
          {validation.touched.dealerAddress && validation.errors.dealerAddress ? (
            <FormFeedback type="invalid">{validation.errors.dealerAddress}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerPhone">Phone</Label>
          <Input
            name="dealerPhone"
            value={validation.values.dealerPhone || ""}
            type="text"
            id="dealerPhone"
            className="form-control"
            placeholder="Enter Phone"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerPhone && validation.errors.dealerPhone ? true : false
            }
          />
          {validation.touched.dealerPhone && validation.errors.dealerPhone ? (
            <FormFeedback type="invalid">{validation.errors.dealerPhone}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerLocation">Location</Label>
          <Input
            name="dealerLocation"
            value={validation.values.dealerLocation || ""}
            type="text"
            id="dealerLocation"
            className="form-control"
            placeholder="Enter State"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerLocation && validation.errors.dealerLocation ? true : false
            }
          />
          {validation.touched.dealerLocation && validation.errors.dealerLocation ? (
            <FormFeedback type="invalid">{validation.errors.dealerLocation}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerCity">City</Label>
          <Input
            name="dealerCity"
            value={validation.values.dealerCity || ""}
            type="text"
            id="dealerCity"
            className="form-control"
            placeholder="Enter City"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerCity && validation.errors.dealerCity ? true : false
            }
          />
          {validation.touched.dealerCity && validation.errors.dealerCity ? (
            <FormFeedback type="invalid">{validation.errors.dealerCity}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="dealerReceiver">Receiver</Label>
          <Input
            name="dealerReceiver"
            value={validation.values.dealerReceiver || ""}
            type="text"
            id="dealerReceiver"
            className="form-control"
            placeholder="Enter Receiver"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.dealerReceiver && validation.errors.dealerReceiver ? true : false
            }
          />
          {validation.touched.dealerReceiver && validation.errors.dealerReceiver ? (
            <FormFeedback type="invalid">{validation.errors.dealerReceiver}</FormFeedback>
          ) : null}
        </div>

        {/* <div className="mb-3">
          <Label className="form-label" htmlFor="dealerManagerPhone">Manager Phone</Label>
          <Input
            name="managerPhone"
            value={validation.values.managerPhone || ""}
            type="text"
            id="dealerManagerPhone"
            className="form-control"
            placeholder="Enter Manager Phone"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.managerPhone && validation.errors.managerPhone ? true : false
            }
          />
          {validation.touched.managerPhone && validation.errors.managerPhone ? (
            <FormFeedback type="invalid">{validation.errors.managerPhone}</FormFeedback>
          ) : null}
        </div> */}

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn w-md waves-effect waves-light" style={{backgroundColor: '#9AC1D8', color: 'white'}} type="submit">Register</button>
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

export default DealerRegistrationForm
