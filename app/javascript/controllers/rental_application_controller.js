// app/javascript/controllers/rental_application_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn"]

  commonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": document
        .querySelector("meta[name='csrf-token']")
        .content
    }
  }

  // — mark In Review —
  async markInReview(event) {
    event.preventDefault()
    this.inReviewBtnTarget.disabled = true
    this.inReviewBtnTarget.innerHTML = this.spinnerHtml()

    try {
      const resp = await fetch(
        `/rental_applications/${this.idValue}/mark_in_review`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (!resp.ok) throw new Error("Network response not ok")

      // 1) update badge
      this.updateBadge("In Review", "bg-yellow-100", "text-yellow-800")
      // 2) update data-attribute
      this.updateStatusData("in_review")
      // 3) hide/show based on current filter
      this.applyCurrentFilter("in_review")
      this.showToast("Marked In Review", "success")
    } catch (e) {
      this.inReviewBtnTarget.disabled = false
      this.inReviewBtnTarget.textContent = "In Review"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // — approve —
  async approve(event) {
    event.preventDefault()
    this.approveBtnTarget.disabled = true
    this.approveBtnTarget.innerHTML = this.spinnerHtml()

    try {
      const resp = await fetch(
        `/rental_applications/${this.idValue}/approve`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (!resp.ok) throw new Error("Network response not ok")

      this.updateBadge("Approved", "bg-green-100", "text-green-800")
      this.updateStatusData("approved")
      this.applyCurrentFilter("approved")
      this.showToast("Application Approved", "success")
    } catch (e) {
      this.approveBtnTarget.disabled = false
      this.approveBtnTarget.textContent = "Approve"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // — reject —
  async reject(event) {
    event.preventDefault()
    this.rejectBtnTarget.disabled = true
    this.rejectBtnTarget.innerHTML = this.spinnerHtml()

    try {
      const resp = await fetch(
        `/rental_applications/${this.idValue}/reject`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (!resp.ok) throw new Error("Network response not ok")

      this.updateBadge("Rejected", "bg-red-100", "text-red-800")
      this.updateStatusData("rejected")
      this.applyCurrentFilter("rejected")
      this.showToast("Application Rejected", "success")
    } catch (e) {
      this.rejectBtnTarget.disabled = false
      this.rejectBtnTarget.textContent = "Reject"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // — helper: update the card’s data-attribute so filter picks it up instantly —
  updateStatusData(newStatus) {
    this.element.dataset.rentalApplicationStatus = newStatus
  }

  // — helper: update the badge text + classes —
  updateBadge(text, bgClass, textClass) {
    this.badgeTarget.textContent = text
    this.badgeTarget.className = `inline-block px-2 py-1 rounded ${bgClass} ${textClass} text-xs`
  }

  // — helper: hide/show this.element based on the currently‐active filter tab —
  applyCurrentFilter(newStatus) {
    const nav       = document.querySelector("[data-controller='filter']")
    const current   = nav?.dataset.filterStatusValue || ""
    // if no filter is active, leave everything visible
    if (!current) return
    // otherwise only show cards matching the active filter
    this.element.style.display = (current === newStatus ? "" : "none")
  }

  // — helper: spinner SVG —
  spinnerHtml() {
    return `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`
  }

  // — helper: toast notification —
  showToast(message, type) {
    const toast = document.createElement("div")
    toast.textContent = message
    toast.className = `fixed top-5 right-5 px-4 py-2 rounded shadow-lg z-50 text-white font-semibold ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2500)
  }
}
