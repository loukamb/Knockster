import modules, { type Module } from "../module"
import css from "../styles/settings.css"

import { isModuleActive, setModuleActive } from "../settings"

import { render, h } from "preact"
import { useState, useRef, useEffect } from "preact/hooks"

function ModuleToggle({ module }: { module: Module }) {
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
          onChange={(e) => {
            setModuleActive(module.id, (e.target as HTMLInputElement).checked)
            location.reload()
          }}
        />
      </div>
    </div>
  )
}

function SettingsMenu() {
  const [menuShown, setMenuShown] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuShown) return
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuShown(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuShown])

  return (
    <div class="knockster-settings" ref={menuRef}>
      <i
        class="fa-solid fa-wand-magic-sparkles"
        onClick={() => setMenuShown(!menuShown)}
        title="Knockster settings"
      ></i>

      {menuShown && (
        <div class="menu">
          {modules.map((module) => (
            <ModuleToggle key={module.id} module={module} />
          ))}
          <div class="knockster-settings-footer">
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

  load(mutation) {
    /** Load in styles. */
    mutation.createStyle(css, false)

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
} as Module
