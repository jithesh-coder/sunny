// login.js – Professional Login with Google OAuth using Firebase
// ES Module Version

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

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
      if(elements.pageTransition) elements.pageTransition.classList.add('hidden');
    }, 600);
  });
}

function showPageTransition(callback) {
  if(elements.pageTransition) {
    elements.pageTransition.classList.remove('hidden');
    elements.pageTransition.classList.add('active');
  }
  setTimeout(() => { if (callback) callback(); }, 600);
}

// ============================================
// PARTICLE SYSTEM
// ============================================

function initParticles() {
  const container = elements.particles;
  if (!container) return;
  const count = window.innerWidth < 768 ? 12 : 25;
  for (let i = 0; i < count; i++) { createParticle(container); }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  const size = Math.random() * 5 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 18;
  const duration = Math.random() * 12 + 15;
  particle.style.cssText = `width: ${size}px; height: ${size}px; left: ${left}%; animation-delay: ${delay}s; animation-duration: ${duration}s;`;
  container.appendChild(particle);
}

// ============================================
// GOOGLE AUTHENTICATION
// ============================================

function initGoogleAuth() {
  if (elements.googleLoginBtn) {
    elements.googleLoginBtn.addEventListener('click', handleGoogleLogin);
  }
}

async function handleGoogleLogin() {
  const btn = elements.googleLoginBtn;
  btn.classList.add('loading');
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
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
    showToast('success', 'Welcome!', `Signed in as ${user.displayName}`);
    showUserModal(userData);
  } catch (error) {
    console.error("Google Login Error:", error);
    showToast('error', 'Sign In Failed', error.message);
  } finally {
    btn.classList.remove('loading');
  }
}

