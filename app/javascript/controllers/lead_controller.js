import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { id: Number }
  static targets = ["button"]

  async markContacted(event) {
    event.preventDefault();
    const url = `/leads/${this.idValue}/toggle_contacted`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: { "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content }
    });

    if (response.ok) {
      const data = await response.json();
      // Update UI based on whether lead is contacted
      if (data.contacted) {
        this.element.classList.add("opacity-50", "line-through");
        this.buttonTarget.textContent = "Mark as NOT contacted";
      } else {
        this.element.classList.remove("opacity-50", "line-through");
        this.buttonTarget.textContent = "Mark as contacted";
      }
    }
  }
}