import { Application } from "@hotwired/stimulus"
import RentalApplicationController from "./controllers/rental_application_controller"

const application = Application.start()
window.Stimulus = application

application.register("rental-application", RentalApplicationController)