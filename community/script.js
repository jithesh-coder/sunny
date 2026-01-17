// ==================== DATABASE SIMULATION ====================
let currentUser = null;
let users = JSON.parse(localStorage.getItem('nexusq_users')) || [];
let posts = JSON.parse(localStorage.getItem('nexusq_posts')) || [];
let announcements = JSON.parse(localStorage.getItem('nexusq_announcements')) || [];
let likedPosts = JSON.parse(localStorage.getItem('nexusq_liked')) || {};

// Admin Credentials
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'jithesh';

// ==================== DOM ELEMENTS ====================
const elements = {
    // Sections
    welcomeSection: document.getElementById('welcome-section'),
    authSection: document.getElementById('auth-section'),
    userDashboard: document.getElementById('user-dashboard'),
    adminDashboard: document.getElementById('admin-dashboard'),
    
    // Welcome
    btnGetStarted: document.getElementById('btn-get-started'),
    btnLearnMore: document.getElementById('btn-learn-more'),
    statNumbers: document.querySelectorAll('.stat-number'),
    
    // Auth
    btnBackWelcome: document.getElementById('btn-back-welcome'),
    authTabs: document.querySelectorAll('.auth-tab'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    loginEmail: document.getElementById('login-email'),
    loginPassword: document.getElementById('login-password'),
    signupName: document.getElementById('signup-name'),
    signupEmail: document.getElementById('signup-email'),
    signupPassword: document.getElementById('signup-password'),
    signupConfirm: document.getElementById('signup-confirm'),
    passwordToggles: document.querySelectorAll('.password-toggle'),
    
    // User Dashboard
    postsFeed: document.getElementById('posts-feed'),
    announcementsBanner: document.getElementById('announcements-banner'),
    announcementSlider: document.getElementById('announcement-slider'),
    announcementCount: document.getElementById('announcement-count'),
    
    // Profile Elements
    userAvatar: document.getElementById('user-avatar-img'),
    avatarFallback: document.getElementById('avatar-fallback'),
    userName: document.getElementById('user-name'),
    dropdownAvatar: document.getElementById('dropdown-avatar-img'),
    dropdownFallback: document.getElementById('dropdown-fallback'),
    dropdownName: document.getElementById('dropdown-name'),
    dropdownEmail: document.getElementById('dropdown-email'),
    createAvatar: document.getElementById('create-avatar-img'),
    createFallback: document.getElementById('create-fallback'),
    modalAvatar: document.getElementById('modal-avatar-img'),
    modalFallback: document.getElementById('modal-fallback'),
    modalUserName: document.getElementById('modal-user-name'),
    
    // Profile Dropdown
    profileBtn: document.getElementById('profile-btn'),
    profileMenu: document.getElementById('profile-menu'),
    btnChangeAvatar: document.getElementById('btn-change-avatar'),
    btnLogout: document.getElementById('btn-logout'),
    
    // Create Post
    btnOpenModal: document.getElementById('btn-open-modal'),
    fabNewPost: document.getElementById('fab-new-post'),
    
    // Modals
    modalOverlay: document.getElementById('modal-overlay'),
    modalClose: document.getElementById('modal-close'),
    postForm: document.getElementById('post-form'),
    postTitle: document.getElementById('post-title'),
    postContent: document.getElementById('post-content'),
    tagInput: document.getElementById('tag-input'),
    tagsContainer: document.getElementById('tags-container'),
    fileInput: document.getElementById('file-input'),
    fileUploadBtn: document.getElementById('file-upload-btn'),
    filePreview: document.getElementById('file-preview'),
    btnCancelPost: document.getElementById('btn-cancel-post'),
    
    // Answer Modal
    answerModalOverlay: document.getElementById('answer-modal-overlay'),
    answerModalClose: document.getElementById('answer-modal-close'),
    answerForm: document.getElementById('answer-form'),
    questionPreview: document.getElementById('question-preview'),
    answerContent: document.getElementById('answer-content'),
    btnCancelAnswer: document.getElementById('btn-cancel-answer'),
    
    // Photo Modal
    photoModalOverlay: document.getElementById('photo-modal-overlay'),
    photoModalClose: document.getElementById('photo-modal-close'),
    photoPreview: document.getElementById('photo-preview'),
    photoInput: document.getElementById('photo-input'),
    btnChoosePhoto: document.getElementById('btn-choose-photo'),
    btnSavePhoto: document.getElementById('btn-save-photo'),
    btnCancelPhoto: document.getElementById('btn-cancel-photo'),
    
    // Admin
    adminProfileBtn: document.getElementById('admin-profile-btn'),
    adminMenu: document.getElementById('admin-menu'),
    adminLogout: document.getElementById('admin-logout'),
    announcementForm: document.getElementById('announcement-form'),
    announcementText: document.getElementById('announcement-text'),
    announcementImportant: document.getElementById('announcement-important'),
    adminPostsList: document.getElementById('admin-posts-list'),
    totalUsers: document.getElementById('total-users'),
    totalPosts: document.getElementById('total-posts'),
    totalAnswers: document.getElementById('total-answers'),
    activeToday: document.getElementById('active-today'),
    
    // Loading
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingSkeleton: document.getElementById('loading-skeleton'),
    
    // Toast
    toastContainer: document.getElementById('toast-container'),
    
    // Particles
    particles: document.getElementById('particles')
};

// Current tags and file
let currentTags = [];
let currentFile = null;
let currentAnswerPostId = null;
let tempPhotoData = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initAnimatedStats();
    initEventListeners();
    checkSession();
});

