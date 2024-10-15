import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button } from 'reactstrap';

/**
 * The QRCodeReader function in JavaScript allows users to scan QR codes using the camera, displaying
 * the scanned data and handling permissions accordingly.
 * @returns The `QRCodeReader` component is being returned, which contains the logic for scanning QR
 * codes using the camera. The component renders different UI elements based on the camera permission
 * status and whether a QR code has been scanned.
 */
const QRCodeReader = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [data, setData] = useState('');

  const requestCameraPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    try {
      setCameraPermission(true);
      stream.getTracks().forEach((track) => track.stop()); // Release the camera stream
    } catch (error) {
      console.error('Error al solicitar permisos de la cámara:', error);
      setCameraPermission(false);
    }
  };

  const handleScan = (result) => {
    if (result && isCameraActive) {
      setData(result?.text);
      setIsCameraActive(false); // Desactiva la cámara después de haber leído un código QR
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const renderScanner = () => {
    if (cameraPermission === null) {
      // No se ha solicitado permisos aún
      return (
        <Button onClick={requestCameraPermission} style={{ backgroundColor: '#9AC1D8', color: 'white', border: 'none' }}>Scan QR</Button>
      );
    } else if (cameraPermission === true && isCameraActive) {
      // Permiso concedido y cámara activa, mostrar el lector QR
      return (
        <QrReader
          onResult={handleScan}
          onError={handleError}
          style={{ width: '50%' }}
        />
      );
    } else if (cameraPermission === true && !isCameraActive) {
      // Permiso concedido, pero cámara desactivada después de haber leído un código QR
      return <p>The code was scanned.</p>;
    } else {
      // Permiso denegado
      return <p>Permission denied.</p>;
    }
  };

  return (
    <div>
      {renderScanner()}
      <p>{data}</p>
    </div>
  );
};

export default QRCodeReader;
