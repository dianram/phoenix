import React, { useEffect, useState } from 'react'
import DeviceCard from '../pages/Dashboard/DeviceCard'
import {
  Row,
  Col,
  Button,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'
import Stock from './Common/Stock'
import MassiveShutdown from './MassiveShutdown'
import Voltage from './Voltage'
import PaginatedResults from './PaginatedResults'
import SearchDevice from './SearchDevice'

const Devices = ({ user, modules, setModules, userModules=undefined, setUserModules=undefined }) => {
  const [ showDevices, setShowDevices ] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilterResult(modules)
  }, [modules])

  return (
    <div>
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4'>Devices</h4>
          <SearchDevice allDevices={modules} setFilterResult={setFilterResult} setShow={setShowDevices} setCurrentPage={setCurrentPage}/>
          <i className={showDevices ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"} onClick={e => {setShowDevices(prev => !prev)}}></i>
        </div>
        {showDevices && ((modules.length > 0)
          ? <PaginatedResults
              itemsPerPage={2}
              modules={filterResult}
              setModules={setModules}
              userModules={userModules}
              setUserModules={setUserModules}
              user={user}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          // ? modules.map(item => (
          //     <DeviceCard
          //       key={item.uid}
          //       module={item}
          //       moduleID = {item.uid}
          //       modulePIN={item.modulePIN}   
          //       moduleInstallDate={item.moduleInstallDate}
          //       batchNumber={item.batchNumber}
          //       isOn={item.isOn}
          //       modules={modules}
          //       setModules={setModules}
          //       userModules={userModules}
          //       setUserModules={setUserModules}
          //       user={user}
          //     />
          //   ))
          : "No devices")
        }
      </Row>
      {showDevices && (<MassiveShutdown
        allModules={modules}
        modulesToUpdate={modules}
        setModules={setModules}
        areAllModules
        />)
      }
      <Stock modules={modules}/>
      <Voltage />
    </div>
  )
}

export default Devices
