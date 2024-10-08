import { userTypes } from "constants/userTypes";

const userDefinition = (role) => {
  switch (role) {
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

// const formatKey = key => {
//   const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//   const formattedKey = capitalizedKey.replace(/([A-Z])/g, ' $1').trim();
//   return formattedKey
// }

const formatKey = key => {
  const formattedKey = key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  return formattedKey.replace(/([A-Z])/g, ' $1').trim();
};


export {
  userDefinition,
  formatInfoKey,
  formatKey
}
