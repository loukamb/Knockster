import modules from "./_all"

import {
  getSetting,
  setSetting,
  getModuleStatus,
  setModuleStatus,
} from "../settings"

import { render, h } from "preact"
import { useState } from "preact/hooks"

export const metadata = {
  id: "settings",
  name: "Settings menu",
  desc: "Provides you with a useful settings menu for extensions.",
  force: true,
}

function ModuleToggle({ module }) {
  return (
    <div style={{ display: "flex", marginBottom: "1em" }}>
      <div>
        <div style={{ marginBottom: "0.3em" }}>{module.metadata.name}</div>
        <div style={{ fontSize: "0.8em", opacity: "50%" }}>
          {module.metadata.desc}
        </div>
      </div>
      <input
        type="checkbox"
        style={{ marginLeft: "auto" }}
        checked={getModuleStatus(module.metadata.id)}
        disabled={module.metadata.force}
        onChange={(e) => setModuleStatus(module.metadata.id, e.target.checked)}
      />
    </div>
  )
}

function SettingsMenu() {
  const [menuShown, setMenuShown] = useState(false)

  return (
    <div
      style={{ position: "relative", marginTop: "auto", marginBottom: "auto" }}
    >
      <i
        onClick={() => setMenuShown(!menuShown)}
        style={{ cursor: "pointer", opacity: 0.75 }}
        class="fa-solid fa-wand-magic-sparkles"
      ></i>

      {menuShown && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            minWidth: "24rem",
            background: "rgb(31, 44, 57)",
            boxShadow: "rgba(17, 16, 16, 0.33) 0px 6px 14px",
            padding: "1em",
          }}
        >
          {modules.map((module) => (
            <ModuleToggle key={module.metadata.id} module={module} />
          ))}
          <div>
            Refresh to apply changes.{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://github.com/loukamb/knockster"
              target="_
            blank"
            >
              Source
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function load() {
  /** Locate the replies menu. */
  const repliesMenu = document.querySelector(".replies-menu")
  if (!repliesMenu) {
    console.error("Couldn't locate replies menu!")
    return
  }

  /** Render button next to replies menu. */
  const rootBtn = document.createElement("div")
  rootBtn.setAttribute(
    "style",
    "order: 7; height: 100%; display: flex; margin-right: 10px;"
  )
  repliesMenu.insertAdjacentElement("afterend", rootBtn)
  render(<SettingsMenu />, rootBtn)
}
