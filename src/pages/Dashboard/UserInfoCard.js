import React from 'react'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'

const UserInfoCard = ({ user }) => {
  const infoKeys = Object.keys(user)
  const keysToShow = infoKeys.filter(key => key !== "dealerModules")
  return (
    <>
      <Col xl={12}>
      <Card className='mt-4 shadow' color="light">
        <CardBody>
          <CardHeader className='mb-4 border-bottom'>
            {user.name}
          </CardHeader>
          {keysToShow.map(infoKey => (
            <CardText className="border-bottom" key={infoKey}> {infoKey}: {user[infoKey].toString() } </CardText>
          ))}
        </CardBody>
        
      </Card>
    </Col>
    </>
  )
}

export default UserInfoCard