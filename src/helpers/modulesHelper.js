import { update } from "lodash"

const getModules = (groupItems) => groupItems.map(groupItem => ({uid: groupItem}))

const getFullModules = (groupItems, modules) => {
  let filteredModules = []
  groupItems.map(
    groupItem => {
      const filteredModule = modules.filter(module => groupItem === module.uid)
      filteredModules = [...filteredModules, ...filteredModule]
    }
  )
  return filteredModules
}

const updateModules = (module, moduleID, isOnToggle, modules, setModules) => {
  const removedModule = modules.filter(item => item.uid !== moduleID) 
  const moduleUpdated = {...module, isOn: isOnToggle}
  const updatedModules = [...removedModule, moduleUpdated]
  setModules(updatedModules)
}
const modulesStateUpdate = (modules, setModules) => {
  const updateModules = modules.map(module => ({...module, isOn: false}))
  setModules(updateModules)
}
const removeObjects = (objectsToRemove, originalArray) => {
  const filteredArray = originalArray.filter(item =>
    !objectsToRemove.includes(item)
  );

  return filteredArray;
};

const fewModulesStateUpdate = (allModules, modulesToUpdate, setModules, setUserModules) => {
  console.log({allModules, modulesToUpdate})
  const removedModules = removeObjects(modulesToUpdate, allModules)
  const updatedModules = modulesToUpdate.map(module => ({...module, isOn: false}))
  if (setUserModules) {
    setUserModules(updatedModules)
  }
  setModules([...removedModules, ...updatedModules])
}

const addModuleToUserState = (userModules, setUserModules, moduleIDToSubscribe, allModules) => {
  const fullModuleToAdd = allModules.filter(module => module.uid === moduleIDToSubscribe)
  setUserModules([...userModules, ...fullModuleToAdd])
}
const moduleIsInBD = (moduleID, modules) => modules.filter(module => module.uid === moduleID).length > 0 ? true : false
const moduleBelongToUser = (moduleID, user) => user?.modules.includes(moduleID)

const isValidIDToSubscribe = (moduleID, modules, user) => moduleIsInBD(moduleID, modules) && !moduleBelongToUser(moduleID, user)

const removeModuleFromUserState = (userModules, setUserModules, module) => {
  const userModulesUpdated = userModules.filter(userModule => userModule.uid !== module.uid)
  setUserModules([...userModulesUpdated])
}

export {
  getModules,
  updateModules,
  modulesStateUpdate,
  getFullModules,
  fewModulesStateUpdate,
  addModuleToUserState,
  isValidIDToSubscribe,
  removeModuleFromUserState
}