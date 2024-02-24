import React, { useState } from 'react'
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
  const [ showUserInfo, setShowUserInfo ] = useState(false)

  const infoKeys = Object.keys(user)
  const keysToShow = infoKeys.filter(key => key !== "modules")
  return (
    <>
      <div className='d-flex justify-content-between border-bottom my-2'>
        <h4 className='mb-4'>Your Info</h4>
        <i 
          className={showUserInfo ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
          onClick={e => {setShowUserInfo(prev => !prev)}}
        ></i>
      </div>
      {showUserInfo && (<Col xl={12}>
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
      </Col>)}
    </>
  )
}

export default UserInfoCard