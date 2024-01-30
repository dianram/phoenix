import React from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'
import QRreader from 'components/QRreader'
import AddDevice from 'components/AddDevice'
import Groups from 'components/Groups'

const MasterDashboard = () => {
  return (
    <>
    <h2>Hello Megauser</h2>
      <Devices />
      <Users />
      <Dealerships />
      <Groups />
      <QRreader />
      <AddDevice />
    </>
  )
}

export default MasterDashboard
