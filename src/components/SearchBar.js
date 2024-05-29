import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

/**
 * The SearchBar component in JavaScript allows users to search for specific names within a list of
 * allUsers and filter the results accordingly.
 * @returns The `SearchBar` component is being returned. It is a functional component that contains a
 * form with an input field for searching users. The user can input a search term, which triggers a
 * filtering process on the `allUsers` data based on the user's name. The filtered results are then
 * passed to the `setFilterResult` function, and the form is reset. The form includes an input
 */
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
