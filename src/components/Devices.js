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

const Devices = ({ modules, setModules, userModules=undefined, setUserModules=undefined }) => {
  return (
    <div className='p-3'>
      <Row>
        <h4 className='mt-2'>Devices</h4>
        {modules.length > 0
          ? modules.map(item => (
              <DeviceCard
                key={item.uid}
                module={item}
                moduleID = {item.uid}
                modulePIN={item.modulePIN}
                moduleInstallDate={item.moduleInstallDate}
                batchNumber={item.batchNumber}
                isOn={item.isOn}
                modules={modules}
                setModules={setModules}
                userModules={userModules}
                setUserModules={setUserModules}
              />
            ))
          : "No devices"
        }
      </Row>
      <MassiveShutdown
        allModules={modules}
        modulesToUpdate={modules}
        setModules={setModules}
        areAllModules
      />
      <Stock modules={modules}/>
      <Voltage />
    </div>
  )
}

export default Devices
