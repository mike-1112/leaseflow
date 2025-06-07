import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number, contacted: Boolean }
  static targets = ["button"]

  async markContacted(event) {
    event.preventDefault()

    const contacted = this.element.classList.contains("opacity-50")
    const endpoint = contacted ? "mark_uncontacted" : "mark_contacted"
    const url = `/leads/${this.idValue}/${endpoint}`

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
        },
      })

      if (response.ok) {
        if (contacted) {
          this.element.classList.remove("opacity-50", "line-through")
          this.buttonTarget.textContent = "Mark as contacted"
          window.showToast && window.showToast({ type: "success", message: "Marked as NOT contacted!" })
        } else {
          this.element.classList.add("opacity-50", "line-through")
          this.buttonTarget.textContent = "Mark as NOT contacted"
          window.showToast && window.showToast({ type: "success", message: "Marked as contacted!" })
        }
      } else {
        window.showToast && window.showToast({ type: "error", message: "Failed to update lead." })
      }
    } catch (e) {
      window.showToast && window.showToast({ type: "error", message: "Network error! Please try again." })
    }
  }
}