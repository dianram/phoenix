import { singleModuleShutDownOnFireStore } from 'helpers/firebase_helper';
import { updateModules } from 'helpers/modulesHelper';
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
} from 'reactstrap'



const DeviceCard = ({
  moduleID,
  modulePIN,
  moduleInstallDate,
  batchNumber,
  isOn,
  modules,
  setModules,
  module
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
            MODULE ID: {moduleID}
          </CardHeader>
          <CardText className="border-bottom">PIN: {modulePIN}</CardText>
          <CardText className="border-bottom">Install Date: {moduleInstallDate}</CardText>
          <CardText className="border-bottom">batchNumber: {batchNumber}</CardText>
          <CardTitle>Active Device</CardTitle>
          <CardFooter>
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
          </CardFooter>       
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default DeviceCard
