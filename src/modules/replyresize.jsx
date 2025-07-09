import css from "../styles/replyresize.css"
import style from "../style"

export default {
  id: "replyresize",
  name: "Reply resize",
  desc: "Allows you to adjust the vertical height of the reply box.",
  default: true,

  load() {
    style(css)
  },

  page() {
    /**@type {HTMLTextAreaElement} */
    const replyTextBox = document.querySelector('textarea[name="content"]')
    if (replyTextBox) {
      const onMouseUp = () =>
        (replyTextBox.style.minHeight = `${Math.max(
          120,
          replyTextBox.offsetHeight
        )}px`)
      const onMouseDown = () => {
        replyTextBox.style.height = Math.max(120, replyTextBox.style.minHeight)
        replyTextBox.style.minHeight = `unset`
      }
      replyTextBox.addEventListener("mouseup", onMouseUp)
      replyTextBox.addEventListener("mousedown", onMouseDown)
    }
  },
}
