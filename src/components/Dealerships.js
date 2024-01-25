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
        <h5 className='mt-2'>Dealerships</h5>
        {dealers.map(dealer => (
          <UserInfoCard
            key={dealer.uid}
            user={dealer}
          // dealerID={dealer.uid}
          // dealerEmail={dealer.email}
          // firstPurchaseDate={dealer.firstPurchaseDate}
          // dealerModules={dealer.modules ? [...dealer.modules] : ""}
          // dealerName={dealer.name}
          // dealerPhone={dealer.phone}
          // dealerLocation={dealer.state}
          // dealerManager={dealer.manager}
          // dealerManagerPhone={dealer.managerPhone}
          // dealerAddress={dealer.address}
          />
        ))}
      </Row>
    </div>
  )
}

export default Dealerships