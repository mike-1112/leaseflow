import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn" ]

  connect() {
    console.log("rental-application controller connected!", this.element);
  }

  commonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
    }
  }

  async markInReview(event) {
    event.preventDefault()

    const btn = this.inReviewBtnTarget
    const originalHTML = btn.innerHTML
    btn.disabled = true
    btn.innerHTML = this.spinnerSVG()

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/mark_in_review`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        this.updateBadge("In Review", "bg-yellow-100", "text-yellow-800")
        btn.innerHTML = "In Review"
        btn.disabled = true
        this.showToast("Marked as In Review", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      btn.innerHTML = "In Review"
      btn.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async approve(event) {
    event.preventDefault()

    const btn = this.approveBtnTarget
    const originalHTML = btn.innerHTML
    btn.disabled = true
    btn.innerHTML = this.spinnerSVG()

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/approve`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        this.updateBadge("Approved", "bg-green-100", "text-green-800")
        btn.innerHTML = "Approve"
        btn.disabled = true
        this.showToast("Application Approved", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      btn.innerHTML = "Approve"
      btn.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async reject(event) {
    event.preventDefault()

    const btn = this.rejectBtnTarget
    const originalHTML = btn.innerHTML
    btn.disabled = true
    btn.innerHTML = this.spinnerSVG()

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/reject`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        this.updateBadge("Rejected", "bg-red-100", "text-red-800")
        btn.innerHTML = "Reject"
        btn.disabled = true
        this.showToast("Application Rejected", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      btn.innerHTML = "Reject"
      btn.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  spinnerSVG() {
    return `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`
  }

  showToast(message, type) {
    if (window.showToast) {
      window.showToast({ type: type, message: message, duration: 3000 });
    }
  }

  updateBadge(text, bgColorClass, textColorClass) {
    this.badgeTarget.textContent = text
    this.badgeTarget.className = `inline-block px-2 py-1 rounded ${bgColorClass} ${textColorClass} text-xs`
  }
}