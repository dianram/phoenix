import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

const Dealerships = () => {
  const [dealers, setDealers] = useState([])
  const [showDealers, setShowDealers] = useState(false)

  useEffect(() => {
    getCollectionFromFirestore("dealerships")
      .then(res => {
        setDealers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])
  
  return (
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mb-4 mt-2'>Dealerships</h4>
          <i 
            className={showDealers ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowDealers(prev => !prev)}}
          ></i>
        </div>
        {showDealers && dealers.map(dealer => (
          <UserInfoCard
            key={dealer.uid}
            user={dealer}
            showModules
          />
        ))}
      </Row>
  )
}

export default Dealerships