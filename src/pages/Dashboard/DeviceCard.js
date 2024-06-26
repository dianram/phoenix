import LostDeviceControl from 'components/LostDeviceControl';
import { userTypes } from 'constants/userTypes';
import { singleModuleShutDownOnFireStore, updateDevice } from 'helpers/firebase_helper';
import { updateModules } from 'helpers/modulesHelper';
// import { mqttAction } from 'helpers/mqtt_helpers';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Col,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'

import nonCarImg from '../../assets/images/nonCarImg.png'
import UploadModal from 'components/UploadModal';
import CustomAlert from 'components/CustomAlert';

/**
 * The DeviceCard component in JavaScript manages the display and functionality of a device card with
 * options for toggling device status and uploading images.
 * @returns The `DeviceCard` component is being returned. It is a functional component that displays
 * information about a device module, such as module ID, PIN, installation date, batch number, and
 * whether the device is active. The component also includes a switch to toggle the device's active
 * status, an option to upload an image, and a modal for uploading images.
 */
const DeviceCard = ({
  moduleID,
  modulePIN,
  moduleInstallDate,
  batchNumber,
  isOn,
  carModulePict,
  modules,
  setModules,
  module,
  userModules,
  setUserModules,
  user
}) => {
  const [isOnToggle, setIsOnToggle] = useState("");
  const [ editFeedBack, setEditFeedBack ] = useState("")
  const [editFeedBackVisible, setEditFeedBackVisible] = useState(true)
  const [modal, setModal] = useState(false);
  const [ isMaster, setIsMaster ] = useState(false)
  const [ currentModule, setCurrentModule ] = useState('')

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    setIsOnToggle(isOn)
    setCurrentModule(module)
    if (user.userType === userTypes.MASTER) {
      setIsMaster(true)
    }
  }, [isOn])
  
  const onChangeHandle = () => {
    setIsOnToggle(prev => !prev);
    singleModuleShutDownOnFireStore(moduleID, !isOnToggle)
    updateModules(module, moduleID, !isOnToggle, modules, setModules)
  }

  const saveUploadImgOnDB = (pictureObj) => {
    updateDevice(pictureObj, moduleID, setEditFeedBack, setCurrentModule, currentModule)
    setEditFeedBackVisible(true)
  }

  return (
    <Col xl={3} md={6}>
      <Card className='mt-4 shadow' color="light">
        <CardBody>
          <CardHeader className='mb-4 border-bottom'>
            <img
              src={currentModule.picture ? currentModule.picture : nonCarImg}
              alt='car'
              style={{ width: '100%', cursor: 'pointer' }}
              onClick={!isMaster ? toggleModal : () => {}}
            />
            {!isMaster && <p style={{ fontSize: '0.6rem', width: '100%', textAlign: 'center', marginTop: '10px' }}>Click to Upload Image</p>}
            <b>MODULE ID: </b>
            <CardText style={{ fontSize: '0.7rem' }}>{moduleID}</CardText>
          </CardHeader>
          <CardText className="border-bottom">PIN: {modulePIN}</CardText>
          <CardText className="border-bottom">Install Date: {moduleInstallDate}</CardText>
          <CardText className="border-bottom">batchNumber: {batchNumber}</CardText>
          <CardTitle>Active Device</CardTitle>
          <CardFooter style={{ backgroundColor: '#9AC1D8' }}>
            <div className='d-inline-flex justify-content-center'>
              <p style={{marginRight : "12px"}}>No</p>
              <FormGroup switch>
                <Input
                    className='h-50'
                    type="switch"
                    checked={isOnToggle}
                    onChange={onChangeHandle}
                  />
              </FormGroup>
              <p className='ml-2'>Yes</p>
            </div>
            {user.userType === userTypes.COSTUMER && <LostDeviceControl  user={user} module={module} setUserModules={setModules} userModules={modules}/>}
          </CardFooter>       
        </CardBody>
        
      </Card>
      <UploadModal modal={modal} toggleModal={toggleModal} saveUploadImgOnDB={saveUploadImgOnDB} setEditFeedBack={setEditFeedBack}/>
      {editFeedBack && (
        <CustomAlert
          message={editFeedBack.message}
          typeOfAlert={editFeedBack.typeOfAlert}
          editFeedBackVisible={editFeedBackVisible}
          setEditFeedBackVisible={setEditFeedBackVisible}
        />
      )}
    </Col>
  )
}

export default DeviceCard
