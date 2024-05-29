import React, { useEffect, useState } from 'react'
import DeviceCard from 'pages/Dashboard/DeviceCard'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import { Row } from 'reactstrap'

import nonCarImg from '../assets/images/nonCarImg.png'
import SearchDevice from './SearchDevice'


/**
 * The function `userDevicesDetail` displays a list of devices for a user with the ability to search
 * and filter the devices.
 * @returns The `userDevicesDetail` component is being returned. It displays a list of devices for a
 * user, with the ability to search and filter the devices. The component includes a header with a
 * search input field and a toggle button to show/hide the device list. The list of devices is
 * displayed as `DeviceCard` components for each device in the `filterResult`. If there are no devices
 * the It shows 'No Devices'.
 */
const userDevicesDetail = ({ userModules, setUserModules, user }) => {
  const [ showUserDevices, setShowUserDevices ] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    setFilterResult(userModules)
  }, [userModules])
  return (
    <>
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4'>Devices</h4>
          <SearchDevice allDevices={userModules} setFilterResult={setFilterResult} setShow={setShowUserDevices} />
          <i 
            className={showUserDevices ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowUserDevices(prev => !prev)}}
          ></i>
        </div>
        {showUserDevices && (userModules.length > 0
          ? filterResult.map(item => (
              <DeviceCard
                key={item.uid}
                moduleID = {item.uid}
                modulePIN={item.modulePIN}
                moduleInstallDate={item.moduleInstallDate}
                batchNumber={item.batchNumber}
                isOn={item.isOn}
                carModulePict={item.carModulePict ? item.carModulePict : nonCarImg}
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