// forgot.js - Password Reset with Firebase Auth

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ============================================
// 🔥 FIREBASE CONFIGURATION
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
  pageTransition: document.getElementById('pageTransition'),
  particles: document.getElementById('particles'),
  resetForm: document.getElementById('resetForm'),
  resetBtn: document.getElementById('resetBtn'),
  emailInput: document.getElementById('email'),
  generalError: document.getElementById('generalError'),
  generalErrorText: document.getElementById('generalErrorText'),
  successMessage: document.getElementById('successMessage'),
  sentEmail: document.getElementById('sentEmail'),
  resendBtn: document.getElementById('resendBtn'),
  loginLink: document.getElementById('loginLink'),
  toast: document.getElementById('toast'),
  toastClose: document.getElementById('toastClose')
};

let lastEmail = '';

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initParticles();
  initResetForm();
  initLinkTransitions();
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
  setTimeout(callback, 600);
}

// ============================================
// PARTICLES
// ============================================
function initParticles() {
  const container = elements.particles;
  if (!container) return;
  
  const count = window.innerWidth < 768 ? 12 : 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      width: ${Math.random() * 5 + 2}px;
      height: ${Math.random() * 5 + 2}px;
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 18}s;
      animation-duration: ${Math.random() * 12 + 15}s;
    `;
    container.appendChild(particle);
  }
}

// ============================================
// RESET FORM
// ============================================
function initResetForm() {
  if (elements.emailInput) {
    elements.emailInput.addEventListener('blur', validateEmail);
    elements.emailInput.addEventListener('input', () => clearFieldError('email'));
  }

  if (elements.resetForm) {
    elements.resetForm.addEventListener('submit', handleResetSubmit);
  }

  if (elements.resendBtn) {
    elements.resendBtn.addEventListener('click', handleResend);
  }
}

async function handleResetSubmit(e) {
  e.preventDefault();
  hideGeneralError();

  if (!validateEmail()) return;

  const email = elements.emailInput.value.trim();
  lastEmail = email;

  elements.resetBtn.classList.add('loading');
  elements.resetBtn.disabled = true;

  try {
    // Check if email exists in database first
    const emailExists = await checkEmailExists(email);
    
    if (!emailExists) {
      throw new Error('No account found with this email address.');
    }

    // 🔥 FIX APPLIED HERE:
    // Removed the 3rd argument (actionCodeSettings) and added 'await'.
    // This sends the standard Firebase reset email which avoids domain errors.
    await sendPasswordResetEmail(auth, email);

    // Log reset request to database
    await logPasswordResetRequest(email);

    console.log("✅ Password reset email sent to:", email);

    elements.resetBtn.classList.remove('loading');
    elements.resetBtn.classList.add('success');

    showToast('success', 'Email Sent!', 'Check your inbox for the reset link.');

    // Show success message
    setTimeout(() => {
      elements.resetForm.style.display = 'none';
      elements.successMessage.style.display = 'block';
      elements.sentEmail.textContent = email;
    }, 1000);

  } catch (error) {
    console.error("❌ Password Reset Error:", error);
    elements.resetBtn.classList.remove('loading');
    elements.resetBtn.disabled = false;
    handleResetError(error);
  }
}

async function handleResend() {
  if (!lastEmail) return;

  elements.resendBtn.disabled = true;
  elements.resendBtn.textContent = 'Sending...';

  try {
    await sendPasswordResetEmail(auth, lastEmail);
    showToast('success', 'Email Resent!', 'Check your inbox.');
    elements.resendBtn.textContent = 'Sent!';
    
    setTimeout(() => {
      elements.resendBtn.textContent = 'resend';
      elements.resendBtn.disabled = false;
    }, 30000); // 30 seconds cooldown

  } catch (error) {
    showToast('error', 'Error', 'Failed to resend email. Try again later.');
    elements.resendBtn.textContent = 'resend';
    elements.resendBtn.disabled = false;
  }
}

// ============================================
// DATABASE FUNCTIONS
// ============================================
async function checkEmailExists(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email:", error);
    // If can't check, proceed anyway (Firebase will handle it)
    return true;
  }
}

async function logPasswordResetRequest(email) {
  try {
    const resetRef = doc(collection(db, 'passwordResets'));
    await setDoc(resetRef, {
      email: email.toLowerCase(),
      requestedAt: serverTimestamp(),
      status: 'pending'
    });
  } catch (error) {
    console.error("Error logging reset request:", error);
    // Don't throw - this is just for logging
  }
}

// ============================================
// VALIDATION
// ============================================
function validateEmail() {
  const value = elements.emailInput.value.trim();
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

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');

  if (input) {
    input.classList.remove('success');
    input.classList.add('error');
  }

  if (errorElement) {
    const errorText = errorElement.querySelector('.error-text');
    if (errorText) errorText.textContent = message;
    errorElement.classList.add('visible');
  }
}

function showFieldSuccess(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');

  if (input) {
    input.classList.remove('error');
    input.classList.add('success');
  }

  if (errorElement) {
    errorElement.classList.remove('visible');
  }
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');

  if (input) input.classList.remove('error', 'success');
  if (errorElement) errorElement.classList.remove('visible');
}

function showGeneralError(message) {
  if (elements.generalErrorText) {
    elements.generalErrorText.textContent = message;
  }
  if (elements.generalError) {
    elements.generalError.classList.add('visible');
  }
}

function hideGeneralError() {
  if (elements.generalError) {
    elements.generalError.classList.remove('visible');
  }
}

function handleResetError(error) {
  let message = 'An error occurred. Please try again.';

  switch (error.code) {
    case 'auth/user-not-found':
      message = 'No account found with this email address.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address format.';
      break;
    case 'auth/too-many-requests':
      message = 'Too many requests. Please try again later.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection.';
      break;
    default:
      message = error.message || message;
  }

  showGeneralError(message);
  showToast('error', 'Error', message);
}

// ============================================
// LINK TRANSITIONS
// ============================================
function initLinkTransitions() {
  if (elements.loginLink) {
    elements.loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      showPageTransition(() => {
        window.location.href = 'login3.html';
      });
    });
  }
}

// ============================================
// TOAST
// ============================================
function showToast(type, title, message) {
  const toast = elements.toast;
  if (!toast) return;

  const icon = toast.querySelector('.toast-icon i');
  const toastTitle = toast.querySelector('.toast-title');
  const toastMessage = toast.querySelector('.toast-message');
  const progress = toast.querySelector('.toast-progress');

  if (toastTitle) toastTitle.textContent = title;
  if (toastMessage) toastMessage.textContent = message;

  toast.classList.remove('success', 'error', 'visible');

  if (icon) {
    if (type === 'success') {
      icon.className = 'fas fa-check-circle';
    } else {
      toast.classList.add('error');
      icon.className = 'fas fa-exclamation-circle';
    }
  }

  if (progress) {
    progress.style.animation = 'none';
    toast.offsetHeight;
    progress.style.animation = 'progressShrink 4s linear forwards';
  }

  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);
}

console.log('%c🔑 RoadMap-HUB Password Reset', 'font-size: 20px; color: #a855f7;');