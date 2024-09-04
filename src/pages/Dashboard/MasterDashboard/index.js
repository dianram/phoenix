import React, { useEffect, useState } from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import QRCodeReader from 'components/QRCodeReader'
import Welcome from 'components/Welcome'
import AddDeviceToDealer from 'components/AddDeviceToDealer'
import AddDeviceToEndUser from 'components/AddDeviceToEndUser'


/**
 * The MasterDashboard component in JavaScript fetches modules data from Firestore and displays various
 * components based on the user's userType.
 * @returns The `MasterDashboard` component is being returned. It includes several child components
 * such as `Welcome`, `Devices`, `Users`, `Dealerships`, and `Groups`. Additionally, it fetches data
 * from Firestore using the `getCollectionFromFirestore` function and sets the retrieved data in the
 * `modules` state using `useState` and `useEffect` hooks. The component also renders `AddDevice`and `QRCodeReader` components.
 */
const MasterDashboard = ({ user }) => {
  const [modules, setModules] = useState([])
  const [ actionsFlag, setActionsFlag ] = useState('')

  useEffect(() => {
    getCollectionFromFirestore("devices")
    .then(res => {
      setModules(res)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })
    setActionsFlag(false)
  }, [])

  return (
    <>
      <Welcome user={user}/>
      <Devices user={user} modules={modules} setModules={setModules}/>
      <h4 className='mb-4'>Actions</h4>
      <div className='d-flex border-bottom justify-content-around align-items-center'>
        <AddDeviceToEndUser setActionsFlag={setActionsFlag}/>
        <AddDeviceToDealer setActionsFlag={setActionsFlag}/>
      </div>
      <Users currentUserRole={user.role} actionsFlag={actionsFlag}/>
      <Dealerships currentUserType={user.role} actionsFlag={actionsFlag}/>
      <Groups user={user} modules={modules} setModules={setModules}/>
    </>
  )
}

export default MasterDashboard
