const getModules = (groupItems) => groupItems.map(groupItem => ({uid: groupItem}))

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
export {
  getModules,
  updateModules,
  modulesStateUpdate
}