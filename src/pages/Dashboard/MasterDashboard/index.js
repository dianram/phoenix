import React, { useEffect, useState } from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import QRreader from 'components/QRreader'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'

const MasterDashboard = ({ user }) => {
  const [modules, setModules] = useState([])
  const [groups, setGroups] = useState([])

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
      <Groups user={user}/>
      <QRreader />
      <AddDevice />
    </>
  )
}

export default MasterDashboard
