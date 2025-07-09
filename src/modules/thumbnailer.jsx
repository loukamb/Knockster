import style from "../style"
import css from "../styles/thumbnailer.css"

import { render } from "preact"
import { useState, useCallback } from "preact/hooks"

function ImageViewer({ src }) {
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  return (
    <div class="img-viewer">
      <img src={src} height={256} onClick={() => setExpanded(true)} />
      {expanded && (
        <div
          className="img-viewer-container"
          onClick={() => {
            setExpanded(false)
            setPosition({ x: 0, y: 0 })
            setZoom(100)
          }}
          onMouseMove={(e) => {
            if (!isDragging) return

            e.preventDefault()
            setPosition({
              x: e.clientX - dragStart.x,
              y: e.clientY - dragStart.y,
            })
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <img
            src={src}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
              setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
              })
            }}
            onWheel={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setZoom(Math.max(25, Math.min(500, zoom - e.deltaY / 5)))
            }}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}%)`,
              cursor: isDragging ? "grabbing" : "grab",
              transition: isDragging ? "" : "0.2s transform",
            }}
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
