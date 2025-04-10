import { getSettings, setSettings } from "../settings"
import { useState, useCallback } from "preact/hooks"

export default {
  id: "volumeadjust",
  name: "Volume adjuster",
  desc: "Allows you to set a default volume level for embed videos.",
  default: true,
  settings: { volume: 50 },

  config() {
    const [volumeValue, setVolumeValue] = useState(
      getSettings("volumeadjust").volume ?? 50
    )
    const setVolume = useCallback((n) => {
      setVolumeValue(n)
      setSettings("volumeadjust", { volume: n })
    }, [])

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <input
          type="range"
          min={0}
          max={100}
          value={volumeValue}
          onChange={(e) => setVolume(e.target.valueAsNumber)}
          style={{ flexGrow: "2" }}
        />
        {volumeValue}%
      </div>
    )
  },

  page() {
    /** Get volume. */
    const volume = getSettings("volumeadjust").volume ?? 50

    /** Select all videos in posts. */
    const videosInPosts = document.querySelectorAll("video")

    /** Adjust their volume. */
    for (const video of videosInPosts) {
      video.volume = volume / 100
    }
  },
}
