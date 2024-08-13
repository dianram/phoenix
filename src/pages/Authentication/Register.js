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

  // const { user } = useSelector(state => ({
  //   user: state.Account.user,
  // }));
  const [ isUserCreated, setIsUserCreated ] = useState(false)

  const [userType, setUserType] = useState('')
  const [ showForm, setShowForm ] = useState(false)
  useEffect(() => {
    if (isUserCreated) {
      setTimeout(() => history("/login"), 3000);
    }

    // setTimeout(() => {
    //     dispatch(resetRegisterFlag());
    // }, 3000);

  }, [dispatch, isUserCreated, history]);


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
      dispatch(registerUser({...values, role: userType }));
      setShowForm(false)
      setIsUserCreated(true)
    }
  });

  const dealerValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      dealerLocation: '',
      dealerReceiver: '',
      dealerPhone: '',
      dealerAddress: '',
      dealerPassword: '',
      dealerName: '',
      dealerEmail: ''
    },
    validationSchema: Yup.object({
      dealerEmail: Yup.string().required("Please Enter Your Email"),
      dealerName: Yup.string().required("Please Enter Your Dealer Name"),
      dealerLocation: Yup.string().required("Please Enter Your State"),
      dealerReceiver: Yup.string().required("Please Enter Receiver Name"),
      dealerPhone: Yup.string().required("Please Enter Phone"),
      dealerAddress: Yup.string().required("Please Enter Address"),
      dealerPassword: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser({...values, role: userType}));
      setShowForm(false)
      setIsUserCreated(true)
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
                    {isUserCreated ? (
                      <Alert color="success" style={{ marginTop: "13px" }} className="mt-5">
                        Register User Successful
                      </Alert>
                    ) : null}
                      < CustomDropdown direction="down" setUserType={setUserType} setShowFrom={setShowForm}/>
                      {showForm &&  userFormSelection()}
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
                  © {new Date().getFullYear()} Phoenix | Immobilizer{" "}
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
