import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

const SearchDevice = ({ allDevices, setFilterResult, setShow, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filtered = allDevices
    if (searchTerm) {
      filtered = allDevices.filter(device => device.modulePIN.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  
    setFilterResult(filtered)
    setSearchTerm('')
    setShow(true)
    if (setCurrentPage) {
      setCurrentPage(1)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: '7px' }}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Enter PIN number"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="border-0"
          style={{
            backgroundColor: 'rgb(154, 193, 216)',
          }}>
            Search
          </Button>
      </InputGroup>
    </form>
  );
};

export default SearchDevice;
