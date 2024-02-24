import React, { useState } from 'react'
import { Table } from 'reactstrap'

const Stock = ({ modules }) => {
  const [ showStock, setShowStock ] = useState(false)

  return (
    <>
      <div className='d-flex justify-content-between border-bottom my-2'>
        <h4 className='mb-4'>Stock</h4>
        <i 
          className={showStock ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
          onClick={e => {setShowStock(prev => !prev)}}
        ></i>
      </div>
      
      {showStock && (<Table striped>
        <thead>
          <tr>
            <th>
              Module PIN
            </th>
            <th>
              Module ID
            </th>
            <th>
              Module Batch Number
            </th>
            <th>
              Module Sale's Date
            </th>
          </tr>
        </thead>
        <tbody>
          {modules.map(item => (
            <tr key={item.uid}>
              <td>
                {item.modulePIN}
              </td>
              <td>
                {item.uid}
              </td>
              <td>
                {item.batchNumber}
              </td>
              <td>
                {item.moduleInstallDate}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>)
      }
    </>
  )
}

export default Stock