import React, { useEffect, useState } from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import QRCodeReader from 'components/QRCodeReader'
import Welcome from 'components/Welcome'


const MasterDashboard = ({ user }) => {
  const [modules, setModules] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("modules")
    .then(res => {
      setModules(res)
    }).catch(error => {
      console.log("failed fetch: ", error)
    })
  }, [])
  return (
    <>
      <Welcome user={user}/>
      <Devices user={user} modules={modules} setModules={setModules}/>
      <h4 className='mb-4'>Actions</h4>
      <div className='d-flex border-bottom justify-content-around align-items-center'>
        <AddDevice />
        <QRCodeReader />
      </div>
      <Users currentUserType={user.userType}/>
      <Dealerships currentUserType={user.userType}/>
      <Groups user={user} modules={modules} setModules={setModules}/>
    </>
  )
}

export default MasterDashboard
