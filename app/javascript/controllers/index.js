// app/javascript/controllers/index.js

import { application } from "./application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

// Manually-import any controllers that need explicit registration:
import RentalApplicationController from "./rental_application_controller"
import FilterController             from "./filter_controller"
import RentalFormController         from "./rental_form_controller"
import StateComplianceController    from "./state_compliance_controller"
import ToastController              from "./toast_controller"

// Auto-load all other controllers in this directory:
eagerLoadControllersFrom("controllers", application)

// Explicitly register key controllers:
application.register("rental-application",    RentalApplicationController)
application.register("filter",                FilterController)
application.register("rental-form",           RentalFormController)
application.register("state-compliance",      StateComplianceController)
application.register("toast",                 ToastController)
