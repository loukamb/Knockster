import style from "../style"

export default {
  id: "hideavatars",
  name: "Hide avatars",
  desc: "Removes user avatars.",
  default: false,

  load() {
    style(".user-avatar{display:none!important;}")
  },
}
