import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

/**
 * The SearchDevice function in JavaScript allows users to search for devices by PIN number and filter
 * the results accordingly.
 * @returns The `SearchDevice` component is being returned. It is a functional component that renders a
 * form with an input field for entering a PIN number and a search button. The component handles the
 * search functionality by filtering the `allDevices` based on the entered PIN number and updating the
 * filter result, show state, and current page state accordingly.
 */
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
