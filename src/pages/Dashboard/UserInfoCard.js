import React, { useEffect, useState } from 'react'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import UserDevices from './UserDevices'

import { formatInfoKey, formatKey } from 'helpers/formatHelpers'

const UserInfoCard = ({ user, showModules, currentUserType }) => {
  const [ showUserInfo, setShowUserInfo ] = useState(false)

  const infoKeys = Object.keys(user)
  const keysToShow = infoKeys.filter(key => key !== "modules")

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h6 className='my-3' style={{ paddingLeft: '3rem' }}>{user.name}</h6>
        <i 
          className={showUserInfo ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
          onClick={e => {setShowUserInfo(prev => !prev)}}
        ></i>
      </div>

      {showUserInfo && (<Col xl={12} className='border-bottom'>
        <Card className='mt-2 shadow' color="light">
          <CardBody>
            {keysToShow.map(infoKey => (
              infoKey !== 'groups' && <CardText className="border-bottom" key={infoKey}> <b>{formatKey(infoKey)}: </b> {formatInfoKey(user[infoKey]) } </CardText>
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