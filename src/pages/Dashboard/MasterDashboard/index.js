import React from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import QRreader from 'components/QRreader'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'

const MasterDashboard = ({ user }) => {
  console.log("user from masterdas: ", user)
  return (
    <>
    <h2>Hello Megauser</h2>
      <Devices />
      <Users />
      <Dealerships />
      <Groups user={user}/>
      <QRreader />
      <AddDevice />
    </>
  )
}

export default MasterDashboard
