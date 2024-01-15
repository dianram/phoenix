import React from 'react'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import UserDevices from './UserDevices'


const UserCard = ({
  userID,
  email,
  firstPurchaseDate,
  userModules,
  name,
  phone,
  userLocation
}) => {
  return (
    <Col xl={12}>
      <Card className='mt-4 shadow' color="light">
        <CardBody>
          <CardHeader className='mb-4 border-bottom'>
            {name}
          </CardHeader>
          <CardText className="border-bottom">email: {email}</CardText>
          <CardText className="border-bottom">First Purchase Date: {firstPurchaseDate}</CardText>
          <UserDevices userModules={userModules}/>
          <CardText className="border-bottom">User ID: {userID} </CardText>
          <CardText className="border-bottom">Phone: {phone} </CardText>
          <CardText className="border-bottom">State: {userLocation} </CardText>   
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default UserCard