function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) console.log("User is signed in:", user.email);
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
  const { emailInput, phoneInput, passwordInput, loginForm } = elements;
  if (!loginForm) return;

  if (emailInput) {
    emailInput.addEventListener('blur', () => validateEmail());
    emailInput.addEventListener('input', () => clearFieldError('email'));
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      clearFieldError('phone');
    });
    phoneInput.addEventListener('blur', () => validatePhone());
  }
  if (passwordInput) {
    passwordInput.addEventListener('blur', () => validatePassword());
    passwordInput.addEventListener('input', () => clearFieldError('password'));
  }
  loginForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  hideGeneralError();
  
  // We validate, but we proceed even if one is empty because we might login with the other
  const emailValid = validateEmail();
  const phoneValid = validatePhone();
  const passValid = validatePassword();
  
  if (!passValid) return; 
  if (!emailValid && !phoneValid) return; // Must have at least one valid ID
  
  const { loginBtn, emailInput, phoneInput, passwordInput, rememberMe } = elements;
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;
  
  try {
    const result = await authenticateUser(
      emailInput.value.trim(),
      phoneInput.value.trim(),
      passwordInput.value
    );
    
    if (result.success) {
      loginBtn.classList.remove('loading');
      loginBtn.classList.add('success');
      
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      showToast('success', 'Login Successful!', 'Redirecting to dashboard...');
      setTimeout(() => {
        showPageTransition(() => { window.location.href = 'dashboard.html'; });
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

// Validation Helpers
function validateEmail() {
  const input = elements.emailInput;
  if (!input) return true;
  const value = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Relaxed: Don't show error if empty, just return false (user might use phone)
  if (!value) return false; 
  if (!emailRegex.test(value)) { showFieldError('email', 'Invalid email'); return false; }
  showFieldSuccess('email'); return true;
}
function validatePhone() {
  const input = elements.phoneInput;
  if (!input) return true;
  const value = input.value.trim();
  // Relaxed: Don't show error if empty, just return false (user might use email)
  if (!value) return false;
  if (value.length !== 10) { showFieldError('phone', 'Must be 10 digits'); return false; }
  showFieldSuccess('phone'); return true;
}
function validatePassword() {
  const input = elements.passwordInput;
  if (!input) return true;
  const value = input.value;
  if (!value) { showFieldError('password', 'Password is required'); return false; }
  showFieldSuccess('password'); return true;
}
function showFieldError(id, msg) {
  const el = document.getElementById(id); const err = document.getElementById(id+'Error');
  if(el) { el.classList.add('error'); el.classList.remove('success'); }
  if(err) { err.querySelector('.error-text').textContent = msg; err.classList.add('visible'); }
}
function showFieldSuccess(id) {
  const el = document.getElementById(id); const err = document.getElementById(id+'Error');
  if(el) { el.classList.remove('error'); el.classList.add('success'); }
  if(err) err.classList.remove('visible');
}
function clearFieldError(id) {
  const el = document.getElementById(id); const err = document.getElementById(id+'Error');
  if(el) el.classList.remove('error', 'success');
  if(err) err.classList.remove('visible');
}
function showGeneralError(msg) {
  if(elements.generalErrorText) elements.generalErrorText.textContent = msg;
  if(elements.generalError) elements.generalError.classList.add('visible');
}
function hideGeneralError() {
  if(elements.generalError) elements.generalError.classList.remove('visible');
}

// ============================================
// 🔥 SMART LOGIN: EMAIL OR PHONE
// ============================================

async function authenticateUser(email, phone, password) {
  try {
    const usersRef = collection(db, 'users');
    let userFound = null;
    let userDocId = null;

    // ----------------------------------------
    // ATTEMPT 1: FIND BY EMAIL
    // ----------------------------------------
    if (email) {
      const qEmail = query(usersRef, where('email', '==', email.toLowerCase()));
      const snapEmail = await getDocs(qEmail);
      
      if (!snapEmail.empty) {
        // Found user by Email!
        userFound = snapEmail.docs[0].data();
        userDocId = snapEmail.docs[0].id;
        console.log("✅ User found via Email");
      }
    }

    // ----------------------------------------
    // ATTEMPT 2: FIND BY PHONE (If email failed)
    // ----------------------------------------
    if (!userFound && phone) {
      const qPhone = query(usersRef, where('phone', '==', phone));
      const snapPhone = await getDocs(qPhone);
      
      if (!snapPhone.empty) {
        // Found user by Phone!
        userFound = snapPhone.docs[0].data();
        userDocId = snapPhone.docs[0].id;
        console.log("✅ User found via Phone");
      }
    }

    // ----------------------------------------
    // CHECK IF ANY USER WAS FOUND
    // ----------------------------------------
    if (!userFound) {
      return { success: false, message: 'No account found with this Email or Phone.' };
    }

    // =========================================================
    // CHECK PASSWORD (The only strict rule)
    // =========================================================
    
    // Get password from DB (Checking all field name variations)
    const rawDBPass = userFound.password || userFound.Password || userFound.pass || userFound.PASSWORD;
    const dbPass = String(rawDBPass || '').trim();
    const inputPass = String(password).trim();
    
    if (dbPass !== inputPass) {
        console.log(`❌ Password Mismatch. DB: [${dbPass}] vs Input: [${inputPass}]`);
        return { success: false, message: 'Incorrect password.' };
    }

    // =========================================================
    // SUCCESS
    // =========================================================
    try {
      await updateDoc(doc(db, 'users', userDocId), { lastLoginAt: serverTimestamp() });
    } catch (e) { console.log("Time update skipped"); }

    const sessionData = {
      uid: userDocId,
      email: userFound.email,
      name: userFound.name || userFound.displayName || 'User',
      phone: userFound.phone,
      photoURL: userFound.photoURL,
      provider: 'email',
      loginTime: new Date().toISOString()
    };

    sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
    localStorage.setItem('lastLoggedInUser', JSON.stringify(sessionData));
    
    return { success: true, user: sessionData };

  } catch (error) {
    console.error("System Error:", error);
    return { success: false, message: 'System error. Check console.' };
  }
}

// (UI Helpers)
function loadRememberedEmail() {
  const rem = localStorage.getItem('rememberedEmail');
  if(rem && elements.emailInput) { elements.emailInput.value = rem; if(elements.rememberMe) elements.rememberMe.checked = true; }
}
function initPasswordToggle() {
  if(!elements.passwordToggle) return;
  elements.passwordToggle.addEventListener('click', () => {
    const input = elements.passwordInput; const icon = elements.passwordToggle.querySelector('i');
    if(input.type === 'password') { input.type = 'text'; icon.classList.replace('fa-eye', 'fa-eye-slash'); }
    else { input.type = 'password'; icon.classList.replace('fa-eye-slash', 'fa-eye'); }
  });
}
function initLinkTransitions() {
  if(elements.forgotLink) elements.forgotLink.onclick = (e) => { e.preventDefault(); showPageTransition(() => window.location.href = 'forgot.html'); };
  if(elements.signupLink) elements.signupLink.onclick = (e) => { e.preventDefault(); showPageTransition(() => window.location.href = 'signup.html'); };
}
function initUserModal() {
  if(elements.modalClose) elements.modalClose.onclick = () => elements.userModal.classList.remove('visible');
  if(elements.continueBtn) elements.continueBtn.onclick = () => showPageTransition(() => window.location.href = 'dashboard.html');
}
function showUserModal(user) {
  if(!elements.userModal) return;
  const def = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName||'U')}&background=4cc9f0&color=fff`;
  if(elements.userAvatar) elements.userAvatar.src = user.photoURL || def;
  if(elements.userName) elements.userName.textContent = user.displayName || 'Welcome';
  if(elements.userEmail) elements.userEmail.textContent = user.email;
  elements.userModal.classList.add('visible');
}
function showToast(type, title, msg) {
  const t = elements.toast; if(!t) return;
  const icon = t.querySelector('.toast-icon i');
  t.querySelector('.toast-title').textContent = title;
  t.querySelector('.toast-message').textContent = msg;
  t.classList.remove('success','error','info','visible');
  if(type === 'success') { t.classList.add('success'); icon.className='fas fa-check-circle'; }
  else { t.classList.add('error'); icon.className='fas fa-exclamation-circle'; }
  t.classList.add('visible');
  setTimeout(hideToast, 4000);
}
function hideToast() { if(elements.toast) elements.toast.classList.remove('visible'); }

console.log('RoadMap-HUB Loaded');