// ==================== PARTICLES ANIMATION ====================
function initParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    elements.particles.appendChild(particle);
}

// ==================== ANIMATED STATS ====================
function initAnimatedStats() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        observer.observe(statsRow);
    }
}

function animateStats() {
    elements.statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = formatNumber(Math.floor(current));
        }, 16);
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Welcome Section
    elements.btnGetStarted?.addEventListener('click', () => showSection('auth'));
    elements.btnLearnMore?.addEventListener('click', () => {
        showToast('info', 'Coming Soon', 'Feature documentation is under development.');
    });
    
    // Auth Section
    elements.btnBackWelcome?.addEventListener('click', () => showSection('welcome'));
    
    // Auth Tabs
    elements.authTabs.forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });
    
    // Login Form
    elements.loginForm?.addEventListener('submit', handleLogin);
    
    // Signup Form
    elements.signupForm?.addEventListener('submit', handleSignup);
    
    // Password Strength
    elements.signupPassword?.addEventListener('input', checkPasswordStrength);
    
    // Password Toggles
    elements.passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // Profile Dropdown
    elements.profileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.profileMenu.classList.toggle('active');
    });
    
    elements.adminProfileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.adminMenu.classList.toggle('active');
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        elements.profileMenu?.classList.remove('active');
        elements.adminMenu?.classList.remove('active');
    });
    
    // Logout
    elements.btnLogout?.addEventListener('click', handleLogout);
    elements.adminLogout?.addEventListener('click', handleLogout);
    
    // Change Avatar
    elements.btnChangeAvatar?.addEventListener('click', () => {
        elements.profileMenu.classList.remove('active');
        openPhotoModal();
    });
    
    // Create Post Modal
    elements.btnOpenModal?.addEventListener('click', openPostModal);
    elements.fabNewPost?.addEventListener('click', openPostModal);
    elements.modalClose?.addEventListener('click', closePostModal);
    elements.btnCancelPost?.addEventListener('click', closePostModal);
    elements.modalOverlay?.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) closePostModal();
    });
    
    // Post Form
    elements.postForm?.addEventListener('submit', handlePostSubmit);
    
    // Tags
    elements.tagInput?.addEventListener('keydown', handleTagInput);
    
    // File Upload
    elements.fileUploadBtn?.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput?.addEventListener('change', handleFileSelect);
    
    // Answer Modal
    elements.answerModalClose?.addEventListener('click', closeAnswerModal);
    elements.btnCancelAnswer?.addEventListener('click', closeAnswerModal);
    elements.answerModalOverlay?.addEventListener('click', (e) => {
        if (e.target === elements.answerModalOverlay) closeAnswerModal();
    });
    elements.answerForm?.addEventListener('submit', handleAnswerSubmit);
    
    // Photo Modal
    elements.photoModalClose?.addEventListener('click', closePhotoModal);
    elements.btnCancelPhoto?.addEventListener('click', closePhotoModal);
    elements.photoModalOverlay?.addEventListener('click', (e) => {
        if (e.target === elements.photoModalOverlay) closePhotoModal();
    });
    elements.btnChoosePhoto?.addEventListener('click', () => elements.photoInput.click());
    elements.photoInput?.addEventListener('change', handlePhotoSelect);
    elements.btnSavePhoto?.addEventListener('click', handlePhotoSave);
    
    // Admin Announcement Form
    elements.announcementForm?.addEventListener('submit', handleAnnouncementSubmit);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePostModal();
            closeAnswerModal();
            closePhotoModal();
        }
    });
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionName) {
    // Remove active from all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // Show target section
    switch (sectionName) {
        case 'welcome':
            elements.welcomeSection.classList.add('active');
            break;
        case 'auth':
            elements.authSection.classList.add('active');
            break;
        case 'user':
            elements.userDashboard.classList.add('active');
            break;
        case 'admin':
            elements.adminDashboard.classList.add('active');
            break;
    }
}

