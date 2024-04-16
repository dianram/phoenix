import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Form,
  FormFeedback,
  Label,
  Input
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Redux
import { connect, useDispatch } from "react-redux";
import withRouter from 'components/Common/withRouter';

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/user-4.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import nonImgAvatar from '../../assets/images/users/nonUser.png'
import { getUserInfo, updateUserProfile } from 'helpers/firebase_helper';
import { userTypes } from 'constants/userTypes';
import { set } from 'lodash';
import CustomAlert from 'components/CustomAlert';
import UploadModal from 'components/UploadModal';

const UserProfile = props => {
  // const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [ user, setUser ] = useState("")
  const [ editFeedBack, setEditFeedBack ] = useState("")
  const [editFeedBackVisible, setEditFeedBackVisible] = useState(true)
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    getUserInfo()
    .then(currentUserInfo => {
      setUser(currentUserInfo)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: user.name || '',
      address: user.address || '',
      phone: user.phone || '',
      state: user.state || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your User Name"),
      address: Yup.string().required("Please Enter Your Address"),
      phone: Yup.string().required("Please Enter Your Phone"),
      state: Yup.string().required("Please Enter Your Location"),
    }),
    onSubmit: (values) => {
      if (user.userType === userTypes.DEALER) {
        updateUserProfile(values, 'dealerships', user.uid, setEditFeedBack, setUser, user)
      } else {
        updateUserProfile(values, 'users', user.uid, setEditFeedBack, setUser, user)
      }
      setEditFeedBackVisible(true)
      // dispatch(editProfile(values));
    }
  });

  const saveUploadImgOnDB = (pictureObj) => {
    if (user.userType === userTypes.DEALER) {
      updateUserProfile(pictureObj, 'dealerships', user.uid, setEditFeedBack, setUser, user)
    } else {
      updateUserProfile(pictureObj, 'users', user.uid, setEditFeedBack, setUser, user)
    }
    setEditFeedBackVisible(true)
  }
  document.title = "Profile | Phoenix Immobilizer";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Phoenix" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={user.picture ? user.picture : nonImgAvatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                        onClick={toggleModal}
                        style={{ cursor: 'pointer' }}
                      />
                      <p style={{ fontSize: '0.7rem', width: '80px', textAlign: 'center' }}>Upload Image</p>
                    </div>
                    <div className="align-self-center flex-1">
                      <div className="text-muted">
                        <h5>{user.name}</h5>
                        <p className="mb-1">Email: {user.email}</p>
                        <p className="mb-0">ID: {user.uid}</p>
                        <p className="mb-0">Address: {user.address}</p>
                        <p className="mb-0">State: {user.state}</p>
                        <p className="mb-0">Phone: {user.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Edit Profile</h4>

          <Card>
            <CardBody>

              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="name"
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name ? true : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">Address</Label>
                  <Input
                    name="address"
                    className="form-control"
                    placeholder="Enter User Address"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address || ""}
                    invalid={
                      validation.touched.address && validation.errors.address ? true : false
                    }
                  />
                  {validation.touched.address && validation.errors.address ? (
                    <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">User State</Label>
                  <Input
                    name="state"
                    className="form-control"
                    placeholder="Enter User State"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.state || ""}
                    invalid={
                      validation.touched.state && validation.errors.state ? true : false
                    }
                  />
                  {validation.touched.state && validation.errors.state ? (
                    <FormFeedback type="invalid">{validation.errors.state}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">User Phone</Label>
                  <Input
                    name="phone"
                    className="form-control"
                    placeholder="Enter User Phone"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone || ""}
                    invalid={
                      validation.touched.phone && validation.errors.phone ? true : false
                    }
                  />
                  {validation.touched.phone && validation.errors.phone ? (
                    <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                  ) : null}
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" style={{ backgroundColor: '#ed1c24', border: 'none' }}>
                    Edit User 
                  </Button>
                  {editFeedBack && (
                    <CustomAlert
                      message={editFeedBack.message}
                      typeOfAlert={editFeedBack.typeOfAlert}
                      editFeedBackVisible={editFeedBackVisible}
                      setEditFeedBackVisible={setEditFeedBackVisible}
                    />
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
      <UploadModal modal={modal} toggleModal={toggleModal} saveUploadImgOnDB={saveUploadImgOnDB} setEditFeedBack={setEditFeedBack}/>
    </React.Fragment>
  );
};

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
);
