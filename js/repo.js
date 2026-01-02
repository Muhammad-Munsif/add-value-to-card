<script>
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });

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
          // Create a temporary notification
          const notification = document.createElement('div');
          notification.textContent = 'Copied to clipboard!';
          notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          `;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          alert("Failed to copy to clipboard. Please try again.");
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
      
      // Scroll to top of the tab content on mobile
      if (window.innerWidth < 768) {
        document.getElementById(tabId).scrollIntoView({ behavior: 'smooth' });
      }
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
      const button = this;
      
      // Disable button during animation
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Diagnosing...';
      
      // Simulate diagnosis process
      setTimeout(() => {
        statusIcons[0].innerHTML = '<i class="fas fa-check"></i>';
        statusIcons[0].classList.add("success");
        statusIcons[0].classList.remove("error");
        
        setTimeout(() => {
          statusIcons[1].innerHTML = '<i class="fas fa-check"></i>';
          statusIcons[1].classList.add("success");
          statusIcons[1].classList.remove("warning");
          
          setTimeout(() => {
            statusIcons[2].innerHTML = '<i class="fas fa-check"></i>';
            statusIcons[2].classList.add("success");
            
            // Reset button
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-redo"></i> Run Again';
            
            // Show completion message
            const notification = document.createElement('div');
            notification.textContent = 'Diagnosis complete! Protocol mismatch detected.';
            notification.style.cssText = `
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: var(--primary-color);
              color: white;
              padding: 10px 15px;
              border-radius: 5px;
              z-index: 1000;
              font-weight: bold;
              box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 3000);
          }, 500);
        }, 500);
      }, 1000);
    });
    
    // Make the progress bar responsive
    window.addEventListener('resize', function() {
      const progressBar = document.getElementById("progress");
      if (window.innerWidth < 768) {
        progressBar.style.transition = 'width 0.5s ease-in-out';
      } else {
        progressBar.style.transition = 'width 1s ease-in-out';
      }
    });
  </script>