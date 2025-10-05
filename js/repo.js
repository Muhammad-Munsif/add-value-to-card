// Animate progress bar
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progress");
  progressBar.style.width = "75%";

  // Add click events to all list items
  document.querySelectorAll(".steps li").forEach((item) => {
    item.addEventListener("click", function () {
      const stepNum = this.getAttribute("data-step");
      const parentId = this.closest(".tab-content").id;
      const detailsId =
        parentId === "detailed"
          ? `step-${stepNum}-details`
          : `troubleshoot-${stepNum}-details`;

      // Toggle active class on the list item
      this.classList.toggle("active");

      // Toggle the details display
      const detailsElement = document.getElementById(detailsId);
      if (detailsElement) {
        detailsElement.classList.toggle("active");
      }
    });
  });
});

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard: " + text);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// Tab functionality
function showTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected tab content
  document.getElementById(tabId).classList.add("active");

  // Activate selected tab
  document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active");
}

// Add click event to tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    showTab(this.getAttribute("data-tab"));
  });
});

// Function to show specific step solution
function showStepSolution(stepNumber) {
  // Switch to the detailed tab
  showTab("detailed");

  // Find the step and activate it
  const stepElement = document.querySelector(
    `#ssh-steps li[data-step="${stepNumber}"]`
  );
  if (stepElement) {
    // Close all other steps
    document.querySelectorAll("#ssh-steps li").forEach((step) => {
      step.classList.remove("active");
      const stepNum = step.getAttribute("data-step");
      const detailsElement = document.getElementById(`step-${stepNum}-details`);
      if (detailsElement) {
        detailsElement.classList.remove("active");
      }
    });

    // Open the selected step
    stepElement.classList.add("active");
    const detailsElement = document.getElementById(
      `step-${stepNumber}-details`
    );
    if (detailsElement) {
      detailsElement.classList.add("active");

      // Scroll to the step
      stepElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Add interactivity to buttons
document.getElementById("diagnoseBtn").addEventListener("click", function () {
  const statusIcons = document.querySelectorAll(".status-icon");

  statusIcons[0].innerHTML = '<i class="fas fa-check"></i>';
  statusIcons[0].classList.add("success");

  statusIcons[1].innerHTML = '<i class="fas fa-check"></i>';
  statusIcons[1].classList.add("success");

  statusIcons[2].innerHTML = '<i class="fas fa-check"></i>';
  statusIcons[2].classList.add("success");

  alert(
    "Diagnosis complete! The main issue is a protocol mismatch in your remote URL configuration."
  );
});
