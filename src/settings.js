import modules from "./modules/_all"

/** Currently stored module data. */
let currentModuleData = {}

/**
 * Save settings.
 */
function saveModuleData() {
  const saved = {}
  for (const module of modules) {
    saved[module.id] = {
      active: currentModuleData[module.id]?.active ?? true,
      settings: currentModuleData[module.id]?.settings ?? module.settings,
    }
  }
  GM_setValues(saved)
}

/**
 * Check if module is active.
 */
export function isModuleActive(moduleId) {
  return currentModuleData[moduleId].active
}

/**
 * Enable/disable module.
 */
export function setModuleActive(moduleId, value) {
  currentModuleData[moduleId].active = value ?? true
  saveModuleData()
}

/**
 * Return settings for provided module.
 */
export function getSettings(moduleId) {
  return currentModuleData[moduleId].settings
}

/**
 * Set settings for provided module.
 */
export function setSettings(moduleId, settings) {
  currentModuleData[moduleId].settings = settings
  saveModuleData()
  return settings
}

/**
 * Load existing settings and set default values otherwise.
 */
export function initSettings() {
  const moduleRequests = {}
  for (const module of modules) {
    moduleRequests[module.id] = {
      active: module.default ?? true,
      settings: module.settings,
    }
  }
  currentModuleData = GM_getValues(moduleRequests)
  GM_setValues(currentModuleData)
}
