import style from "../style"

export default {
  id: "hidebackgrounds",
  name: "Hide backgrounds",
  desc: "Removes user backgrounds.",
  default: false,

  load() {
    style(".user-background-image{display:none!important;}")
  },
}
