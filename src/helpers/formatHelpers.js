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

const formatDate = (dateObj) => {
  const dia = dateObj.getDate()
  const mes = dateObj.getMonth() + 1
  const año = dateObj.getFullYear()

  return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`
}

const formatInfoKey = (value) => {
  if (value.seconds !== undefined) {
    return formatDate(value.toDate())
  }
  else {
    return value.toString()
  }
}

const formatKey = key => {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const formattedKey = capitalizedKey.replace(/([A-Z])/g, ' $1').trim();
  return formattedKey
}

export {
  userDefinition,
  formatInfoKey,
  formatKey
}
