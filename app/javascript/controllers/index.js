import { application } from "./application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import RentalApplicationController from "./rental_application_controller"
eagerLoadControllersFrom("controllers", application)
application.register("rental-application", RentalApplicationController)
