/**
 * A non-stupid way to approach page mutations.
 */

interface MutationNode {
  tag: string
  element: HTMLElement
  shouldTeardown: boolean
}

export default class Mutation {
  addedNodes: MutationNode[] = []

  createElement<Tag extends string>(tag: Tag, shouldTeardown: boolean = true) {
    const element = document.createElement(tag)
    this.addedNodes.push({ tag, element, shouldTeardown })
    return element
  }

  createStyle(css: string, shouldTeardown: boolean = true) {
    const style = document.createElement("style")
    style.textContent = css
    document.head.appendChild(style)
    this.addedNodes.push({ tag: "style", element: style, shouldTeardown })
    return style
  }

  teardown() {
    for (const node of this.addedNodes) {
      if (node.shouldTeardown) {
        node.element.remove()
      }
    }
  }
}
