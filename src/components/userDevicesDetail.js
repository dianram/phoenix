import React, { useEffect, useState } from 'react'
import DeviceCard from 'pages/Dashboard/DeviceCard'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import { Row } from 'reactstrap'

const userDevicesDetail = ({ userModules, setUserModules, user }) => {
  const [ showUserDevices, setShowUserDevices ] = useState(false)
  return (
    <>
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4'>Devices</h4>
          <i 
            className={showUserDevices ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowUserDevices(prev => !prev)}}
          ></i>
        </div>
        {showUserDevices && (userModules.length > 0
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
                user={user}
              />
          ))
          : "No Devices")
        }
      </Row>
    </>
  )
}

export default userDevicesDetail