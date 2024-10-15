import firebase from "firebase/compat/app"

// Add the Firebase products that you want to use
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { collection, getDocs, doc, getDoc, FieldValue, setDoc, updateDoc, collectionGroup } from "firebase/firestore"
import useTypes, { userTypes } from "../constants/userTypes"
import { getDatabase, ref, update } from "firebase/database"
import firebaseConfig from "firebaseConfig"

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig)
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user))
        } else {
          localStorage.removeItem("authUser")
        }
      })
    }
  }

  /**
   * Registers the user with given details
   */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            reject(this._handleError(error))
            console.log(error)
          }
        )
        .catch(error => {
          console.log(error)
        })
    })
  }

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            reject(this._handleError(error))
          }
        )
    })
  }

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            console.log(error)
            reject(this._handleError(error))
          }
        )
    })
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(this._handleError(error))
        })
    })
  }

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(this._handleError(error))
        })
    })
  }

  /**
   * 
   * @param {Object} user 
   * @returns An object that contains user object and details object
   */
  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users")
    const details = {
      email: user.email,
      name: user.userFullName,
      address: user.address,
      phone: user.phone,
      state: user.location,
      city: user.city,
      role: user.role,
      receiver_name: ''
    }
    collection.doc(firebase.auth().currentUser.uid).set(details)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    return { user, details }
  }

  /**
   * 
   * @param {Object} user 
   * @returns An object that contains user object and details object
   */
  addNewDealerToFirestore = (user) => {
    const collection = firebase.firestore().collection("users")
    const details = {
      receiver_name: user.dealerReceiver,
      email: user.dealerEmail,
      name: user.dealerName.replace(/\s+/g, ''),
      address: user.dealerAddress,
      phone: user.dealerPhone,
      state: user.dealerLocation.replace(/\s+/g, ''),
      city: user.dealerCity.replace(/\s+/g, ''),
      role: user.role,
    }
    collection.doc(firebase.auth().currentUser.uid).set(details)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    return { user, details }
  }

  setLoggeedInUser = user => {
    localStorage.setItem("authUser", JSON.stringify(user))
  }

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null
    return JSON.parse(localStorage.getItem("authUser"))
  }

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message
    return errorMessage
  }
}

let _fireBaseBackend = null

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config)
  }
  return _fireBaseBackend
}

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend
}

const dataRTDB = (firebaseConfig) => {
  const app = firebase.initializeApp(firebaseConfig)
  const database = getDatabase(app)
  return database
}

/**
 * 
 * @param {string} collectionName
 * @returns {Promise<Array>} resolve an Array with collection items
 */
const getCollectionFromFirestore = async (collectionName) => {
  const db = firebase.firestore()
  const querySnapshot = await getDocs(collection(db, collectionName));
  let res = []
  querySnapshot.forEach((doc) => {
    res.push({
      uid: doc.id,
      ...doc.data()
    })
  })
  // doc.data() is never undefined for query doc snapshots
  return res
}


const getDocumentWithSubCollections = async (docId) => {
  const db = firebase.firestore()
  try {
    // Referencia al documento principal
    const docRef = doc(db, "devices_groups", docId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Referencia a la subcolección 'devices'
      const devicesRef = collection(docRef, 'group_devices');
      const devicesSnap = await getDocs(devicesRef);

      // Mapeo de los documentos de la subcolección
      const devices = devicesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Añadir la subcolección al documento principal
      data.group_devices = devices;

      return data;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document with subcollection:", error);
  }
};

const getFullGroupsInfo = async (groups, setGroups) => {
  const fullGroupsInfo = await Promise.all(
    groups.map(fullGroupInfo => getDocumentWithSubCollections(fullGroupInfo.uid))
  )
  setGroups(fullGroupsInfo)
}


const getAllUsersWithDevices = async (subCollectionName) => {
  const db = await firebase.firestore()
  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);

    const usersData = await Promise.all(
      usersSnapshot.docs.map(async (userDoc) => {
        const userData = userDoc.data();
        const userId = userDoc.id;
        
        // Obtener subcolección 'devices_end_user'
        const devicesRef = collection(db, "users", userId, subCollectionName);
        const devicesSnapshot = await getDocs(devicesRef);

        const devices = devicesSnapshot.docs.map((deviceDoc) => ({
          id: deviceDoc.id,
          ...deviceDoc.data(),
        }));


        // Incluir los dispositivos en los datos del usuario
        return {
          uid: userId,
          ...userData,
          [subCollectionName]: devices,
        };
      })
    );

    return usersData
  } catch (error) {
    console.error("Error fetching users and devices: ", error);
  }
};



