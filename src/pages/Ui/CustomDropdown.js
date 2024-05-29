import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { userTypes } from "../../constants/userTypes"
import PropTypes from 'prop-types';

/**
 * The CustomDropdown function is a React component that displays a dropdown menu to select the type of
 * user (dealer or customer) and triggers corresponding actions when an option is selected.
 * @returns The CustomDropdown component is being returned. It is a functional component that renders a
 * Dropdown component from a UI library with options for selecting the type of user (Dealer or
 * Customer). The component also takes in props for direction, setUserType function, and setShowFrom
 * function.
 */
function CustomDropdown({ direction, setUserType, setShowFrom }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex p-5 justify-content-center">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret style={{backgroundColor: '#9AC1D8', color: 'white', border: 'none'}}>Type of User</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Type of user</DropdownItem>
          <DropdownItem onClick={(e) => {
            setUserType(userTypes.DEALER)
            setShowFrom(true)
          }}>Dealer</DropdownItem>
          <DropdownItem onClick={(e) => {
            setUserType(userTypes.COSTUMER)
            setShowFrom(true)
          }}>Costumer</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

CustomDropdown.propTypes = {
  direction: PropTypes.string,
};

export default CustomDropdown;