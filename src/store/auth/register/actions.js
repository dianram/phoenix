import { getFirebaseBackend } from "helpers/firebase_helper"

import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = (user ) => {
  // const firebaseBackend = getFirebaseBackend()
  // firebaseBackend.addNewUserToFirestore(details)
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }

}
