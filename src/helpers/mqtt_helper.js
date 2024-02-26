import { Client } from 'paho-mqtt'

export const mqttActions = (moduleID) => {    
    // Configuración del cliente MQTT
    const client = new Client(
      '4ab5c906f6674d5894e9411dcbd54a0a.s1.eu.hivemq.cloud',
      8884,
      '/mqtt',
      moduleID
    );

    // Callback al conectarse
    const onConnect = () => {
      console.log('Conectado al servidor MQTT');
      client.subscribe('my/test/topic');
      client.publish('my/test/topic', 'Hello from MQTT')
    };

    // Callback al recibir un mensaje
    const onMessage = (message) => {
      console.log('Mensaje recibido:', message.payloadString);
    };

    // Configurar los callbacks
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error('Conexión perdida:', responseObject.errorMessage);
      }
    };

    client.onMessageArrived = onMessage;

    // Conectar al servidor MQTT
    client.connect({
      useSSL: true,
      userName: "CharlieMur",
      password: "MqttTest27",
      onSuccess: onConnect,
      onFailure: (responseObject) => {
        console.error('Fallo en la conexión:', responseObject.errorMessage);
      },
    });
    // client.publish('my/test/topic', 'This is a test')
    return client
}
