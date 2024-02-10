import { getCollectionFromFirestore } from 'helpers/firebase_helper'
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

const UserDashboard = ({ user }) => {
  const [modules, setModules] = useState([])
  const [userModules, setUserModules] = useState([])
  useEffect(() => {
    getCollectionFromFirestore("modules")
    .then(res => {
      setModules(res)
      const userDevices = getFullModules(user.modules, res)
      setUserModules(userDevices)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })

  }, [user])

  return (
    <>
      <h2>Hello {user.name}</h2>
      <UserInfoCard user={user} showModules={false} />
      <UserDevicesDetail userModules={userModules} setUserModules={setUserModules} />
      <Voltage />
      {/* // TODO {user.userType === userTypes.COSTUMER && <AddUser />} */}
      {user.userType === userTypes.DEALER && <MassiveShutdown
        allModules={modules}
        modulesToUpdate={userModules}
        setModules={setModules}
        setUserModules={setUserModules}
        areAllModules={false}
      />}
      {user.userType === userTypes.DEALER && <AddDevice />}
      {user.userType === userTypes.DEALER && <AddDeviceToDealer
        allModules={modules}
        user={user}
        userModules={userModules}
        setUserModules={setUserModules}
        />}
      {user.userType === userTypes.DEALER && < Groups user={user} modules={modules} setModules={setModules}/>}
    </>
  )
}

export default UserDashboard