// ==================== AUTH TAB SWITCHING ====================
function switchAuthTab(tab) {
    // Update tabs
    elements.authTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Update tab indicator
    document.querySelector('.auth-tabs').dataset.active = tab;
    
    // Update forms
    elements.loginForm.classList.remove('active');
    elements.signupForm.classList.remove('active');
    
    if (tab === 'login') {
        elements.loginForm.classList.add('active');
    } else {
        elements.signupForm.classList.add('active');
    }
}

// ==================== PASSWORD STRENGTH ====================
function checkPasswordStrength() {
    const password = elements.signupPassword.value;
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    strengthFill.classList.remove('weak', 'medium', 'strong');
    
    if (strength <= 1) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 2) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
}

// ==================== LOGIN HANDLER ====================
async function handleLogin(e) {
    e.preventDefault();
    
    const email = elements.loginEmail.value.trim();
    const password = elements.loginPassword.value;
    
    // Show loading
    const btn = elements.loginForm.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    showLoading();
    
    // Simulate API call
    await delay(1500);
    
    // Check admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        currentUser = {
            id: 'admin',
            name: 'Administrator',
            email: ADMIN_EMAIL,
            isAdmin: true,
            avatar: null
        };
        saveSession();
        hideLoading();
        btn.classList.remove('loading');
        showSection('admin');
        renderAdminDashboard();
        showToast('success', 'Welcome Admin!', 'You are now logged in as administrator.');
        return;
    }
    
    // Check regular user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: false,
            avatar: user.avatar || null
        };
        saveSession();
        hideLoading();
        btn.classList.remove('loading');
        showSection('user');
        renderUserDashboard();
        showToast('success', 'Welcome Back!', `Hello ${user.name}, you are now logged in.`);
    } else {
        hideLoading();
        btn.classList.remove('loading');
        showToast('error', 'Login Failed', 'Invalid email or password.');
    }
}

