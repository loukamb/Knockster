import style from "../style"

export const metadata = {
  id: "hideavatars",
  name: "Hide avatars",
  desc: "Removes user avatars.",
  default: false,
}

export function load() {
  style(".user-avatar{display:none!important;}")
}
