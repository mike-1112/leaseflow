    import { application } from "./application"
    import RentalApplicationController from "./rental_application_controller"
    import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
    import ToastController from "./toast_controller"
    import RentalFormController from "./rental_form_controller"
    application.register("toast", ToastController)
    application.register("rental-application", RentalApplicationController)

        application.register("rental-form", RentalFormController)

    eagerLoadControllersFrom("controllers", application)