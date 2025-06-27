// app/javascript/controllers/index.js

// 1️⃣ Pull in the one true app from application.js
import { application } from "../application"

// 2️⃣ (Optional) If you want to manually register or alias controllers, do it here.
//    But since we used eagerLoad above, you don’t actually *have* to register anything
//    by hand—Stimulus will pick up every *_controller.js file in this folder.
//
// e.g.
// import FilterController from "./filter_controller"
// application.register("filter", FilterController)