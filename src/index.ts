import Modules, { Module } from "./module"
import Mutation from "./mutation"
import Style from "./style"
import { initSettings, isModuleActive } from "./settings"

let mutations: Record<string, Mutation> = {}

import knocksterStyles from "./styles/index.css"

function mutationFor(module: Module) {
  if (!mutations[module.id]) {
    mutations[module.id] = new Mutation()
  }
  return mutations[module.id]
}

function onPageLoad() {
  for (const module of Modules) {
    const mutation = mutationFor(module)
    if (module.load && (module.force || isModuleActive(module.id))) {
      try {
        module.load(mutation)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

function onPageUnload() {
  for (const mutation of Object.values(mutations)) {
    mutation.teardown()
  }
  mutations = {}
}

function onPageChange() {
  for (const module of Modules) {
    if (module.page && (module.force || isModuleActive(module.id))) {
      try {
        module.page(mutationFor(module))
      } catch (e) {
        console.error(e)
      }
    }
  }
}

/** Load in settings */
initSettings()

/** Global stylesheet */
Style(knocksterStyles)

/** Override location rewrites so we know when the page is going to change */
const originalPushState = history.pushState
history.pushState = function (...args) {
  onPageUnload()
  originalPushState.apply(this, args)
}

const originalReplaceState = history.replaceState
history.replaceState = function (...args) {
  onPageUnload()
  originalReplaceState.apply(this, args)
}

/** Keep track of the last seen url to avoid unnecessary page changes */
let lastSeenUrl: string | undefined

/** Invoke module page events when nprogress is deleted */
new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      for (const removed of mutation.removedNodes) {
        if (removed instanceof HTMLElement && removed.id === "nprogress") {
          if (lastSeenUrl !== document.location.href) {
            onPageChange()
            lastSeenUrl = document.location.href
          }
          return
        }
      }
    }
  }
}).observe(document.body, { childList: true, subtree: true })

/** Do initial module load after everything is done */
onPageLoad()
