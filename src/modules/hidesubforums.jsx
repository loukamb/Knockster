import { getSetting, setSetting } from "../settings"

export const metadata = {
  id: "hidesubforums",
  name: "Hide subforums",
  desc: "Allows you to mute subforums.",
  settings: { hidden: [] },
}

export function page() {
  /** Retrieve settings. */
  const toHide = getSetting("hidesubforums", "hidden") ?? []

  /** Select all subforum titles and add hide button/hide if it already exists.. */
  const subforumTitles = document.querySelectorAll(".title-stats")
  for (const subforumTitle of subforumTitles) {
    const subforum = subforumTitle.parentElement
    if (toHide.includes(subforum.getAttribute("href"))) {
      /** Remove the subforum. */
      subforum.remove()
      continue
    }
    /** Add hide button. */
    const insertInto = subforumTitle.querySelector(".sf-name")
    const hideBtn = document.createElement("span")
    hideBtn.style = "margin-left: 0.5em; opacity: 75%;"
    hideBtn.innerHTML = `<i class="fa-solid fa-eye-low-vision"></i>`
    hideBtn.onclick = (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      subforum.remove()
    }
    insertInto.append(hideBtn)
  }
}
