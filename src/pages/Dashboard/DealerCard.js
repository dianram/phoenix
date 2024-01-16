import React from 'react'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import UserDevices from './UserDevices'


const DealerCard = ({
  dealerID,
  dealerEmail,
  firstPurchaseDate,
  dealerModules,
  dealerName,
  dealerPhone,
  dealerLocation,
  dealerManager,
  dealerManagerPhone,
  dealerAddress
}) => {
  return (
    <Col xl={12}>
      <Card className='mt-4 shadow' color="light">
        <CardBody>
          <CardHeader className='mb-4 border-bottom'>
            {dealerName}
          </CardHeader>
          <CardText className="border-bottom">email: {dealerEmail}</CardText>
          <CardText className="border-bottom">Manager: {dealerManager}</CardText>
          <CardText className="border-bottom">Manager Phone: {dealerManagerPhone}</CardText>
          <CardText className="border-bottom">Address: {dealerAddress}</CardText>
          <CardText className="border-bottom">First Purchase Date: {firstPurchaseDate}</CardText>
          <UserDevices userModules={dealerModules}/>
          <CardText className="border-bottom">User ID: {dealerID} </CardText>
          <CardText className="border-bottom">Phone: {dealerPhone} </CardText>
          <CardText className="border-bottom">State: {dealerLocation} </CardText>   
        </CardBody>
        
      </Card>
    </Col>
  )
}

export default DealerCard