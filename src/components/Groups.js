import { getUserInfo } from 'helpers/firebase_helper'
import GroupCard from 'pages/Dashboard/GroupCard'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import CreateGroup from './CreateGroup'

const Groups = ({ user, modules, setModules }) => {
  const [ groups, setGroups ] = useState([])

  useEffect(() => {
    setGroups(user.groups)
  }, [user])

  return (
    <div className='p-3'>
      <Row>
        <h4 className='mt-2'>Groups</h4>
        {(user && groups && (groups.length > 0)) 
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
            </Col>)
        }
        {(user && groups && (groups.length === 3))
          ? (<Col xl={12} md={12}>
            <h4>You cannot create more groups</h4>
            </Col>)
          : (<CreateGroup user={user} groups={groups} setGroups={setGroups}/>)
        }
      </Row>
    </div>
  )
}

export default Groups