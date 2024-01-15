import React, { useEffect, useState } from 'react'
import UserCard from '../pages/Dashboard/UserCard'
import {
  Row,
  Col,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'

const Devices = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("users")
      .then(res => {
        setUsers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])
  
  return (
    <div className='p-3'>
      <Row>
        <h5 className='mt-2'>Users</h5>
        {users.map(user => (
          <UserCard
            key={user.uid}
            userID = {user.uid}
            email={user.email}
            firstPurchaseDate={user.firstPurchaseDate}
            userModules={user.myModules ? [...user.myModules] : ""}
            name={user.name}
            phone={user.phone}
            userLocation={user.state}
          />
        ))}
      </Row>
    </div>
  )
}

export default Devices