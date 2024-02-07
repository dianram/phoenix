import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button } from 'reactstrap';

const QRCodeReader = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [data, setData] = useState('No result');

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
      console.log({ result });
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
        <Button onClick={requestCameraPermission}>Scan QR</Button>
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
      <p>Resultado: {data}</p>
    </div>
  );
};

export default QRCodeReader;
