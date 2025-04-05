import style from "../style"

export const metadata = {
  id: "hidebackgrounds",
  name: "Hide backgrounds",
  desc: "Removes user backgrounds.",
  default: false,
}

export function load() {
  style(".user-background-image{display:none!important;}")
}
