import modules from "./modules/_all"
import { initSettings, getModuleStatus } from "./settings"

/** Load in settings. */
initSettings()

/** Invoke module page events when nprogress is deleted. */
new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      for (const removed of mutation.removedNodes) {
        if (removed.id === "nprogress") {
          /** Run all "page" events for modules. */
          for (const module of modules) {
            try {
              if (
                "page" in module &&
                (module.metadata.force || getModuleStatus(module.metadata.id))
              ) {
                module.page()
              }
            } catch (e) {
              console.error(e)
            }
          }
          return
        }
      }
    }
  }
}).observe(document.body, { childList: true, subtree: true })

/** Invoke module load events  */
for (const module of modules) {
  try {
    if (
      "load" in module &&
      (module.metadata.force || getModuleStatus(module.metadata.id))
    ) {
      module.load()
    }
  } catch (e) {
    console.error(e)
  }
}
