import React, { useEffect, useState } from 'react'
import DeviceCard from '../pages/Dashboard/DeviceCard'
import {
  Row,
  Col,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'
import Stock from './Common/Stock'
import MassiveShutdown from './MassiveShutdown'
import Voltage from './Voltage'

const Devices = () => {
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
        <h4 className='mt-2'>Devices</h4>
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
      <MassiveShutdown modules={modules}/>
      <Stock modules={modules}/>
      <Voltage />
    </div>
  )
}

export default Devices
