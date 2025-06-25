/* ===== PREMIUM DIGITAL BUSINESS CARD - INTERACTIVE FUNCTIONALITY ===== */

// Performance optimization
const preferredReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Card flip state
let isFlipped = false;

// Preload critical resources
function preloadResources() {
  const images = [
    'assets/pic.jpg',
    'assets/vs-logo2.png'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Enhanced error handling for missing elements
function safeQuerySelector(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
}

// Main flip function
function flipCard() {
  const card = document.getElementById('business-card');
  const body = document.body;
  
  if (!isFlipped) {
    card.classList.add('flipped');
    body.classList.add('flipped');
    isFlipped = true;
  } else {
    card.classList.remove('flipped');
    body.classList.remove('flipped');
    isFlipped = false;
  }
  
  // Add haptic feedback for mobile devices
  if (navigator.vibrate) {
    navigator.vibrate(75);
  }
  
  // Add audio feedback (optional - uncomment if you want sound)
  // playFlipSound();
}

// Enhanced hover effects for profile image
function initializeProfileEffects() {
  const profileImage = document.querySelector('.profile-image');
  
  if (profileImage) {
    profileImage.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  }
}

// Social media link interactions
function initializeSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach((link, index) => {
    // Add staggered entrance animation
    link.style.animationDelay = `${0.3 + (index * 0.1)}s`;
    
    // Enhanced hover effects
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
      
      // Add platform-specific effects
      const platform = this.getAttribute('data-platform');
      switch(platform) {
        case 'linkedin':
          this.style.boxShadow = '0 8px 25px rgba(0, 119, 181, 0.4)';
          break;
        case 'twitter':
          this.style.boxShadow = '0 8px 25px rgba(29, 161, 242, 0.4)';
          break;
        case 'instagram':
          this.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.4)';
          break;
        case 'github':
          this.style.boxShadow = '0 8px 25px rgba(36, 41, 46, 0.4)';
          break;
        default:
          this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
      this.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.3)';
    });
    
    // Click analytics (replace with your tracking code)
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const platform = this.getAttribute('data-platform');
      console.log(`Social link clicked: ${platform}`);
      
      // Here you would typically redirect to the actual social media profile
      // window.open('your-social-media-url', '_blank');
      
      // For demo purposes, show an alert
      showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile...`);
    });
  });
}

// Service card animations
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    // Staggered entrance animation
    card.style.animationDelay = `${0.4 + (index * 0.1)}s`;
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(360deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
}

// CTA Button interaction
function initializeCTAButton() {
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Create ripple effect
      createRippleEffect(this, e);
      
      // Simulate contact action
      setTimeout(() => {
        showNotification('Thank you for your interest! John will get back to you shortly.');
        // Here you would typically open a contact form or redirect
        // window.location.href = 'mailto:john@kgventure.studio';
      }, 300);
    });
  }
}

// Create ripple effect for buttons
function createRippleEffect(element, event) {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleAnimation 0.6s ease-out;
    pointer-events: none;
    z-index: 1000;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple animation keyframes
function addRippleCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnimation {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 30px;
    right: 30px;
    background: linear-gradient(135deg, #ff6b35, #ff8557);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Keyboard accessibility
function initializeKeyboardSupport() {
  const cardContainer = document.querySelector('.card-container');
  
  // Make card focusable
  cardContainer.setAttribute('tabindex', '0');
  cardContainer.setAttribute('role', 'button');
  cardContainer.setAttribute('aria-label', 'Interactive business card - press Enter or Space to flip');
  
  // Add keyboard event listeners
  cardContainer.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard();
    }
  });
  
  // Focus styles
  cardContainer.addEventListener('focus', function() {
    this.style.outline = '3px solid #ff6b35';
    this.style.outlineOffset = '5px';
  });
  
  cardContainer.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
}

// Performance optimization - Intersection Observer for animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate in
  const animateElements = document.querySelectorAll('.service-card, .social-link');
  animateElements.forEach(el => observer.observe(el));
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  // Reset any transforms that might break on resize
  const card = document.getElementById('business-card');
  if (card && window.innerWidth < 768) {
    // Ensure card remains functional on mobile
    card.style.willChange = 'transform';
  }
});

// Optional: Add sound effects (uncomment if you want audio feedback)
/*
function playFlipSound() {
  const audio = new Audio();
  audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTcHGGS57+OZSA0PUKXh8bllHgg2jdXzzn0vBSF0xe/eizELElyx5+2nWBELR6Hl8L1oIAITdMLe8N2TQQsXYLHl66hXFAlHn+H'
  audio.play().catch(() => {
    // Silently fail if audio is not allowed
  });
}
*/

// Enhanced DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 KG Venture Studio Digital Business Card - Initialized');
  
  // Preload resources for better performance
  preloadResources();
  
  // Initialize all interactive features
  initializeProfileEffects();
  initializeSocialLinks();
  initializeServiceCards();
  initializeContactLinks();
  initializeKeyboardNavigation();
  initializeVentureStudioLinks();
  initializeKeyboardSupport();
  initializeIntersectionObserver();
  
  // Add performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    });
  }
  
  // Add touch feedback for mobile
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
  
  // Handle orientation changes on mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
});
