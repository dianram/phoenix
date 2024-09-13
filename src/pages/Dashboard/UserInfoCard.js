import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import UserDevices from './UserDevices'

import { formatInfoKey, formatKey } from 'helpers/formatHelpers'
import { userTypes } from 'constants/userTypes'

/**
 * The UserInfoCard component in JavaScript displays user information with the ability to toggle
 * additional details based on the current user type.
 * @returns The `UserInfoCard` component is being returned. It displays user information based on the
 * props passed to it, such as the user object, whether to show modules, and the current user type. The
 * component includes a toggle functionality to show/hide additional user information when clicking on
 * the chevron icon. The user's name is displayed with different styles based on the user type.
 */
const UserInfoCard = ({ user, showModules, currentUserRole }) => {
  const [ showUserInfo, setShowUserInfo ] = useState(false)

  const infoKeys = Object.keys(user)
  const keysToShow = infoKeys.filter(key => key !== "subCollections" && key !== "receiver_name")

  const getDropStyle = userType => (
    userType === userTypes.MASTER
    ? 'd-flex justify-content-between'
    : 'd-flex justify-content-between mb-4'
  )

  const getNameElement = userType => (
    userType === userTypes.MASTER
    ? <h6 className='my-3' style={{ paddingLeft: '3rem' }}>{user.name} </h6>
    : <h3 className='my-3' style={{ paddingLeft: '3rem' }}>{user.name} </h3>
  )

  return (
    <>
      {(currentUserRole !== userTypes.MASTER) && (
        <Row className='text-end'>
          <p style={{ fontSize: '0.6rem', marginBottom: '-2rem'}}>Click here to {!showUserInfo === true ? 'check' : 'close'} your info</p>
        </Row>
      )}
      <div className={getDropStyle(currentUserRole)}>
        {getNameElement(currentUserRole)}
        <i 
          className={showUserInfo ? "mdi mdi-chevron-up " : "mdi mdi-chevron-down"}
          onClick={e => {setShowUserInfo(prev => !prev)}}
          style={{ paddingTop: '2rem'}}
          ></i>
      </div>
 
      {showUserInfo && (<Col xl={12} className='border-bottom'>
        <Card className='mt-2 shadow' color="light">
          <CardBody>
            {keysToShow.map(infoKey => (
              infoKey !== 'groups' && <CardText className="border-bottom" key={infoKey}> <b>{formatKey(infoKey)}: </b> {formatInfoKey(user[infoKey]) } </CardText>
            ))}
            {(user.subCollections.end_user_devices.length > 0 && showModules)
              ? < UserDevices userModules={user.subCollections.end_user_devices} />
              : ""
            }
            {(user.subCollections.dealer_devices.length > 0 && showModules)
              ? < UserDevices userModules={user.subCollections.dealer_devices} />
              : ""
            }
          </CardBody>
          
        </Card>
      </Col>)}
    </>
  )
}

export default UserInfoCard