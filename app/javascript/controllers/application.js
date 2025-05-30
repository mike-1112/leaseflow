import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

export const application = Application.start()
const context = require.context(".", true, /\.js$/)
application.load(definitionsFromContext(context))
