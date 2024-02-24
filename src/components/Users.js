import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'

const Users = () => {
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    getCollectionFromFirestore("users")
      .then(res => {
        setUsers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])
  
  return (
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4 mt-2'>Users</h4>
          <i 
            className={showUsers ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowUsers(prev => !prev)}}
          ></i>
        </div>
        {showUsers && users.map(user => (
          <UserInfoCard
            user={user}
            key={user.uid}
            showModules
          />
        ))}
      </Row>
  )
}

export default Users