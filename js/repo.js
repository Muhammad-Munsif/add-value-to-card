 
      // Animate progress bar
      document.addEventListener("DOMContentLoaded", function () {
        const progressBar = document.getElementById("progress");
        progressBar.style.width = "75%";
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
        document
          .querySelector(`.tab[data-tab="${tabId}"]`)
          .classList.add("active");
      }

      // Add click event to tabs
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", function () {
          showTab(this.getAttribute("data-tab"));
        });
      });

      // Add interactivity to buttons
      document
        .getElementById("diagnoseBtn")
        .addEventListener("click", function () {
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
    