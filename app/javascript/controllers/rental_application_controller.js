import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn"]
 
  connect() {
    console.log("rental-application controller connected!", this.element);
    console.log("badge:", this.hasBadgeTarget, "approveBtn:", this.hasApproveBtnTarget, "inReviewBtn:", this.hasInReviewBtnTarget, "rejectBtn:", this.hasRejectBtnTarget);
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
    event.preventDefault()

    // 1) show loading spinner & disable
    //this.inReviewBtnTarget.disabled = true
    this.inReviewBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/mark_in_review`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        // 2) update badge in‐place
        this.updateBadge("In Review", "bg-yellow-100", "text-yellow-800")
        // 3) if filtered, remove card
        //this.removeIfFiltered("in_review")
        this.inReviewBtnTarget.disabled = true
        this.showToast("Marked as In Review", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.inReviewBtnTarget.disabled = false
      this.inReviewBtnTarget.textContent = "In Review"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async approve(event) {
    event.preventDefault()

    // 1) show loading spinner & disable
    
    this.approveBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/approve`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        this.updateBadge("Approved", "bg-green-100", "text-green-800")
        //this.removeIfFiltered("approved")
        this.approveBtnTarget.disabled = true
        this.showToast("Application Approved", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.approveBtnTarget.disabled = false
      this.approveBtnTarget.textContent = "Approve"
      this.showToast("Failed to update status", "error")
      console.error(e)
    }
  }

  async reject(event) {
    event.preventDefault()

    // 1) show loading spinner & disable
    
    this.rejectBtnTarget.innerHTML = `
      <svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>`

    try {
      const response = await fetch(
        `/rental_applications/${this.idValue}/reject`,
        { method: "PATCH", headers: this.commonHeaders() }
      )
      if (response.ok) {
        this.updateBadge("Rejected", "bg-red-100", "text-red-800")
        //this.removeIfFiltered("rejected")
        this.rejectBtnTarget.disabled = true
        this.showToast("Application Rejected", "success")
      } else {
        throw new Error("Request failed")
      }
    } catch (e) {
      this.rejectBtnTarget.disabled = false
      this.rejectBtnTarget.textContent = "Reject"
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