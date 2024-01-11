import React from 'react'
import { useState } from 'react';
import {
  Col,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Input,
  Label,
  Form
} from 'reactstrap'



function DeviceCard({
  moduleID,
  modulePIN,
  moduleInstallDate,
  batchNumber,
  isOn
}) {
  const [isOnToggle, setIsOnToggle] = useState(isOn);
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
                    onChange={() => {
                      setIsOnToggle(prev => !prev);
                    }}
                  />
              </FormGroup>
              {/* <button>switch</button> */}
              <p className='ml-2'>Yes</p>
            {/* <Form>
              <FormGroup switch>
                <p>No</p>
                <Input
                  className='bg-dark mx-auto'
                  type="switch"
                  checked={isOnToggle}
                  onChange={() => {
                    setIsOnToggle(!isOnToggle);
                  }}
                />
                <Label check>Yes</Label>
              </FormGroup>
            </Form> */}
            </div>
          </CardFooter>       
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default DeviceCard
