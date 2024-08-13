import PropTypes from 'prop-types';
import React, { useEffect, useState, useReducer } from "react";
import firebase from "firebase/compat/app"
import { doc, getDoc } from "firebase/firestore"
import "firebase/compat/firestore"

// Add the Firebase products that you want to use
import "firebase/compat/auth" 
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";

// Custom Scrollbar
import SimpleBar from "simplebar-react";

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import smimg1 from "../../assets/images/small/img-1.jpg";
import smimg2 from "../../assets/images/small/img-2.jpg";

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart";
import RadialChart from "../AllCharts/apex/apexdonut";
import Apexdonut from "../AllCharts/apex/apexdonut1";
import SparkLine from "../AllCharts/sparkline/sparkline";
import SparkLine1 from "../AllCharts/sparkline/sparkline1";
import Salesdonut from "../AllCharts/apex/salesdonut";

import "chartist/dist/scss/chartist.scss";

//i18n
import { withTranslation } from "react-i18next";

// Phoenix components
import MasterDashboard from './MasterDashboard';
import UserDashboard from './UserDashboard';
import UiButtons from 'pages/Ui/UiButtons';
import { useSelector } from 'react-redux';
import { getUserInfo } from 'helpers/firebase_helper';
import { userTypes } from 'constants/userTypes';

const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState("")

  
  useEffect(() => {
    getUserInfo()
    .then(currentUserInfo => {
      setUser(currentUserInfo)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })
  }, [])


  const toggle = () => {
    setMenu(!menu);
  };

  document.title = "Dashboard | Phoenix - Immobilizer";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Phoenix Dashboard</li>
                </ol>
              </Col>

            </Row>
          </div>
          {(user.role === userTypes.COSTUMER || user.role === userTypes.DEALER
            ? < UserDashboard user={user} />
            : <MasterDashboard user={user} /> 
          )}
        </Container>
      </div>

    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any
};

export default withTranslation()(Dashboard);
