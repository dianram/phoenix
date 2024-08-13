import SearchDevice from 'components/SearchDevice'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'

const Stock = ({ modules }) => {
  const [ showStock, setShowStock ] = useState(false)
  const [ filterResult, setFilterResult ] = useState([])

  useEffect(() => {
    setFilterResult(modules)
  }, [modules])

  return (
    <>
      <div className='d-flex justify-content-between border-bottom my-2'>
        <h4 className='mb-4' style={{marginRight: '2rem'}}>Stock</h4>
        <SearchDevice allDevices={modules} setFilterResult={setFilterResult} setShow={setShowStock} />
        <i 
          className={showStock ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
          onClick={e => {setShowStock(prev => !prev)}}
        ></i>
      </div>
      
      {showStock && (
        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
          <Table striped responsive>
            <thead>
              <tr>
                <th>
                  Module ID
                </th>
                <th>
                  Module Batch Number
                </th>
                <th>
                  Module Sale's Date
                </th>
                <th>
                  Voltage
                </th>
              </tr>
            </thead>
            <tbody>
              {filterResult.map(item => (
                <tr key={item.uid}>
                  <td>
                    {item.uid}
                  </td>
                  <td>
                    {item.batch_number}
                  </td>
                  <td>
                    {item.moduleInstallDate ? item.moduleInstallDate : 'not installed'}
                  </td>
                  <td>
                    here goes voltage
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>)
      }
    </>
  )
}

export default Stock