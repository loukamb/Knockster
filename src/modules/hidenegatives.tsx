import type { Module } from "../module"
import css from "../styles/hidenegatives.css"

export default {
  id: "hidenegatives",
  name: "Hide bad ratings",
  desc: "Removes negative reactions.",
  default: false,

  load(mutation) {
    mutation.createStyle(css, false)
  },
} as Module
