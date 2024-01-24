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
    <div className="d-flex p-5">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>Type of User</DropdownToggle>
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