// ==================== SIGNUP HANDLER ====================
async function handleSignup(e) {
    e.preventDefault();
    
    const name = elements.signupName.value.trim();
    const email = elements.signupEmail.value.trim();
    const password = elements.signupPassword.value;
    const confirm = elements.signupConfirm.value;
    const acceptTerms = document.getElementById('accept-terms').checked;
    
    // Validation
    if (!name || !email || !password || !confirm) {
        showToast('error', 'Error', 'Please fill in all fields.');
        return;
    }
    
    if (password !== confirm) {
        showToast('error', 'Error', 'Passwords do not match.');
        return;
    }
    
    if (password.length < 6) {
        showToast('error', 'Error', 'Password must be at least 6 characters.');
        return;
    }
    
    if (!acceptTerms) {
        showToast('error', 'Error', 'Please accept the terms and conditions.');
        return;
    }
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        showToast('error', 'Error', 'Email already registered.');
        return;
    }
    
    // Show loading
    const btn = elements.signupForm.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    showLoading();
    
    // Simulate API call
    await delay(1500);
    
    // Create user
    const newUser = {
        id: generateId(),
        name: name,
        email: email,
        password: password,
        avatar: null,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    // Auto login
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: false,
        avatar: null
    };
    saveSession();
    
    hideLoading();
    btn.classList.remove('loading');
    showSection('user');
    renderUserDashboard();
    showToast('success', 'Account Created!', 'Welcome to NexusQ community.');
}

// ==================== LOGOUT HANDLER ====================
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('nexusq_session');
    showSection('welcome');
    showToast('info', 'Logged Out', 'You have been logged out successfully.');
}

// ==================== SESSION MANAGEMENT ====================
function saveSession() {
    localStorage.setItem('nexusq_session', JSON.stringify(currentUser));
}

function checkSession() {
    const session = localStorage.getItem('nexusq_session');
    if (session) {
        currentUser = JSON.parse(session);
        if (currentUser.isAdmin) {
            showSection('admin');
            renderAdminDashboard();
        } else {
            showSection('user');
            renderUserDashboard();
        }
    } else {
        showSection('welcome');
    }
}

// ==================== USER DASHBOARD RENDER ====================
function renderUserDashboard() {
    updateUserProfile();
    renderAnnouncements();
    renderPosts();
}

function updateUserProfile() {
    if (!currentUser) return;
    
    const initial = currentUser.name.charAt(0).toUpperCase();
    const avatar = currentUser.avatar;
    
    // Update all avatar instances
    const avatarElements = [
        { img: elements.userAvatar, fallback: elements.avatarFallback },
        { img: elements.dropdownAvatar, fallback: elements.dropdownFallback },
        { img: elements.createAvatar, fallback: elements.createFallback },
        { img: elements.modalAvatar, fallback: elements.modalFallback }
    ];
    
    avatarElements.forEach(({ img, fallback }) => {
        if (avatar) {
            img.src = avatar;
            img.style.display = 'block';
            fallback.style.display = 'none';
        } else {
            img.style.display = 'none';
            fallback.style.display = 'flex';
            fallback.textContent = initial;
        }
    });
    
    // Update name displays
    elements.userName.textContent = currentUser.name;
    elements.dropdownName.textContent = currentUser.name;
    elements.dropdownEmail.textContent = currentUser.email;
    elements.modalUserName.textContent = currentUser.name;
}

// ==================== ANNOUNCEMENTS ====================
function renderAnnouncements() {
    if (announcements.length === 0) {
        elements.announcementsBanner.classList.remove('active');
        elements.announcementCount.textContent = '0';
        return;
    }
    
    elements.announcementsBanner.classList.add('active');
    elements.announcementCount.textContent = announcements.length;
    
    elements.announcementSlider.innerHTML = announcements.map(a => `
        <div class="announcement-item ${a.important ? 'important' : ''}">
            <i class="fas ${a.important ? 'fa-exclamation-circle' : 'fa-bullhorn'}"></i>
            <span>${escapeHtml(a.text)}</span>
        </div>
    `).join('');
}

