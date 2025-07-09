import type { JSX } from "preact"
import Mutation from "./mutation"

/** Module interface. */
export interface Module {
  /** Unique identifier */
  id: string
  /** Name of the module */
  name: string
  /** Description of the module */
  desc: string
  /** Settings of the module */
  settings?: Record<string, any>
  /** Whether the module is enabled by default */
  default?: boolean
  /** Whether the module should be loaded regardless of the user's settings */
  force?: boolean

  /** Called when the module is loaded */
  load?(mutation: Mutation): void
  /** Called when the page is loaded */
  page?(mutation: Mutation): void
  /** Provides a config UI for the module */
  config?(): JSX.Element
}

import settings from "./modules/settings"
import linkinfo from "./modules/linkinfo"
import homepage from "./modules/homepage"
import userfilter from "./modules/userfilter"
import hidenegatives from "./modules/hidenegatives"
import fourchan from "./modules/fourchan"
import thumbnailer from "./modules/thumbnailer"
import volumeadjust from "./modules/volumeadjust"
import ytunembedder from "./modules/ytunembedder"
import replyresize from "./modules/replyresize"

export default [
  settings,
  linkinfo,
  homepage,
  userfilter,
  hidenegatives,
  fourchan,
  thumbnailer,
  volumeadjust,
  ytunembedder,
  replyresize,
] as Module[]
