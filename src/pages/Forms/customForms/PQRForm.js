import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PQRFormModal = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Send PQR</ModalHeader>
      <ModalBody>
        <form action="https://formsubmit.co/phoenixinmobilizer@gmail.com" method="POST">
          <input type="hidden" name="_next" value="http://localhost:3000/dashboard"/>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input type="textarea" name="message" id="message" value={formData.message} onChange={handleChange} required />
          </FormGroup>
          <Button style={{ backgroundColor: 'rgb(154, 193, 216)', border: 'none' }} type="submit">Send</Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PQRFormModal;
