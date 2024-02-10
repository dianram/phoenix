import React from 'react'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import UserDevices from './UserDevices'
import { userTypes } from '../../constants/userTypes'

const UserInfoCard = ({ user, showModules }) => {
  const infoKeys = Object.keys(user)
  const keysToShow = infoKeys.filter(key => key !== "modules")
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
          {(user.modules && showModules)
            ? < UserDevices userModules={user.modules} />
            : ""
          }
        </CardBody>
        
      </Card>
    </Col>
    </>
  )
}

export default UserInfoCard