console.log("Stimulus lead controller loaded!");

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { id: Number };

  async markContacted(event) {
    event.preventDefault();
    const url = `/leads/${this.idValue}/mark_contacted`;

    await fetch(url, {
      method: "PATCH",
      headers: { "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content }
    });

    // remove or grey out the entry
    this.element.classList.add("opacity-50", "line-through");
  }
}