// ==================== POSTS RENDERING ====================
function renderPosts(filter = 'all') {
    elements.loadingSkeleton.classList.add('active');
    
    setTimeout(() => {
        elements.loadingSkeleton.classList.remove('active');
        
        let filteredPosts = [...posts];
        
        if (filter === 'my-posts' && currentUser) {
            filteredPosts = posts.filter(p => p.authorId === currentUser.id);
        }
        
        if (filteredPosts.length === 0) {
            elements.postsFeed.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <h3>No questions yet</h3>
                    <p>Be the first to ask a question and start the conversation!</p>
                </div>
            `;
            return;
        }
        
        elements.postsFeed.innerHTML = filteredPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(post => createPostCard(post))
            .join('');
        
        // Add event listeners to post actions
        addPostEventListeners();
    }, 500);
}

function createPostCard(post) {
    const author = users.find(u => u.id === post.authorId) || { 
        name: 'Unknown User', 
        avatar: null 
    };
    const initial = author.name.charAt(0).toUpperCase();
    const isLiked = likedPosts[post.id]?.includes(currentUser?.id);
    const answersCount = post.answers?.length || 0;
    
    return `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">
                    ${author.avatar 
                        ? `<img src="${author.avatar}" alt="${author.name}">`
                        : `<div class="avatar-fallback">${initial}</div>`
                    }
                </div>
                <div class="post-meta">
                    <div class="post-author">${escapeHtml(author.name)}</div>
                    <div class="post-time">${formatTime(post.createdAt)}</div>
                </div>
                <button class="post-menu-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            
            <div class="post-body">
                <h3 class="post-title">${escapeHtml(post.title)}</h3>
                <p class="post-content">${escapeHtml(post.content)}</p>
            </div>
            
            ${post.tags?.length > 0 ? `
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">#${escapeHtml(tag)}</span>`).join('')}
                </div>
            ` : ''}
            
            ${post.file ? `
                <div class="post-attachment">
                    <i class="fas ${getFileIcon(post.file.type)}"></i>
                    <div class="attachment-info">
                        <div class="attachment-name">${escapeHtml(post.file.name)}</div>
                        <div class="attachment-size">${formatFileSize(post.file.size)}</div>
                    </div>
                </div>
            ` : ''}
            
            <div class="post-actions">
                <button class="post-action like-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes || 0}</span>
                </button>
                <button class="post-action answer-btn" data-post-id="${post.id}">
                    <i class="fas fa-comment"></i>
                    <span>${answersCount} Answers</span>
                </button>
                <button class="post-action share-btn">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
            
            <div class="answers-section ${answersCount > 0 ? '' : ''}" id="answers-${post.id}">
                ${answersCount > 0 ? `
                    <div class="answers-header">${answersCount} Answer${answersCount > 1 ? 's' : ''}</div>
                    <div class="answers-list">
                        ${post.answers.map(answer => createAnswerItem(answer)).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createAnswerItem(answer) {
    const author = users.find(u => u.id === answer.authorId) || { 
        name: 'Unknown User', 
        avatar: null 
    };
    const initial = author.name.charAt(0).toUpperCase();
    
    return `
        <div class="answer-item">
            <div class="answer-avatar">
                ${author.avatar 
                    ? `<img src="${author.avatar}" alt="${author.name}">`
                    : `<div class="avatar-fallback">${initial}</div>`
                }
            </div>
            <div class="answer-content">
                <div class="answer-meta">
                    <span class="answer-author">${escapeHtml(author.name)}</span>
                    <span class="answer-time">${formatTime(answer.createdAt)}</span>
                </div>
                <p class="answer-text">${escapeHtml(answer.content)}</p>
            </div>
        </div>
    `;
}

function addPostEventListeners() {
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLike);
    });
    
    // Answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswerClick);
    });
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('info', 'Share', 'Link copied to clipboard!');
        });
    });
}

// ==================== LIKE HANDLER ====================
function handleLike(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.postId;
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    // Initialize liked array for post
    if (!likedPosts[postId]) {
        likedPosts[postId] = [];
    }
    
    const userIndex = likedPosts[postId].indexOf(currentUser.id);
    
    if (userIndex === -1) {
        // Like
        likedPosts[postId].push(currentUser.id);
        post.likes = (post.likes || 0) + 1;
        btn.classList.add('liked');
    } else {
        // Unlike
        likedPosts[postId].splice(userIndex, 1);
        post.likes = Math.max(0, (post.likes || 0) - 1);
        btn.classList.remove('liked');
    }
    
    // Update display
    btn.querySelector('span').textContent = post.likes;
    
    // Save
    saveData();
    localStorage.setItem('nexusq_liked', JSON.stringify(likedPosts));
}

