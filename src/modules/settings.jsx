import css from "./settings.css"
import style from "../style"
import modules from "./_all"

import { isModuleActive, setModuleActive } from "../settings"

import { render, h } from "preact"
import { useState } from "preact/hooks"

function ModuleToggle({ module }) {
  const [configShown, setConfigShown] = useState(false)
  const Config = module.config

  return (
    <div class="knockster-module-toggle">
      <div>
        <div class="name">{module.name}</div>
        <div class="desc">{module.desc}</div>
      </div>
      <div className="options">
        {Config && (
          <div>
            <i
              class="fa-solid fa-gear"
              onClick={() => setConfigShown(!configShown)}
            ></i>
            {configShown && (
              <dialog class="knockster-config-popup">
                <div className="popup-title">
                  <div>{module.name}</div>
                  <i
                    class="fa-solid fa-xmark"
                    onClick={() => setConfigShown(false)}
                  ></i>
                </div>
                <div style={{ padding: "1em" }}>
                  <Config />
                </div>
              </dialog>
            )}
          </div>
        )}
        <input
          type="checkbox"
          checked={isModuleActive(module.id)}
          disabled={module.force}
          onChange={(e) => setModuleActive(module.id, e.target.checked)}
        />
      </div>
    </div>
  )
}

function SettingsMenu() {
  const [menuShown, setMenuShown] = useState(false)

  return (
    <div class="knockster-settings">
      <i
        onClick={() => setMenuShown(!menuShown)}
        class="fa-solid fa-wand-magic-sparkles"
      ></i>

      {menuShown && (
        <div class="menu">
          {modules.map((module) => (
            <ModuleToggle key={module.id} module={module} />
          ))}
          <div>
            Refresh to apply changes.{" "}
            <a href="https://github.com/loukamb/knockster" target="_blank">
              Source
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default {
  id: "settings",
  name: "Settings menu",
  desc: "Provides you with a useful settings menu for extensions.",
  force: true,

  load() {
    /** Load in styles. */
    style(css)

    /** Locate the replies menu. */
    const repliesMenu = document.querySelector(".replies-menu")
    if (!repliesMenu) {
      console.error("Couldn't locate replies menu!")
      return
    }

    /** Render button next to replies menu. */
    const rootBtn = document.createElement("div")
    rootBtn.className = "knockster-settings-root"
    repliesMenu.insertAdjacentElement("afterend", rootBtn)
    render(<SettingsMenu />, rootBtn)
  },
}
