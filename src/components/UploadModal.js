import { handleImageUpload } from 'helpers/firebase_helper';
import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/**
 * The UploadModal component in JavaScript allows users to upload an image, display the selected image,
 * and submit the upload to a database.
 * @returns The `UploadModal` component is being returned. It is a modal component that allows users to
 * upload an image file, display the selected file, and submit the upload to save the image URL in the
 * database. The modal includes options to submit the upload, cancel the operation, and displays
 * feedback messages upon successful image upload.
 */
const UploadModal = ({ userId, modal, toggleModal, saveUploadImgOnDB, setEditFeedBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ imgURL, setImgURL ] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file);
    // Pasar el archivo al prop onFileChange si se proporciona
  };

  const handleUploadSubmit = async () => {
    if (selectedFile) {
      const ImageURL = await handleImageUpload(selectedFile, userId)
      setImgURL(ImageURL)
      saveUploadImgOnDB({photo: ImageURL})
      setSelectedFile(null)
      toggleModal()
      setEditFeedBack({ message: 'Image upload successfuly', typeOfAlert: 'success' })
    }
  }

  const handelCancel = () => {
    setSelectedFile(null)
    toggleModal()
  }

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Upload Image</ModalHeader>
      <ModalBody>
        {/* <Label for="fileUpload">Choose file:</Label> */}
        <Input type="file" id="fileUpload" onChange={handleFileChange} placeholder="Choose file" title="Choose file" acceptlanguage="en"/>
        {selectedFile && (
          <div style={{ padding: '10px', marginTop: '5px', display:'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Label>Selected File:</Label>
            <img src={URL.createObjectURL(selectedFile)} alt="Upload Image" style={{ maxWidth: '100%', maxHeight: '100px' }}/>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button style={{ backgroundColor: 'rgb(154, 193, 216', border: 'none' }} onClick={handleUploadSubmit}>
          Submit
        </Button>{' '}
        <Button color="secondary" onClick={handelCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default UploadModal