import React from 'react'
import { Form, FormFeedback, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


const UserRegistrationForm = ({ validation }) => {
  return (
    <>
      <Form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
        action="#">

        <div className="mb-3">
          <Label className="form-label" htmlFor="userEmail">Email</Label>
          <Input
            name="email"
            className="form-control"
            placeholder="Enter Email"
            type="email"
            id="userEmail"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.email || ""}
            invalid={
              validation.touched.email && validation.errors.email ? true : false
            }
          />
          {validation.touched.email && validation.errors.email ? (
            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="userFullName">User Full Name</Label>
          <Input
            name="userFullName"
            className="form-control"
            placeholder="Enter User Full Name"
            type="text"
            id="userFullName"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.userFullName || ""}
            invalid={
              validation.touched.userFullName && validation.errors.userFullName ? true : false
            }
          />
          {validation.touched.userFullName && validation.errors.userFullName ? (
            <FormFeedback type="invalid">{validation.errors.userFullName}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="userPassword">Password</Label>
          <Input
            name="password"
            value={validation.values.password || ""}
            type="password"
            id="userPassword"
            className="form-control"
            placeholder="Enter Password"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.password && validation.errors.password ? true : false
            }
          />
          {validation.touched.password && validation.errors.password ? (
            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="userAddress">Address</Label>
          <Input
            name="address"
            value={validation.values.address || ""}
            type="text"
            id="userAddress"
            className="form-control"
            placeholder="Enter Address"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.address && validation.errors.address ? true : false
            }
          />
          {validation.touched.address && validation.errors.address ? (
            <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="userPhone">Phone</Label>
          <Input
            name="phone"
            value={validation.values.phone || ""}
            type="text"
            id="userPhone"
            className="form-control"
            placeholder="Enter Phone"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.phone && validation.errors.phone ? true : false
            }
          />
          {validation.touched.phone && validation.errors.phone ? (
            <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label className="form-label" htmlFor="userLocation">Location</Label>
          <Input
            name="location"
            value={validation.values.location || ""}
            type="text"
            id="userLocation"
            className="form-control"
            placeholder="Enter State"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.location && validation.errors.location ? true : false
            }
          />
          {validation.touched.location && validation.errors.location ? (
            <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3 row">
          <div className="col-12 text-end">
            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
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

export default UserRegistrationForm