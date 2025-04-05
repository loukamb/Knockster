import esbuild from "esbuild"

const userScriptInfo = `
//
// ==UserScript==
// @name        Knockster
// @namespace   Violentmonkey Scripts
// @match       https://knockout.chat/*
// @grant       GM_getValues
// @grant       GM_setValues
// @version     1.0
// @homepageURL https://github.com/loukamb/Knockster
// @author      https://github.com/loukamb
// @description Extensions for knockout.chat
// ==/UserScript==
//
`

esbuild.buildSync({
  entryPoints: ["./src/index.js"],
  outfile: "./dist/index.js",
  jsxFactory: "h",
  bundle: true,
  minify: true,
  banner: { js: userScriptInfo },
})
