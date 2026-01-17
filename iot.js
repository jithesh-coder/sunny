// ========================================
// IoT Mastery Dashboard - Main JavaScript
// ========================================

// ========================================
// Global State & Data
// ========================================

const AppState = {
    currentSection: 'dashboard',
    theme: 'cyber-dark',
    sidebarCollapsed: false,
    streak: 0,
    completedSteps: [],
    watchedVideos: [],
    quizzesTaken: 0,
    goalsCompleted: 0,
    notes: [],
    currentNoteId: null,
    weekStartDate: null,
    goals: [],
    userSettings: {
        name: '',
        email: '',
        profilePic: null,
        animations: true,
        compactMode: false,
        dailyReminders: false,
        goalAlerts: true
    },
    quizState: {
        difficulty: 'beginner',
        questionCount: 5,
        currentQuestion: 0,
        questions: [],
        answers: [],
        startTime: null,
        timerInterval: null
    },
    activityLog: []
};

// Question Bank
const questionBank = {
    beginner: [
        {
            question: "What does IoT stand for?",
            options: ["Internet of Things", "Integration of Technology", "Internal Operating Technology", "Intelligent Online Tools"],
            correct: 0
        },
        {
            question: "Which of the following is a common IoT communication protocol?",
            options: ["HTTP", "MQTT", "FTP", "SMTP"],
            correct: 1
        },
        {
            question: "What is a sensor in IoT?",
            options: ["A device that sends commands", "A device that detects changes in the environment", "A type of cloud storage", "A networking cable"],
            correct: 1
        },
        {
            question: "Which microcontroller is commonly used in IoT projects?",
            options: ["Intel i7", "Arduino", "NVIDIA RTX", "AMD Ryzen"],
            correct: 1
        },
        {
            question: "What is the primary purpose of an actuator in IoT?",
            options: ["To collect data", "To perform physical actions", "To store information", "To transmit signals"],
            correct: 1
        },
        {
            question: "Which wireless technology is commonly used for short-range IoT communication?",
            options: ["4G LTE", "Bluetooth", "Satellite", "Dial-up"],
            correct: 1
        },
        {
            question: "What does GPIO stand for?",
            options: ["General Purpose Input/Output", "Global Protocol Internet Operation", "Graphics Processing Input/Output", "General Program Interface Option"],
            correct: 0
        },
        {
            question: "Which of the following is an example of an IoT device?",
            options: ["Desktop Computer", "Smart Thermostat", "USB Flash Drive", "DVD Player"],
            correct: 1
        },
        {
            question: "What is the main advantage of using ESP32 over Arduino?",
            options: ["Larger size", "Built-in WiFi and Bluetooth", "More expensive", "Requires more power"],
            correct: 1
        },
        {
            question: "What type of data do temperature sensors typically output?",
            options: ["Video", "Analog or Digital signals", "Audio", "Text"],
            correct: 1
        },
        {
            question: "What is a Raspberry Pi?",
            options: ["A fruit-based dessert", "A single-board computer", "A type of sensor", "A cloud platform"],
            correct: 1
        },
        {
            question: "Which layer of IoT architecture handles data storage?",
            options: ["Perception Layer", "Network Layer", "Application Layer", "Cloud Layer"],
            correct: 3
        },
        {
            question: "What is the purpose of a gateway in IoT?",
            options: ["To power devices", "To connect different networks", "To cool equipment", "To display data"],
            correct: 1
        },
        {
            question: "What does PWM stand for in electronics?",
            options: ["Power Width Modulation", "Pulse Width Modulation", "Programmed Wave Motion", "Periodic Wave Measurement"],
            correct: 1
        },
        {
            question: "Which of these is NOT a common IoT application?",
            options: ["Smart Home", "Wearable Fitness Tracker", "Typewriter", "Connected Car"],
            correct: 2
        }
    ],
    intermediate: [
        {
            question: "What is the QoS (Quality of Service) level 2 in MQTT?",
            options: ["At most once", "At least once", "Exactly once", "Best effort"],
            correct: 2
        },
        {
            question: "Which protocol is specifically designed for constrained IoT devices?",
            options: ["HTTP/2", "CoAP", "WebSocket", "gRPC"],
            correct: 1
        },
        {
            question: "What is edge computing in IoT?",
            options: ["Computing at the cloud center", "Processing data near the source", "Using multiple browsers", "A type of encryption"],
            correct: 1
        },
        {
            question: "What does LoRaWAN stand for?",
            options: ["Long Range Wide Area Network", "Local Radio Wireless Area Network", "Low Range Wireless Access Node", "Large Router WAN"],
            correct: 0
        },
        {
            question: "Which communication method uses publish/subscribe pattern?",
            options: ["REST API", "MQTT", "HTTP", "FTP"],
            correct: 1
        },
        {
            question: "What is I2C used for in IoT?",
            options: ["Internet connectivity", "Serial communication between chips", "Power management", "Display output"],
            correct: 1
        },
        {
            question: "What is the typical range of BLE (Bluetooth Low Energy)?",
            options: ["10 meters", "100 meters", "1 kilometer", "10 kilometers"],
            correct: 1
        },
        {
            question: "Which of the following is a time-series database suitable for IoT?",
            options: ["MySQL", "MongoDB", "InfluxDB", "PostgreSQL"],
            correct: 2
        },
        {
            question: "What is DTLS in IoT security?",
            options: ["Data Transfer Layer Security", "Datagram Transport Layer Security", "Digital Token Lock System", "Device Trust Level Security"],
            correct: 1
        },
        {
            question: "What is the purpose of a device shadow in AWS IoT?",
            options: ["To hide device identity", "To maintain device state when offline", "To duplicate devices", "To encrypt data"],
            correct: 1
        },
        {
            question: "Which protocol is used for device provisioning in IoT?",
            options: ["LWM2M", "HTTP", "SMTP", "DNS"],
            correct: 0
        },
        {
            question: "What is the function of a broker in MQTT?",
            options: ["Generate data", "Route messages between clients", "Store permanent data", "Power devices"],
            correct: 1
        },
        {
            question: "What is SPI used for in embedded systems?",
            options: ["Internet connection", "High-speed synchronous communication", "Audio output", "User interface"],
            correct: 1
        },
        {
            question: "Which AWS service is specifically for IoT?",
            options: ["AWS Lambda", "AWS IoT Core", "AWS S3", "AWS EC2"],
            correct: 1
        },
        {
            question: "What is OTA in IoT context?",
            options: ["Over The Air updates", "Online Tracking Application", "Optical Transfer Array", "Output Test Analyzer"],
            correct: 0
        }
    ],
    advanced: [
        {
            question: "What is TinyML?",
            options: ["A small database", "Machine Learning on microcontrollers", "A compression algorithm", "A tiny programming language"],
            correct: 1
        },
        {
            question: "Which cryptographic algorithm is commonly used for IoT device authentication?",
            options: ["MD5", "ECC (Elliptic Curve Cryptography)", "Base64", "ROT13"],
            correct: 1
        },
        {
            question: "What is RTOS in embedded systems?",
            options: ["Real-Time Operating System", "Remote Terminal Operating Service", "Rapid Transfer Operating System", "Random Task Operating System"],
            correct: 0
        },
        {
            question: "What is the purpose of Digital Twins in IoT?",
            options: ["Backup devices", "Virtual representation of physical assets", "Dual SIM support", "Copy protection"],
            correct: 1
        },
        {
            question: "Which protocol provides end-to-end encryption in IoT?",
            options: ["HTTP", "DTLS/TLS", "FTP", "Telnet"],
            correct: 1
        },
        {
            question: "What is fog computing?",
            options: ["Cloud computing in bad weather", "Distributed computing between edge and cloud", "Slow computing", "Encrypted computing"],
            correct: 1
        },
        {
            question: "What is a TPM in IoT security?",
            options: ["Trusted Platform Module", "Technical Protocol Manager", "Token Processing Machine", "Transfer Protocol Monitor"],
            correct: 0
        },
        {
            question: "Which framework is used for edge AI on NVIDIA Jetson?",
            options: ["TensorFlow Lite", "NVIDIA TensorRT", "PyTorch Mobile", "All of the above"],
            correct: 3
        },
        {
            question: "What is CBOR in IoT data serialization?",
            options: ["Compressed Binary Object Representation", "Concise Binary Object Representation", "Complex Binary Object Registry", "Centralized Binary Object Relay"],
            correct: 1
        },
        {
            question: "What is the purpose of IEEE 802.15.4?",
            options: ["WiFi", "Low-rate wireless personal area networks", "5G", "Ethernet"],
            correct: 1
        },
        {
            question: "What is secure boot in IoT devices?",
            options: ["Password protection", "Verifying firmware integrity before execution", "Encrypted storage", "Remote access"],
            correct: 1
        },
        {
            question: "Which cloud service provides serverless functions for IoT?",
            options: ["AWS Lambda", "Azure Functions", "Google Cloud Functions", "All of the above"],
            correct: 3
        },
        {
            question: "What is Zero Trust Architecture in IoT security?",
            options: ["No security", "Never trust, always verify", "Trust all devices", "Disable all connections"],
            correct: 1
        },
        {
            question: "What is Matter in smart home IoT?",
            options: ["A type of sensor", "A unified smart home protocol", "A cloud service", "A power source"],
            correct: 1
        },
        {
            question: "What is the purpose of HSM in IoT?",
            options: ["Heat Sink Management", "Hardware Security Module", "High Speed Memory", "Host System Monitor"],
            correct: 1
        }
    ]
};

