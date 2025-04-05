export const metadata = {
  id: "linkinfo",
  name: "Link information",
  desc: "Attaches information to external links.",
}

export function page() {
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
    if (href.hostname === "knockout.chat") continue

    /** Create preview element. */
    const previewNode = document.createElement("span")
    const previewIcon = document.createElement("img")
    previewIcon.setAttribute("src", `https://${href.hostname}/favicon.ico`)
    previewIcon.setAttribute("width", "16")
    previewIcon.setAttribute("height", "16")
    previewIcon.setAttribute(
      "style",
      "vertical-align: middle; margin-right: 0.1em;"
    )
    previewNode.setAttribute(
      "style",
      "margin-left: 0.1em; margin-right: 0.1em; opacity: 50%;"
    )
    previewNode.append(document.createTextNode(" ("))
    previewNode.append(previewIcon)
    previewNode.append(document.createTextNode(`${href.hostname})`))

    /** Insert preview element. */
    link.insertAdjacentElement("afterend", previewNode)
  }
}
