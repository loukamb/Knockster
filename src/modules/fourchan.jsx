import style from "../style"
import css from "./fourchan.css"

export default {
  id: "fourchan",
  name: "4chan mode",
  desc: "Makes everyone anonymous.",
  default: false,

  load() {
    style(css)
  },

  page() {
    const usernames = [
      ...document.querySelectorAll(".user-role-wrapper-component"),
    ]
    usernames.forEach((node) => {
      node.innerHTML = `Anonymous`
      node.classList.add("processed")
    })
  },
}
