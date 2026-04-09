// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Subscribe button functionality
document.querySelector(".nav-cta").addEventListener("click", function () {
  const emailInput = document.querySelector(".nl-input");
  if (emailInput) {
    emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
    emailInput.focus();
  }
});

// Create notification element for accessibility
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.setAttribute("role", "status");
  notification.setAttribute("aria-live", "polite");
  notification.setAttribute("aria-atomic", "true");
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "16px 24px";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "14px";
  notification.style.fontWeight = "500";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeInUp 0.3s ease";

  if (type === "success") {
    notification.style.background = "#388E3C";
    notification.style.color = "white";
  } else if (type === "error") {
    notification.style.background = "#C8445A";
    notification.style.color = "white";
  }

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "fadeOutDown 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Newsletter form submission
const nlForm = document.querySelector(".nl-form");
if (nlForm) {
  nlForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.querySelector(".nl-input").value;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showNotification("Please enter your email address", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate API call
    const btn = this.querySelector("button");
    const originalText = btn.textContent;
    btn.textContent = "Subscribing...";
    btn.disabled = true;

    setTimeout(() => {
      showNotification(`Thank you for subscribing with: ${email}`, "success");
      document.querySelector(".nl-input").value = "";
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1000);
  });
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards for animation
document
  .querySelectorAll(".side-card, .brand-card, .topic-card, .insight-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add keyboard navigation support for cards
document
  .querySelectorAll(".brand-card, .topic-card, .insight-card")
  .forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        // Trigger card interaction (can be customized)
        this.click();
      }
    });
  });
