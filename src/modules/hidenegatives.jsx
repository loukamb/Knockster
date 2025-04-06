import style from "../style"
import css from "./hidenegatives.css"

export default {
  id: "hidenegatives",
  name: "Hide bad ratings",
  desc: "Removes negative reactions.",
  default: false,

  load() {
    style(css)
  },
}
