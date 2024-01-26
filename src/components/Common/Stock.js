import React from 'react'
import { Table } from 'reactstrap'

const Stock = ({ modules }) => {
  return (
    <>
      <h4 className='mb-4'>Stock</h4>
      <Table striped>
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
      </Table>
    </>
  )
}

export default Stock