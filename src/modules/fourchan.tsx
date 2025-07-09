import type { Module } from "../module"
import css from "../styles/fourchan.css"

export default {
  id: "fourchan",
  name: "4chan mode",
  desc: "Makes everyone anonymous.",
  default: false,

  load(mutation) {
    mutation.createStyle(css, false)
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
} as Module
