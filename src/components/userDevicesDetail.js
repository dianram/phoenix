import React, { useEffect, useState } from 'react'
import DeviceCard from 'pages/Dashboard/DeviceCard'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'

const userDevicesDetail = ({ userModules }) => {
  const [userDetailedModules, setUserDetailedModules] = useState([])
  useEffect(() => {
    getCollectionFromFirestore("modules")
    .then(res => {
      const userDevices = userModules.map(
        userModule => res.filter(
          item => item.uid === userModule
          )
        )
      console.log(userDevices[0])
      setUserDetailedModules(userDevices[0])
    }).catch(error => {
      console.log("failed fetch: ", error)
    })

  }, [userModules])
  // console.log(typeof userDetailedModules)


  return (
    <>
      <h2>Devices</h2>
      {userDetailedModules ? userDetailedModules.map(item => (
          <DeviceCard
            key={item.uid}
            moduleID = {item.uid}
            modulePIN={item.modulePIN}
            moduleInstallDate={item.moduleInstallDate}
            batchNumber={item.batchNumber}
            isOn={item.isOn}
          />
        ))
      : "No Devices"}
    </>
  )
}

export default userDevicesDetail