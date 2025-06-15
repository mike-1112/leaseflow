import { Application } from "@hotwired/stimulus"
import RentalApplicationController from "./controllers/rental_application_controller.js"
window.Stimulus = Application.start()
application.register("rental-application", RentalApplicationController)