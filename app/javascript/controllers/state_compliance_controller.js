import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]

  refresh(event) {
    const state = event.target.value
    if (!state) {
      this.containerTarget.innerHTML = ""
      return
    }
    fetch(`/rental_applications/compliance?state=${state}`)
      .then(response => response.text())
      .then(html => {
        this.containerTarget.innerHTML = html
      })
  }
}