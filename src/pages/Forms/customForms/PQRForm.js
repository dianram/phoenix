import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/**
 * The PQRFormModal component is a form modal in JavaScript that allows users to send PQR (queries or
 * requests) with fields for name, email, and message.
 * @returns The code snippet is a functional component named `PQRFormModal` that renders a modal dialog
 * for sending a PQR (Possible Quality Report). The modal contains a form with input fields for name,
 * email, and message, along with a submit button and a cancel button. The form is set to submit to a
 * specific email address using the `formsubmit.co` service.
 */
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
