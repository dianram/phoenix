import React from 'react'
import DeviceCard from './DeviceCard'
import { DUMMY_DEVICES } from 'common/data/devices'
import {
  Row,
  Col,
} from 'reactstrap'

function DevicesDashboard() {
  return (
    <div className='p-3'>
      <Row>
        <h5 className='mt-2'>Your Devices</h5>
        {DUMMY_DEVICES.map(item => (
          <DeviceCard
            key={item.deviceId}
            deviceId={item.deviceId}
            carId={item.carId}
            ownerId={item.ownerId}
            isOn={item.isOn}
          />
        ))}
      </Row>
    </div>
  )
}

export default DevicesDashboard
