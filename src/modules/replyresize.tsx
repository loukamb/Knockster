import type { Module } from "../module"
import css from "../styles/replyresize.css"

export default {
  id: "replyresize",
  name: "Reply resize",
  desc: "Allows you to adjust the vertical height of the reply box.",
  default: true,

  load(mutation) {
    mutation.createStyle(css, false)
  },

  page() {
    const replyTextBox: HTMLTextAreaElement | null = document.querySelector(
      'textarea[name="content"]'
    )
    if (replyTextBox) {
      const onMouseUp = () =>
        (replyTextBox.style.minHeight = `${Math.max(
          120,
          replyTextBox.offsetHeight
        )}px`)
      const onMouseDown = () => {
        replyTextBox.style.height = `${Math.max(
          120,
          Number(replyTextBox.style.minHeight)
        )}px`
        replyTextBox.style.minHeight = `unset`
      }
      replyTextBox.addEventListener("mouseup", onMouseUp)
      replyTextBox.addEventListener("mousedown", onMouseDown)
    }
  },
} as Module