const getSubCollectionsData = async (collectionName, docId) => {
  const db = await firebase.firestore();

  // Referencia al documento específico
  const docRef = doc(db, collectionName, docId);

  // Obtener todas las subcolecciones del documento
  const subCollectionsData = {};

  // Suponiendo que tienes nombres de subcolecciones conocidas, las puedes iterar
  // Si no, tendrías que usar otro método para obtener nombres de subcolecciones dinámicamente
  const subCollectionNames = ["end_user_devices", "user_devices_groups", "dealer_devices", "dealer_end_users"]; // Ejemplo de subcolecciones conocidas

  for (const subCollectionName of subCollectionNames) {
    const subCollectionRef = collection(docRef, subCollectionName);
    const subCollectionData = await getDocs(subCollectionRef);

    subCollectionsData[subCollectionName] = subCollectionData.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  return subCollectionsData;
}
const getAllDocumentsWithSubCollections = async (collectionName) => {
  const db = await firebase.firestore();
  const mainCollection = collection(db, collectionName);
  const mainSnapshot = await getDocs(mainCollection);
  
  const results = [];
  
  for (const docSnap of mainSnapshot.docs) {
    const data = docSnap.data();
    const subCollections = await getSubCollectionsData(collectionName, docSnap.id);
    results.push({
      id: docSnap.id,
      ...data,
      subCollections
    });
  }

  return results;
}

const getFullUsersInfo = async (collectionName, userRole) => {
  const fullUsersInfo = await getAllDocumentsWithSubCollections(collectionName)
  const users = fullUsersInfo.filter(user => user.role === userRole)
  return users
}

// Función para obtener todas las subcolecciones y sus datos de un usuario específico
const getUserSubCollectionsData = async (userId) => {
  const db = firebase.firestore();

  // Referencia al documento del usuario
  const userDocRef = doc(db, 'users', userId);

  // Subcolecciones conocidas
  const subCollectionNames = ["end_user_devices", "user_devices_groups", "dealer_devices", "dealer_end_users"];

  const subCollectionsData = {};

  // Iterar a través de las subcolecciones conocidas
  for (const subCollectionName of subCollectionNames) {
    const subCollectionRef = collection(userDocRef, subCollectionName);
    const subCollectionData = await getDocs(subCollectionRef);

    // Agregar los datos de la subcolección al objeto de resultados
    subCollectionsData[subCollectionName] = subCollectionData.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  return subCollectionsData;
};

// Función para obtener los datos del usuario y sus subcolecciones por ID
const getUserWithSubCollections = async (userId) => {
  const db = firebase.firestore();

  // Obtener el documento del usuario
  const userDocRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  // Obtener los datos principales del usuario
  const userData = userSnap.data();

  // Obtener los datos de las subcolecciones
  const subCollections = await getUserSubCollectionsData(userId);

  // Retornar el documento del usuario con los datos de las subcolecciones
  return {
    id: userSnap.id,
    ...userData,
    subCollections
  };
};



/**
 * 
 * @returns Object with user info
 */
const getUserInfo = async () => {
  const user = JSON.parse(localStorage.getItem("authUser"))
  const fullUser = await getUserWithSubCollections(user.uid)
  return fullUser
}



/**
 * 
 * @param {Object} device 
 * @returns details Object
 */
const addNewDeviceToFirestore = async (device) => {
  const db = await firebase.firestore()
  // const collection = firebase.firestore().collection("modules")
  const details = {
    assetDescription: device.assetDescription,
    assetName: device.assetName,
    assetStatus: device.assetStatus,
    batchNumber: device.batchNumber,
    batteryVoltage: device.batteryVoltage,
    moduleInstallDate: device.moduleInstallDate,
    moduleOwner: device.moduleOwner,
    modulePIN: device.modulePIN,
    moduleState: device.moduleState,
    usbInputVoltage: device.usbInputVoltage,
    vinNumber: device.vinNumber,
    action: "",
    isOn: false,
    createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
    lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
  }
  const createdDocRef = await db.collection("modules").add(details)
  if (createdDocRef) {
    console.log("Document ID created: ", createdDocRef.id)
  } else {
    console.log("Error adding document")
  }
  return { details }
}

/**
 * 
 * @param {Array} modules 
 */
const modulesShutDownOnFireStore = ( modules ) => {
  const db = firebase.firestore()
  modules.map(module => {
    db.collection("modules").doc(module.uid).update({
      isOn: false
    }).then(() => {
      console.log("All modules were successfully shutdown!")
    }).catch(error => {
      console.error("Error updating documents: ", error)
    })
  })
}

/**
 * 
 * @param {String} moduleID 
 * @param {Boolean} isOn 
 */
const singleModuleShutDownOnFireStore = ( moduleID, isOn ) => {
  const db = firebase.firestore()
  db.collection("modules").doc(moduleID).update({
    isOn
  }).then(() => {
    console.log("Document successfully updated!")
  }).catch(error => {
    console.error("Error updating document: ", error)
  })
}

/**
 * 
 * @param {String} groupName 
 * @param {String} itemId 
 * @param {Object} user 
 * @param {Array} groups 
 * @param {Function} setGroups 
 */
const createGroup = ( groupName, itemId, user, groups, setGroups ) => {
  const newGroup = {
    name: groupName,
    items: [itemId]
  }
  const db = firebase.firestore()
  if (user.userType === userTypes.DEALER) {
    db.collection("dealerships").doc(user.uid).update({
      groups: [...groups, newGroup]
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups([...groups, newGroup])
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  } else {
    db.collection("users").doc(user.uid).update({
      groups: [...groups, newGroup]
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups([...groups, newGroup])
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  }
}

/**
 * 
 * @param {String} groupName 
 * @param {String} newItem 
 * @param {Object} user 
 * @param {Array} groups 
 * @param {Function} setGroups 
 * @param {Array} groupItems 
 */
const addItemToGroup = ( groupName, newItem, user, groups, setGroups, groupItems ) => {
  const itemRemovedFromGroups = groups.filter(group => group.name !== groupName)
  const newGroup = {
    name: groupName,
    items: [...groupItems, newItem]
  }
  const db = firebase.firestore()
  if (user.userType === userTypes.DEALER) {
    db.collection("dealerships").doc(user.uid).update({
      groups: [...itemRemovedFromGroups, newGroup]
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups([...itemRemovedFromGroups, newGroup])
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  } else {
    db.collection("users").doc(user.uid).update({
      groups: [...itemRemovedFromGroups, newGroup]
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups([...itemRemovedFromGroups, newGroup])
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  }
}

/**
 * 
 * @param {Object} item 
 * @param {String} groupName 
 * @param {Array} groups 
 * @param {Array} groupItems 
 * @returns updated groups Array
 */
const updatedGroups = (item, groupName, groups, groupItems) => {
  const newItems = groupItems.filter(groupItem => groupItem !== item)
  const groupUpdated = {name: groupName, items: newItems}
  const itemRemovedFromGroups = groups.filter(group => group.name !== groupName)
  const newGroups = [...itemRemovedFromGroups, groupUpdated]
  return newGroups
}

/**
 * 
 * @param {Object} dataToUpdate 
 * @param {String} collection 
 * @param {String} uid 
 * @param {Function} setEditFeedBack 
 * @param {Function} setUser 
 * @param {Object} user 
 */
const updateUserProfile = ( dataToUpdate, collection, uid, setEditFeedBack, setUser, user ) => {
  const db = firebase.firestore()

  db.collection(collection).doc(uid).update({
    ...dataToUpdate
  }).then(() => {
    setEditFeedBack({
      message: 'The user was successfully updated!',
      typeOfAlert: 'success'
    })
    setUser({...user, ...dataToUpdate})
    console.log("The user was successfully updated!")
  }).catch(error => {
    setEditFeedBack({
      message: `Update fail!, ${error}`,
      typeOfAlert: 'danger'
    })
    console.error("Error updating document: ", error)
  })
}

/**
 * 
 * @param {Object} dataToUpdate 
 * @param {String} uid 
 * @param {Function} setEditFeedBack 
 * @param {Function} setCurrentModule 
 * @param {Object} currentModule 
 */
const updateDevice = ( dataToUpdate, uid, setEditFeedBack, setCurrentModule, currentModule ) => {
  const db = firebase.firestore()

  db.collection('devices').doc(uid).update({
    ...currentModule, ...dataToUpdate
  }).then(() => {
    setEditFeedBack({
      message: 'The device was successfully updated!',
      typeOfAlert: 'success'
    })
    setCurrentModule({...currentModule, ...dataToUpdate})
    console.log("The module was successfully updated!")
  }).catch(error => {
    setEditFeedBack({
      message: `Update fail!, ${error}`,
      typeOfAlert: 'danger'
    })
    console.error("Error updating document: ", error)
  })
}

/**
 * 
 * @param {Object} file 
 * @returns {String} image URL
 */
const handleImageUpload = async (file, userId) => {
  const storage = firebase.storage()
  const storageRef = storage.ref();
  const fileRef = storageRef.child(`users/${userId}/${file.name}`);
  const snapshot = await fileRef.put(file);
  // Obtener la URL pública de la imagen recién subida
  const imageUrl = await snapshot.ref.getDownloadURL();
  return imageUrl
};

/**
 * 
 * @param {Object} user 
 * @param {Object} item 
 * @param {String} groupName 
 * @param {Array} groups 
 * @param {Function} setGroups 
 * @param {Array} groupItems 
 */
const removeItemFromGroup = (user, item, groupName, groups, setGroups, groupItems) => {
  const newGroups = updatedGroups(item, groupName, groups, groupItems)
  const db = firebase.firestore()
  if (user.userType === userTypes.DEALER) {
    db.collection("dealerships").doc(user.uid).update({
      groups: newGroups
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups(newGroups)
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  } else {
    db.collection("users").doc(user.uid).update({
      groups: newGroups
    }).then(() => {
      console.log("Document successfully updated!")
      setGroups(newGroups)
    }).catch(error => {
      console.error("Error updating document: ", error)
    })
  }
}

/**
 * 
 * @param {String} userID 
 * @param {String} IDToSubscribe 
 * @param {Array} userModules 
 */
const addModuleToUserOnFireBase = async (userID, IDToSubscribe, userModules) => {
  const db = firebase.firestore()
  db.collection("dealerships").doc(userID).update({
    modules: [...userModules, IDToSubscribe]
  }).then(() => {
    console.log("Document successfully updated!")
  }).catch(error => {
    console.error("Error updating document: ", error)
  })
}

/**
 * 
 * @param {Object} user 
 * @param {Object} module 
 */
const removeModuleFromUserOnFirestore = async (user, module) => {
  const userModulesUpdated = user.modules.filter(userModule => userModule !== module.uid)
  const moduleOwnersUpdated = module.moduleOwner.filter(owner => owner !== user.uid)
  const db = firebase.firestore()
  db.collection("users").doc(user.uid).update({
    modules: [...userModulesUpdated]
  }).then(() => {
    console.log("Document successfully updated!")
  }).catch(error => {
    console.error("Error updating document: ", error)
  })
  db.collection("modules").doc(module.uid).update({
    moduleOwner: [...moduleOwnersUpdated]
  }).then(() => {
    console.log("Document successfully updated!")
  }).catch(error => {
    console.error("Error updating document: ", error)
  })
}



const getAllDeviceEndUsers = async (deviceID) => {
  const db = firebase.firestore();
  const subCollectionRef = collection(db, 'devices', deviceID, "device_end_users");
  let deviceUsers = []
  try {
    const querySnapshot = await getDocs(subCollectionRef);
    querySnapshot.forEach((doc) => {
      deviceUsers.push(doc.data());
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return deviceUsers
}


const addEndUserToDevice = async (deviceID, endUserID) => {
  const db = firebase.firestore();

  try {
    const endUserDocRef = doc(db, 'users', endUserID)
    const deviceDocRef = doc(db, 'devices', deviceID, 'device_end_users', endUserID);
    const data = {
      end_user_id: endUserDocRef,
    };
    await setDoc(deviceDocRef, data);
    console.log("Documento agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el documento: ", error);
  }
};

const upDateModeOnDeviceRTDB = (path, deviceID) => {
  const database = dataRTDB(firebaseConfig)
  const dataRef = ref(database, `${path}/${deviceID}`)
  update(dataRef, {
    mode: 3,
  })
    .then(() => {
      console.log('Datos actualizados exitosamente.');
    })
    .catch((error) => {
      console.error('Error al actualizar los datos:', error);
    });
}
const upDateControlOnDeviceRTDB = (path,isOnToggle) => {
  const database = dataRTDB(firebaseConfig)
  const dataRef = ref(database, `${path}/`)
  update(dataRef, {
    control: !isOnToggle,
  })
    .then(() => {
      console.log('Datos actualizados exitosamente.');
    })
    .catch((error) => {
      console.error('Error al actualizar los datos:', error);
    });
}
const getRTDBVoltages = (path) => {
  const database = dataRTDB(firebaseConfig)
  const dataRef = ref(database, `${path}/`)
  update(dataRef, {
    getVoltage: true,
  })
    .then(() => {
      console.log('Voltages updated');
    })
    .catch((error) => {
      console.error('Error al actualizar los datos:', error);
    });
}
const addDeviceToEndUser = async (deviceID, endUserID) => {
  const db = firebase.firestore();

  try {
    const deviceRef = doc(db, 'devices', deviceID)
    const endUserDocRef = doc(db, 'users', endUserID, 'end_user_devices', deviceID);
    const data = {
      device_id: deviceRef,
    };
    await setDoc(endUserDocRef, data);
    await updateDoc(deviceRef, {status: 'assigned'})
    console.log("Documento agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el documento: ", error);
  }
};



const addDeviceToDealer = async (deviceID, dealerID) => {
  const db = firebase.firestore();

  try {
    const deviceRef = doc(db, 'devices', deviceID)
    const dealerDocRef = doc(db, 'users', dealerID, 'dealer_devices', deviceID);
    const data = {
      device_id: deviceRef,
    };
    await setDoc(dealerDocRef, data);
    await updateDoc(deviceRef, {status: 'toSell'})
    console.log("Documento agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el documento: ", error);
  }
};

const getUserInfoWithRef = async (userRef) => {
  const db = firebase.firestore();
  try {
    // id_dealership es una referencia al documento en Firestore
    const dealershipDocRef = doc(db, userRef.path);
    const dealershipDoc = await getDoc(dealershipDocRef);

    if (dealershipDoc.exists()) {
      const dealershipData = dealershipDoc.data();
      return dealershipData // Asumiendo que el campo "name" contiene el nombre del dealership
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching dealership:", error);
    return null;
  }
};

const getDevicesInfoFromRefs = async (devices) => {
  const db = firebase.firestore();
  const deviceRefs = devices.map(device => device.device_id)
  
  try {
    // Utilizamos Promise.all para esperar que todas las promesas se resuelvan
    const devicesData = await Promise.all(
      deviceRefs.map(async (deviceRef) => {
        const deviceSnap = await getDoc(deviceRef); // Obtener el documento de la referencia
        if (deviceSnap.exists()) {
          return {
            id: deviceSnap.id,
            ...deviceSnap.data() // Devolver los datos del dispositivo
          };
        } else {
          console.warn(`Device with reference ${deviceRef.path} not found.`);
          return null; // En caso de que no exista
        }
      })
    );

    // Filtrar cualquier valor null que pueda haber resultado de dispositivos no encontrados
    return devicesData.filter(device => device !== null);
  } catch (error) {
    console.error("Error retrieving device information: ", error);
    throw new Error("Error fetching devices data.");
  }
};


const isDeviceAssignedToDealer = async (deviceID) => {
  
  const db = firebase.firestore();

  try {
    // Referencia al documento del dispositivo
    const deviceDocRef = doc(db, 'devices', deviceID);

    // Obtener el documento
    const deviceDoc = await getDoc(deviceDocRef);

    // Verificar si el documento existe
    if (deviceDoc.exists()) {
      // Obtener los datos del documento
      const deviceData = deviceDoc.data();

      // Comprobar si 'dealership_id' tiene un valor
      if (deviceData.dealership_id) {
        console.log(`El dispositivo con ID ${deviceID} tiene un valor en 'dealership_id': ${deviceData.dealership_id}`);
        return true;  // Retorna true si 'dealership_id' tiene un valor
      } else {
        console.log(`El dispositivo con ID ${deviceID} no tiene un valor en 'dealership_id'.`);
        return false;  // Retorna false si 'dealership_id' no tiene un valor
      }
    } else {
      console.log(`El documento con ID ${deviceID} no existe.`);
      return false;  // Retorna false si el documento no existe
    }
  } catch (error) {
    console.error("Error al consultar el documento: ", error);
    return false;  // Retorna false en caso de error
  }
}

const isDeviceAssignedToThisDealer = async (deviceID, dealerID) => {
  const db = firebase.firestore();
  
  try {
    // Obtener el documento del dispositivo
    const deviceRef = doc(db, 'devices', deviceID);
    const deviceSnap = await getDoc(deviceRef);

    if (deviceSnap.exists()) {
      const deviceData = deviceSnap.data();
      
      
      if (!deviceData.dealership_id) {
        console.warn(`Device with ID ${deviceID} has no valid dealership_id field.`);
        return false;
      } else {
        const dealershipFieldSnap = await getDoc(deviceData.dealership_id);
        
        // Comparar el campo dealership_id con el dealerID proporcionado
        return dealershipFieldSnap.id === dealerID
      }
      
    } else {
      console.warn(`Device with ID ${deviceID} not found.`);
      return false;
    }
  } catch (error) {
    console.error("Error comparing dealership_id: ", error);
    throw new Error("Error retrieving device data.");
  }
};


const addDealerIdToDevice = async (deviceID, dealerID) => {
  const db = firebase.firestore();

  try {
    const deviceDocRef = doc(db, 'devices', deviceID);
    const dealerRef = doc(db, 'users', dealerID); // Suponiendo que los dealers están en una colección 'dealers'
    
    await updateDoc(deviceDocRef, {
      dealership_id: dealerRef,
      status: 'sell'
    });
    
    console.log("Referencia de dealership_id agregada con éxito");
  } catch (error) {
    console.error("Error al agregar la referencia del dealer: ", error);
  }
};

const createDeviceGroup = async (groupName, userId, devices, setGroups, groups)  => {
  const db = firebase.firestore();

  try {
    // Crea un nuevo documento en la colección 'devices_groups'
    const groupRef = await db.collection('devices_groups').add({
      group_name: groupName,
      user_id: userId,
    });

    // Itera sobre el array de 'devices' para agregar cada uno a la subcolección 'group_devices'
    const batch = db.batch();  // Usamos un batch para hacer la operación en conjunto

    devices.forEach((deviceId) => {
      const deviceRef = db.collection('devices').doc(deviceId);
      const groupDeviceRef = groupRef.collection('group_devices').doc(deviceId);

      // Añadir cada dispositivo con su referencia a 'group_devices'
      batch.set(groupDeviceRef, {
        device_id: deviceRef  // Referencia al documento en la colección 'devices'
      });
    });

    // Ejecutar el batch
    await batch.commit();

    // Añadir un documento a la subcolección 'user_devices_groups' dentro del documento del usuario
    const userRef = db.collection('users').doc(userId);
    const userDeviceGroupRef = userRef.collection('user_devices_groups').doc(groupRef.id); 

    // Setea el documento con la referencia al grupo de dispositivos
    await userDeviceGroupRef.set({
      devices_group_id: groupRef, // Almacenamos la referencia del documento en 'devices_groups'
    }, { merge: true });  // merge:true asegura que se actualicen los campos existentes o se creen si no existen

    console.log("Device group and user_devices_groups entry created/updated successfully!");

    setGroups(prevGroups => [
      ...prevGroups,
      {
        devices_group_id: groupRef,  // Referencia del documento
        id: groupRef.id  // ID del grupo creado en 'devices_groups'
      }
    ])
    // Retornar la referencia del documento creado en 'devices_groups'
    // return {
    //   devices_group_id: groupRef,  // Referencia del documento
    //   id: groupRef.id  // ID del grupo creado en 'devices_groups'
    // }
  } catch (error) {
    console.error("Error creating device group: ", error);
    throw error; // Lanza el error para que el llamador pueda manejarlo
  }
}


const getSubCollectionData = async (collectionName, docId, subcollectionName) => {
  const db = firebase.firestore();
  
  try {
    // Accedemos a la subcolección dentro del documento de la colección principal
    const subcollectionRef = db.collection(collectionName).doc(docId).collection(subcollectionName);

    // Obtener los documentos dentro de la subcolección
    const subcollectionSnapshot = await subcollectionRef.get();
    
    // Crear un array para almacenar los datos de los documentos
    const data = [];
    
    // Iterar sobre los documentos y extraer sus datos
    subcollectionSnapshot.forEach(doc => {
      data.push({
        id: doc.id,  // Incluir el ID del documento
        ...doc.data()  // Incluir los campos del documento
      });
    });

    // Retornar los datos de la subcolección
    return data;
  } catch (error) {
    console.error("Error getting subcollection data: ", error);
    throw error;  // Lanzamos el error para que el llamador lo maneje
  }
}


/**
 * Función que obtiene un documento desde una referencia y también incluye la subcolección 'group_devices'.
 * @param {DocumentReference} docRef - La referencia del documento en Firestore.
 * @returns {Object} - El documento y su subcolección.
 */
const getReferenceInfoWithSubcollections = async (docRef) => {
  try {
    // Obtener el documento principal
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // Obtener la subcolección 'group_devices'
      const subcollectionRef = collection(docRef, 'group_devices');
      const subcollectionSnapshot = await getDocs(subcollectionRef);

      const subcollectionData = subcollectionSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        id: docSnapshot.id,
        ...data,
        group_devices: subcollectionData
      };
    } else {
      console.error("Document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document with subcollection:", error);
    throw error;
  }
};

const changeControlOnRTDBDevices = (user, devices, controlValue) => {
  const updates = {};
  const database = dataRTDB(firebaseConfig)

  // Recorremos cada dispositivo para crear las actualizaciones en la RTDB
  devices.forEach(device => {
    const path = `/${user.state}/${user.city}/${user.name}/${device.id}/control`;  // Construimos el path
    updates[path] = controlValue;  // Actualizamos el campo `control` a 'on'
  });

  // Ejecutamos las actualizaciones en la base de datos
  update(ref(database), updates)
    .then(() => {
      console.log('All devices updated to ${controlValue} successfully.');
    })
    .catch((error) => {
      console.error('Error updating devices:', error);
    });
}













export { 
  initFirebaseBackend,
  dataRTDB,
  getFirebaseBackend,
  getCollectionFromFirestore,
  getAllDocumentsWithSubCollections,
  getFullGroupsInfo,
  getUserInfo,
  getFullUsersInfo,
  addNewDeviceToFirestore,
  modulesShutDownOnFireStore,
  singleModuleShutDownOnFireStore,
  createGroup,
  removeItemFromGroup,
  addItemToGroup,
  addModuleToUserOnFireBase,
  removeModuleFromUserOnFirestore,
  updateUserProfile,
  handleImageUpload,
  updateDevice,
  getAllDeviceEndUsers,
  addEndUserToDevice,
  upDateModeOnDeviceRTDB,
  upDateControlOnDeviceRTDB,
  getRTDBVoltages,
  addDeviceToEndUser,
  getUserInfoWithRef,
  getDevicesInfoFromRefs,
  isDeviceAssignedToDealer,
  isDeviceAssignedToThisDealer,
  addDealerIdToDevice,
  addDeviceToDealer,
  createDeviceGroup,
  getSubCollectionData,
  getReferenceInfoWithSubcollections,
  changeControlOnRTDBDevices,
}
