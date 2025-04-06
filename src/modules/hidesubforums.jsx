import css from "./hidesubforums.css"
import style from "../style"
import { getSettings, setSettings } from "../settings"

export default {
  id: "hidesubforums",
  name: "Mute subforums",
  desc: "Allows you to mute subforums.",
  settings: { hidden: [] },

  load() {
    /** Load in styles. */
    style(css)
  },

  page() {
    const toHide = getSettings("hidesubforums").hidden ?? []

    /** Add hide buttons. */
    const subforumNames = document.querySelectorAll(".sf-name")
    for (const sfName of subforumNames) {
      const subforum = sfName.parentElement.parentElement

      /** Check if we have to remove subforums. */
      const href = sfName.parentElement.getAttribute("href")
      if (toHide.includes(href)) {
        subforum.remove()
        continue
      }

      /** Add hide button. */
      const hideBtn = document.createElement("span")
      hideBtn.className = "knockster-hide-subforum-btn"
      hideBtn.innerHTML = `<i class="fa-solid fa-eye-low-vision"></i>`
      hideBtn.onclick = (e) => {
        /** Cancel click and remove element immediately. */
        e.preventDefault()
        e.stopImmediatePropagation()
        subforum.remove()

        /** Add subforum to settings, and save. */
        const existingHidden = getSettings("hidesubforums").hidden ?? []
        setSettings("hidesubforums", {
          hidden: [...existingHidden, href],
        })
      }

      sfName.append(hideBtn)
    }

    /** Add restore button. */
    if (toHide.length === 0) {
      return // Do nothing.
    }

    /** Get container of sf entries. */
    const subforumContainer =
      document.querySelector(".title-stats").parentElement.parentElement

    /** Insert a button to restore hidden subforums. */
    const restoreBtn = document.createElement("button")
    restoreBtn.innerText = "Restore hidden subforums"
    restoreBtn.className = "knockster-button"
    restoreBtn.onclick = () => {
      setSettings("hidesubforums", { hidden: [] })
      location.reload()
    }
    subforumContainer.append(restoreBtn)
  },
}
