// app/javascript/controllers/filter_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { status: String }

  connect() {
    this.tabs = this.element.querySelectorAll("[data-action='filter#filter']")
    this.cards = document.querySelectorAll("[data-rental-application-status]")
    this.applyInitial()
  }

  applyInitial() {
    const status = this.statusValue || ""
    this.filterBy(status)
  }

  filter(event) {
    event.preventDefault()
    const btn = event.currentTarget
    const status = btn.dataset.filterStatusValue
    this.highlightTab(btn)
    this.element.dataset.filterStatusValue = status
    this.filterBy(status)
  }

  highlightTab(activeBtn) {
    this.tabs.forEach(b => b.classList.remove("bg-white","border-b-0"))
    activeBtn.classList.add("bg-white","border-b-0")
  }

  filterBy(status) {
    this.cards.forEach(card => {
      const s = card.dataset.rentalApplicationStatus
      card.style.display = (!status || s === status) ? "" : "none"
    })
  }
}
