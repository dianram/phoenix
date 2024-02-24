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
import Welcome from 'components/Welcome'
import Actions from 'components/Actions'

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
      <Welcome user={user}/>
      <UserInfoCard user={user} showModules={false} />
      <UserDevicesDetail userModules={userModules} setUserModules={setUserModules} user={user} />
      {user.userType === userTypes.DEALER && <MassiveShutdown
        allModules={modules}
        modulesToUpdate={userModules}
        setModules={setModules}
        setUserModules={setUserModules}
        areAllModules={false}
      />}
      <Voltage />
      {(user.userType === userTypes.DEALER) && <Actions
        modules={modules}
        user={user}
        userModules={userModules}
        setUserModules={setUserModules}
        />
      }
      {/* // TODO {user.userType === userTypes.COSTUMER && <AddUser />} */}
      {user.userType === userTypes.DEALER && < Groups user={user} modules={modules} setModules={setModules}/>}
    </>
  )
}

export default UserDashboard