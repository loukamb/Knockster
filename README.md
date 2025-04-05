# Knockster

[ViolentMonkey](https://violentmonkey.github.io/)/[GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) script that extends [Knockout](https://knockout.chat) with some quality-of-life features. Duct-tape quality; here be dragons.

## Extensions

### Available

- **Link information:** Appends the underlying destination of an _external_ link after its text in a post. Useful to detect disguised links.[^1]
- **Hide avatars:** Removes all avatars when enabled.[^3]
- **Hide backgrounds:** Removes all user backgrounds when enabled.[^3]

### WIP

- **Hide subforums:** Adds a button to subforum categories to hide them. A menu is added at the bottom of the homepage to restore them.[^2]

### Planned

- Improved mechanism for detecting when the interface finishes loading.
- **Suggest something if you want.**

## Installation

Click here to install the latest version of the script. TODO: add link lol

## Development

### Building

Run `pnpm build` to create a bundled, minified version of the script into `dist/index.js`. Requires `pnpm` to be installed and a relatively recent version of Node.js. `esbuild` is used for bundling.

For convenience, if you are on Linux and you have `wl-clipboard` installed, run `pnpm build:copy` to compile _and_ copy the resulting code to clipboard so you can paste it into a \*Monkey extension.

### Modules

Write new modules in `/src/modules`. Export a `page` function to perform work **after** the page loads and the interface finishes rendering. Export a `load` function to perform work **as soon as possible.**

Import your module's exports into `/src/modules/_all.js` and add it to the array it exports.

## License

Licensed under the GPLv3. See [here](./LICENSE) for more information.

[^1]: As requested in https://knockout.chat/thread/70864
[^2]: As requested in https://knockout.chat/thread/70105
[^3]: As requested in https://knockout.chat/thread/70212
