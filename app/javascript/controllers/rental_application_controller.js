import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["badge", "inReviewBtn", "approveBtn", "rejectBtn"]

  commonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
    }
  }

  async markInReview(event) {
    event.preventDefault()
    this.inReviewBtnTarget.disabled = true
    try {
      const response = await fetch(`/rental_applications/${this.data.get("id")}/mark_in_review`, {
        method: "PATCH",
        headers: this.commonHeaders(),
        body: JSON.stringify({})
      })
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
    event.preventDefault()
    this.approveBtnTarget.disabled = true
    try {
      const response = await fetch(`/rental_applications/${this.data.get("id")}/approve`, {
        method: "PATCH",
        headers: this.commonHeaders(),
        body: JSON.stringify({})
      })
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
    event.preventDefault()
    this.rejectBtnTarget.disabled = true
    try {
      const response = await fetch(`/rental_applications/${this.data.get("id")}/reject`, {
        method: "PATCH",
        headers: this.commonHeaders(),
        body: JSON.stringify({})
      })
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
    const toast = document.createElement("div")
    toast.textContent = message
    toast.className = `fixed top-5 right-5 px-4 py-2 rounded shadow-lg z-50 text-white font-semibold ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2500)
  }
}