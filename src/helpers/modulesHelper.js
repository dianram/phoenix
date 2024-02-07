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

const fewModulesStateUpdate = (allModules, modulesToUpdate, setModules) => {
  const removedModules = removeObjects(modulesToUpdate, allModules)
  const updatedModules = modulesToUpdate.map(module => ({...module, isOn: false}))
  setModules([...removedModules, ...updatedModules])
}

export {
  getModules,
  updateModules,
  modulesStateUpdate,
  getFullModules,
  fewModulesStateUpdate
}