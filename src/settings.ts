import Modules from "./module"

/** Currently stored module data. */
let currentModuleData = {}

/**
 * Save settings.
 */
function saveModuleData() {
  const saved = {}
  for (const module of Modules) {
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
export function isModuleActive(moduleId: string) {
  return currentModuleData[moduleId].active
}

/**
 * Enable/disable module.
 */
export function setModuleActive(moduleId: string, value: boolean) {
  currentModuleData[moduleId].active = value ?? true
  saveModuleData()
}

/**
 * Return settings for provided module.
 */
export function getSettings(moduleId: string) {
  return currentModuleData[moduleId].settings
}

/**
 * Set settings for provided module.
 */
export function setSettings(moduleId: string, settings: Record<string, any>) {
  currentModuleData[moduleId].settings = settings
  saveModuleData()
  return settings
}

/**
 * Load existing settings and set default values otherwise.
 */
export function initSettings() {
  const moduleRequests: Record<string, any> = {}
  for (const module of Modules) {
    moduleRequests[module.id] = {
      active: module.default ?? true,
      settings: module.settings,
    }
  }
  currentModuleData = GM_getValues(moduleRequests)
  GM_setValues(currentModuleData)
}
