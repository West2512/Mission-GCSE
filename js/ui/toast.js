/* =========================================================
   MISSION GCSE — TOAST NOTIFICATIONS
   ========================================================= */

"use strict";

let toastTimeout = null;

function showToast(title, message) {
  elements.toastTitle.textContent = title;
  elements.toastMessage.textContent = message;

  elements.completionToast.classList.add("show");

  window.clearTimeout(toastTimeout);

  toastTimeout = window.setTimeout(() => {
    elements.completionToast.classList.remove("show");
  }, 3200);
}