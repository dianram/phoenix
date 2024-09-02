import { getCollectionFromFirestore, getFullGroupsInfo, getUserInfo } from 'helpers/firebase_helper'
import GroupCard from 'pages/Dashboard/GroupCard'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import CreateGroup from './CreateGroup'

/**
 * The function `Groups` in JavaScript renders a list of user groups with the ability to create new
 * groups.
 * @returns The `Groups` component is returning JSX elements that display a list of groups for a user.
 * The component conditionally renders group cards for each group the user is a part of, along with an
 * option to create a new group if the user has less than 3 groups. If there are no groups or the user
 * has reached the maximum limit of 3 groups, appropriate messages are displayed.
 */
const Groups = ({ user, modules, setModules }) => {
  const [ groups, setGroups ] = useState([])
  const [ showGroups, setShowGroups ] = useState(false)

  // useEffect(() => {
  //   setGroups(user.groups)
  // }, [user])
  useEffect(() => {
    getCollectionFromFirestore("devices_groups")
      .then(res => {
        getFullGroupsInfo(res, setGroups)
      }).catch(error => {
        console.log("failed fetch: ", error)
      })
  }, [])

  return (
      <Row>
        <div className='d-flex justify-content-between border-bottom my-2'>
          <h4 className='mt-2 mb-4'>Groups</h4>
          <i 
            className={showGroups ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
            onClick={e => {setShowGroups(prev => !prev)}}
          ></i>
        </div>
        {showGroups && ((user && groups && (groups.length > 0)) 
          ? groups.map(group => (
            <GroupCard
              key={group.group_name}
              groupName = {group.group_name}
              groupItems={group.group_devices}
              // user={user}
              // setGroups={setGroups}
              // groups={groups}
              // modules={modules}
              // setModules={setModules}
            />
          ))
          : (<Col xl={12} md={12}>
              <h4>There are not any group</h4>
            </Col>))
        }
        {/* {showGroups && ((user && groups && (groups.length === 3))
          ? (<Col xl={12} md={12}>
            <h4>You cannot create more groups</h4>
            </Col>)
          : (<CreateGroup user={user} groups={groups} setGroups={setGroups}/>))
        } */}
      </Row>
  )
}

export default Groups