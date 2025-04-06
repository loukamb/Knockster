import style from "./style"
import modules from "./modules/_all"
import { initSettings, isModuleActive } from "./settings"

import knocksterStyles from "./index.css"

/** Load in settings. */
initSettings()

/** Global stylesheet. */
style(knocksterStyles)

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
                (module.force || isModuleActive(module.id))
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
    if ("load" in module && (module.force || isModuleActive(module.id))) {
      module.load()
    }
  } catch (e) {
    console.error(e)
  }
}
