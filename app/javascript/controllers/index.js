    import { application } from "./application"
    import RentalApplicationController from "./rental_application_controller"
    import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
    import ToastController from "./toast_controller"
    application.register("toast", ToastController)
    application.register("rental-application", RentalApplicationController)

    eagerLoadControllersFrom("controllers", application)