// ==================== POST MODAL ====================
function openPostModal() {
    currentTags = [];
    currentFile = null;
    elements.postForm.reset();
    elements.tagsContainer.querySelectorAll('.tag').forEach(t => t.remove());
    elements.filePreview.innerHTML = '';
    elements.modalOverlay.classList.add('active');
}

function closePostModal() {
    elements.modalOverlay.classList.remove('active');
}

// ==================== TAG HANDLING ====================
function handleTagInput(e) {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tag = elements.tagInput.value.trim().replace(',', '');
        
        if (tag && !currentTags.includes(tag) && currentTags.length < 5) {
            currentTags.push(tag);
            renderTags();
        }
        
        elements.tagInput.value = '';
    }
}

function renderTags() {
    // Remove existing tags
    elements.tagsContainer.querySelectorAll('.tag').forEach(t => t.remove());
    
    // Add tags before input
    currentTags.forEach((tag, index) => {
        const tagEl = document.createElement('div');
        tagEl.className = 'tag';
        tagEl.innerHTML = `
            ${escapeHtml(tag)}
            <button type="button" class="tag-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        elements.tagsContainer.insertBefore(tagEl, elements.tagInput);
        
        tagEl.querySelector('.tag-remove').addEventListener('click', () => {
            currentTags.splice(index, 1);
            renderTags();
        });
    });
}

// ==================== FILE HANDLING ====================
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showToast('error', 'Error', 'File size must be less than 10MB.');
        return;
    }
    
    currentFile = {
        name: file.name,
        size: file.size,
        type: file.type
    };
    
    elements.filePreview.innerHTML = `
        <div class="file-preview-item">
            <i class="fas ${getFileIcon(file.type)}"></i>
            <div class="file-preview-info">
                <div class="file-preview-name">${escapeHtml(file.name)}</div>
                <div class="file-preview-size">${formatFileSize(file.size)}</div>
            </div>
            <button type="button" class="file-preview-remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    elements.filePreview.querySelector('.file-preview-remove').addEventListener('click', () => {
        currentFile = null;
        elements.filePreview.innerHTML = '';
        elements.fileInput.value = '';
    });
}

// ==================== POST SUBMIT ====================
async function handlePostSubmit(e) {
    e.preventDefault();
    
    const title = elements.postTitle.value.trim();
    const content = elements.postContent.value.trim();
    
    if (!title || !content) {
        showToast('error', 'Error', 'Please fill in all required fields.');
        return;
    }
    
    const newPost = {
        id: generateId(),
        authorId: currentUser.id,
        title: title,
        content: content,
        tags: [...currentTags],
        file: currentFile,
        likes: 0,
        answers: [],
        createdAt: new Date().toISOString()
    };
    
    posts.unshift(newPost);
    saveData();
    
    closePostModal();
    renderPosts();
    showToast('success', 'Question Posted!', 'Your question has been published.');
}

// ==================== ANSWER MODAL ====================
function handleAnswerClick(e) {
    const postId = e.currentTarget.dataset.postId;
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    // Toggle answers section
    const answersSection = document.getElementById(`answers-${postId}`);
    answersSection.classList.toggle('expanded');
    
    // Open answer modal
    currentAnswerPostId = postId;
    elements.questionPreview.innerHTML = `
        <div class="question-preview-title">${escapeHtml(post.title)}</div>
        <div class="question-preview-content">${escapeHtml(post.content)}</div>
    `;
    elements.answerContent.value = '';
    elements.answerModalOverlay.classList.add('active');
}

function closeAnswerModal() {
    elements.answerModalOverlay.classList.remove('active');
    currentAnswerPostId = null;
}

