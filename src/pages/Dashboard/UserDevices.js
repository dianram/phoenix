import React from 'react'
import {
  Col,
  Card,
  CardText,
  CardHeader,
  CardBody,
  Row,
} from 'reactstrap'

/**
 * The function `UserDevices` renders a list of user devices based on the provided `userModules` array.
 * @returns The `UserDevices` component is being returned. It displays a list of user devices based on
 * the `userModules` prop passed to it. If there are user modules present, it will display each module
 * in a Card component within a Row. If there are no user modules, it will display a message saying "No
 * devices".
 */
const UserDevices = ({ userModules }) => {
  return (
    <div className="border-bottom">
      <p>User Devices: </p>
      <Row>
        {userModules.length >= 1
          ? (userModules.map(item => (
              <Col xl={3} md={4} key={item}>
                <Card className='mt-4 shadow' color="light">
                  <CardBody>
                    <CardHeader className='mb-4 border-bottom'>
                      MODULE ID:
                    </CardHeader>
                    <CardText className="border-bottom">{item}</CardText>
                  </CardBody>
                </Card>
              </Col>
            )))
          : <Row>
              <p>No devices</p>
            </Row>} 
      </Row>    
    </div>
  )
}

export default UserDevices