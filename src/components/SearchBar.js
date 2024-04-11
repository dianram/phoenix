import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

const SearchBar = ({ allUsers, setFilterResult, setShow }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filtered = allUsers
    if (searchTerm) {
      filtered = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  
    setFilterResult(filtered)
    setSearchTerm('')
    setShow(true)
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: '7px' }}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Search..."
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

export default SearchBar;
