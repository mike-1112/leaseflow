import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]

  connect() {
    // Expose this controller globally
    window.showToast = this.show.bind(this)
  }

  show({ type = "success", message = "", duration = 3000 }) {
    const toast = document.createElement("div")
    toast.className =
      "flex items-center px-4 py-2 rounded shadow text-white transition-opacity duration-300 " +
      (type === "error" ? "bg-red-600" : "bg-green-600")
    toast.innerHTML = `
      <span class="mr-2">${type === "error" ? "⚠️" : "✅"}</span>
      <span>${message}</span>
    `
    this.containerTarget.appendChild(toast)
    setTimeout(() => {
      toast.classList.add("opacity-0")
      setTimeout(() => toast.remove(), 300)
    }, duration)
  }
}