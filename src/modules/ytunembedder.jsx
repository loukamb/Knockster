import css from "./ytunembedder.css"
import style from "../style"

function convert(embed) {
  if (embed.classList.contains("yt-thumbnail-processed")) return

  const originalSrc = embed.getAttribute("src")
  const originalWidth = embed.getAttribute("width") || "560"
  const originalHeight = embed.getAttribute("height") || "315"

  const srcUrl = new URL(originalSrc)
  const videoId = srcUrl.pathname.split("/").pop()

  if (!videoId) return

  const thumbnailContainer = document.createElement("div")
  thumbnailContainer.className = "yt-thumbnail-container"
  thumbnailContainer.style.width = `${originalWidth}px`
  thumbnailContainer.style.height = `${originalHeight}px`
  thumbnailContainer.style.position = "relative"
  thumbnailContainer.style.cursor = "pointer"

  const thumbnailImage = document.createElement("img")
  thumbnailImage.className = "yt-thumbnail-image"
  thumbnailImage.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  thumbnailImage.style.width = "100%"
  thumbnailImage.style.height = "100%"
  thumbnailImage.style.objectFit = "cover"
  thumbnailContainer.appendChild(thumbnailImage)

  const playButton = document.createElement("div")
  playButton.className = "yt-thumbnail-play"
  playButton.innerHTML = `
        <svg width="68" height="48" viewBox="0 0 68 48">
          <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
      `
  thumbnailContainer.appendChild(playButton)

  thumbnailContainer.dataset.originalSrc = originalSrc
  thumbnailContainer.dataset.originalWidth = originalWidth
  thumbnailContainer.dataset.originalHeight = originalHeight

  thumbnailContainer.addEventListener("click", function () {
    const videoIframe = document.createElement("iframe")
    videoIframe.src = this.dataset.originalSrc
    videoIframe.width = this.dataset.originalWidth
    videoIframe.height = this.dataset.originalHeight
    videoIframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    videoIframe.allowFullscreen = true
    videoIframe.classList.add("yt-thumbnail-processed")

    if (!videoIframe.src.includes("autoplay=1")) {
      videoIframe.src =
        videoIframe.src +
        (videoIframe.src.includes("?") ? "&" : "?") +
        "autoplay=1"
    }

    this.parentNode.replaceChild(videoIframe, this)
  })

  embed.parentNode.setAttribute("class", "") // hack to solve vid spacing
  embed.parentNode.replaceChild(thumbnailContainer, embed)
}

export default {
  id: "ytunembedder",
  name: "Unembedder",
  desc: "Converts YouTube embeds to thumbnails so they only load when clicked.",
  default: true,

  load() {
    style(css)

    /** Setup observer for any new embeds */
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes) {
          for (const node of mutation.addedNodes) {
            if (node.tagName === "IFRAME") {
              this.convert(node)
            } else if (node.nodeType === 1) {
              const iframes = node.querySelectorAll(
                'iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]'
              )
              for (const iframe of iframes) {
                convert(iframe)
              }
            }
          }
        }
      }
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  },

  page() {
    /** Convert existing embeds cuz my code sucks */
    document
      .querySelectorAll(
        'iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]'
      )
      .forEach(convert)
  },
}
