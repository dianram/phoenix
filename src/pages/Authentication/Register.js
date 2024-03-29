import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container, Alert } from "reactstrap";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions";

// Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import images
import logoSm from '../../assets/images/logo-sm.png'
import UserRegistrationForm from "pages/Forms/customForms/UserRegistrationForm";
import CustomDropdown from "pages/Ui/CustomDropdown";
import DealerRegistrationForm from "pages/Forms/customForms/DealerRegistrationForm";
import { userTypes } from "../../constants/userTypes"

const Register = props => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector(state => ({
    user: state.Account.user,
  }));

  const [userType, setUserType] = useState('')
  useEffect(() => {
    if (user) {
      setTimeout(() => history("/login"), 3000);
    }

    // setTimeout(() => {
    //     dispatch(resetRegisterFlag());
    // }, 3000);

  }, [dispatch, user, history]);


  const userValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      userFullName: '',
      password: '',
      address: '',
      phone: '',
      location: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      userFullName: Yup.string().required("Please Enter Your User Full Name"),
      password: Yup.string().required("Please Enter Your Password"),
      address: Yup.string().required("Please Enter Your Address"),
      phone: Yup.string().required("Please Enter Your Phone"),
      location: Yup.string().required("Please Enter Your State"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser({...values, userType}));
    }
  });

  const dealerValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      dealerLocation: '',
      manager: '',
      managerPhone: '',
      dealerPhone: '',
      dealerAddress: '',
      dealerPassword: '',
      dealerlName: '',
      dealerEmail: ''
    },
    validationSchema: Yup.object({
      dealerEmail: Yup.string().required("Please Enter Your Email"),
      dealerlName: Yup.string().required("Please Enter Your Dealer Name"),
      dealerLocation: Yup.string().required("Please Enter Your State"),
      manager: Yup.string().required("Please Enter Manager Name"),
      managerPhone: Yup.string().required("Please Enter Manager Phone"),
      dealerPhone: Yup.string().required("Please Enter Phone"),
      dealerAddress: Yup.string().required("Please Enter Address"),
      dealerPassword: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser({...values, userType}));
    }
  });
  
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.registerUser(values);
  };

  useEffect(() => {
    props.apiError("");
  }, []);

  document.title = "Register | Phoenix Immobilizer";

  const userFormSelection = () => {
    if (userType === userTypes.DEALER) {
      return < DealerRegistrationForm validation={dealerValidation}/>
    } else if (userType === userTypes.COSTUMER) {
      return < UserRegistrationForm validation={userValidation}/>     
    }
    return ""
  }
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="" style={{backgroundColor: '#605C59'}}>
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">Free Register</h5>
                    <p className="text-white-50">Get your free Phoenix Immobilizer account now.</p>
                    <Link to="/index" className="logo logo-admin">
                      <img src={logoSm} height="50" alt="logo" />
                    </Link>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="p-3">
                    {user ? (
                      <Alert color="success" style={{ marginTop: "13px" }} className="mt-5">
                        Register User Successful
                      </Alert>
                    ) : null}
                      < CustomDropdown direction="down" setUserType={setUserType}/>
                      {userFormSelection()}
                      {/* < UserRegistrationForm validation={validation}/> */}
                      
                    {/* <Form className="mt-4" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                      action="#">

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="useremail">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          type="email"
                          id="useremail"
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
                        <Label className="form-label" htmlFor="username">Username</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter Username"
                          type="text"
                          id="username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          id="userpassword"
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
                    </Form> */}
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Websco.{" "}
                  {/* <i className="mdi mdi-heart text-danger" />  */}
                  Diego Ramon
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
};

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);
