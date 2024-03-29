import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { userTypes } from "../../constants/userTypes"
import PropTypes from 'prop-types';

function CustomDropdown({ direction, setUserType }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex p-5 justify-content-center">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret style={{backgroundColor: '#9AC1D8', color: 'white', border: 'none'}}>Type of User</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Type of user</DropdownItem>
          <DropdownItem onClick={(e) => setUserType(userTypes.DEALER)}>Dealer</DropdownItem>
          <DropdownItem onClick={(e) => setUserType(userTypes.COSTUMER)}>Costumer</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

CustomDropdown.propTypes = {
  direction: PropTypes.string,
};

export default CustomDropdown;