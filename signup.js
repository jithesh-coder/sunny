// signup.js - Sign Up with Firebase Auth + Firestore Database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('email');
googleProvider.addScope('profile');

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
  pageTransition: document.getElementById('pageTransition'),
  particles: document.getElementById('particles'),
  googleSignup: document.getElementById('googleSignup'),
  signupForm: document.getElementById('signupForm'),
  signupBtn: document.getElementById('signupBtn'),
  fullNameInput: document.getElementById('fullName'),
  emailInput: document.getElementById('email'),
  phoneInput: document.getElementById('phone'),
  passwordInput: document.getElementById('password'),
  confirmPasswordInput: document.getElementById('confirmPassword'),
  termsCheckbox: document.getElementById('terms'),
  passwordToggle: document.getElementById('passwordToggle'),
  confirmPasswordToggle: document.getElementById('confirmPasswordToggle'),
  passwordStrength: document.getElementById('passwordStrength'),
  strengthFill: document.getElementById('strengthFill'),
  strengthText: document.getElementById('strengthText'),
  generalError: document.getElementById('generalError'),
  generalErrorText: document.getElementById('generalErrorText'),
  successModal: document.getElementById('successModal'),
  successAvatar: document.getElementById('successAvatar'),
  successName: document.getElementById('successName'),
  successEmail: document.getElementById('successEmail'),
  continueToLogin: document.getElementById('continueToLogin'),
  loginLink: document.getElementById('loginLink'),
  toast: document.getElementById('toast'),
  toastClose: document.getElementById('toastClose')
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initParticles();
  initGoogleSignup();
  initFormValidation();
  initPasswordToggle();
  initPasswordStrength();
  initLinkTransitions();
  initSuccessModal();
});

// ============================================
// PAGE TRANSITION
// ============================================
function initPageTransition() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      if(elements.pageTransition) elements.pageTransition.classList.add('hidden');
    }, 600);
  });
}

function showPageTransition(callback) {
  if(elements.pageTransition) elements.pageTransition.classList.remove('hidden');
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
// GOOGLE SIGN UP
// ============================================
function initGoogleSignup() {
  if (elements.googleSignup) {
    elements.googleSignup.addEventListener('click', handleGoogleSignup);
  }
}

async function handleGoogleSignup() {
  const btn = elements.googleSignup;
  btn.classList.add('loading');

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("✅ Google Sign Up Successful:", user.email);

    // Save user to Firestore (Google users don't have a password to save)
    await saveUserToDatabase({
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      phone: '',
      photoURL: user.photoURL,
      provider: 'google',
      createdAt: serverTimestamp()
    });

    showToast('success', 'Account Created!', 'Welcome to RoadMap-HUB!');
    showSuccessModal({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });

  } catch (error) {
    console.error("❌ Google Sign Up Error:", error);
    handleAuthError(error);
  } finally {
    btn.classList.remove('loading');
  }
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
  const { fullNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput, signupForm } = elements;

  if (fullNameInput) {
    fullNameInput.addEventListener('blur', validateFullName);
    fullNameInput.addEventListener('input', () => clearFieldError('fullName'));
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => clearFieldError('email'));
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      clearFieldError('phone');
    });
    phoneInput.addEventListener('blur', validatePhone);
  }

  if (passwordInput) {
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', () => {
      clearFieldError('password');
      updatePasswordStrength();
    });
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', () => clearFieldError('confirmPassword'));
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleFormSubmit);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  hideGeneralError();

  // Validate all fields
  const validations = [
    validateFullName(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
    validateConfirmPassword(),
    validateTerms()
  ];

  if (validations.includes(false)) return;

  const { signupBtn, fullNameInput, emailInput, phoneInput, passwordInput } = elements;

  signupBtn.classList.add('loading');
  signupBtn.disabled = true;

  try {
    // Check if email already exists in Firestore
    const emailExists = await checkEmailExists(emailInput.value.trim());
    if (emailExists) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    // Check if phone already exists
    const phoneExists = await checkPhoneExists(phoneInput.value.trim());
    if (phoneExists) {
      throw new Error('This phone number is already registered.');
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName: fullNameInput.value.trim()
    });

    // ============================================
    // 🔥 CRITICAL UPDATE: SAVING PASSWORD TO DB
    // ============================================
    await saveUserToDatabase({
      uid: user.uid,
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value, // <--- THIS LINE SAVES THE PASSWORD!
      photoURL: null,
      provider: 'email',
      createdAt: serverTimestamp()
    });

    console.log("✅ Account Created & Password Saved:", user.email);

    signupBtn.classList.remove('loading');
    signupBtn.classList.add('success');

    showToast('success', 'Account Created!', 'Welcome to RoadMap-HUB!');

    setTimeout(() => {
      showSuccessModal({
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        photoURL: null
      });
    }, 500);

  } catch (error) {
    console.error("❌ Sign Up Error:", error);
    signupBtn.classList.remove('loading');
    signupBtn.disabled = false;
    handleAuthError(error);
  }
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

