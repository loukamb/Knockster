/** @deprecated */
export default function style(src: string) {
  const styleElement = document.createElement("style")
  styleElement.append(document.createTextNode(src))
  document.head.append(styleElement)
  return styleElement
}
