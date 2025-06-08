import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Listen for Turbo/form events if using Turbo
    if (this.element.tagName === "FORM") {
      this.element.addEventListener("turbo:submit-end", this.handleSubmitEnd.bind(this))
    }
  }

  // Handles Turbo form submission responses
  handleSubmitEnd(event) {
    const { detail } = event
    if (detail.success) {
      this.showToast("Application submitted successfully!", "green")
    } else if (detail.fetchResponse && detail.fetchResponse.response.status === 422) {
      // Rails validation error (unprocessable entity)
      this.showToast("Please correct the errors and try again.", "red")
    } else {
      this.showToast("An error occurred. Please try again.", "red")
    }
  }

  showToast(message, color) {
    const toast = document.getElementById("toast")
    toast.textContent = message
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white bg-${color}-600 opacity-0 transition-opacity duration-300`
    toast.classList.remove("hidden")
    // Animate in
    setTimeout(() => {
      toast.classList.add("opacity-100")
      toast.classList.remove("opacity-0")
    }, 10)
    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("opacity-100")
      toast.classList.add("opacity-0")
      setTimeout(() => {
        toast.classList.add("hidden")
      }, 300)
    }, 3000)
  }
}