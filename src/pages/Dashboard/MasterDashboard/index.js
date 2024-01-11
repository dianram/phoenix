import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import { DUMMY_DEVICES } from 'common/data/devices'
import {
  Row,
  Col,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../../../helpers/firebase_helper'

function MasterDashboard() {
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
    <div className='p-3'>
      <Row>
        <h5 className='mt-2'>Your Devices</h5>
        {modules.map(item => (
          <DeviceCard
            key={item.uid}
            moduleID = {item.uid}
            modulePIN={item.modulePIN}
            moduleInstallDate={item.moduleInstallDate}
            batchNumber={item.batchNumber}
            isOn={item.isOn}
          />
        ))}
      </Row>
    </div>
  )
}

export default MasterDashboard
