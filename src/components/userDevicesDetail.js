import React, { useEffect, useState } from 'react'
import DeviceCard from 'pages/Dashboard/DeviceCard'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'

const userDevicesDetail = ({ userModules, setUserModules }) => {
  return (
    <>
      <h2>Devices</h2>
      {userModules.length > 0
        ? userModules.map(item => (
            <DeviceCard
              key={item.uid}
              moduleID = {item.uid}
              modulePIN={item.modulePIN}
              moduleInstallDate={item.moduleInstallDate}
              batchNumber={item.batchNumber}
              isOn={item.isOn}
              modules={userModules}
              setModules={setUserModules}
              module={item}
            />
        ))
        : "No Devices"
      }
    </>
  )
}

export default userDevicesDetail