import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'

const Users = () => {
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
          <UserInfoCard
            user={user}
            key={user.uid}
          />
        ))}
      </Row>
    </div>
  )
}

export default Users