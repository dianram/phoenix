import { changeControlOnRTDBDevices } from 'helpers/firebase_helper'
import React from 'react'
import { Button } from 'reactstrap'

const GroupsControl = ({user, devices}) => {
  const handleTurnOn = () => {
    changeControlOnRTDBDevices(user, devices, true)
  }

  const handleTurnOff = () => {
    changeControlOnRTDBDevices(user, devices, false)
  }


  return (
    <>
    <h6 style={{padding: '1rem 0'}}>Group Control</h6>
    <div style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '1rem'}}>
      <Button style={{ backgroundColor: 'rgb(154, 193, 216)', border: 'none'}} onClick={handleTurnOn}>
        On
      </Button>
      <Button style={{ backgroundColor: 'rgb(237, 28, 36)', border: 'none'}} onClick={handleTurnOff}>
        OFF
      </Button>
    </div>
    </>
  )
}

export default GroupsControl