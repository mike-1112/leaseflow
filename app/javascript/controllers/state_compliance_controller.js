import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]
  connect() {
    this.loadPartial(this._currentState())
  }

  refresh(event) {
    const state = event.target.value || "nt"
    this.loadPartial(state)
  }

  _currentState() {
    return document.querySelector("select[name='rental_application[state]']").value
  }

  loadPartial(state) {
    fetch(`/rental_applications/compliance?state=${state}`)
      .then(res => res.text())
      .then(html => {
        this.containerTarget.innerHTML = html
      })
  }
}