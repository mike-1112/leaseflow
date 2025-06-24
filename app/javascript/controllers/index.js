// app/javascript/controllers/index.js

import { application } from "./application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

import RentalApplicationController from "./rental_application_controller"
import FilterController             from "./filter_controller"    // ← import it

eagerLoadControllersFrom("controllers", application)

// explicitly register both:
application.register("rental-application", RentalApplicationController)
application.register("filter",             FilterController)
