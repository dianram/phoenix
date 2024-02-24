import { getUserInfo } from 'helpers/firebase_helper'
import GroupCard from 'pages/Dashboard/GroupCard'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import CreateGroup from './CreateGroup'

const Groups = ({ user, modules, setModules }) => {
  const [ groups, setGroups ] = useState([])
  const [ showGroups, setShowGroups ] = useState(false)

  useEffect(() => {
    setGroups(user.groups)
  }, [user])

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
              key={group.name}
              groupName = {group.name}
              groupItems={group.items}
              user={user}
              setGroups={setGroups}
              groups={groups}
              modules={modules}
              setModules={setModules}
            />
          ))
          : (<Col xl={12} md={12}>
              <h4>There are not any group</h4>
            </Col>))
        }
        {showGroups && ((user && groups && (groups.length === 3))
          ? (<Col xl={12} md={12}>
            <h4>You cannot create more groups</h4>
            </Col>)
          : (<CreateGroup user={user} groups={groups} setGroups={setGroups}/>))
        }
      </Row>
  )
}

export default Groups