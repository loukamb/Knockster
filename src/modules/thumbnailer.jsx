import style from "../style"
import css from "./thumbnailer.css"

import { render } from "preact"
import { useState } from "preact/hooks"

function ImageViewer({ src }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div class="img-viewer">
      <img src={src} height={256} onClick={() => setExpanded(true)} />
      {expanded && (
        <div
          className="img-viewer-container"
          onClick={() => setExpanded(false)}
        >
          <img
            src={src}
            onClick={(e) => (e.preventDefault(), e.stopPropagation())}
          />
        </div>
      )}
    </div>
  )
}

export default {
  id: "thumbnailer",
  name: "Thumbnailer",
  desc: "Downsizes images and allows you to expand them.",
  default: true,

  load() {
    style(css)
  },

  page() {
    /** Select all images in posts. */
    const imagesInPosts = document.querySelectorAll("img.image")

    /** Replace them. */
    for (const img of imagesInPosts) {
      const src = img.getAttribute("src")
      const parent = img.parentNode
      parent.innerHTML = "" // Erase existing contents.
      render(<ImageViewer src={src} />, parent)
    }
  },
}
