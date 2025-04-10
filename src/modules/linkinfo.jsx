import css from "./linkinfo.css"
import style from "../style"

export default {
  id: "linkinfo",
  name: "Link information",
  desc: "Attaches information to external links.",

  /** Load in styles. */
  load() {
    style(css)
  },

  page() {
    /** Select all links within posts. */
    const postLinks = document.querySelectorAll(".post-content a")

    for (const link of postLinks) {
      /** Extract href */
      let href
      try {
        href = new URL(link.getAttribute("href"))
      } catch (e) {
        continue // URL is malformed (or local, starting with '/') so we can't really check.
      }

      /** Skip over internal links. */
      if (
        href.hostname === "knockout.chat" ||
        href.hostname === "cdn.knockout.chat"
      )
        continue

      /** Create preview element. */
      const previewNode = document.createElement("span")
      const previewIcon = document.createElement("img")
      previewIcon.setAttribute("src", `https://${href.hostname}/favicon.ico`)
      previewIcon.setAttribute("width", "16")
      previewIcon.setAttribute("height", "16")
      previewNode.className = "knockster-linkinfo"
      previewNode.append(document.createTextNode(" ("))
      previewNode.append(previewIcon)
      previewNode.append(document.createTextNode(`${href.hostname})`))

      /** Insert preview element. */
      link.insertAdjacentElement("afterend", previewNode)
    }
  },
}