// Default Weekly Goals
const defaultGoals = [
    { id: 1, title: "Complete 2 roadmap steps", category: "learning", completed: false },
    { id: 2, title: "Watch 3 tutorial videos", category: "learning", completed: false },
    { id: 3, title: "Take a quiz", category: "practice", completed: false },
    { id: 4, title: "Write study notes", category: "learning", completed: false },
    { id: 5, title: "Review MQTT protocol", category: "learning", completed: false },
    { id: 6, title: "Practice with Arduino/ESP32", category: "practice", completed: false },
    { id: 7, title: "Read IoT security article", category: "learning", completed: false },
    { id: 8, title: "Build a small IoT project", category: "project", completed: false }
];

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadFromLocalStorage();
    createParticles();
    setupEventListeners();
    updateDayStreak();
    renderDashboard();
    renderGoals();
    renderNotes();
    applyTheme(AppState.theme);
    applyUserSettings();
    hideLoadingOverlay();
    checkWeeklyReset();
    startWeekTimer();
    
    // Log activity
    logActivity('🚀', 'Welcome back to IoT Mastery Dashboard!');
}

function hideLoadingOverlay() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1000);
}

// ========================================
// Local Storage Functions
// ========================================

function loadFromLocalStorage() {
    const savedState = localStorage.getItem('iotDashboardState');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        Object.assign(AppState, parsed);
    }
    
    // Initialize goals if empty
    if (!AppState.goals || AppState.goals.length === 0) {
        AppState.goals = [...defaultGoals];
    }
    
    // Initialize week start date
    if (!AppState.weekStartDate) {
        AppState.weekStartDate = new Date().toISOString();
    }
    
    // Initialize notes
    if (!AppState.notes || AppState.notes.length === 0) {
        AppState.notes = [{
            id: Date.now(),
            title: 'Getting Started with IoT',
            content: '<p>Welcome to your IoT study notes! Use this space to document your learning journey.</p><p>Key topics to cover:</p><ul><li>IoT Architecture</li><li>Sensors and Actuators</li><li>Communication Protocols</li><li>Cloud Platforms</li></ul>',
            date: new Date().toISOString()
        }];
        AppState.currentNoteId = AppState.notes[0].id;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('iotDashboardState', JSON.stringify(AppState));
}

