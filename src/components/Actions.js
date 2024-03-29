import React from 'react'
import AddDevice from './AddDevice'
import AddDeviceToDealer from './AddDeviceToDealer'

const Actions = ({modules, user, userModules, setUserModules}) => {
  return (
    <>
      <h4 className='mb-4'>Actions</h4>
      <div className='d-flex border-bottom justify-content-around align-items-center'>
        <AddDevice />
        <AddDeviceToDealer
          allModules={modules}
          user={user}
          userModules={userModules}
          setUserModules={setUserModules}
        />
      </div>
    </>
  )
}

export default Actions