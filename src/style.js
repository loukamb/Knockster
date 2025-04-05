export default function style(src) {
  const styleElement = document.createElement("style")
  styleElement.append(document.createTextNode(src))
  document.head.append(styleElement)
  return styleElement
}