// ========================================
// Particle Animation
// ========================================

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        if (Math.random() > 0.5) {
            particle.style.background = 'var(--accent-purple)';
        }
        
        container.appendChild(particle);
    }
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            navigateToSection(section);
        });
    });
    
    // Sidebar Toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    
    // Profile Upload
    document.getElementById('profileUpload').addEventListener('change', handleProfileUpload);
    document.getElementById('profileUploadSettings')?.addEventListener('change', handleProfileUpload);
    
    // Video Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterVideos(btn.dataset.filter));
    });
    
    // Quiz Difficulty
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty));
    });
    
    // Mobile menu (add button dynamically for mobile)
    createMobileMenuButton();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function createMobileMenuButton() {
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
    btn.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
    document.body.appendChild(btn);
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + S to save notes
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (AppState.currentSection === 'notes') {
            autoSaveNote();
            showToast('success', 'Saved', 'Your notes have been saved.');
        }
    }
}

// ========================================
// Navigation
// ========================================

function navigateToSection(section) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
    });
    
    // Update sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === section);
    });
    
    AppState.currentSection = section;
    
    // Close mobile menu
    document.getElementById('sidebar').classList.remove('open');
    
    saveToLocalStorage();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    AppState.sidebarCollapsed = sidebar.classList.contains('collapsed');
    saveToLocalStorage();
}

// ========================================
// Day Streak Logic
// ========================================

function updateDayStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastVisit === today) {
            // Same day, no change
        } else if (lastDate.toDateString() === yesterday.toDateString()) {
            // Consecutive day
            AppState.streak++;
            logActivity('🔥', `Day streak increased to ${AppState.streak}!`);
        } else {
            // Streak broken
            AppState.streak = 1;
        }
    } else {
        AppState.streak = 1;
    }
    
    localStorage.setItem('lastVisit', today);
    
    // Update UI
    document.getElementById('streakCount').textContent = AppState.streak;
    document.getElementById('dashStreak').textContent = AppState.streak;
    
    saveToLocalStorage();
}

// ========================================
// Dashboard Functions
// ========================================

function renderDashboard() {
    updateProgressCircle();
    updateStats();
    renderQuickGoals();
    renderActivityFeed();
}

function updateProgressCircle() {
    const totalSteps = 12;
    const completed = AppState.completedSteps.length;
    const percentage = Math.round((completed / totalSteps) * 100);
    
    // Update progress circle
    const circle = document.getElementById('progressCircle');
    if (circle) {
        const circumference = 339.292;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = `url(#progressGradient)`;
        
        // Add gradient definition if not exists
        if (!document.getElementById('progressGradient')) {
            const svg = circle.closest('svg');
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = `
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--accent-cyan)"/>
                    <stop offset="100%" style="stop-color:var(--accent-purple)"/>
                </linearGradient>
            `;
                        svg.insertBefore(defs, svg.firstChild);
        }
    }
    
    // Update text values
    document.getElementById('progressValue').textContent = percentage;
    document.getElementById('completedSteps').textContent = `${completed}/${totalSteps}`;
    
    // Update level based on progress
    let level = 'Beginner';
    if (percentage >= 75) level = 'Advanced';
    else if (percentage >= 40) level = 'Intermediate';
    document.getElementById('currentLevel').textContent = level;
}

