import type { Module } from "../module"
import { getSettings, setSettings } from "../settings"
import { useState } from "preact/hooks"
import Mutation from "../mutation"

const MODULE_ID = "userfilter"

function getUserIdFromHref(href: string) {
  const match = href && href.match(/^\/user\/(\d+)/)
  return match ? match[1] : null
}

function getFilters() {
  return getSettings(MODULE_ID).filters ?? {}
}

function setFilters(filters: Record<string, any>) {
  setSettings(MODULE_ID, { filters })
}

function getGlobalSettings() {
  const s = getSettings(MODULE_ID)
  return {
    hideAvatars: !!s.hideAvatars,
    hideBackgrounds: !!s.hideBackgrounds,
  }
}

function setGlobalSettings(newSettings: Record<string, any>) {
  setSettings(MODULE_ID, {
    ...getSettings(MODULE_ID),
    ...newSettings,
  })
}

let existingPlaceholders = []

let alreadyAppliedGlobalStyles = false
function applyFilters(mutation: Mutation) {
  /** Apply global styles */
  if (!alreadyAppliedGlobalStyles) {
    const { hideAvatars, hideBackgrounds } = getGlobalSettings()
    if (hideAvatars) {
      mutation.createStyle(".user-avatar{display:none!important;}")
    }
    if (hideBackgrounds) {
      mutation.createStyle(".user-background-image{display:none!important;}")
    }
    alreadyAppliedGlobalStyles = true
  }

  const filters = getFilters()
  const profileLinks: HTMLAnchorElement[] = Array.from(
    document.querySelectorAll('a.profile-link[href^="/user/"]')
  )
  for (const link of profileLinks) {
    const userId = getUserIdFromHref(link.getAttribute("href"))
    if (!userId) {
      continue
    }

    const parent = link.parentElement
    const postContainer = parent?.parentElement
    if (!postContainer) {
      continue
    }
    const filter = filters[userId] || {}

    // Remove any old filter button containers
    parent
      .querySelectorAll(".knockster-userfilter-btn-container")
      .forEach((c) => c.remove())

    const btnContainer = document.createElement("span")
    btnContainer.className = "knockster-userfilter-btn-container"
    btnContainer.style.zIndex = "100"
    btnContainer.style.display = "flex"
    btnContainer.style.gap = "0.3em"
    btnContainer.style.marginTop = "0.5em"

    const bg = postContainer.querySelector(".user-background-image")
    if (
      bg &&
      bg.parentElement &&
      getComputedStyle(bg.parentElement).position === "static"
    ) {
      bg.parentElement.style.position = "relative"
    }

    const makeBtn = (
      icon: string,
      active: boolean,
      title: string,
      onClick: () => void
    ) => {
      const btn = document.createElement("span")
      btn.className = "knockster-userfilter-btn"
      btn.title = title
      btn.innerHTML = `<i class="fa-solid ${icon}" style="opacity:${
        active ? 1 : 0.3
      }"></i>`
      btn.style.cursor = "pointer"
      btn.style.marginLeft = "0.3em"
      btn.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }
      return btn
    }

    btnContainer.appendChild(
      makeBtn("fa-image", filter.muteBackground, "Toggle background", () => {
        setFilters({
          ...filters,
          [userId]: { ...filter, muteBackground: !filter.muteBackground },
        })
        applyFilters(mutation)
      })
    )

    btnContainer.appendChild(
      makeBtn("fa-user", filter.muteAvatar, "Toggle avatar", () => {
        setFilters({
          ...filters,
          [userId]: { ...filter, muteAvatar: !filter.muteAvatar },
        })
        applyFilters(mutation)
      })
    )
    btnContainer.appendChild(
      makeBtn(
        "fa-comment-slash",
        filter.mutePost,
        "Toggle post content",
        () => {
          setFilters({
            ...filters,
            [userId]: { ...filter, mutePost: !filter.mutePost },
          })
          applyFilters(mutation)
        }
      )
    )

    parent.appendChild(btnContainer)

    if (filter.muteAvatar) {
      const avatar = postContainer.querySelector(".user-avatar")
      if (avatar) {
        ;(avatar as HTMLElement).style.display = "none"
      }
    } else {
      const avatar = postContainer.querySelector(".user-avatar")
      if (avatar) {
        ;(avatar as HTMLElement).style.display = ""
      }
    }

    if (filter.muteBackground) {
      const bg = postContainer.querySelector(".user-background-image")
      if (bg) {
        ;(bg as HTMLElement).style.display = "none"
      }
    } else {
      const bg = postContainer.querySelector(".user-background-image")
      if (bg) {
        ;(bg as HTMLElement).style.display = ""
      }
    }

    if (filter.mutePost) {
      if (!(postContainer as any).knocksterUserfilterReplaced) {
        const placeholder = document.createElement("div")
        placeholder.className = "knockster-userfilter-reveal-placeholder"
        placeholder.style.width = "100%"
        existingPlaceholders.push(placeholder)

        const revealBtn = document.createElement("button")
        revealBtn.className = "knockster-button knockster-userfilter-reveal-btn"
        revealBtn.style.width = "100%"
        revealBtn.textContent = "Show post (muted)"
        revealBtn.onclick = (e) => {
          e.preventDefault()
          //placeholder.replaceWith(postContainer)
          postContainer.style.display = ""
          placeholder.style.display = "none"
          ;(postContainer as any).knocksterUserfilterReplaced = false
        }

        placeholder.appendChild(revealBtn)
        postContainer.style.display = "none"
        postContainer.insertAdjacentElement("afterend", placeholder)
        ;(postContainer as any).knocksterUserfilterReplaced = true
        ;(postContainer as any).knocksterUserfilterPlaceholder = placeholder
      }
    }
  }
}