async function handleAnswerSubmit(e) {
    e.preventDefault();
    
    const content = elements.answerContent.value.trim();
    
    if (!content) {
        showToast('error', 'Error', 'Please write an answer.');
        return;
    }
    
    const post = posts.find(p => p.id === currentAnswerPostId);
    if (!post) return;
    
    if (!post.answers) {
        post.answers = [];
    }
    
    post.answers.push({
        id: generateId(),
        authorId: currentUser.id,
        content: content,
        createdAt: new Date().toISOString()
    });
    
    saveData();
    closeAnswerModal();
    renderPosts();
    showToast('success', 'Answer Posted!', 'Your answer has been added.');
}

// ==================== PHOTO MODAL ====================
function openPhotoModal() {
    tempPhotoData = null;
    elements.photoPreview.innerHTML = '<i class="fas fa-user"></i>';
    elements.btnSavePhoto.disabled = true;
    elements.photoInput.value = '';
    elements.photoModalOverlay.classList.add('active');
}

function closePhotoModal() {
    elements.photoModalOverlay.classList.remove('active');
    tempPhotoData = null;
}

function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showToast('error', 'Error', 'Please select an image file.');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showToast('error', 'Error', 'Image size must be less than 5MB.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        tempPhotoData = e.target.result;
        elements.photoPreview.innerHTML = `<img src="${tempPhotoData}" alt="Preview">`;
        elements.btnSavePhoto.disabled = false;
    };
    reader.readAsDataURL(file);
}

function handlePhotoSave() {
    if (!tempPhotoData) return;
    
    currentUser.avatar = tempPhotoData;
    
    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].avatar = tempPhotoData;
    }
    
    saveData();
    saveSession();
    updateUserProfile();
    closePhotoModal();
    showToast('success', 'Photo Updated!', 'Your profile photo has been changed.');
}

// ==================== ADMIN DASHBOARD ====================
function renderAdminDashboard() {
    updateAdminStats();
    renderAdminPosts();
}

function updateAdminStats() {
    elements.totalUsers.textContent = users.length;
    elements.totalPosts.textContent = posts.length;
    
    const totalAnswers = posts.reduce((sum, post) => sum + (post.answers?.length || 0), 0);
    elements.totalAnswers.textContent = totalAnswers;
    
    // Simulate active today
    elements.activeToday.textContent = Math.floor(users.length * 0.3);
}

function renderAdminPosts() {
    if (posts.length === 0) {
        elements.adminPostsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h3>No posts yet</h3>
                <p>Posts from users will appear here.</p>
            </div>
        `;
        return;
    }
    
    elements.adminPostsList.innerHTML = posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(post => createAdminPostItem(post))
        .join('');
    
    // Add delete event listeners
    document.querySelectorAll('.admin-action-btn.delete').forEach(btn => {
        btn.addEventListener('click', handleDeletePost);
    });
}

function createAdminPostItem(post) {
    const author = users.find(u => u.id === post.authorId) || { 
        name: 'Unknown', 
        avatar: null 
    };
    const initial = author.name.charAt(0).toUpperCase();
    
    return `
        <div class="admin-post-item" data-post-id="${post.id}">
            <div class="admin-post-avatar">
                ${author.avatar 
                    ? `<img src="${author.avatar}" alt="${author.name}">`
                    : `<div class="avatar-fallback">${initial}</div>`
                }
            </div>
            <div class="admin-post-info">
                <div class="admin-post-title">${escapeHtml(post.title)}</div>
                <div class="admin-post-meta">
                    <span>${escapeHtml(author.name)}</span>
                    <span>•</span>
                    <span>${formatTime(post.createdAt)}</span>
                </div>
            </div>
            <div class="admin-post-stats">
                <div class="admin-post-stat">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes || 0}</span>
                </div>
                <div class="admin-post-stat">
                    <i class="fas fa-comment"></i>
                    <span>${post.answers?.length || 0}</span>
                </div>
            </div>
            <div class="admin-post-actions">
                <button class="admin-action-btn delete" data-post-id="${post.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function handleDeletePost(e) {
    const postId = e.currentTarget.dataset.postId;
    
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== postId);
        saveData();
        renderAdminPosts();
        updateAdminStats();
        showToast('success', 'Post Deleted', 'The post has been removed.');
    }
}

