import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

import { getCollectionFromFirestore, getFullUsersInfo } from '../helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import SearchBar from './SearchBar'
import { userTypes } from 'constants/userTypes'

/**
 * The Users component in JavaScript fetches user data from Firestore, allows filtering and displaying
 * user information based on search criteria.
 * @returns The Users component is being returned. It consists of a list of users displayed in
 * UserInfoCard components based on the filterResult state. The component also includes a search bar
 * for filtering users, a toggle button to show/hide the users list, and fetches user data from
 * Firestore using the getCollectionFromFirestore function.
 */
const Users = ({ currentUserRole, actionsFlag }) => {
  const [ users, setUsers ] = useState([])
  const [ showUsers, setShowUsers ] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    getFullUsersInfo("users", userTypes.COSTUMER)
      .then(res => {
        setFilterResult(res)
        setUsers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [actionsFlag])
  
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
            key={user.uid || user.id}
            showModules
            currentUserType={currentUserRole}
          />
        ))}
      </Row>
  )
}

export default Users