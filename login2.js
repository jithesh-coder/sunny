// login.js – Professional Login with Google OAuth using Firebase
// ES Module Version

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// ============================================
// FIREBASE CONFIGURATION
// ============================================

const firebaseConfig = {
   apiKey: "AIzaSyAHrVXmIJ9VlaFtzkfezqP4_mXezr1p9fc",
  authDomain: "roadmap-hub-501d2.firebaseapp.com",
  projectId: "roadmap-hub-501d2",
  storageBucket: "roadmap-hub-501d2.firebasestorage.app",
  messagingSenderId: "969108481662",
  appId: "1:969108481662:web:0cefac8628e6bd522eda2f",
  measurementId: "G-CR4HCPBLMZ"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add scopes for additional user info
provider.addScope('email');
provider.addScope('profile');

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
  pageTransition: document.getElementById('pageTransition'),
  particles: document.getElementById('particles'),
  googleLoginBtn: document.getElementById('googleLogin'),
  loginForm: document.getElementById('loginForm'),
  loginBtn: document.getElementById('loginBtn'),
  emailInput: document.getElementById('email'),
  phoneInput: document.getElementById('phone'),
  passwordInput: document.getElementById('password'),
  passwordToggle: document.getElementById('passwordToggle'),
  rememberMe: document.getElementById('rememberMe'),
  forgotLink: document.getElementById('forgotLink'),
  signupLink: document.getElementById('signupLink'),
  generalError: document.getElementById('generalError'),
  generalErrorText: document.getElementById('generalErrorText'),
  userModal: document.getElementById('userModal'),
  userAvatar: document.getElementById('userAvatar'),
  userName: document.getElementById('userName'),
  userEmail: document.getElementById('userEmail'),
  continueBtn: document.getElementById('continueBtn'),
  modalClose: document.getElementById('modalClose'),
  toast: document.getElementById('toast'),
  toastClose: document.getElementById('toastClose')
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initParticles();
  initGoogleAuth();
  initFormValidation();
  initPasswordToggle();
  initLinkTransitions();
  initUserModal();
  checkAuthState();
  loadRememberedEmail();
});

// ============================================
// PAGE TRANSITION
// ============================================

function initPageTransition() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      elements.pageTransition.classList.add('hidden');
    }, 600);
  });
}

function showPageTransition(callback) {
  elements.pageTransition.classList.remove('hidden');
  elements.pageTransition.classList.add('active');
  
  setTimeout(() => {
    if (callback) callback();
  }, 600);
}

// ============================================
// PARTICLE SYSTEM
// ============================================

