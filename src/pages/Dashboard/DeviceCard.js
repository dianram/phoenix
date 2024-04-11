import LostDeviceControl from 'components/LostDeviceControl';
import { userTypes } from 'constants/userTypes';
import { singleModuleShutDownOnFireStore } from 'helpers/firebase_helper';
import { updateModules } from 'helpers/modulesHelper';
// import { mqttAction } from 'helpers/mqtt_helpers';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Col,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'

import nonCarImg from '../../assets/images/nonCarImg.png'

const DeviceCard = ({
  moduleID,
  modulePIN,
  moduleInstallDate,
  batchNumber,
  isOn,
  carModulePict,
  modules,
  setModules,
  module,
  userModules,
  setUserModules,
  user
}) => {
  const [isOnToggle, setIsOnToggle] = useState("");

  useEffect(() => {
    setIsOnToggle(isOn)
  }, [isOn])
  
  const onChangeHandle = () => {
    setIsOnToggle(prev => !prev);
    singleModuleShutDownOnFireStore(moduleID, !isOnToggle)
    updateModules(module, moduleID, !isOnToggle, modules, setModules)
  }

  return (
    <Col xl={3} md={6}>
      <Card className='mt-4 shadow' color="light">
        <CardBody>
          <CardHeader className='mb-4 border-bottom'>
            <img src={carModulePict ? carModulePict : nonCarImg} alt='car' style={{ width: '100%' }}/>
            <b>MODULE ID: </b>
            <CardText style={{ fontSize: '0.7rem' }}>{moduleID}</CardText>
          </CardHeader>
          <CardText className="border-bottom">PIN: {modulePIN}</CardText>
          <CardText className="border-bottom">Install Date: {moduleInstallDate}</CardText>
          <CardText className="border-bottom">batchNumber: {batchNumber}</CardText>
          <CardTitle>Active Device</CardTitle>
          <CardFooter style={{ backgroundColor: '#9AC1D8' }}>
            <div className='d-inline-flex justify-content-center'>
              <p style={{marginRight : "12px"}}>No</p>
              <FormGroup switch>
                <Input
                    className='h-50'
                    type="switch"
                    checked={isOnToggle}
                    onChange={onChangeHandle}
                  />
              </FormGroup>
              <p className='ml-2'>Yes</p>
            </div>
            {user.userType === userTypes.COSTUMER && <LostDeviceControl  user={user} module={module} setUserModules={setModules} userModules={modules}/>}
          </CardFooter>       
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default DeviceCard