function updateStats() {
    document.getElementById('dashStreak').textContent = AppState.streak;
    document.getElementById('quizzesTaken').textContent = AppState.quizzesTaken;
    document.getElementById('videosWatched').textContent = AppState.watchedVideos.length;
    document.getElementById('goalsCompleted').textContent = AppState.goals.filter(g => g.completed).length;
}

function renderQuickGoals() {
    const container = document.getElementById('quickGoals');
    if (!container) return;
    
    const displayGoals = AppState.goals.slice(0, 4);
    
    container.innerHTML = displayGoals.map(goal => `
        <div class="quick-goal ${goal.completed ? 'completed' : ''}" onclick="toggleGoal(${goal.id})">
            <div class="goal-checkbox">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <span class="goal-text">${goal.title}</span>
        </div>
    `).join('');
}

function renderActivityFeed() {
    const container = document.getElementById('activityFeed');
    if (!container) return;
    
    const activities = AppState.activityLog.slice(-5).reverse();
    
    if (activities.length === 0) {
        container.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon">🚀</div>
                <div class="activity-content">
                    <span class="activity-text">Welcome to IoT Mastery Dashboard!</span>
                    <span class="activity-time">Just now</span>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <span class="activity-text">${activity.text}</span>
                <span class="activity-time">${formatTimeAgo(activity.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

function logActivity(icon, text) {
    AppState.activityLog.push({
        icon,
        text,
        timestamp: Date.now()
    });
    
    // Keep only last 20 activities
    if (AppState.activityLog.length > 20) {
        AppState.activityLog = AppState.activityLog.slice(-20);
    }
    
    saveToLocalStorage();
    renderActivityFeed();
}

function formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

// ========================================
// Roadmap Functions
// ========================================

function toggleStep(stepNumber) {
    const stepElement = document.querySelector(`.roadmap-step[data-step="${stepNumber}"]`);
    
    if (AppState.completedSteps.includes(stepNumber)) {
        // Uncomplete
        AppState.completedSteps = AppState.completedSteps.filter(s => s !== stepNumber);
        stepElement.classList.remove('completed');
        stepElement.querySelector('.step-btn').textContent = 'Mark Complete';
        logActivity('📖', `Unmarked step ${stepNumber} as incomplete`);
    } else {
        // Complete
        AppState.completedSteps.push(stepNumber);
        stepElement.classList.add('completed');
        stepElement.querySelector('.step-btn').textContent = 'Completed ✓';
        logActivity('✅', `Completed roadmap step: ${stepElement.querySelector('h3').textContent}`);
        showToast('success', 'Step Completed!', 'Great progress on your IoT journey!');
    }
    
    updateProgressCircle();
    updateStats();
    saveToLocalStorage();
}

// Initialize roadmap steps on page load
function initializeRoadmap() {
    AppState.completedSteps.forEach(stepNumber => {
        const stepElement = document.querySelector(`.roadmap-step[data-step="${stepNumber}"]`);
        if (stepElement) {
            stepElement.classList.add('completed');
            stepElement.querySelector('.step-btn').textContent = 'Completed ✓';
        }
    });
}

// ========================================
// Video Functions
// ========================================

function filterVideos(filter) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Filter video cards
    document.querySelectorAll('.video-card').forEach(card => {
        if (filter === 'all') {
            card.classList.remove('hidden');
        } else {
            card.classList.toggle('hidden', card.dataset.level !== filter);
        }
    });
}

function playVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    // Check if it's a playlist or single video
    let embedUrl;
    if (videoId.startsWith('PL')) {
        embedUrl = `https://www.youtube.com/embed/videoseries?list=${videoId}&autoplay=1`;
    } else {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    
    player.src = embedUrl;
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    player.src = '';
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function markVideoWatched(button) {
    const card = button.closest('.video-card');
    const videoTitle = card.querySelector('h3').textContent;
    
    if (button.classList.contains('watched')) {
        button.classList.remove('watched');
        button.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Mark Watched
        `;
        AppState.watchedVideos = AppState.watchedVideos.filter(v => v !== videoTitle);
    } else {
        button.classList.add('watched');
        button.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Watched ✓
        `;
        if (!AppState.watchedVideos.includes(videoTitle)) {
            AppState.watchedVideos.push(videoTitle);
        }
        logActivity('🎬', `Watched: ${videoTitle}`);
        showToast('success', 'Video Marked', 'Keep up the great learning!');
    }
    
    updateStats();
    saveToLocalStorage();
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
        closeAddGoalModal();
    }
});

// ========================================
// Quiz Functions
// ========================================

function selectDifficulty(difficulty) {
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    AppState.quizState.difficulty = difficulty;
}

function adjustQuestionCount(delta) {
    let count = AppState.quizState.questionCount + delta;
    count = Math.max(3, Math.min(15, count));
    AppState.quizState.questionCount = count;
    document.getElementById('questionCount').textContent = count;
    document.getElementById('countSlider').value = count;
}

function updateQuestionCount(value) {
    AppState.quizState.questionCount = parseInt(value);
    document.getElementById('questionCount').textContent = value;
}

function startQuiz() {
    const { difficulty, questionCount } = AppState.quizState;
    
    // Get questions for selected difficulty
    const availableQuestions = [...questionBank[difficulty]];
    
    // Shuffle and select questions
    const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
    AppState.quizState.questions = shuffled.slice(0, questionCount);
    AppState.quizState.answers = new Array(questionCount).fill(null);
    AppState.quizState.currentQuestion = 0;
    AppState.quizState.startTime = Date.now();
    
    // Update UI
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    document.getElementById('totalQuestions').textContent = questionCount;
    
    // Start timer
    startQuizTimer();
    
    // Render first question
    renderQuestion();
    
    logActivity('📝', `Started ${difficulty} quiz with ${questionCount} questions`);
}

function startQuizTimer() {
    const timerElement = document.getElementById('quizTimer');
    
    AppState.quizState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - AppState.quizState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function stopQuizTimer() {
    if (AppState.quizState.timerInterval) {
        clearInterval(AppState.quizState.timerInterval);
        AppState.quizState.timerInterval = null;
    }
}

function renderQuestion() {
    const { questions, currentQuestion, answers } = AppState.quizState;
    const question = questions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('quizProgressFill').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    // Render question
    document.getElementById('questionText').textContent = question.question;
    
    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    const letters = ['A', 'B', 'C', 'D'];
    
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="option-btn ${answers[currentQuestion] === index ? 'selected' : ''}" 
                onclick="selectAnswer(${index})">
            <span class="option-letter">${letters[index]}</span>
            <span class="option-text">${option}</span>
        </button>
    `).join('');
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    
    const isLastQuestion = currentQuestion === questions.length - 1;
    document.getElementById('nextBtn').style.display = isLastQuestion ? 'none' : 'flex';
    document.getElementById('submitBtn').style.display = isLastQuestion ? 'flex' : 'none';
}

function selectAnswer(answerIndex) {
    AppState.quizState.answers[AppState.quizState.currentQuestion] = answerIndex;
    
    // Update UI
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.classList.toggle('selected', index === answerIndex);
    });
}

function prevQuestion() {
    if (AppState.quizState.currentQuestion > 0) {
        AppState.quizState.currentQuestion--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (AppState.quizState.currentQuestion < AppState.quizState.questions.length - 1) {
        AppState.quizState.currentQuestion++;
        renderQuestion();
    }
}

function submitQuiz() {
    stopQuizTimer();
    
    const { questions, answers, startTime } = AppState.quizState;
    
    // Calculate results
    let correct = 0;
    questions.forEach((q, index) => {
        if (answers[index] === q.correct) correct++;
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    // Update stats
    AppState.quizzesTaken++;
    
    // Show results
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    // Animate score circle
    setTimeout(() => {
        const scoreCircle = document.getElementById('scoreCircle');
        const circumference = 339.292;
        const offset = circumference - (percentage / 100) * circumference;
        scoreCircle.style.strokeDashoffset = offset;
        
        // Change color based on score
        if (percentage >= 80) {
            scoreCircle.style.stroke = 'var(--accent-green)';
        } else if (percentage >= 50) {
            scoreCircle.style.stroke = 'var(--accent-orange)';
        } else {
            scoreCircle.style.stroke = 'var(--accent-red)';
        }
    }, 100);
    
    // Update result values
    document.getElementById('scoreValue').textContent = percentage;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = questions.length - correct;
    document.getElementById('timeTaken').textContent = `${minutes}:${seconds}`;
    
    // Update message
    let message = 'Keep practicing!';
    if (percentage >= 90) message = 'Outstanding! 🏆';
    else if (percentage >= 80) message = 'Excellent work! 🌟';
    else if (percentage >= 70) message = 'Great job! 👏';
    else if (percentage >= 50) message = 'Good effort! 💪';
    document.getElementById('resultMessage').textContent = message;
    
    logActivity('🎯', `Completed quiz with ${percentage}% score`);
    showToast(percentage >= 70 ? 'success' : 'info', 'Quiz Complete!', `You scored ${percentage}%`);
    
    updateStats();
    saveToLocalStorage();
}

function reviewQuiz() {
    const { questions, answers } = AppState.quizState;
    
    // Show quiz active section with review mode
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    
    // Render first question with answers shown
    AppState.quizState.currentQuestion = 0;
    renderQuestionReview();
}

function renderQuestionReview() {
    const { questions, currentQuestion, answers } = AppState.quizState;
    const question = questions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('quizProgressFill').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    // Render question
    document.getElementById('questionText').textContent = question.question;
    
    // Render options with correct/incorrect styling
    const optionsContainer = document.getElementById('optionsContainer');
    const letters = ['A', 'B', 'C', 'D'];
    
    optionsContainer.innerHTML = question.options.map((option, index) => {
        let classes = 'option-btn';
        if (index === question.correct) {
            classes += ' correct';
        } else if (answers[currentQuestion] === index) {
            classes += ' incorrect';
        }
        
        return `
            <button class="${classes}" disabled>
                <span class="option-letter">${letters[index]}</span>
                <span class="option-text">${option}</span>
            </button>
        `;
    }).join('');
    
    // Update navigation
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('prevBtn').onclick = () => {
        AppState.quizState.currentQuestion--;
        renderQuestionReview();
    };
    
    const isLastQuestion = currentQuestion === questions.length - 1;
    document.getElementById('nextBtn').style.display = isLastQuestion ? 'none' : 'flex';
    document.getElementById('nextBtn').onclick = () => {
        AppState.quizState.currentQuestion++;
        renderQuestionReview();
    };
    
    document.getElementById('submitBtn').style.display = isLastQuestion ? 'flex' : 'none';
    document.getElementById('submitBtn').textContent = 'Finish Review';
    document.getElementById('submitBtn').onclick = retryQuiz;
}

function retryQuiz() {
    // Reset quiz state
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizSetup').style.display = 'flex';
    
    // Reset submit button
    document.getElementById('submitBtn').innerHTML = `
        Submit Quiz
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    `;
    document.getElementById('submitBtn').onclick = submitQuiz;
    
    // Reset navigation handlers
    document.getElementById('prevBtn').onclick = prevQuestion;
    document.getElementById('nextBtn').onclick = nextQuestion;
}

// ========================================
// Weekly Goals Functions
// ========================================

function checkWeeklyReset() {
    const weekStart = new Date(AppState.weekStartDate);
    const now = new Date();
    const daysDiff = Math.floor((now - weekStart) / (1000 * 60 * 60 * 24));
    
    if (daysDiff >= 7) {
        // Reset goals
        AppState.goals = AppState.goals.map(g => ({ ...g, completed: false }));
        AppState.weekStartDate = now.toISOString();
        showToast('info', 'New Week!', 'Your weekly goals have been reset.');
        logActivity('🗓️', 'Weekly goals reset for the new week');
        saveToLocalStorage();
    }
}

function startWeekTimer() {
    updateWeekTimer();
    setInterval(updateWeekTimer, 60000); // Update every minute
}

function updateWeekTimer() {
    const weekStart = new Date(AppState.weekStartDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    const now = new Date();
    const remaining = weekEnd - now;
    
    if (remaining <= 0) {
        checkWeeklyReset();
        return;
    }
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    const timerText = `Resets in: ${days}d ${hours}h ${minutes}m`;
    
    document.getElementById('weekTimer').textContent = timerText;
    document.getElementById('weekReset').textContent = timerText;
    
    // Calculate week number
    const weekNumber = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1;
    document.getElementById('weekNumber').textContent = `Week ${weekNumber}`;
}

function renderGoals() {
    const container = document.getElementById('goalsList');
    if (!container) return;
    
    const categoryIcons = {
        learning: '📚',
        practice: '💻',
        project: '🚀',
        other: '✨'
    };
    
    container.innerHTML = AppState.goals.map(goal => `
        <div class="goal-item ${goal.completed ? 'completed' : ''}" onclick="toggleGoal(${goal.id})">
            <div class="goal-checkbox-lg">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <div class="goal-content">
                <span class="goal-title">${goal.title}</span>
                <span class="goal-category">${categoryIcons[goal.category] || '✨'} ${goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}</span>
            </div>
            <button class="goal-delete" onclick="event.stopPropagation(); deleteGoal(${goal.id})">
                <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
        </div>
    `).join('');
    
    updateGoalsProgress();
    renderQuickGoals();
}

function toggleGoal(goalId) {
    const goal = AppState.goals.find(g => g.id === goalId);
    if (goal) {
        goal.completed = !goal.completed;
        
        if (goal.completed) {
            logActivity('✅', `Completed goal: ${goal.title}`);
            showToast('success', 'Goal Completed!', goal.title);
        }
        
        renderGoals();
        updateStats();
        saveToLocalStorage();
    }
}

function deleteGoal(goalId) {
    AppState.goals = AppState.goals.filter(g => g.id !== goalId);
    renderGoals();
    saveToLocalStorage();
    showToast('info', 'Goal Removed', 'The goal has been deleted.');
}

function updateGoalsProgress() {
    const total = AppState.goals.length;
    const completed = AppState.goals.filter(g => g.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Update circle
    const circle = document.getElementById('goalsCircle');
    if (circle) {
        const circumference = 339.292;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    // Update text
    document.getElementById('goalsProgress').textContent = percentage;
    document.getElementById('completedGoalsCount').textContent = completed;
    document.getElementById('totalGoalsCount').textContent = total;
}

function openAddGoalModal() {
    document.getElementById('addGoalModal').classList.add('active');
    document.getElementById('goalTitle').focus();
}

function closeAddGoalModal() {
    document.getElementById('addGoalModal').classList.remove('active');
    document.getElementById('goalTitle').value = '';
    document.getElementById('goalCategory').value = 'learning';
}

function saveCustomGoal() {
    const title = document.getElementById('goalTitle').value.trim();
    const category = document.getElementById('goalCategory').value;
    
    if (!title) {
        showToast('error', 'Error', 'Please enter a goal title.');
        return;
    }
    
    const newGoal = {
        id: Date.now(),
        title,
        category,
        completed: false
    };
    
    AppState.goals.push(newGoal);
    closeAddGoalModal();
    renderGoals();
    saveToLocalStorage();
    
    logActivity('➕', `Added new goal: ${title}`);
    showToast('success', 'Goal Added', 'Your new goal has been added.');
}

function resetGoals() {
    if (confirm('Are you sure you want to reset all goals? This will restore the default goals.')) {
        AppState.goals = [...defaultGoals];
        renderGoals();
        saveToLocalStorage();
        showToast('info', 'Goals Reset', 'All goals have been reset to defaults.');
    }
}

// ========================================
// Notes Functions
// ========================================

function renderNotes() {
    renderNotesList();
    loadCurrentNote();
}

function renderNotesList() {
    const container = document.getElementById('savedNotesList');
    if (!container) return;
    
    container.innerHTML = AppState.notes.map(note => `
        <div class="note-item ${note.id === AppState.currentNoteId ? 'active' : ''}" 
             onclick="loadNote(${note.id})">
            <span class="note-item-title">${note.title || 'Untitled Note'}</span>
            <span class="note-item-date">${formatDate(note.date)}</span>
        </div>
    `).join('');
}

function loadNote(noteId) {
    AppState.currentNoteId = noteId;
    loadCurrentNote();
    renderNotesList();
    saveToLocalStorage();
}

function loadCurrentNote() {
    const note = AppState.notes.find(n => n.id === AppState.currentNoteId);
    if (!note) return;
    
    document.getElementById('noteTitle').value = note.title || '';
    document.getElementById('notesEditor').innerHTML = note.content || '<p>Start taking notes here...</p>';
    document.getElementById('lastSaved').textContent = `Saved: ${formatDate(note.date)}`;
    updateWordCount();
}

function createNewNote() {
    const newNote = {
        id: Date.now(),
        title: '',
        content: '<p>Start taking notes here...</p>',
        date: new Date().toISOString()
    };
    
    AppState.notes.unshift(newNote);
    AppState.currentNoteId = newNote.id;
    
    renderNotes();
    saveToLocalStorage();
    
    document.getElementById('noteTitle').focus();
    showToast('success', 'New Note', 'A new note has been created.');
}

let autoSaveTimeout;
function autoSaveNote() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        const note = AppState.notes.find(n => n.id === AppState.currentNoteId);
        if (!note) return;
        
        note.title = document.getElementById('noteTitle').value;
        note.content = document.getElementById('notesEditor').innerHTML;
        note.date = new Date().toISOString();
        
        document.getElementById('lastSaved').textContent = `Saved: ${formatDate(note.date)}`;
        updateWordCount();
        renderNotesList();
        saveToLocalStorage();
    }, 1000);
}

function updateWordCount() {
    const editor = document.getElementById('notesEditor');
    const text = editor.innerText || editor.textContent;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    document.getElementById('wordCount').textContent = `${words} words`;
}

function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('notesEditor').focus();
}

function insertCodeBlock() {
    const selection = window.getSelection();
    const text = selection.toString() || 'code here';
    document.execCommand('insertHTML', false, `<pre><code>${text}</code></pre>`);
}

function clearNotes() {
    if (confirm('Are you sure you want to clear the current note?')) {
        document.getElementById('notesEditor').innerHTML = '<p>Start taking notes here...</p>';
        autoSaveNote();
    }
}

function exportNotes() {
    const note = AppState.notes.find(n => n.id === AppState.currentNoteId);
    if (!note) return;
    
    const title = note.title || 'IoT Notes';
    const content = document.getElementById('notesEditor').innerHTML;
    
    // Create printable HTML
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    max-width: 800px;
                    margin: 40px auto;
                    padding: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                h1 {
                    color: #0891b2;
                    border-bottom: 2px solid #0891b2;
                    padding-bottom: 10px;
                }
                pre {
                    background: #f4f4f4;
                    padding: 15px;
                    border-radius: 8px;
                    overflow-x: auto;
                }
                code {
                    background: #f4f4f4;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                .meta {
                    color: #666;
                    font-size: 0.9em;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p class="meta">Exported from IoT Mastery Dashboard on ${new Date().toLocaleDateString()}</p>
            ${content}
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Exported!', 'Your notes have been exported.');
    logActivity('📥', `Exported notes: ${title}`);
}

function printNotes() {
    const note = AppState.notes.find(n => n.id === AppState.currentNoteId);
    if (!note) return;
    
    const title = note.title || 'IoT Notes';
    const content = document.getElementById('notesEditor').innerHTML;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    max-width: 800px;
                    margin: 40px auto;
                    padding: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                h1 {
                    color: #0891b2;
                    border-bottom: 2px solid #0891b2;
                    padding-bottom: 10px;
                }
                pre {
                    background: #f4f4f4;
                    padding: 15px;
                    border-radius: 8px;
                }
                code {
                    background: #f4f4f4;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${content}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ========================================
// Settings Functions
// ========================================

function handleProfileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;
        AppState.userSettings.profilePic = imageData;
        updateProfilePictures(imageData);
        saveToLocalStorage();
        showToast('success', 'Profile Updated', 'Your profile picture has been updated.');
    };
    reader.readAsDataURL(file);
}

function updateProfilePictures(imageData) {
    // Sidebar profile
    const sidebarPic = document.getElementById('profilePic');
    const sidebarPlaceholder = document.getElementById('profilePlaceholder');
    
    if (imageData) {
        sidebarPic.src = imageData;
        sidebarPic.classList.add('active');
        sidebarPlaceholder.classList.add('hidden');
    } else {
        sidebarPic.classList.remove('active');
        sidebarPlaceholder.classList.remove('hidden');
    }
    
    // Settings profile
    const settingsPic = document.getElementById('profileImgLarge');
    const settingsPlaceholder = document.getElementById('profilePlaceholderLarge');
    
    if (settingsPic && settingsPlaceholder) {
        if (imageData) {
            settingsPic.src = imageData;
            settingsPic.classList.add('active');
            settingsPlaceholder.classList.add('hidden');
        } else {
            settingsPic.classList.remove('active');
            settingsPlaceholder.classList.remove('hidden');
        }
    }
}

function removeProfilePic() {
    AppState.userSettings.profilePic = null;
    updateProfilePictures(null);
    saveToLocalStorage();
    showToast('info', 'Profile Removed', 'Your profile picture has been removed.');
}

function setTheme(theme) {
    AppState.theme = theme;
    applyTheme(theme);
    saveToLocalStorage();
    
    // Update theme buttons
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function applyTheme(theme) {
    document.body.className = theme;
    
    // Update theme option buttons if they exist
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function toggleAnimations() {
    const enabled = document.getElementById('animationToggle').checked;
    AppState.userSettings.animations = enabled;
    
    if (enabled) {
        document.body.classList.remove('no-animations');
    } else {
        document.body.classList.add('no-animations');
    }
    
    saveToLocalStorage();
}

function toggleCompactMode() {
    const enabled = document.getElementById('compactToggle').checked;
    AppState.userSettings.compactMode = enabled;
    
    if (enabled) {
        document.body.classList.add('compact');
    } else {
        document.body.classList.remove('compact');
    }
    
    saveToLocalStorage();
}

function saveUserSettings() {
    AppState.userSettings.name = document.getElementById('userName')?.value || '';
    AppState.userSettings.email = document.getElementById('userEmail')?.value || '';
    AppState.userSettings.dailyReminders = document.getElementById('reminderToggle')?.checked || false;
    AppState.userSettings.goalAlerts = document.getElementById('goalAlertToggle')?.checked || true;
    
    saveToLocalStorage();
}

function applyUserSettings() {
    const { profilePic, name, email, animations, compactMode, dailyReminders, goalAlerts } = AppState.userSettings;
    
    // Profile picture
    if (profilePic) {
        updateProfilePictures(profilePic);
    }
    
    // Form fields
    if (document.getElementById('userName')) {
        document.getElementById('userName').value = name || '';
    }
    if (document.getElementById('userEmail')) {
        document.getElementById('userEmail').value = email || '';
    }
    
    // Toggles
    if (document.getElementById('animationToggle')) {
        document.getElementById('animationToggle').checked = animations !== false;
        if (!animations) document.body.classList.add('no-animations');
    }
    if (document.getElementById('compactToggle')) {
        document.getElementById('compactToggle').checked = compactMode || false;
        if (compactMode) document.body.classList.add('compact');
    }
    if (document.getElementById('reminderToggle')) {
        document.getElementById('reminderToggle').checked = dailyReminders || false;
    }
    if (document.getElementById('goalAlertToggle')) {
        document.getElementById('goalAlertToggle').checked = goalAlerts !== false;
    }
    
    // Initialize roadmap
    initializeRoadmap();
    
    // Initialize watched videos
    document.querySelectorAll('.video-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        if (AppState.watchedVideos.includes(title)) {
            const btn = card.querySelector('.watch-btn');
            btn.classList.add('watched');
            btn.innerHTML = `
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Watched ✓
            `;
        }
    });
}

function exportAllData() {
    const data = {
        ...AppState,
        exportDate: new Date().toISOString(),
        version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iot-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Data Exported', 'Your data has been exported successfully.');
    logActivity('💾', 'Exported all dashboard data');
}

function confirmReset() {
    if (confirm('⚠️ WARNING: This will delete all your progress, notes, and settings. This action cannot be undone. Are you sure?')) {
        if (confirm('This is your last chance to cancel. Proceed with reset?')) {
            localStorage.removeItem('iotDashboardState');
            localStorage.removeItem('lastVisit');
            location.reload();
        }
    }
}

// ========================================
// Toast Notifications
// ========================================

function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        success: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
        error: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
        info: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
        warning: '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Additional initialization if needed
    console.log('IoT Mastery Dashboard initialized successfully! 🚀');
});