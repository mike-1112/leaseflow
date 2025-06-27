// app/javascript/controllers/rental_application_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values  = { id: Number }
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn"]

  commonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
    }
  }

  // — mark In Review —
  async markInReview(event) {
    event.preventDefault()

    // 1) disable & show spinner
    this.inReviewBtnTarget.disabled = true
    this.inReviewBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const res = await fetch(
        `/rental_applications/${this.idValue}/mark_in_review`,
        { method: "PATCH", headers: this.commonHeaders() }
      )

      if (!res.ok) throw new Error("Failed")

      // 2) update badge
      this.badgeTarget.textContent  = "In Review"
      this.badgeTarget.className    = "inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs"

      // 3) restore button label & keep it disabled
      this.inReviewBtnTarget.innerHTML = "In Review"
      this.inReviewBtnTarget.disabled  = true

      // 4) if you’re on a filtered tab, remove this card
      this.removeIfFiltered("in_review")

      this.showToast("Marked as In Review", "success")
    } catch (e) {
      // undo spinner, re-enable
      this.inReviewBtnTarget.disabled = false
      this.inReviewBtnTarget.textContent = "In Review"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // — Approve —
  async approve(event) {
    event.preventDefault()

    this.approveBtnTarget.disabled = true
    this.approveBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const res = await fetch(
        `/rental_applications/${this.idValue}/approve`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (!res.ok) throw new Error("Failed")

      this.badgeTarget.textContent  = "Approved"
      this.badgeTarget.className    = "inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs"

      this.approveBtnTarget.innerHTML = "Approve"
      this.approveBtnTarget.disabled  = true

      this.removeIfFiltered("approved")

      this.showToast("Application Approved", "success")
    } catch (e) {
      this.approveBtnTarget.disabled = false
      this.approveBtnTarget.textContent = "Approve"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // — Reject —
  async reject(event) {
    event.preventDefault()

    this.rejectBtnTarget.disabled = true
    this.rejectBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const res = await fetch(
        `/rental_applications/${this.idValue}/reject`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (!res.ok) throw new Error("Failed")

      this.badgeTarget.textContent  = "Rejected"
      this.badgeTarget.className    = "inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs"

      this.rejectBtnTarget.innerHTML = "Reject"
      this.rejectBtnTarget.disabled  = true

      this.removeIfFiltered("rejected")

      this.showToast("Application Rejected", "success")
    } catch (e) {
      this.rejectBtnTarget.disabled = false
      this.rejectBtnTarget.textContent = "Reject"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  // helper: if you’re on a status‐filtered tab, yank the card out
  removeIfFiltered(statusTab) {
    const current = this.element.closest("[data-filter-status-value]")?.dataset.filterStatusValue
    if (current === statusTab) {
      this.element.remove()
    }
  }

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
