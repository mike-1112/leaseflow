// app/javascript/controllers/index.js

import { application } from "./application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

// Automatically load all controllers defined in this folder:
eagerLoadControllersFrom("controllers", application)

// Manual registrations (optional, but explicit):
import RentalApplicationController from "./rental_application_controller"
import FilterController            from "./filter_controller"

application.register("rental-application", RentalApplicationController)
application.register("filter",            FilterController)
