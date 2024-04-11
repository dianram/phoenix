import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'
import SearchBar from './SearchBar'

const Dealerships = ({ currentUserType }) => {
  const [dealers, setDealers] = useState([])
  const [showDealers, setShowDealers] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("dealerships")
      .then(res => {
        setDealers(res)
        setFilterResult(res)
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
            currentUserType={currentUserType}
          />
        ))}
      </Row>
  )
}

export default Dealerships