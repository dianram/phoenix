import React from 'react'
import Devices from '../../../components/Devices'
import Users from '../../../components/Users'
import Dealerships from '../../../components/Dealerships'

const MasterDashboard = () => {
  return (
    <>
    <h2>Hello Megauser</h2>
      <Devices />
      <Users />
      <Dealerships />
    </>
  )
}

export default MasterDashboard
