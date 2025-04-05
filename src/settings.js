import modules from "./modules/_all"

/** Object listing current module settings. */
let moduleSettings

function save() {
  const saved = {}
  for (const module of modules) {
    saved[module.metadata.id] = {
      active: moduleSettings[module.metadata.id]?.active ?? true,
      settings:
        moduleSettings[module.metadata.id]?.settings ??
        module.metadata.settings,
    }
  }
  GM_setValues(saved)
}

/** Get whether the module is enabled.  */
export function getModuleStatus(module) {
  return moduleSettings[module]?.active
}

/** Set whether the module is enabled.  */
export function setModuleStatus(module, value) {
  const info = moduleSettings[module] ?? {}
  if (info !== undefined) {
    info.active = value
  }
  save()
}

/** Get a module setting.  */
export function getSetting(module, name) {
  return moduleSettings[module]?.settings?.[name]
}

/** Set a module setting.  */
export function setSetting(module, name, value) {
  const settings = moduleSettings[module]?.settings
  if (settings !== undefined) {
    settings[name] = value
  }
  save()
}

/** Load existing settings and set default values otherwise. */
export function initSettings() {
  const moduleRequests = {}
  for (const module of modules) {
    /** See https://violentmonkey.github.io/api/gm/#gm_getvalues. */
    moduleRequests[module.metadata.id] = {
      active: true,
      settings: module.metadata.settings,
    }
  }
  moduleSettings = GM_getValues(moduleRequests)
  GM_setValues(moduleRequests) // Write defaults, if they don't exist already.
}
