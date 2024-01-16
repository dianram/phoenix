import { getCollectionFromFirestore } from 'helpers/firebase_helper'
import React, { useEffect, useState } from 'react'
import UserInfoCard from '../UserInfoCard'
import UserDevicesDetail from '../../../components/userDevicesDetail'

const DealerDashboard = ({ id, typeOfUser }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    getCollectionFromFirestore(typeOfUser)
      .then(res => {
        const user = res.filter(user => user.uid === id)
        setUser(user[0])
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [typeOfUser, id])
  console.log(user)
  return (
    <>
      <h2>Hello {user.name}</h2>
      <UserInfoCard user={user} />
      <UserDevicesDetail userModules={user.modules ? user.modules : ""} />
    </>
  )
}

export default DealerDashboard