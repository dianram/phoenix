import { getCollectionFromFirestore, getFullUsersInfo } from 'helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'
import SearchBar from './SearchBar'
import { userTypes } from 'constants/userTypes'

/**
 * The Dealerships component in JavaScript fetches and displays a list of dealerships with search
 * functionality.
 * @returns The `Dealerships` component is being returned. It displays a list of dealerships with a
 * search bar to filter the results. The component fetches the list of dealerships from Firestore and
 * then displays them using the `UserInfoCard` component for each dealership in the `filterResult`
 * state array. The component also allows toggling the visibility of the dealerships list with a
 * chevron icon.
 */
const Dealerships = ({ currentUserRole }) => {
  const [dealers, setDealers] = useState([])
  const [showDealers, setShowDealers] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    getFullUsersInfo("users", userTypes.DEALER)
      .then(res => {
        setFilterResult(res)
        setDealers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])

  return (
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4 mt-2' style={{ marginRight: 'calc(-30px - 2vw)'}}>Dealerships</h4>
          <SearchBar allUsers={dealers} setFilterResult={setFilterResult} setShow={setShowDealers}/>
          <i 
            className={showDealers ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowDealers(prev => !prev)}}
          ></i>
        </div>
        {showDealers && filterResult.map(dealer => (
          <UserInfoCard
            key={dealer.uid}
            user={dealer}
            showModules
            currentUserType={currentUserRole}
          />
        ))}
      </Row>
  )
}

export default Dealerships