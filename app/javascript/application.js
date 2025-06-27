// app/javascript/application.js
import "@hotwired/turbo-rails"
import { Application }          from "@hotwired/stimulus"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

// 1️⃣ Start exactly one Stimulus application:
const application = Application.start()
window.Stimulus = application

// 2️⃣ Auto-load every file matching *_controller.js in controllers/:
eagerLoadControllersFrom("controllers", application)

// 3️⃣ Export it so your controllers/index.js (if you keep it) can import this same instance:
export { application }
