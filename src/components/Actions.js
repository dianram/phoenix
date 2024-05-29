import React from 'react'
import AddDevice from './AddDevice'
import AddDeviceToDealer from './AddDeviceToDealer'

/**
 * The Actions component renders a list of actions, including adding a device and adding a device to a
 * dealer.
 * @returns The `Actions` component is being returned. It contains a heading "Actions" followed by a
 * `div` element with two child components: `AddDevice` and `AddDeviceToDealer`. The
 * `AddDeviceToDealer` component is passed props `allModules`, `user`, `userModules`, and
 * `setUserModules`.
 */
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