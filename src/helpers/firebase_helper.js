import firebase from "firebase/compat/app"

// Add the Firebase products that you want to use
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { collection, getDocs, doc, getDoc, FieldValue } from "firebase/firestore"
import useTypes, { userTypes } from "../constants/userTypes"

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

  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users")
    const details = {
      email: user.email,
      name: user.userFullName,
      address: user.address,
      phone: user.phone,
      state: user.location,
      userType: user.userType,
      modules: [],
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    }
    collection.doc(firebase.auth().currentUser.uid).set(details)
    return { user, details }
  }

  addNewDealerToFirestore = (user) => {
    const collection = firebase.firestore().collection("dealerships")
    const details = {
      manager: user.manager,
      managerPhone: user.dealerPhone,
      email: user.dealerEmail,
      name: user.dealerlName,
      address: user.dealerAddress,
      phone: user.dealerPhone,
      state: user.dealerLocation,
      userType: user.userType,
      modules: [],
      groups: [],
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    }
    collection.doc(firebase.auth().currentUser.uid).set(details)
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

const getUserInfo = async () => {
  const db = await firebase.firestore()
  const user = JSON.parse(localStorage.getItem("authUser"))
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userInfo = docSnap.data()
    return {...userInfo, uid: user.uid}
  } else {
    const docRefDealer = doc(db, "dealerships", user.uid);
    const docSnapDealer = await getDoc(docRefDealer);
    if (docSnapDealer.exists()) {
      const userInfo = docSnapDealer.data()
      return {...userInfo, uid: user.uid}
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
}

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

const modulesShutDownOnFireStore = ( modules ) => {
  console.log({modules})
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

const updatedGroups = (item, groupName, groups, groupItems) => {
  const newItems = groupItems.filter(groupItem => groupItem !== item)
  const groupUpdated = {name: groupName, items: newItems}
  const itemRemovedFromGroups = groups.filter(group => group.name !== groupName)
  const newGroups = [...itemRemovedFromGroups, groupUpdated]
  return newGroups
}

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
const updateDevice = ( dataToUpdate, uid, setEditFeedBack, setCurrentModule, currentModule ) => {
  const db = firebase.firestore()

  db.collection('modules').doc(uid).update({
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

const handleImageUpload = async (file) => {
  const storage = firebase.storage()
  const storageRef = storage.ref();
  const fileRef = storageRef.child(file.name);
  const snapshot = await fileRef.put(file);
  // Obtener la URL pública de la imagen recién subida
  const imageUrl = await snapshot.ref.getDownloadURL();
  return imageUrl
};
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


export { 
  initFirebaseBackend,
  getFirebaseBackend,
  getCollectionFromFirestore,
  getUserInfo,
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
  updateDevice
}
