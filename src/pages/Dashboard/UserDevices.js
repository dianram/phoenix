import React from 'react'
import {
  CardText, List,
} from 'reactstrap'

const UserDevices = ({ userModules }) => {
  return (
    <div className="border-bottom">
      <p>User Devices: </p>
      <List type="unstyled">
        <CardText>
        {userModules ? (
          userModules.map(item => <li key={item}>{item}</li>))
          : " No devices"} 
        </CardText>
      </List>        
    </div>
  )
}

export default UserDevices