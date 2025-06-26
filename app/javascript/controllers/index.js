// app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

// 1) Start up Stimulus:
const application = Application.start()

// 2) Auto-load all controllers under app/javascript/controllers/*_controller.js
eagerLoadControllersFrom("controllers", application)

// 3) (Optional) If you ever need to override or alias a controller,
//    you can manually register it here. For example:
// import FilterController from "./filter_controller"
// application.register("filter", FilterController)

// 4) Export the application so `application.js` can import it
export { application }
