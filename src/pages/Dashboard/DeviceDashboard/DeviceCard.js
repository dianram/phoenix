import React from 'react'
import { useState } from 'react';
import {
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Form
} from 'reactstrap'

function DeviceCard({ deviceId, carId, ownerId, isOn }) {
  const [isOnToggle, setIsOnToggle] = useState(isOn);
  return (
    <Col xl={3} md={6}>
      <Card className="mini-stat bg-primary text-white pt-2">
        <CardTitle>
          <h3 className="font-size-16 text-center text-uppercase mt-1 text-white-60" >DEVICE ID: {deviceId}</h3>
        </CardTitle>
        <CardBody>
          <p className="font-size-10 text-uppercase mt-0 text-white-50">Car ID: {carId}</p>
          <p className="font-size-10 text-uppercase mt-0 text-white-50">Owner ID: {ownerId}</p>
          <p>Active Device</p>
          <div className='d-inline-flex justify-content-center'>
            <p style={{marginRight : "12px"}}>No</p>
            <FormGroup switch>
              <Input
                  className='bg-dark h-50'
                  type="switch"
                  checked={isOnToggle}
                  onChange={() => {
                    setIsOnToggle(!isOnToggle);
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
          
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default DeviceCard
