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

/**
 * The function `Devices` in JavaScript manages devices, including filtering, pagination, and
 * performing actions on the devices.
 * @returns The `Devices` component is being returned. It includes various elements such as a header
 * for "Devices", a search functionality, paginated results, a massive shutdown component, stock
 * information, and voltage information. The component also utilizes state variables like
 * `showDevices`, `filterResult`, and `currentPage` to manage the display and functionality of the
 * component.
 */
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
              itemsPerPage={4}
              modules={filterResult}
              setModules={setModules}
              userModules={userModules}
              setUserModules={setUserModules}
              user={user}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
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
    </div>
  )
}

export default Devices
