import css from "../styles/hidesubforums.css"
import style from "../style"
import { getSettings, setSettings } from "../settings"

export default {
  id: "homepageimprovements",
  name: "Homepage improvements",
  desc: "Mute or pin subforums.",
  settings: { hidden: [], pinned: [] },

  load() {
    /** Load in styles. */
    style(css)
  },

  page() {
    let settings = getSettings("homepageimprovements")
    const toHide = settings.hidden ?? []
    const toPin = settings.pinned ?? []

    /** Add hide buttons. */
    const subforumNames = document.querySelectorAll(".sf-name")
    for (const sfName of subforumNames) {
      if (sfName.querySelector(".knockster-subforum-btn")) {
        continue
      }
      const subforum = sfName.parentElement.parentElement
      const href = sfName.parentElement.getAttribute("href")

      /** Check if we have to remove subforums. */
      if (toHide.includes(href)) {
        subforum.remove()
        continue
      }

      /** Pinning logic */
      if (toPin.includes(href)) {
        subforum.classList.add("knockster-pinned-subforum")
        subforum.style.order = -1
      } else {
        subforum.classList.remove("knockster-pinned-subforum")
        subforum.style.order = ""
      }

      /** Hide button */
      const hideBtn = document.createElement("span")
      hideBtn.className = "knockster-subforum-btn"
      hideBtn.title = "Hide subforum"
      hideBtn.innerHTML = `<i class=\"fa-solid fa-eye-low-vision\"></i>`
      hideBtn.style.cursor = "pointer"
      hideBtn.onclick = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        subforum.remove()
        settings = setSettings("homepageimprovements", {
          ...settings,
          hidden: [...(settings.hidden ?? []), href],
        })
      }

      /** Pin button */
      const pinBtn = document.createElement("span")
      pinBtn.className = "knockster-subforum-btn"
      pinBtn.title = toPin.includes(href) ? "Unpin subforum" : "Pin subforum"
      pinBtn.innerHTML = toPin.includes(href)
        ? `<i class=\"fa-solid fa-thumbtack\" style=\"color:#3fa34d\"></i>`
        : `<i class=\"fa-regular fa-thumbtack\"></i>`
      pinBtn.style.cursor = "pointer"
      pinBtn.onclick = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        let newPinned
        if (toPin.includes(href)) {
          newPinned = toPin.filter((h) => h !== href)
        } else {
          newPinned = [href, ...toPin.filter((h) => h !== href)]
        }
        settings = setSettings("homepageimprovements", {
          ...settings,
          pinned: newPinned,
        })
        location.reload()
      }

      sfName.append(pinBtn)
      sfName.append(hideBtn)
    }

    /** Add restore button. */
    if (toHide.length === 0 && toPin.length === 0) {
      return // Do nothing.
    }

    /** Get container of sf entries. */
    const subforumContainer =
      document.querySelector(".title-stats")?.parentElement?.parentElement

    /** Insert a button to restore hidden subforums. */
    if (
      subforumContainer &&
      !subforumContainer.querySelector("button.knockster-restore-hidden")
    ) {
      const restoreBtn = document.createElement("button")
      restoreBtn.innerText = "Restore hidden subforums"
      restoreBtn.className = "knockster-button knockster-restore-hidden"
      restoreBtn.onclick = () => {
        settings = setSettings("homepageimprovements", {
          ...settings,
          hidden: [],
        })
        location.reload()
      }
      subforumContainer.append(restoreBtn)
    }

    /** Insert a button to restore pinned subforums. */
    if (
      subforumContainer &&
      !subforumContainer.querySelector("button.knockster-restore-pinned") &&
      toPin.length > 0
    ) {
      const restorePinBtn = document.createElement("button")
      restorePinBtn.innerText = "Unpin all subforums"
      restorePinBtn.className = "knockster-button knockster-restore-pinned"
      restorePinBtn.onclick = () => {
        settings = setSettings("homepageimprovements", {
          ...settings,
          pinned: [],
        })
        location.reload()
      }
      subforumContainer.append(restorePinBtn)
    }
  },
}