// Save user to Firestore
async function saveUserToDatabase(userData) {
  try {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    console.log("✅ User saved to database:", userData.email);
    return true;
  } catch (error) {
    console.error("❌ Error saving user:", error);
    throw error;
  }
}

// Check if email exists
async function checkEmailExists(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}

// Check if phone exists
async function checkPhoneExists(phone) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phone', '==', phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking phone:", error);
    return false;
  }
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================
function validateFullName() {
  const value = elements.fullNameInput.value.trim();
  
  if (!value) {
    showFieldError('fullName', 'Full name is required');
    return false;
  }
  
  if (value.length < 2) {
    showFieldError('fullName', 'Name must be at least 2 characters');
    return false;
  }

  showFieldSuccess('fullName');
  return true;
}

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

function validatePhone() {
  const value = elements.phoneInput.value.trim();
  
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
  const value = elements.passwordInput.value;
  
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

function validateConfirmPassword() {
  const password = elements.passwordInput.value;
  const confirmPassword = elements.confirmPasswordInput.value;
  
  if (!confirmPassword) {
    showFieldError('confirmPassword', 'Please confirm your password');
    return false;
  }
  
  if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
    return false;
  }

  showFieldSuccess('confirmPassword');
  return true;
}

function validateTerms() {
  if (!elements.termsCheckbox.checked) {
    showFieldError('terms', 'You must accept the Terms of Service');
    return false;
  }
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

function handleAuthError(error) {
  let message = 'An error occurred. Please try again.';

  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered. Please sign in instead.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address format.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak. Please use a stronger password.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection.';
      break;
    case 'auth/popup-closed-by-user':
      message = 'Sign-up was cancelled.';
      break;
    default:
      message = error.message || message;
  }

  showGeneralError(message);
  showToast('error', 'Sign Up Failed', message);
}

// ============================================
// PASSWORD STRENGTH
// ============================================
function initPasswordStrength() {
  // Already handled in input event
}

function updatePasswordStrength() {
  const password = elements.passwordInput.value;
  const strength = elements.passwordStrength;
  const fill = elements.strengthFill;
  const text = elements.strengthText;

  if (!strength || !fill || !text) return;

  strength.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

  if (!password) {
    text.textContent = 'Password strength';
    return;
  }

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    strength.classList.add('strength-weak');
    text.textContent = 'Weak password';
  } else if (score <= 3) {
    strength.classList.add('strength-medium');
    text.textContent = 'Medium password';
  } else {
    strength.classList.add('strength-strong');
    text.textContent = 'Strong password';
  }
}

// ============================================
// PASSWORD TOGGLE
// ============================================
function initPasswordToggle() {
  if (elements.passwordToggle) {
    elements.passwordToggle.addEventListener('click', () => {
      togglePasswordVisibility(elements.passwordInput, elements.passwordToggle);
    });
  }

  if (elements.confirmPasswordToggle) {
    elements.confirmPasswordToggle.addEventListener('click', () => {
      togglePasswordVisibility(elements.confirmPasswordInput, elements.confirmPasswordToggle);
    });
  }
}

function togglePasswordVisibility(input, toggle) {
  const icon = toggle.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
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
// SUCCESS MODAL
// ============================================
function initSuccessModal() {
  if (elements.continueToLogin) {
    elements.continueToLogin.addEventListener('click', () => {
      showPageTransition(() => {
        window.location.href = 'login3.html';
      });
    });
  }
}

function showSuccessModal(user) {
  if (!elements.successModal) return;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4cc9f0&color=fff&size=200`;

  if (elements.successAvatar) {
    elements.successAvatar.src = user.photoURL || defaultAvatar;
  }
  if (elements.successName) {
    elements.successName.textContent = user.name;
  }
  if (elements.successEmail) {
    elements.successEmail.textContent = user.email;
  }

  elements.successModal.classList.add('visible');
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
      toast.classList.add('success');
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

  const hideTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);

  if (elements.toastClose) {
    elements.toastClose.onclick = () => {
      clearTimeout(hideTimeout);
      toast.classList.remove('visible');
    };
  }
}

// Console
console.log('%c🚀 RoadMap-HUB Sign Up', 'font-size: 20px; color: #4cc9f0;');