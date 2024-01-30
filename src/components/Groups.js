import GroupCard from 'pages/Dashboard/GroupCard'
import React from 'react'
import { Row } from 'reactstrap'


const DUMMY_GROUPS = [
  {
    name: "Cars",
    items: ["162637474", "567678898"]
  },
  {
    name: "Demo Cars",
    items: ["0098765487", "567678898"]
  },
  {
    name: "Users",
    items: ["0098785868", "567678898"]
  },
]

const Groups = () => {
  const groups = DUMMY_GROUPS
  console.log(groups)
  return (
    <div className='p-3'>
      <Row>
        <h4 className='mt-2'>Groups</h4>
        {groups 
          ? groups.map(group => (
            <GroupCard
              key={group.name}
              groupName = {group.name}
              groupItems={group.items}
            />
          ))
          : "There are not any group"
        }
      </Row>
    </div>
  )
}

export default Groups