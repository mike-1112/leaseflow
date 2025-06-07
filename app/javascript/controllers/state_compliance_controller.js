import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  refresh(event) {
    const state = event.target.value
    // Hide all
    document.querySelectorAll("#compliance-disclosures .compliance-section").forEach(div => {
      div.style.display = "none"
    })
    // Show matching
    if (state) {
      const el = document.querySelector(`#compliance-disclosures .compliance-section[data-state='${state}']`)
      if (el) el.style.display = ""
    }
  }

  connect() {
    // On first load, show the correct section if editing
    const select = this.element.querySelector('select')
    if (select && select.value) {
      const el = document.querySelector(`#compliance-disclosures .compliance-section[data-state='${select.value}']`)
      if (el) el.style.display = ""
    }
  }
}