function initParticles() {
  const container = elements.particles;
  const count = window.innerWidth < 768 ? 12 : 25;

  for (let i = 0; i < count; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 5 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 18;
  const duration = Math.random() * 12 + 15;
  
  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
  `;
  
  container.appendChild(particle);
}

// ============================================
// GOOGLE AUTHENTICATION
// ============================================

function initGoogleAuth() {
  elements.googleLoginBtn.addEventListener('click', handleGoogleLogin);
}

async function handleGoogleLogin() {
  const btn = elements.googleLoginBtn;
  
  // Add loading state
  btn.classList.add('loading');
  
  try {
    // Sign in with popup
    const result = await signInWithPopup(auth, provider);
    
    // Get user info
    const user = result.user;
    
    console.log("✅ Google Login Successful:", user.email);
    
    // Save user data
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'google',
      loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('lastLoggedInUser', JSON.stringify(userData));
    
    // Show success toast
    showToast('success', 'Welcome!', `Signed in as ${user.displayName}`);
    
    // Show user modal
    showUserModal(userData);
    
  } catch (error) {
    console.error("❌ Google Login Error:", error);
    
    // Handle specific errors
    let errorMessage = 'Authentication failed. Please try again.';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in was cancelled.';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Popup was blocked. Please allow popups and try again.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Only one popup request is allowed at a time.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      default:
        errorMessage = error.message || 'An unexpected error occurred.';
    }
    
    showToast('error', 'Sign In Failed', errorMessage);
    
  } finally {
    btn.classList.remove('loading');
  }
}

function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("👤 User is signed in:", user.email);
    } else {
      console.log("👤 No user signed in");
    }
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
  const { emailInput, phoneInput, passwordInput, loginForm } = elements;
  
  // Real-time validation
  emailInput.addEventListener('blur', () => validateEmail());
  emailInput.addEventListener('input', () => clearFieldError('email'));
  
  phoneInput.addEventListener('input', (e) => {
    // Only allow numbers, max 10 digits
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    clearFieldError('phone');
  });
  phoneInput.addEventListener('blur', () => validatePhone());
  
  passwordInput.addEventListener('blur', () => validatePassword());
  passwordInput.addEventListener('input', () => clearFieldError('password'));
  
  // Form submission
  loginForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  hideGeneralError();
  
  // Validate all fields
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();
  
  if (!isEmailValid || !isPhoneValid || !isPasswordValid) {
    return;
  }
  
  const { loginBtn, emailInput, phoneInput, passwordInput, rememberMe } = elements;
  
  // Show loading state
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;
  
  try {
    // Authenticate with stored database
    const result = await authenticateUser(
      emailInput.value.trim(),
      phoneInput.value.trim(),
      passwordInput.value
    );
    
    if (result.success) {
      // Success state
      loginBtn.classList.remove('loading');
      loginBtn.classList.add('success');
      
      // Save email if remember me is checked
      if (rememberMe.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      showToast('success', 'Login Successful!', 'Redirecting to dashboard...');
      
      // Redirect after animation
      setTimeout(() => {
        showPageTransition(() => {
          window.location.href = 'dashboard.html';
        });
      }, 1500);
      
    } else {
      throw new Error(result.message);
    }
    
  } catch (error) {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    
    showGeneralError(error.message);
    showToast('error', 'Login Failed', error.message);
  }
}

// Validation Functions
function validateEmail() {
  const input = elements.emailInput;
  const value = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!value) {
    showFieldError('email', 'Email address is required');
    return false;
  }
  
  if (!emailRegex.test(value)) {
    showFieldError('email', 'Please enter a valid email address');
    return false;
  }
  
  showFieldSuccess('email');
  return true;
}

function validatePhone() {
  const input = elements.phoneInput;
  const value = input.value.trim();
  
  if (!value) {
    showFieldError('phone', 'Phone number is required');
    return false;
  }
  
  if (value.length !== 10) {
    showFieldError('phone', 'Enter a valid 10-digit phone number');
    return false;
  }
  
  showFieldSuccess('phone');
  return true;
}

function validatePassword() {
  const input = elements.passwordInput;
  const value = input.value;
  
  if (!value) {
    showFieldError('password', 'Password is required');
    return false;
  }
  
  if (value.length < 6) {
    showFieldError('password', 'Password must be at least 6 characters');
    return false;
  }
  
  showFieldSuccess('password');
  return true;
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');
  const errorText = errorElement.querySelector('.error-text');
  
  input.classList.remove('success');
  input.classList.add('error');
  errorText.textContent = message;
  errorElement.classList.add('visible');
}

function showFieldSuccess(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');
  
  input.classList.remove('error');
  input.classList.add('success');
  errorElement.classList.remove('visible');
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');
  
  input.classList.remove('error', 'success');
  errorElement.classList.remove('visible');
}

function showGeneralError(message) {
  elements.generalErrorText.textContent = message;
  elements.generalError.classList.add('visible');
}

function hideGeneralError() {
  elements.generalError.classList.remove('visible');
}

// ============================================
// DATABASE / AUTHENTICATION
// ============================================

async function authenticateUser(email, phone, password) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Get stored users
  const storedUsers = JSON.parse(localStorage.getItem('roadmapHubUsers')) || [];
  
  // Demo user (always works)
  const demoUser = {
    email: 'demo@roadmaphub.com',
    phone: '1234567890',
    password: 'demo123',
    name: 'Demo User'
  };
  
  // Check demo user
  if (email.toLowerCase() === demoUser.email && 
      phone === demoUser.phone && 
      password === demoUser.password) {
    
    sessionStorage.setItem('currentUser', JSON.stringify({
      email: demoUser.email,
      name: demoUser.name,
      provider: 'email'
    }));
    
    return { success: true };
  }
  
  // Find user in database
  const user = storedUsers.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.phone === phone
  );
  
  if (!user) {
    return {
      success: false,
      message: 'No account found with this email and phone. Please sign up first.'
    };
  }
  
  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please try again or reset your password.'
    };
  }
  
  // Save session
  sessionStorage.setItem('currentUser', JSON.stringify({
    email: user.email,
    name: user.name || 'User',
    provider: 'email'
  }));
  
  return { success: true };
}

function loadRememberedEmail() {
  const remembered = localStorage.getItem('rememberedEmail');
  if (remembered) {
    elements.emailInput.value = remembered;
    elements.rememberMe.checked = true;
  }
}

// ============================================
// PASSWORD TOGGLE
// ============================================

function initPasswordToggle() {
  elements.passwordToggle.addEventListener('click', () => {
    const input = elements.passwordInput;
    const icon = elements.passwordToggle.querySelector('i');
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
}

// ============================================
// LINK TRANSITIONS
// ============================================

function initLinkTransitions() {
  elements.forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPageTransition(() => {
      window.location.href = 'forgot.html';
    });
  });
  
  elements.signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPageTransition(() => {
      window.location.href = 'signup.html';
    });
  });
}

// ============================================
// USER MODAL
// ============================================

function initUserModal() {
  elements.modalClose.addEventListener('click', () => {
    elements.userModal.classList.remove('visible');
  });
  
  elements.continueBtn.addEventListener('click', () => {
    showPageTransition(() => {
      window.location.href = 'dashboard.html';
    });
  });
  
  // Close on backdrop click
  elements.userModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('user-modal-backdrop')) {
      elements.userModal.classList.remove('visible');
    }
  });
}

function showUserModal(user) {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=4cc9f0&color=fff&size=200`;
  
  elements.userAvatar.src = user.photoURL || defaultAvatar;
  elements.userAvatar.onerror = () => {
    elements.userAvatar.src = defaultAvatar;
  };
  
  elements.userName.textContent = user.displayName || 'Welcome!';
  elements.userEmail.textContent = user.email;
  
  elements.userModal.classList.add('visible');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(type, title, message) {
  const toast = elements.toast;
  const icon = toast.querySelector('.toast-icon i');
  const toastTitle = toast.querySelector('.toast-title');
  const toastMessage = toast.querySelector('.toast-message');
  const progress = toast.querySelector('.toast-progress');
  
  // Set content
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Reset classes
  toast.classList.remove('success', 'error', 'info', 'visible');
  
  // Set type
  switch (type) {
    case 'success':
      toast.classList.add('success');
      icon.className = 'fas fa-check-circle';
      break;
    case 'error':
      toast.classList.add('error');
      icon.className = 'fas fa-exclamation-circle';
      break;
    case 'info':
      toast.classList.add('info');
      icon.className = 'fas fa-info-circle';
      break;
  }
  
  // Reset and show
  progress.style.animation = 'none';
  toast.offsetHeight; // Trigger reflow
  progress.style.animation = 'progressShrink 4s linear forwards';
  
  toast.classList.add('visible');
  
  // Auto hide
  const hideTimeout = setTimeout(hideToast, 4000);
  
  // Close button
  elements.toastClose.onclick = () => {
    clearTimeout(hideTimeout);
    hideToast();
  };
}

function hideToast() {
  elements.toast.classList.remove('visible');
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const container = elements.particles;
    const currentCount = container.children.length;
    const targetCount = window.innerWidth < 768 ? 12 : 25;
    
    if (Math.abs(currentCount - targetCount) > 5) {
      container.innerHTML = '';
      for (let i = 0; i < targetCount; i++) {
        createParticle(container);
      }
    }
  }, 300);
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log(
  '%c🚀 RoadMap-HUB',
  'font-size: 28px; font-weight: bold; background: linear-gradient(90deg, #4cc9f0, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);
console.log(
  '%cProfessional Login with Google OAuth',
  'font-size: 14px; color: #a855f7;'
);
console.log(
  '%c📧 Demo Account: demo@roadmaphub.com | 📱 1234567890 | 🔑 demo123',
  'font-size: 12px; color: #9ca3af; background: rgba(76, 201, 240, 0.1); padding: 8px 12px; border-radius: 6px;'
);