// ==================== ANNOUNCEMENT HANDLER ====================
async function handleAnnouncementSubmit(e) {
    e.preventDefault();
    
    const text = elements.announcementText.value.trim();
    const important = elements.announcementImportant.checked;
    
    if (!text) {
        showToast('error', 'Error', 'Please enter announcement text.');
        return;
    }
    
    announcements.unshift({
        id: generateId(),
        text: text,
        important: important,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('nexusq_announcements', JSON.stringify(announcements));
    
    elements.announcementForm.reset();
    showToast('success', 'Announcement Posted!', 'Users will see this announcement.');
}

// ==================== UTILITY FUNCTIONS ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(type) {
    if (type.startsWith('image/')) return 'fa-file-image';
    if (type === 'application/pdf') return 'fa-file-pdf';
    if (type.includes('word')) return 'fa-file-word';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'fa-file-excel';
    return 'fa-file';
}

function saveData() {
    localStorage.setItem('nexusq_users', JSON.stringify(users));
    localStorage.setItem('nexusq_posts', JSON.stringify(posts));
}

// ==================== LOADING OVERLAY ====================
function showLoading() {
    elements.loadingOverlay.classList.add('active');
}

function hideLoading() {
    elements.loadingOverlay.classList.remove('active');
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(type, title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        removeToast(toast);
    }, 4000);
}

function removeToast(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
        toast.remove();
    }, 300);
}

// ==================== NAV TAB SWITCHING ====================
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        
        // Update active tab
        tab.parentElement.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Handle view changes
        if (view === 'feed') {
            renderPosts('all');
        } else if (view === 'my-posts') {
            renderPosts('my-posts');
        } else if (view === 'announcements') {
            showToast('info', 'Announcements', `${announcements.length} active announcements.`);
        }
    });
});

console.log('NexusQ Community Platform Initialized 🚀');
// ==================== DYNAMIC QUOTES ====================
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "ASTRO NEXA"
    },
    {
        text: "Knowledge is power. Information is liberating.",
        author: "ASTRO NEXA"
    },
    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "ASTRO NEXA"
    },
    {
        text: "Ask and it will be given to you; seek and you will find.",
        author: "ASTRO NEXA"
    },
    {
        text: "The more that you read, the more things you will know.",
        author: "ASTRO NEXA"
    },
    {
        text: "Education is not the filling of a pail, but the lighting of a fire.",
        author: "ASTRO NEXA"
    },
    {
        text: "The mind is not a vessel to be filled, but a fire to be kindled.",
        author: "ASTRO NEXA"
    },
    {
        text: "Learning never exhausts the mind.",
        author: "ASTRO NEXA"
    },
    {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "ASTRO NEXA"
    },
    {
        text: "Questions are the beginning of wisdom.",
        author: "ASTRO NEXA"
    }
];

// Initialize quote rotation
function initQuoteRotation() {
    const quoteElements = document.querySelectorAll('.auth-quote');
    
    quoteElements.forEach(quoteEl => {
        setRandomQuote(quoteEl);
        
        // Change quote every 10 seconds
        setInterval(() => {
            changeQuoteWithAnimation(quoteEl);
        }, 10000);
    });
}

function setRandomQuote(quoteEl) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const textEl = quoteEl.querySelector('.quote-text');
    const authorEl = quoteEl.querySelector('.quote-author');
    
    if (textEl && authorEl) {
        textEl.textContent = `"${randomQuote.text}"`;
        authorEl.textContent = `— ${randomQuote.author}`;
    }
}

function changeQuoteWithAnimation(quoteEl) {
    const textEl = quoteEl.querySelector('.quote-text');
    const authorEl = quoteEl.querySelector('.quote-author');
    
    // Fade out
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        setRandomQuote(quoteEl);
        
        // Fade in
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
    }, 300);
}

// Add transition to auth-quote in CSS dynamically or ensure it's in stylesheet
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...
    
    // Initialize quote rotation
    initQuoteRotation();
});