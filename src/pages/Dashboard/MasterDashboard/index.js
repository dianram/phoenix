import React, { useEffect, useState } from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import QRCodeReader from 'components/QRCodeReader'


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
    <h2>Hello Megauser</h2>
      <Devices modules={modules} setModules={setModules}/>
      <Users />
      <Dealerships />
      <Groups user={user} modules={modules} setModules={setModules}/>
      <QRCodeReader />
      <AddDevice />
    </>
  )
}

export default MasterDashboard
