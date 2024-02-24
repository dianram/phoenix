import { userTypes } from "constants/userTypes";

const userDefinition = (userType) => {
  switch (userType) {
    case userTypes.MASTER:
      return "Megauser"
      break;
    case userTypes.DEALER:
      return "Dealer"
      break;
    case userTypes.COSTUMER:
      return "Costumer"
      break;
    default:
      return ""
      break;
  }
}

export {
  userDefinition
}
