import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { id: Number, contacted: Boolean }
  static targets = ["button"]

  async markContacted(event) {
    event.preventDefault();

    // Use the contacted value to pick the right endpoint
    const contacted = this.element.classList.contains("opacity-50");
    const endpoint = contacted ? "mark_uncontacted" : "mark_contacted";
    const url = `/leads/${this.idValue}/${endpoint}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: { "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content }
    });

    if (response.ok) {
      // Optimistically update the UI
      if (contacted) {
        this.element.classList.remove("opacity-50", "line-through");
        this.buttonTarget.textContent = "Mark as contacted";
      } else {
        this.element.classList.add("opacity-50", "line-through");
        this.buttonTarget.textContent = "Mark as NOT contacted";
      }
    }
  }
}