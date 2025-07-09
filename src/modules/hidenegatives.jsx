import style from "../style"
import css from "../styles/hidenegatives.css"

export default {
  id: "hidenegatives",
  name: "Hide bad ratings",
  desc: "Removes negative reactions.",
  default: false,

  load() {
    style(css)
  },
}
