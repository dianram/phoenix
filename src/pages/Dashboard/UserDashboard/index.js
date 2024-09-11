import { getCollectionFromFirestore, getDevicesInfoFromRefs} from 'helpers/firebase_helper'
import React, { useEffect, useState } from 'react'
import UserInfoCard from '../UserInfoCard'
import UserDevicesDetail from '../../../components/userDevicesDetail'
import { getFullModules } from 'helpers/modulesHelper'
import MassiveShutdown from 'components/MassiveShutdown'
import AddDevice from 'components/AddDevice'
import AddDeviceToDealer from 'components/AddDeviceToDealer'
import { userTypes } from 'constants/userTypes'
import Groups from 'components/Groups'
import Voltage from 'components/Voltage'
import Welcome from 'components/Welcome'
import Actions from 'components/Actions'
import AddDeviceToEndUser from 'components/AddDeviceToEndUser'

/**
 * The UserDashboard component in JavaScript fetches modules data from Firestore, displays user
 * information and devices, and includes features based on user type.
 * @returns The `UserDashboard` component is being returned. It consists of various components such as
 * `Welcome`, `UserInfoCard`, `UserDevicesDetail`, `MassiveShutdown`, `Voltage`, `Actions`, and
 * `Groups` based on the user's userType.
 */
const UserDashboard = ({ user }) => {
  const [modules, setModules] = useState([])
  const [userModules, setUserModules] = useState([])
  const [ actionsFlag, setActionsFlag ] = useState('')
  useEffect(() => {
    getCollectionFromFirestore("devices")
    .then(res => {
      setModules(res)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })

  }, [user])
  useEffect(() => {
    getDevicesInfoFromRefs(user.subCollections.dealer_devices)
    .then(dealerDevices => {
      setUserModules(dealerDevices)
    })
    setActionsFlag(false)
  }, [user])
  

  return (
    <>
      <Welcome user={user}/>
      <UserInfoCard user={user} showModules={false} />
      <UserDevicesDetail userModules={userModules} setUserModules={setUserModules} user={user} />
      {/* {user.role === userTypes.DEALER && <MassiveShutdown
        allModules={modules}
        modulesToUpdate={userModules}
        setModules={setModules}
        setUserModules={setUserModules}
        areAllModules={false}
      />}
      
      {(user.role === userTypes.DEALER) && <Actions
        modules={modules}
        user={user}
        userModules={userModules}
        setUserModules={setUserModules}
        />
      } */}
      <h4 className='mb-4'>Actions</h4>
      <div className='d-flex border-bottom justify-content-around align-items-center'>
        <AddDeviceToEndUser setActionsFlag={setActionsFlag} isDealer={user.role === userTypes.DEALER} currentUserID={user.id} allModules={modules} currentUser={user}/>
      </div>
      {user.role === userTypes.DEALER && < Groups user={user} modules={modules} setModules={setModules}/>}
    </>
  )
}

export default UserDashboard