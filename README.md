# Knockster

[ViolentMonkey](https://violentmonkey.github.io/)/[GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) script that extends [Knockout](https://knockout.chat) with some quality-of-life features. Duct-tape quality; here be dragons.

## Extensions

### Available

- **Link information:** Appends the underlying destination of an _external_ link after its text in a post. Useful to detect disguised links.[^1]
- **Homepage improvements:**
  - Adds a button to subforum categories to hide them. A menu is added at the bottom of the homepage to restore them.[^2]
  - **NEW!** Pin subforums to the top of the homepage for easy access.
- **NEW!** User filters: Mute avatars, backgrounds, and users, either globally or individually.
- **Hide bad ratings:** Removes negative reactions from posts. Doesn't stop you from rating them.
- **4chan mode:** Makes everyone anonymous. Same name, same role color. Combine with avatar/background remove for the full experience.[^4]
- **Thumbnailer:** Downsizes images in posts. Click the images to expand them to full-screen.
- **Volume adjuster:** Sets a default volume level for embed videos.[^5]
- **Unembedder:** Converts YouTube embeds to thumbnails so they only load when locked, and fixes some proportions.[^5]
- **Reply resize:** Allows you to adjust the vertical height of the reply box.[^6]

### Planned

- Improved mechanism for detecting when the interface finishes loading.

## Installation

Click [here](https://github.com/loukamb/Knockster/releases/latest/download/index.user.js) to install the latest version of the script. [ViolentMonkey](https://violentmonkey.github.io/)/[GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) must be installed.

## Development

### Building

Run `pnpm build` to create a bundled, minified version of the script into `dist/index.js`. Requires `pnpm` to be installed and a relatively recent version of Node.js. `esbuild` is used for bundling.

For convenience, if you are on Linux and you have `wl-clipboard` installed, run `pnpm build:copy` to compile _and_ copy the resulting code to clipboard so you can paste it into a \*Monkey extension.

### Modules

Write new modules in `/src/modules`. Include a `page` function in your exported module to perform work **after** the page loads and the interface finishes rendering. Include a `load` function to perform work **as soon as possible.**

Import your module's export into `/src/modules/_all.js` and add it to the array.

## License

Licensed under the GPLv3. See [here](./LICENSE) for more information.

[^1]: As requested in https://knockout.chat/thread/70864
[^2]: As requested in https://knockout.chat/thread/70105
[^3]: As requested in https://knockout.chat/thread/70212
[^4]: As requested in https://knockout.chat/thread/70975/#post-2568254
[^5]: As requested in https://knockout.chat/thread/70975/#post-2572022
[^6]: As requested in https://knockout.chat/thread/71088
