import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import ToastController from "./toast_controller"
application.register("toast", ToastController)

eagerLoadControllersFrom("controllers", application)