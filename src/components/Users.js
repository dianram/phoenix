import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

import { getCollectionFromFirestore } from '../helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import SearchBar from './SearchBar'

const Users = ({ currentUserType }) => {
  const [ users, setUsers ] = useState([])
  const [ showUsers, setShowUsers ] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("users")
      .then(res => {
        setUsers(res)
        setFilterResult(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])

  return (
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4 mt-2' style={{ marginRight: '1rem' }}>Users</h4>
          <SearchBar allUsers={users} setFilterResult={setFilterResult} setShow={setShowUsers}/>
          <i 
            className={showUsers ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowUsers(prev => !prev)}}
          ></i>
        </div>
        {showUsers && filterResult.map(user => (
          <UserInfoCard
            user={user}
            key={user.uid}
            showModules
            currentUserType={currentUserType}
          />
        ))}
      </Row>
  )
}

export default Users