import React, { useEffect, useState } from 'react'
import DeviceCard from 'pages/Dashboard/DeviceCard'
import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import { Container, Row } from 'reactstrap'

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
                key={item.id || item.uid}
                module={item}
                moduleID = {item.id || item.uid}
                moduleInstallDate={item.moduleInstallDate ? item.moduleInstallDate : 'not installed'}
                batchNumber={item.batch_number}
                carModulePict={item.carModulePict ? item.carModulePict : nonCarImg}
                modules={''}
                setModules={''}
                userModules={userModules}
                setUserModules={setUserModules}
                user={user}
              />
          ))
          : <Container style={{ marginTop: '30px' }}>
              <p>
                You don't have any devices assigned yet, please request your Dealer or the MegaUser from Phoenix to assign your devices.
                You can now log in to your mobile app, view your devices, and control them.
                On this platform, you will only see basic information.
              </p>
            </Container>
          )
        }
      </Row>
    </>
  )
}

export default userDevicesDetail