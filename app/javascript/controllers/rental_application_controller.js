import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn"]
 
  connect() {
    console.log("rental-application controller connected!", this.element);
    console.log("badge:", this.hasBadgeTarget, "approveBtn:", this.hasApproveBtnTarget, "inReviewBtn:", this.hasInReviewBtnTarget, "rejectBtn:", this.hasRejectBtnTarget);
    console.log("Rental-application controller connected!", this.element);
    console.log("All approveBtn targets in this scope:", this.element.querySelectorAll('[data-rental-application-approve-btn-target]'));
    console.log("hasApproveBtnTarget:", this.hasApproveBtnTarget);
  }

  commonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
    }
  }

  async markInReview(event) {
    console.log("idValue:", this.idValue);
    event.preventDefault()
    this.inReviewBtnTarget.disabled = true
    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/mark_in_review`,
        {
          method: "PATCH",
          headers: this.commonHeaders()
        }
      )
      if (response.ok) {
        this.badgeTarget.textContent = "In Review"
        this.badgeTarget.className = "inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs"
        this.showToast("Marked as In Review", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.inReviewBtnTarget.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async approve(event) {
    console.log("idValue:", this.idValue);
    event.preventDefault()
    this.approveBtnTarget.disabled = true
    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/approve`,
        {
          method: "PATCH",
          headers: this.commonHeaders()
        }
      )
      if (response.ok) {
        this.badgeTarget.textContent = "Approved"
        this.badgeTarget.className = "inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs"
        this.showToast("Application Approved", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.approveBtnTarget.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async reject(event) {
    console.log("idValue:", this.idValue);
    event.preventDefault()
    this.rejectBtnTarget.disabled = true
    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/reject`,
        {
          method: "PATCH",
          headers: this.commonHeaders()
        }
      )
      if (response.ok) {
        this.badgeTarget.textContent = "Rejected"
        this.badgeTarget.className = "inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs"
        this.showToast("Application Rejected", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.rejectBtnTarget.disabled = false
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  showToast(message, type) {
    if (window.showToast) {
      window.showToast({ type: type, message: message, duration: 3000 });
    }
  }

    // helper to update the in-card badge
  updateBadge(text, bgColorClass, textColorClass) {
    this.badgeTarget.textContent = text
    this.badgeTarget.className = `inline-block px-2 py-1 rounded ${bgColorClass} ${textColorClass} text-xs`
  }

  // helper to remove the card if we're in a filtered view
  removeIfFiltered(newStatus) {
    const filter = new URLSearchParams(window.location.search).get("status")
    if (filter && filter !== newStatus) {
      this.element.remove()
    }
  }

}