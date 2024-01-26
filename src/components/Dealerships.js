import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import UserInfoCard from 'pages/Dashboard/UserInfoCard'
import React, { useEffect, useState } from 'react'
import {
  Row,
} from 'reactstrap'

const Dealerships = () => {
  const [dealers, setDealers] = useState([])

  useEffect(() => {
    getCollectionFromFirestore("dealerships")
      .then(res => {
        setDealers(res)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])
  
  return (
    <div className='p-3'>
      <Row>
        <h4 className='mt-2'>Dealerships</h4>
        {dealers.map(dealer => (
          <UserInfoCard
            key={dealer.uid}
            user={dealer}
          />
        ))}
      </Row>
    </div>
  )
}

export default Dealerships