export default {
  id: MODULE_ID,
  name: "User filter",
  desc: "Allows you to mute avatars, backgrounds, or posts from users.",
  default: true,
  settings: { filters: {}, hideAvatars: false, hideBackgrounds: false },

  page(mutation) {
    // First thing first
    /*for (const placeholder of existingPlaceholders) {
      placeholder.remove()
    }
    existingPlaceholders = []

    // Then apply the filters*/
    applyFilters(mutation)
  },

  config() {
    const [filters, setFiltersState] = useState(getFilters())
    const [global, setGlobal] = useState(getGlobalSettings())

    const update = () => setFiltersState(getFilters())
    const updateGlobal = () => setGlobal(getGlobalSettings())

    const removeUser = (userId) => {
      const newFilters = { ...getFilters() }
      delete newFilters[userId]
      setFilters(newFilters)
      update()
    }

    const toggle = (userId, key) => {
      const f = { ...getFilters()[userId] }
      f[key] = !f[key]
      setFilters({ ...getFilters(), [userId]: f })
      update()
    }

    const toggleGlobal = (key) => {
      setGlobalSettings({ [key]: !global[key] })
      updateGlobal()
    }

    const userIds = Object.keys(filters)
    return (
      <div>
        <div style={{ marginBottom: "0.5em" }}>
          <b>Global options:</b>
        </div>
        <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
          <label>
            <input
              type="checkbox"
              checked={global.hideAvatars}
              onChange={() => toggleGlobal("hideAvatars")}
            />
            Globally hide avatars
          </label>
          <label>
            <input
              type="checkbox"
              checked={global.hideBackgrounds}
              onChange={() => toggleGlobal("hideBackgrounds")}
            />
            Globally hide backgrounds
          </label>
        </div>
        <div style={{ marginBottom: "0.5em" }}>
          <b>Filtered users:</b>
        </div>
        {userIds.length === 0 && (
          <div>
            No users filtered yet. Use the buttons on posts to add filters.
          </div>
        )}
        {userIds.map((userId) => (
          <div
            key={userId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              marginBottom: "0.5em",
            }}
          >
            <span>User ID: {userId}</span>
            <button
              class="knockster-button"
              onClick={() => toggle(userId, "muteAvatar")}
            >
              Avatar: {filters[userId].muteAvatar ? "Muted" : "Shown"}
            </button>
            <button
              class="knockster-button"
              onClick={() => toggle(userId, "muteBackground")}
            >
              Background: {filters[userId].muteBackground ? "Muted" : "Shown"}
            </button>
            <button
              class="knockster-button"
              onClick={() => toggle(userId, "mutePost")}
            >
              Post: {filters[userId].mutePost ? "Muted" : "Shown"}
            </button>
            <button
              class="knockster-button"
              onClick={() => removeUser(userId)}
              style={{ marginLeft: "1em" }}
            >
              Remove
            </button>
          </div>
        ))}
        <div style={{ fontSize: "0.9em", opacity: 0.7, marginTop: "1em" }}>
          Use the buttons on posts to quickly mute/unmute avatars, backgrounds,
          or posts for any user.
        </div>
      </div>
    )
  },
} as Module
