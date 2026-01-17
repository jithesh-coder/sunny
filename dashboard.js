// ============================================
// DASHBOARD.JS - COMPLETE WORKING VERSION
// ============================================

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
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
let app = null;
let auth = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentUser = null;
let userStats = {
  streak: 0,
  totalHours: 0,
  hoursThisWeek: 0,
  modulesCompleted: 0,
  tasksCompleted: 0,
  badgesEarned: 0,
  xpEarned: 0,
  level: 1,
  lastLoginDate: null,
  weekStartDate: null,
  dailyHours: {},
  activeRoadmaps: 0
};

// ============================================
// AVAILABLE ROADMAPS DATA
// ============================================

const availableRoadmaps = [
  {
    id: "cse",
    title: "Computer Science Engineering",
    description: "Complete CSE curriculum with programming, algorithms, and system design",
    icon: "fa-laptop-code",
    category: "engineering",
    tags: ["DSA", "OS", "DBMS", "Networks"],
    modules: 12,
    duration: "6-12 months",
    level: "Intermediate",
    page: "cse.html",
    color: "frontend",
    skills: ["Programming", "Problem Solving", "System Design", "Database"]
  },
  {
    id: "iot",
    title: "Internet of Things",
    description: "Learn IoT fundamentals, sensors, embedded systems and cloud integration",
    icon: "fa-microchip",
    category: "engineering",
    tags: ["Sensors", "Arduino", "Raspberry Pi", "Cloud"],
    modules: 8,
    duration: "4-6 months",
    level: "Intermediate",
    page: "iot.html",
    color: "backend",
    skills: ["Embedded Systems", "Sensors", "Cloud Computing"]
  },
  {
    id: "ds",
    title: "Data Science",
    description: "Master data analysis, machine learning, and statistical modeling",
    icon: "fa-chart-bar",
    category: "data",
    tags: ["Python", "ML", "Statistics", "Visualization"],
    modules: 10,
    duration: "5-8 months",
    level: "Intermediate",
    page: "ds.html",
    color: "data",
    skills: ["Python", "Statistics", "Machine Learning"]
  },
  {
    id: "me",
    title: "Mechanical Engineering",
    description: "Core mechanical engineering concepts and applications",
    icon: "fa-cogs",
    category: "engineering",
    tags: ["Thermodynamics", "Mechanics", "CAD", "Manufacturing"],
    modules: 10,
    duration: "6-10 months",
    level: "Intermediate",
    page: "me.html",
    color: "backend",
    skills: ["CAD", "Thermodynamics", "Mechanics"]
  },
  {
    id: "ise",
    title: "Information Science Engineering",
    description: "Information systems, software engineering, and IT fundamentals",
    icon: "fa-network-wired",
    category: "engineering",
    tags: ["Software", "Database", "Networks", "Security"],
    modules: 10,
    duration: "6-10 months",
    level: "Intermediate",
    page: "ise.html",
    color: "frontend",
    skills: ["Software Development", "Database", "Security"]
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Deep dive into artificial intelligence and machine learning algorithms",
    icon: "fa-brain",
    category: "ai",
    tags: ["Neural Networks", "Deep Learning", "NLP", "Computer Vision"],
    modules: 12,
    duration: "6-10 months",
    level: "Advanced",
    page: "aiml.html",
    color: "data",
    skills: ["Python", "TensorFlow", "Deep Learning"]
  },
  {
    id: "webdev",
    title: "Web Development",
    description: "Full-stack web development from HTML to React and Node.js",
    icon: "fa-code",
    category: "web",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    modules: 8,
    duration: "3-6 months",
    level: "Beginner",
    page: "webdev.html",
    color: "frontend",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Complete Python programming from basics to advanced applications",
    icon: "fa-python",
    category: "programming",
    tags: ["Basics", "OOP", "Libraries", "Projects"],
    modules: 6,
    duration: "2-4 months",
    level: "Beginner",
    page: "python.html",
    color: "data",
    skills: ["Python", "OOP", "Libraries"]
  },
  {
    id: "c",
    title: "C Programming",
    description: "Fundamentals of C programming and system-level development",
    icon: "fa-copyright",
    category: "programming",
    tags: ["Basics", "Pointers", "Memory", "Data Structures"],
    modules: 5,
    duration: "2-3 months",
    level: "Beginner",
    page: "c.html",
    color: "backend",
    skills: ["C", "Pointers", "Memory Management"]
  },
  {
    id: "java",
    title: "Java Programming",
    description: "Object-oriented programming with Java and enterprise development",
    icon: "fa-java",
    category: "programming",
    tags: ["OOP", "Spring", "JDBC", "Android"],
    modules: 8,
    duration: "3-5 months",
    level: "Beginner",
    page: "java.html",
    color: "frontend",
    skills: ["Java", "OOP", "Spring"]
  },
  {
    id: "communication",
    title: "Communication Skills",
    description: "Professional communication, presentation, and soft skills",
    icon: "fa-comments",
    category: "softskills",
    tags: ["Speaking", "Writing", "Presentation", "Networking"],
    modules: 6,
    duration: "1-2 months",
    level: "Beginner",
    page: "communication.html",
    color: "mobile",
    skills: ["Public Speaking", "Writing", "Presentation"]
  },
  {
    id: "resume",
    title: "Resume Building",
    description: "Create professional resumes and prepare for job applications",
    icon: "fa-file-alt",
    category: "career",
    tags: ["Resume", "Portfolio", "LinkedIn", "Interview"],
    modules: 4,
    duration: "2-4 weeks",
    level: "Beginner",
    page: "resume.html",
    color: "mobile",
    skills: ["Resume Writing", "Portfolio", "Interview"]
  },
  {
    id: "ece",
    title: "Electronics & Communication",
    description: "Electronic circuits, signals, and communication systems",
    icon: "fa-broadcast-tower",
    category: "engineering",
    tags: ["Circuits", "Signals", "Digital", "Communication"],
    modules: 10,
    duration: "6-10 months",
    level: "Intermediate",
    page: "ece.html",
    color: "backend",
    skills: ["Circuits", "Signals", "Digital Electronics"]
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function safeGetElement(id) {
  return document.getElementById(id);
}

function safeQuerySelector(selector) {
  return document.querySelector(selector);
}

function safeQuerySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

function getFromStorage(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error("Storage read error:", e);
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(type, title, message) {
  console.log("Toast:", type, title, message);
  
  const toast = safeGetElement("toast");
  if (!toast) return;

  const icon = toast.querySelector(".toast-icon i");
  const titleEl = toast.querySelector(".toast-title");
  const messageEl = toast.querySelector(".toast-message");

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  toast.className = "toast " + type + " visible";

  if (icon) {
    if (type === "success") icon.className = "fas fa-check-circle";
    else if (type === "error") icon.className = "fas fa-exclamation-circle";
    else if (type === "warning") icon.className = "fas fa-exclamation-triangle";
    else icon.className = "fas fa-info-circle";
  }

  setTimeout(function() {
    toast.classList.remove("visible");
  }, 4000);
}

window.showToast = showToast;

// ============================================
// CELEBRATION MODAL
// ============================================

function showCelebration(message) {
  console.log("Celebration:", message);
  
  const modal = safeGetElement("celebrationModal");
  const messageEl = safeGetElement("celebrationMessage");

  if (modal && messageEl) {
    messageEl.textContent = message;
    modal.classList.add("visible");

    // Create confetti
    const confetti = safeGetElement("confetti");
    if (confetti) {
      confetti.innerHTML = "";
      const colors = ["#4cc9f0", "#a855f7", "#f72585", "#22c55e", "#fbbf24"];
      for (let i = 0; i < 50; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.cssText = "position: absolute; width: 10px; height: 10px; left: " + (Math.random() * 100) + "%; background: " + colors[Math.floor(Math.random() * colors.length)] + "; animation: confettiFall " + (2 + Math.random() * 2) + "s ease-out forwards; animation-delay: " + (Math.random() * 0.5) + "s;";
        confetti.appendChild(piece);
      }
    }
  }
}

function closeCelebration() {
  const modal = safeGetElement("celebrationModal");
  if (modal) modal.classList.remove("visible");
}

window.showCelebration = showCelebration;
window.closeCelebration = closeCelebration;

// ============================================
// PAGE LOADER
// ============================================

function hidePageLoader() {
  const loader = safeGetElement("pageLoader");
  if (loader) {
    loader.classList.add("hidden");
  }
}

function showPageLoader() {
  const loader = safeGetElement("pageLoader");
  if (loader) {
    loader.classList.remove("hidden");
  }
}

// ============================================
// STATS MANAGEMENT
// ============================================

function loadUserStats() {
  const saved = getFromStorage("userStats", null);
  if (saved) {
    userStats = Object.assign({}, userStats, saved);
  }
  console.log("📊 Stats loaded:", userStats);
}

function saveUserStats() {
  saveToStorage("userStats", userStats);
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now);
  monday.setDate(diff);
  return monday.toISOString().split("T")[0];
}

function checkDailyStreak() {
  const today = new Date().toISOString().split("T")[0];
  const lastLogin = userStats.lastLoginDate;

  console.log("🔥 Checking streak - Today:", today, "Last:", lastLogin);

  if (!lastLogin) {
    userStats.streak = 1;
    userStats.lastLoginDate = today;
  } else if (lastLogin === today) {
    // Already logged in today
  } else {
    const lastDate = new Date(lastLogin);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      userStats.streak = (userStats.streak || 0) + 1;
      showToast("success", "🔥 Streak!", userStats.streak + " day streak!");
      
      // Streak badges
      if (userStats.streak === 7) {
        awardBadge("week-warrior", "Week Warrior", "7-day learning streak");
      } else if (userStats.streak === 30) {
        awardBadge("month-master", "Month Master", "30-day learning streak");
      }
    } else if (diffDays > 1) {
      if (userStats.streak > 1) {
        showToast("warning", "Streak Reset", "Your streak has been reset. Start fresh!");
      }
      userStats.streak = 1;
    }

    userStats.lastLoginDate = today;
  }

  saveUserStats();
  updateStreakDisplay();
}

function checkWeeklyReset() {
  const currentWeekStart = getWeekStart();

  if (userStats.weekStartDate !== currentWeekStart) {
    console.log("🔄 New week - resetting weekly stats");
    userStats.hoursThisWeek = 0;
    userStats.weekStartDate = currentWeekStart;
    generateWeeklyGoals();
    saveUserStats();
  }
}

function updateAllStatsDisplays() {
  updateStreakDisplay();
  updateTimeDisplays();
  updateModulesDisplay();
  updateTasksDisplay();
  updateBadgesDisplay();
  updateActiveRoadmapsDisplay();
}

function updateStreakDisplay() {
  const streakCount = safeGetElement("streakCount");
  const currentStreak = safeGetElement("currentStreak");

  if (streakCount) streakCount.textContent = userStats.streak || 0;
  if (currentStreak) currentStreak.textContent = userStats.streak || 0;
}

function updateTimeDisplays() {
  const totalHours = safeGetElement("totalHoursLearned");
  const hoursWeek = safeGetElement("hoursThisWeek");

  if (totalHours) totalHours.textContent = Math.round(userStats.totalHours || 0);
  if (hoursWeek) hoursWeek.textContent = (userStats.hoursThisWeek || 0).toFixed(1);
}

function updateModulesDisplay() {
  const modules = safeGetElement("modulesCompleted");
  if (modules) modules.textContent = userStats.modulesCompleted || 0;
}

function updateTasksDisplay() {
  const tasks = safeGetElement("tasksCompleted");
  if (tasks) tasks.textContent = userStats.tasksCompleted || 0;
}

function updateBadgesDisplay() {
  const badges = safeGetElement("badgesEarned");
  if (badges) badges.textContent = userStats.badgesEarned || 0;
}

function updateActiveRoadmapsDisplay() {
  const activeRoadmaps = getActiveRoadmaps();
  userStats.activeRoadmaps = activeRoadmaps.length;

  const activeEl = safeGetElement("activeRoadmapsCount");
  if (activeEl) activeEl.textContent = activeRoadmaps.length;

  // Update nav badge
  const navBadge = safeQuerySelector('.nav-item[data-section="roadmaps"] .nav-badge');
  if (navBadge) navBadge.textContent = getUserRoadmaps().length;
}

function startTimeTracking() {
  let lastActivity = new Date();

  const trackActivity = function() {
    lastActivity = new Date();
  };

  document.addEventListener("mousemove", trackActivity);
  document.addEventListener("keypress", trackActivity);
  document.addEventListener("click", trackActivity);
  document.addEventListener("scroll", trackActivity);

  // Update every minute
  setInterval(function() {
    const now = new Date();
    const timeSinceActivity = (now - lastActivity) / 1000 / 60;

    if (timeSinceActivity < 5) {
      const minutesToAdd = 1 / 60;
      userStats.totalHours = (userStats.totalHours || 0) + minutesToAdd;
      userStats.hoursThisWeek = (userStats.hoursThisWeek || 0) + minutesToAdd;

      const today = now.toISOString().split("T")[0];
      if (!userStats.dailyHours) userStats.dailyHours = {};
      if (!userStats.dailyHours[today]) userStats.dailyHours[today] = 0;
      userStats.dailyHours[today] += minutesToAdd;

      saveUserStats();
      updateTimeDisplays();
    }
  }, 60000);

  window.addEventListener("beforeunload", saveUserStats);
}

function addXP(amount, reason) {
  userStats.xpEarned = (userStats.xpEarned || 0) + amount;

  const newLevel = Math.floor(userStats.xpEarned / 500) + 1;
  if (newLevel > (userStats.level || 1)) {
    userStats.level = newLevel;
    showCelebration("Level Up! You're now Level " + newLevel + "! 🚀");
  }

  saveUserStats();
  showToast("success", "+" + amount + " XP", reason);
}

function awardBadge(badgeId, name, description) {
  const badges = getFromStorage("earnedBadges", []);

  let found = false;
  for (let i = 0; i < badges.length; i++) {
    if (badges[i].id === badgeId) {
      found = true;
      break;
    }
  }

  if (!found) {
    badges.push({
      id: badgeId,
      name: name,
      description: description,
      earnedAt: new Date().toISOString()
    });

    saveToStorage("earnedBadges", badges);
    userStats.badgesEarned = badges.length;
    saveUserStats();

    showCelebration("You earned: " + name + "! 🏆");
    updateBadgesDisplay();
  }
}

window.addXP = addXP;
window.awardBadge = awardBadge;

// ============================================
// WEEKLY GOALS
// ============================================

const goalTemplates = [
  { text: "Complete a module from your active roadmap", xp: 100 },
  { text: "Spend 5 hours learning this week", xp: 75 },
  { text: "Complete 3 lessons", xp: 50 },
  { text: "Practice coding for 2 hours", xp: 60 },
  { text: "Watch 2 tutorial videos", xp: 40 },
  { text: "Read 3 articles", xp: 45 },
  { text: "Complete a quiz with 80%+ score", xp: 80 },
  { text: "Build a mini project", xp: 120 },
  { text: "Maintain your streak for 7 days", xp: 100 },
  { text: "Help someone in the community", xp: 50 }
];

function generateWeeklyGoals() {
  console.log("🎯 Generating weekly goals");

  const shuffled = goalTemplates.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const goals = [];
  for (let i = 0; i < 5; i++) {
    goals.push({
      id: "goal-" + i,
      text: shuffled[i].text,
      xp: shuffled[i].xp,
      completed: false
    });
  }

  saveToStorage("weeklyGoals", {
    weekStart: getWeekStart(),
    goals: goals
  });

  return goals;
}

function getCurrentGoals() {
  const data = getFromStorage("weeklyGoals", null);
  const weekStart = getWeekStart();

  if (!data || data.weekStart !== weekStart) {
    return generateWeeklyGoals();
  }

  return data.goals;
}

function completeGoal(goalId) {
  console.log("✅ Completing goal:", goalId);

  const data = getFromStorage("weeklyGoals", null);
  if (!data) return;

  let goal = null;
  for (let i = 0; i < data.goals.length; i++) {
    if (data.goals[i].id === goalId) {
      goal = data.goals[i];
      break;
    }
  }

  if (goal && !goal.completed) {
    goal.completed = true;
    saveToStorage("weeklyGoals", data);

    userStats.tasksCompleted = (userStats.tasksCompleted || 0) + 1;
    addXP(goal.xp, "Goal completed!");
    saveUserStats();
    updateTasksDisplay();

    let allDone = true;
    for (let i = 0; i < data.goals.length; i++) {
      if (!data.goals[i].completed) {
        allDone = false;
        break;
      }
    }

    if (allDone) {
      awardBadge("goal-crusher", "Goal Crusher", "Completed all weekly goals");
    }

    renderGoals();
  }
}

window.completeGoal = completeGoal;

function renderGoals() {
  const goalsList = safeGetElement("goalsList");
  if (!goalsList) return;

  const goals = getCurrentGoals();
  let html = "";

  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];
    html += '<div class="goal-item ' + (goal.completed ? "completed" : "") + '" data-id="' + goal.id + '">';
    html += '<div class="goal-checkbox" onclick="completeGoal(\'' + goal.id + '\')">';
    if (goal.completed) {
      html += '<i class="fas fa-check"></i>';
    }
    html += '</div>';
    html += '<div class="goal-content">';
    html += '<span class="goal-text">' + goal.text + '</span>';
    html += '<span class="goal-xp">+' + goal.xp + ' XP</span>';
    html += '</div></div>';
  }

  goalsList.innerHTML = html;

  // Update progress
  let completed = 0;
  for (let i = 0; i < goals.length; i++) {
    if (goals[i].completed) completed++;
  }

  const progressFill = safeQuerySelector(".goals-progress-fill");
  const progressText = safeQuerySelector(".goals-progress-text");

  if (progressFill) {
    progressFill.style.width = (completed / goals.length * 100) + "%";
  }
  if (progressText) {
    progressText.textContent = completed + " of " + goals.length + " goals completed";
  }
}

// ============================================
// ROADMAP FUNCTIONS
// ============================================

function getUserRoadmaps() {
  return getFromStorage("userRoadmaps", []);
}

function saveUserRoadmaps(roadmaps) {
  saveToStorage("userRoadmaps", roadmaps);
  updateActiveRoadmapsDisplay();
}

function getActiveRoadmaps() {
  const roadmaps = getUserRoadmaps();
  return roadmaps.filter(function(r) {
    return r.status === "active" || r.status === "in-progress";
  });
}

function getActiveRoadmap() {
  const roadmaps = getUserRoadmaps();
  for (let i = 0; i < roadmaps.length; i++) {
    if (roadmaps[i].status === "active") {
      return roadmaps[i];
    }
  }
  return null;
}

function findRoadmapById(id) {
  for (let i = 0; i < availableRoadmaps.length; i++) {
    if (availableRoadmaps[i].id === id) {
      return availableRoadmaps[i];
    }
  }
  return null;
}

function activateRoadmap(roadmapId) {
  console.log("🚀 Activating roadmap:", roadmapId);

  const roadmapData = findRoadmapById(roadmapId);
  if (!roadmapData) {
    showToast("error", "Error", "Roadmap not found");
    return null;
  }

  let userRoadmaps = getUserRoadmaps();

  // Deactivate current active
  for (let i = 0; i < userRoadmaps.length; i++) {
    if (userRoadmaps[i].status === "active") {
      userRoadmaps[i].status = "in-progress";
    }
  }

  // Check if exists
  let existingIndex = -1;
  for (let i = 0; i < userRoadmaps.length; i++) {
    if (userRoadmaps[i].id === roadmapId) {
      existingIndex = i;
      break;
    }
  }

  if (existingIndex >= 0) {
    userRoadmaps[existingIndex].status = "active";
    userRoadmaps[existingIndex].lastAccessed = new Date().toISOString();
  } else {
    const newRoadmap = {
      id: roadmapData.id,
      title: roadmapData.title,
      description: roadmapData.description,
      icon: roadmapData.icon,
      category: roadmapData.category,
      tags: roadmapData.tags.slice(),
      modules: roadmapData.modules,
      duration: roadmapData.duration,
      level: roadmapData.level,
      page: roadmapData.page,
      color: roadmapData.color,
      skills: roadmapData.skills ? roadmapData.skills.slice() : [],
      status: "active",
      progress: 0,
      completedModules: 0,
      totalTimeSpent: 0,
      startedAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };
    userRoadmaps.push(newRoadmap);

    if (userRoadmaps.length === 1) {
      awardBadge("quick-starter", "Quick Starter", "Started first roadmap");
    }
  }

  saveUserRoadmaps(userRoadmaps);
  showToast("success", "Roadmap Activated!", roadmapData.title + " is now active");

  return userRoadmaps;
}

window.activateRoadmap = activateRoadmap;

function continueRoadmap(roadmapId) {
  console.log("▶️ Continuing roadmap:", roadmapId);

  let userRoadmaps = getUserRoadmaps();
  let roadmap = null;

  for (let i = 0; i < userRoadmaps.length; i++) {
    if (userRoadmaps[i].id === roadmapId) {
      roadmap = userRoadmaps[i];
      userRoadmaps[i].lastAccessed = new Date().toISOString();
      break;
    }
  }

  if (roadmap && roadmap.page) {
    saveUserRoadmaps(userRoadmaps);
    window.location.href = roadmap.page;
  } else {
    showToast("error", "Error", "Please activate the roadmap first");
  }
}

window.continueRoadmap = continueRoadmap;

function removeRoadmap(roadmapId) {
  let userRoadmaps = getUserRoadmaps();
  userRoadmaps = userRoadmaps.filter(function(r) {
    return r.id !== roadmapId;
  });
  saveUserRoadmaps(userRoadmaps);
  showToast("info", "Removed", "Roadmap removed");
  renderMyRoadmaps();
  updateContinueLearning();
}

window.removeRoadmap = removeRoadmap;

function addRoadmapFromExplore(roadmapId) {
  activateRoadmap(roadmapId);
  renderExploreRoadmaps();
  setTimeout(function() {
    navigateToSection("roadmaps");
  }, 500);
}

window.addRoadmapFromExplore = addRoadmapFromExplore;

// ============================================
// RENDER MY ROADMAPS
// ============================================

function renderMyRoadmaps() {
  console.log("📚 Rendering My Roadmaps");

  const grid = safeGetElement("myRoadmapsGrid");
  if (!grid) {
    console.log("myRoadmapsGrid not found");
    return;
  }

  const userRoadmaps = getUserRoadmaps();
  console.log("User has", userRoadmaps.length, "roadmaps");

  if (userRoadmaps.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: rgba(255,255,255,0.02); border-radius: 20px; border: 2px dashed rgba(255,255,255,0.1);">' +
      '<div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(76, 201, 240, 0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">' +
      '<i class="fas fa-map-marked-alt" style="font-size: 2rem; color: #4cc9f0;"></i></div>' +
      '<h3 style="color: #fff; margin-bottom: 0.5rem;">No Active Roadmaps</h3>' +
      '<p style="color: #9ca3af; margin-bottom: 1.5rem;">Start your learning journey!</p>' +
      '<button onclick="navigateToSection(\'explore\')" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #4cc9f0, #4361ee); border: none; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer;">' +
      '<i class="fas fa-compass"></i> Explore Roadmaps</button></div>';
    return;
  }

  let html = "";
  let inProgressCount = 0;
  let completedCount = 0;

  for (let i = 0; i < userRoadmaps.length; i++) {
    const r = userRoadmaps[i];

    if (r.status === "completed") {
      completedCount++;
    } else {
      inProgressCount++;
    }

    let statusIcon = "fa-clock";
    let statusText = "In Progress";
    let statusClass = "in-progress";

    if (r.status === "completed") {
      statusIcon = "fa-check-circle";
      statusText = "Completed";
      statusClass = "completed";
    } else if (r.status === "active") {
      statusIcon = "fa-play-circle";
      statusText = "Active";
      statusClass = "active";
    }

    let tagsHtml = "";
    if (r.tags) {
      for (let j = 0; j < Math.min(r.tags.length, 3); j++) {
        tagsHtml += '<span class="tag">' + r.tags[j] + '</span>';
      }
    }

    let actionBtn = "";
    if (r.status === "completed") {
      actionBtn = '<button class="view-certificate-btn" onclick="viewCertificate(\'' + r.id + '\')"><i class="fas fa-certificate"></i> Certificate</button>';
    } else {
      actionBtn = '<button class="continue-roadmap-btn" onclick="continueRoadmap(\'' + r.id + '\')">Continue <i class="fas fa-arrow-right"></i></button>';
    }

    html += '<div class="roadmap-card ' + statusClass + '" data-id="' + r.id + '" data-status="' + r.status + '">' +
      '<div class="roadmap-card-header">' +
      '<div class="roadmap-icon ' + (r.color || "frontend") + '"><i class="fas ' + r.icon + '"></i></div>' +
      '<div class="roadmap-status ' + statusClass + '"><i class="fas ' + statusIcon + '"></i><span>' + statusText + '</span></div>' +
      '<button class="roadmap-menu-btn" onclick="event.stopPropagation(); showRoadmapMenu(\'' + r.id + '\', event)"><i class="fas fa-ellipsis-v"></i></button>' +
      '</div>' +
      '<div class="roadmap-card-body">' +
      '<h3>' + r.title + '</h3>' +
      '<p>' + r.description + '</p>' +
      '<div class="roadmap-tags">' + tagsHtml + '</div>' +
      '<div class="roadmap-stats">' +
      '<div class="roadmap-stat"><i class="fas fa-layer-group"></i><span>' + r.modules + ' Modules</span></div>' +
      '<div class="roadmap-stat"><i class="fas fa-clock"></i><span>' + r.duration + '</span></div>' +
      '<div class="roadmap-stat"><i class="fas fa-signal"></i><span>' + r.level + '</span></div>' +
      '</div></div>' +
      '<div class="roadmap-card-footer">' +
      '<div class="progress-info">' +
      '<div class="progress-bar-small"><div class="progress-fill-small ' + (r.status === "completed" ? "completed" : "") + '" style="width: ' + (r.progress || 0) + '%"></div></div>' +
      '<span class="progress-text">' + (r.progress || 0) + '% Complete</span></div>' +
      actionBtn + '</div></div>';
  }

  grid.innerHTML = html;

  // Update filter tabs
  const tabs = safeQuerySelectorAll(".filter-tab");
  tabs.forEach(function(tab) {
    const filter = tab.dataset.filter;
    if (filter === "all") {
      tab.textContent = "All (" + userRoadmaps.length + ")";
    } else if (filter === "in-progress") {
      tab.textContent = "In Progress (" + inProgressCount + ")";
    } else if (filter === "completed") {
      tab.textContent = "Completed (" + completedCount + ")";
    }
  });

  updateActiveRoadmapsDisplay();
  initRoadmapFilters();
}

window.renderMyRoadmaps = renderMyRoadmaps;

function initRoadmapFilters() {
  const tabs = safeQuerySelectorAll(".filter-tab");
  tabs.forEach(function(tab) {
    tab.onclick = function() {
      tabs.forEach(function(t) { t.classList.remove("active"); });
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      const cards = safeQuerySelectorAll("#myRoadmapsGrid .roadmap-card");

      cards.forEach(function(card) {
        const status = card.dataset.status;
        if (filter === "all") {
          card.style.display = "block";
        } else if (filter === "in-progress") {
          card.style.display = (status === "active" || status === "in-progress") ? "block" : "none";
        } else if (filter === "completed") {
          card.style.display = (status === "completed") ? "block" : "none";
        } else {
          card.style.display = "block";
        }
      });
    };
  });
}

function showRoadmapMenu(roadmapId, event) {
  const existing = document.querySelector(".rm-menu");
  if (existing) existing.remove();

  const menu = document.createElement("div");
  menu.className = "rm-menu";
  menu.style.cssText = "position: fixed; top: " + event.clientY + "px; left: " + event.clientX + "px; background: rgba(26, 26, 46, 0.98); border: 1px solid rgba(76, 201, 240, 0.3); border-radius: 10px; padding: 0.5rem 0; z-index: 9999; min-width: 160px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);";

  menu.innerHTML = '<div style="padding: 0.6rem 1rem; color: #ccc; cursor: pointer;" onmouseover="this.style.background=\'rgba(76,201,240,0.1)\'" onmouseout="this.style.background=\'transparent\'" onclick="activateRoadmap(\'' + roadmapId + '\'); renderMyRoadmaps(); updateContinueLearning(); this.parentElement.remove();"><i class="fas fa-play" style="margin-right: 0.5rem;"></i> Set Active</div>' +
    '<div style="padding: 0.6rem 1rem; color: #ccc; cursor: pointer;" onmouseover="this.style.background=\'rgba(76,201,240,0.1)\'" onmouseout="this.style.background=\'transparent\'" onclick="continueRoadmap(\'' + roadmapId + '\')"><i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i> Open</div>' +
    '<div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0.3rem 0;"></div>' +
    '<div style="padding: 0.6rem 1rem; color: #ef4444; cursor: pointer;" onmouseover="this.style.background=\'rgba(239,68,68,0.1)\'" onmouseout="this.style.background=\'transparent\'" onclick="removeRoadmap(\'' + roadmapId + '\'); this.parentElement.remove();"><i class="fas fa-trash" style="margin-right: 0.5rem;"></i> Remove</div>';

  document.body.appendChild(menu);

  setTimeout(function() {
    document.addEventListener("click", function closeMenu() {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    });
  }, 100);
}

window.showRoadmapMenu = showRoadmapMenu;

// ============================================
// RENDER EXPLORE ROADMAPS
// ============================================

function renderExploreRoadmaps() {
  console.log("🧭 Rendering Explore Roadmaps");

  const grid = safeGetElement("exploreRoadmapsGrid");
  if (!grid) {
    console.log("exploreRoadmapsGrid not found");
    return;
  }

  const userRoadmaps = getUserRoadmaps();
  const userIds = userRoadmaps.map(function(r) { return r.id; });

  let html = "";

  for (let i = 0; i < availableRoadmaps.length; i++) {
    const r = availableRoadmaps[i];
    const isAdded = userIds.indexOf(r.id) >= 0;

    let tagsHtml = "";
    for (let j = 0; j < Math.min(r.tags.length, 3); j++) {
      tagsHtml += '<span class="tag">' + r.tags[j] + '</span>';
    }

    let actionBtn = "";
    if (isAdded) {
      actionBtn = '<button class="continue-roadmap-btn" onclick="navigateToSection(\'roadmaps\')" style="background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.5);"><i class="fas fa-check"></i> Added</button>';
    } else {
      actionBtn = '<button class="start-roadmap-btn" onclick="addRoadmapFromExplore(\'' + r.id + '\')">Add <i class="fas fa-plus"></i></button>';
    }

    html += '<div class="roadmap-card" data-id="' + r.id + '" data-category="' + r.category + '" data-level="' + r.level.toLowerCase() + '">' +
      '<div class="roadmap-card-header">' +
      '<div class="roadmap-icon ' + r.color + '"><i class="fas ' + r.icon + '"></i></div>' +
      '<div class="roadmap-status saved"><i class="fas fa-bookmark"></i></div>' +
      '</div>' +
      '<div class="roadmap-card-body">' +
      '<h3>' + r.title + '</h3>' +
      '<p>' + r.description + '</p>' +
      '<div class="roadmap-tags">' + tagsHtml + '</div>' +
      '<div class="roadmap-stats">' +
      '<div class="roadmap-stat"><i class="fas fa-layer-group"></i><span>' + r.modules + ' Modules</span></div>' +
      '<div class="roadmap-stat"><i class="fas fa-clock"></i><span>' + r.duration + '</span></div>' +
      '<div class="roadmap-stat"><i class="fas fa-signal"></i><span>' + r.level + '</span></div>' +
      '</div></div>' +
      '<div class="roadmap-card-footer">' + actionBtn + '</div></div>';
  }

  grid.innerHTML = html;
  initExploreFilters();
}

window.renderExploreRoadmaps = renderExploreRoadmaps;

function initExploreFilters() {
  // Category filters
  const categoryBtns = safeQuerySelectorAll(".category-btn");
  categoryBtns.forEach(function(btn) {
    btn.onclick = function() {
      categoryBtns.forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const category = btn.dataset.category;
      const cards = safeQuerySelectorAll("#exploreRoadmapsGrid .roadmap-card");

      cards.forEach(function(card) {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    };
  });

  // Level filters
  const levelPills = safeQuerySelectorAll(".level-pill");
  levelPills.forEach(function(pill) {
    pill.onclick = function() {
      levelPills.forEach(function(p) { p.classList.remove("active"); });
      pill.classList.add("active");

      const level = pill.dataset.level;
      const cards = safeQuerySelectorAll("#exploreRoadmapsGrid .roadmap-card");

      cards.forEach(function(card) {
        if (level === "all" || card.dataset.level === level) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    };
  });
}

// ============================================
// CONTINUE LEARNING (OVERVIEW)
// ============================================

function updateContinueLearning() {
  const card = safeGetElement("currentRoadmapCard");
  if (!card) return;

  const active = getActiveRoadmap();

  if (!active) {
    card.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center;">' +
      '<div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(76, 201, 240, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">' +
      '<i class="fas fa-plus-circle" style="font-size: 2rem; color: #4cc9f0;"></i></div>' +
      '<h3 style="color: #fff; margin-bottom: 0.5rem;">No Active Roadmap</h3>' +
      '<p style="color: #9ca3af; margin-bottom: 1.5rem;">Choose a roadmap to start learning</p>' +
      '<button onclick="navigateToSection(\'explore\')" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #4cc9f0, #4361ee); border: none; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer;">Browse Roadmaps <i class="fas fa-arrow-right"></i></button></div>';
  } else {
    const progress = active.progress || 0;
    const completedModules = active.completedModules || 0;

    card.innerHTML = '<div class="roadmap-thumbnail"><div class="thumbnail-icon"><i class="fas ' + active.icon + '"></i></div><div class="roadmap-level ' + active.level.toLowerCase() + '">' + active.level + '</div></div>' +
      '<div class="roadmap-info"><h3>' + active.title + '</h3>' +
      '<p class="roadmap-description">' + active.description + '</p>' +
      '<div class="roadmap-meta"><span><i class="fas fa-clock"></i> ' + active.duration + '</span><span><i class="fas fa-layer-group"></i> ' + active.modules + ' modules</span><span><i class="fas fa-check-circle"></i> ' + completedModules + ' done</span></div>' +
      '<div class="progress-section"><div class="progress-header"><span class="progress-text">Progress</span><span class="progress-percentage">' + progress + '%</span></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width: ' + progress + '%"></div></div></div>' +
      '<div class="current-step"><span class="step-label">Current:</span><span class="step-name">Module ' + (completedModules + 1) + '</span></div></div>' +
      '<button class="continue-btn" onclick="continueRoadmap(\'' + active.id + '\')"><span>Continue</span><i class="fas fa-arrow-right"></i></button>';
  }
}

window.updateContinueLearning = updateContinueLearning;

function viewCertificate(roadmapId) {
  const certificates = getFromStorage("certificates", []);
  let cert = null;

  for (let i = 0; i < certificates.length; i++) {
    if (certificates[i].roadmapId === roadmapId) {
      cert = certificates[i];
      break;
    }
  }

  if (cert) {
    showCelebration("Certificate: " + cert.title + "\nID: " + cert.certificateId);
  } else {
    showToast("info", "Certificate", "Complete this roadmap to earn a certificate!");
  }
}

window.viewCertificate = viewCertificate;

// ============================================
// PROGRESS SECTION
// ============================================

function updateProgressSection() {
  console.log("📈 Updating Progress Section");

  // Total time
  const totalTimeEl = safeQuerySelector(".progress-overview-card.total-time .value-number");
  if (totalTimeEl) totalTimeEl.textContent = Math.round(userStats.totalHours || 0);

  // Streak
  const streakEl = safeQuerySelector(".progress-overview-card.learning-streak .value-number");
  if (streakEl) streakEl.textContent = userStats.streak || 0;

  // XP
  const xpEl = safeQuerySelector(".progress-overview-card.xp-earned .value-number");
  if (xpEl) xpEl.textContent = (userStats.xpEarned || 0).toLocaleString();

  // Overall completion
  const userRoadmaps = getUserRoadmaps();
  let overall = 0;
  if (userRoadmaps.length > 0) {
    let total = 0;
    for (let i = 0; i < userRoadmaps.length; i++) {
      total += userRoadmaps[i].progress || 0;
    }
    overall = Math.round(total / userRoadmaps.length);
  }

  const completionEl = safeQuerySelector(".progress-overview-card.completion-rate .value-number");
  if (completionEl) completionEl.textContent = overall;

  // Render heatmap
  renderActivityHeatmap();

  // Init expand buttons
  const expandBtns = safeQuerySelectorAll(".expand-btn");
  expandBtns.forEach(function(btn) {
    btn.onclick = function() {
      const item = btn.closest(".progress-roadmap-item");
      if (item) item.classList.toggle("expanded");
    };
  });
}

function renderActivityHeatmap() {
  const heatmap = safeGetElement("activityHeatmap");
  if (!heatmap) return;

  const dailyHours = userStats.dailyHours || {};
  const today = new Date();

  heatmap.innerHTML = "";

  for (let i = 55; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const hours = dailyHours[dateStr] || 0;

    let level = 0;
    if (hours > 0 && hours < 0.5) level = 1;
    else if (hours >= 0.5 && hours < 1) level = 2;
    else if (hours >= 1 && hours < 2) level = 3;
    else if (hours >= 2) level = 4;

    const cell = document.createElement("div");
    cell.className = "heatmap-cell";
    cell.title = dateStr + ": " + hours.toFixed(1) + " hours";

    const colors = [
      "rgba(255,255,255,0.05)",
      "rgba(76, 201, 240, 0.2)",
      "rgba(76, 201, 240, 0.4)",
      "rgba(76, 201, 240, 0.6)",
      "rgba(76, 201, 240, 0.9)"
    ];

    cell.style.cssText = "width: 14px; height: 14px; border-radius: 3px; background: " + colors[level] + ";";
    heatmap.appendChild(cell);
  }
}

// ============================================
// RESOURCES SECTION
// ============================================

function initResourcesSection() {
  console.log("📚 Initializing Resources");

  const cards = safeQuerySelectorAll(".resource-category-card");

  const pages = {
    "Video Tutorials": "video.html",
    "Articles": "articles.html",
    "Courses": "courses.html",
    "Projects": "projects.html",
    "Interview Prep": "interview.html",
    "Templates": "templates.html"
  };

  cards.forEach(function(card) {
    card.style.cursor = "pointer";
    card.onclick = function() {
      const title = card.querySelector("h3");
      if (title && pages[title.textContent]) {
        window.location.href = pages[title.textContent];
      }
    };
  });
}

// ============================================
// CERTIFICATES & BADGES
// ============================================

function renderCertificatesAndBadges() {
  console.log("🏆 Rendering Certificates & Badges");

  // Badges
  const badgesGrid = safeQuerySelector(".badges-grid");
  if (badgesGrid) {
    const earned = getFromStorage("earnedBadges", []);
    const earnedIds = earned.map(function(b) { return b.id; });

    const allBadges = [
      { id: "quick-starter", name: "Quick Starter", description: "Started first roadmap", icon: "fa-rocket", color: "blue" },
      { id: "week-warrior", name: "Week Warrior", description: "7-day streak", icon: "fa-fire", color: "gold" },
      { id: "goal-crusher", name: "Goal Crusher", description: "All weekly goals", icon: "fa-bullseye", color: "green" },
      { id: "month-master", name: "Month Master", description: "30-day streak", icon: "fa-crown", color: "purple" },
      { id: "roadmap-complete", name: "Roadmap Complete", description: "Finished a roadmap", icon: "fa-map-marked-alt", color: "emerald" }
    ];

    let html = "";
    for (let i = 0; i < allBadges.length; i++) {
      const b = allBadges[i];
      const isEarned = earnedIds.indexOf(b.id) >= 0;

      html += '<div class="badge-card ' + (isEarned ? "earned" : "locked") + '">' +
        '<div class="badge-icon ' + (isEarned ? b.color : "locked") + '"><i class="fas ' + (isEarned ? b.icon : "fa-lock") + '"></i></div>' +
        '<h4>' + b.name + '</h4><p>' + b.description + '</p></div>';
    }

    badgesGrid.innerHTML = html;

    // Update title
    const title = safeQuerySelector(".badges-section .subsection-title");
    if (title) title.innerHTML = '<i class="fas fa-medal"></i> Badges Earned (' + earned.length + ')';
  }

  // Certificates
  const certsGrid = safeQuerySelector(".certificates-grid");
  if (certsGrid) {
    const certs = getFromStorage("certificates", []);

    if (certs.length === 0) {
      certsGrid.innerHTML = '<div style="text-align: center; padding: 3rem; color: #9ca3af;"><i class="fas fa-certificate" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i><p>Complete a roadmap to earn a certificate!</p></div>';
    } else {
      let html = "";
      for (let i = 0; i < certs.length; i++) {
        const c = certs[i];
        html += '<div class="certificate-card">' +
          '<div class="certificate-preview"><div class="certificate-badge"><i class="fas fa-award"></i></div><div class="certificate-watermark">ROADMAP-HUB</div></div>' +
          '<div class="certificate-info"><h3>' + c.title + '</h3><p>Certificate of Completion</p><span class="certificate-id">ID: ' + c.certificateId + '</span></div>' +
          '<div class="certificate-actions"><button class="cert-action-btn view" onclick="viewCertificate(\'' + c.roadmapId + '\')"><i class="fas fa-eye"></i> View</button></div></div>';
      }
      certsGrid.innerHTML = html;
    }
  }
}

// ============================================
// HELP SECTION
// ============================================

function initHelpSection() {
  console.log("❓ Initializing Help Section");

  // Add feedback form
  const helpSection = safeGetElement("section-help");
  if (helpSection && !safeGetElement("feedbackForm")) {
    const faqSection = helpSection.querySelector(".faq-section");

    const feedbackHtml = '<div style="margin-top: 2rem;">' +
      '<h2 class="subsection-title"><i class="fas fa-comment-alt" style="color: #4cc9f0; margin-right: 0.5rem;"></i> Send Feedback</h2>' +
      '<div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 2rem;">' +
      '<p style="color: #9ca3af; margin-bottom: 1.5rem;">Help us improve RoadMap-HUB by sharing your thoughts!</p>' +
      '<form id="feedbackForm" onsubmit="submitFeedback(event)">' +
      '<div style="margin-bottom: 1.5rem;"><label style="display: block; color: #ccc; margin-bottom: 0.5rem;">Type *</label>' +
      '<select id="feedbackType" required style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;">' +
      '<option value="">Select</option><option value="suggestion">Suggestion</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="other">Other</option></select></div>' +
      '<div style="margin-bottom: 1.5rem;"><label style="display: block; color: #ccc; margin-bottom: 0.5rem;">Subject *</label>' +
      '<input type="text" id="feedbackSubject" required placeholder="Brief summary" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;"></div>' +
      '<div style="margin-bottom: 1.5rem;"><label style="display: block; color: #ccc; margin-bottom: 0.5rem;">Message *</label>' +
      '<textarea id="feedbackMessage" required rows="4" placeholder="Describe your feedback..." style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; resize: vertical;"></textarea></div>' +
      '<button type="submit" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #4cc9f0, #4361ee); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;"><i class="fas fa-paper-plane"></i> Send</button>' +
      '</form></div></div>';

    if (faqSection) {
      faqSection.insertAdjacentHTML("beforebegin", feedbackHtml);
    } else {
      helpSection.insertAdjacentHTML("beforeend", feedbackHtml);
    }
  }

  // FAQ toggles
  const faqItems = safeQuerySelectorAll(".faq-item");
  faqItems.forEach(function(item) {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.onclick = function() {
        const isActive = item.classList.contains("active");
        faqItems.forEach(function(i) { i.classList.remove("active"); });
        if (!isActive) item.classList.add("active");
      };
    }
  });
}

function submitFeedback(event) {
  event.preventDefault();

  const type = safeGetElement("feedbackType").value;
  const subject = safeGetElement("feedbackSubject").value;
  const message = safeGetElement("feedbackMessage").value;

  console.log("📧 Feedback:", { type, subject, message });

  // Save locally
  const feedbacks = getFromStorage("feedbacks", []);
  feedbacks.push({
    type: type,
    subject: subject,
    message: message,
    email: currentUser ? currentUser.email : "anonymous",
    date: new Date().toISOString()
  });
  saveToStorage("feedbacks", feedbacks);

  // Send email
  const mailtoLink = "mailto:jitheshsuvarna9731829845@gmail.com" +
    "?subject=" + encodeURIComponent("[RoadMap-HUB] " + type + " - " + subject) +
    "&body=" + encodeURIComponent("Type: " + type + "\nSubject: " + subject + "\n\nMessage:\n" + message + "\n\nFrom: " + (currentUser ? currentUser.email : "Anonymous"));

  try {
    window.open(mailtoLink, "_blank");
  } catch (e) {
    console.log("Could not open email");
  }

  safeGetElement("feedbackForm").reset();
  showToast("success", "Sent!", "Thank you for your feedback!");
}

window.submitFeedback = submitFeedback;

// ============================================
// SETTINGS SECTION
// ============================================

function loadSettingsData() {
  console.log("⚙️ Loading Settings");

  if (!currentUser) return;

  const userData = getFromStorage("userProfile", {});

  const nameEl = safeGetElement("settingsName");
  const emailEl = safeGetElement("settingsEmail");
  const phoneEl = safeGetElement("settingsPhone");
  const bioEl = safeGetElement("settingsBio");
  const avatarEl = safeGetElement("settingsAvatar");

  if (nameEl) nameEl.value = userData.name || currentUser.displayName || "";
  if (emailEl) emailEl.value = currentUser.email || "";
  if (phoneEl) phoneEl.value = userData.phone || "";
  if (bioEl) bioEl.value = userData.bio || "";

  if (avatarEl) {
    const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.displayName || "User") + "&background=4cc9f0&color=fff";
    avatarEl.src = userData.avatar || currentUser.photoURL || defaultAvatar;
  }

  // Save button logic
  const saveBtn = safeQuerySelector(".save-settings-btn");
  if (saveBtn) {
    saveBtn.onclick = function() {
      const userData = getFromStorage("userProfile", {});
      const sName = safeGetElement("settingsName");
      const sPhone = safeGetElement("settingsPhone");
      const sBio = safeGetElement("settingsBio");

      if (sName) userData.name = sName.value;
      if (sPhone) userData.phone = sPhone.value;
      if (sBio) userData.bio = sBio.value;
      
      saveToStorage("userProfile", userData);

      // Update displays
      const headerName = safeGetElement("headerUserName");
      const dropdownName = safeGetElement("dropdownUserName");
      const welcomeName = safeGetElement("welcomeUserName");

      if (headerName) headerName.textContent = userData.name;
      if (dropdownName) dropdownName.textContent = userData.name;
      if (welcomeName) welcomeName.textContent = userData.name.split(" ")[0];

      showToast("success", "Saved!", "Settings updated");
    };
  }

  // Avatar change
  const avatarBtn = safeQuerySelector(".change-avatar-btn");
  if (avatarBtn) {
    avatarBtn.onclick = function() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = function(e) {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            const userData = getFromStorage("userProfile", {});
            userData.avatar = evt.target.result;
            saveToStorage("userProfile", userData);

            const sAvatar = safeGetElement("settingsAvatar");
            const hAvatar = safeGetElement("headerAvatar");
            const dAvatar = safeGetElement("dropdownAvatar");

            if (sAvatar) sAvatar.src = evt.target.result;
            if (hAvatar) hAvatar.src = evt.target.result;
            if (dAvatar) dAvatar.src = evt.target.result;

            showToast("success", "Updated!", "Avatar changed");
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      };
      input.click();
    };
  }
}

// ============================================
// NAVIGATION
// ============================================

function navigateToSection(sectionId) {
  console.log("🔀 Navigating to:", sectionId);

  // Special pages
  if (sectionId === "community") {
    window.location.href = "community/index.html";
    return;
  }

  // Update nav items
  const navItems = safeQuerySelectorAll(".nav-item");
  navItems.forEach(function(item) {
    if (item.dataset.section === sectionId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update sections
  const sections = safeQuerySelectorAll(".dashboard-section");
  sections.forEach(function(section) {
    if (section.id === "section-" + sectionId) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });

  // Update URL
  history.pushState(null, null, "#" + sectionId);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Load section data
  loadSectionData(sectionId);
}

window.navigateToSection = navigateToSection;

function loadSectionData(sectionId) {
  console.log("📂 Loading section:", sectionId);

  try {
    switch (sectionId) {
      case "overview":
        updateAllStatsDisplays();
        renderGoals();
        updateContinueLearning();
        renderActivityHeatmap();
        break;
      case "roadmaps":
        renderMyRoadmaps();
        break;
      case "explore":
        renderExploreRoadmaps();
        break;
      case "progress":
        updateProgressSection();
        break;
      case "resources":
        initResourcesSection();
        break;
      case "certificates":
        renderCertificatesAndBadges();
        break;
      case "settings":
        loadSettingsData();
        break;
      case "help":
        initHelpSection();
        break;
    }
  } catch (error) {
    console.error("Error loading section:", error);
  }
}

// ============================================
// DROPDOWN LINKS
// ============================================

function setupDropdownLinks() {
  // Profile -> Settings
  const profileLinks = safeQuerySelectorAll('a[href="#profile"]');
  profileLinks.forEach(function(link) {
    link.onclick = function(e) {
      e.preventDefault();
      navigateToSection("settings");
      const dropdown = safeGetElement("userDropdown");
      if (dropdown) dropdown.classList.remove("active");
    };
  });

  // Settings -> Settings
  const settingsLinks = safeQuerySelectorAll('a[href="#settings"]');
  settingsLinks.forEach(function(link) {
    link.onclick = function(e) {
      e.preventDefault();
      navigateToSection("settings");
      const dropdown = safeGetElement("userDropdown");
      if (dropdown) dropdown.classList.remove("active");
    };
  });

  // Billing -> Pro
  const billingLinks = safeQuerySelectorAll('a[href="#billing"]');
  billingLinks.forEach(function(link) {
    link.onclick = function(e) {
      e.preventDefault();
      window.location.href = "pro.html";
    };
  });

  // Upgrade button
  const upgradeBtn = safeQuerySelector(".upgrade-btn");
  if (upgradeBtn) {
    upgradeBtn.onclick = function() {
      window.location.href = "pro.html";
    };
  }
}

// ============================================
// AUTHENTICATION
// ============================================

function initAuth() {
  console.log("🔐 Initializing Auth");

  // Check session
  const storedUser = sessionStorage.getItem("currentUser");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    console.log("📱 User from session:", currentUser.email);
    loadUserProfile();
  }

  // Firebase listener
  if (auth) {
    onAuthStateChanged(auth, function(user) {
      if (user) {
        currentUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log("🔥 Firebase user:", currentUser.email);
        loadUserProfile();
      } else if (!storedUser) {
        console.log("❌ No user, redirecting");
        window.location.href = "login3.html";
      }
    });
  } else if (!storedUser) {
    console.log("❌ No auth, redirecting");
    window.location.href = "login3.html";
  }

  // Logout
  const logoutBtn = safeGetElement("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = async function() {
      showPageLoader();
      try {
        if (auth) await signOut(auth);
        sessionStorage.removeItem("currentUser");
        window.location.href = "login3.html";
      } catch (e) {
        console.error("Logout error:", e);
        hidePageLoader();
      }
    };
  }
}

function loadUserProfile() {
  if (!currentUser) return;

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.displayName || "User") + "&background=4cc9f0&color=fff";
  const avatar = currentUser.photoURL || defaultAvatar;
  const name = currentUser.displayName || currentUser.email?.split("@")[0] || "User";

  // Header
  const headerAvatar = safeGetElement("headerAvatar");
  const headerName = safeGetElement("headerUserName");
  if (headerAvatar) headerAvatar.src = avatar;
  if (headerName) headerName.textContent = name;

  // Dropdown
  const dropdownAvatar = safeGetElement("dropdownAvatar");
  const dropdownName = safeGetElement("dropdownUserName");
  const dropdownEmail = safeGetElement("dropdownUserEmail");
  if (dropdownAvatar) dropdownAvatar.src = avatar;
  if (dropdownName) dropdownName.textContent = name;
  if (dropdownEmail) dropdownEmail.textContent = currentUser.email || "";

  // Welcome
  const welcomeName = safeGetElement("welcomeUserName");
  if (welcomeName) welcomeName.textContent = name.split(" ")[0];

  // Settings
  const settingsAvatar = safeGetElement("settingsAvatar");
  const settingsName = safeGetElement("settingsName");
  const settingsEmail = safeGetElement("settingsEmail");
  if (settingsAvatar) settingsAvatar.src = avatar;
  if (settingsName) settingsName.value = name;
  if (settingsEmail) settingsEmail.value = currentUser.email || "";
}

// ============================================
// SIDEBAR
// ============================================

function initSidebar() {
  const sidebar = safeGetElement("sidebar");
  const toggle = safeGetElement("sidebarToggle");
  const mobileBtn = safeGetElement("mobileMenuBtn");

  if (toggle && sidebar) {
    toggle.onclick = function() {
      sidebar.classList.toggle("collapsed");
      localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
    };

    if (localStorage.getItem("sidebarCollapsed") === "true") {
      sidebar.classList.add("collapsed");
    }
  }

  if (mobileBtn && sidebar) {
    mobileBtn.onclick = function() {
      sidebar.classList.toggle("open");
    };
  }

  document.addEventListener("click", function(e) {
    if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains("open")) {
      if (!sidebar.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    }
  });
}

// ============================================
// INIT NAVIGATION
// ============================================

function initNavigation() {
  const navItems = safeQuerySelectorAll(".nav-item");

  navItems.forEach(function(item) {
    item.onclick = function(e) {
      e.preventDefault();
      const section = item.dataset.section;

      // Close mobile menu
      const sidebar = safeGetElement("sidebar");
      if (sidebar && window.innerWidth <= 992) {
        sidebar.classList.remove("open");
      }

      navigateToSection(section);
    };
  });

  // Handle hash
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    setTimeout(function() {
      navigateToSection(hash);
    }, 100);
  }
}

// ============================================
// DROPDOWNS
// ============================================

function initDropdowns() {
  const notifBtn = safeGetElement("notificationBtn");
  const notifDropdown = safeGetElement("notificationDropdown");
  const userProfile = safeGetElement("userProfileHeader");
  const userDropdown = safeGetElement("userDropdown");

  if (notifBtn && notifDropdown) {
    notifBtn.onclick = function(e) {
      e.stopPropagation();
      notifDropdown.classList.toggle("active");
      if (userDropdown) userDropdown.classList.remove("active");
    };
  }

  if (userProfile && userDropdown) {
    userProfile.onclick = function(e) {
      e.stopPropagation();
      userDropdown.classList.toggle("active");
      if (notifDropdown) notifDropdown.classList.remove("active");
    };
  }

  document.addEventListener("click", function() {
    if (notifDropdown) notifDropdown.classList.remove("active");
    if (userDropdown) userDropdown.classList.remove("active");
  });

  // Mark all read
  const markReadBtn = safeQuerySelector(".mark-read-btn");
  if (markReadBtn) {
    markReadBtn.onclick = function() {
      const unread = safeQuerySelectorAll(".notification-item.unread");
      unread.forEach(function(item) { item.classList.remove("unread"); });
      const badge = safeQuerySelector(".notification-badge");
      if (badge) badge.style.display = "none";
      showToast("success", "Done", "All marked as read");
    };
  }
}

// ============================================
// PARTICLES
// ============================================

function initParticles() {
  const container = safeGetElement("particles");
  if (!container) return;

  const count = window.innerWidth < 768 ? 10 : 20;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = "width: " + (Math.random() * 6 + 2) + "px; height: " + (Math.random() * 6 + 2) + "px; left: " + (Math.random() * 100) + "%; animation-delay: " + (Math.random() * 20) + "s; animation-duration: " + (Math.random() * 15 + 15) + "s;";
    container.appendChild(particle);
  }
}

// ============================================
// CALENDAR
// ============================================

function initCalendar() {
  renderCalendar();

  const prevBtn = safeGetElement("prevMonth");
  const nextBtn = safeGetElement("nextMonth");

  let currentDate = new Date();

  if (prevBtn) {
    prevBtn.onclick = function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendarWithDate(currentDate);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendarWithDate(currentDate);
    };
  }
}

function renderCalendar() {
  renderCalendarWithDate(new Date());
}

function renderCalendarWithDate(date) {
  const grid = safeGetElement("calendarGrid");
  const monthLabel = safeGetElement("currentMonth");
  if (!grid) return;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const year = date.getFullYear();
  const month = date.getMonth();

  if (monthLabel) monthLabel.textContent = months[month] + " " + year;

  grid.innerHTML = "";

  // Headers
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function(day) {
    const header = document.createElement("div");
    header.className = "calendar-day header";
    header.textContent = day;
    grid.appendChild(header);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const dailyHours = userStats.dailyHours || {};

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    grid.appendChild(empty);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.textContent = day;

    const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("today");
    }

    if (dailyHours[dateStr] && dailyHours[dateStr] > 0) {
      cell.classList.add("has-activity");
    }

    grid.appendChild(cell);
  }
}

// ============================================
// CELEBRATION & TOAST INIT
// ============================================

function initCelebration() {
  const closeBtn = safeGetElement("celebrationClose");
  if (closeBtn) {
    closeBtn.onclick = closeCelebration;
  }

  const modal = safeGetElement("celebrationModal");
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === modal) closeCelebration();
    };
  }
}

function initToast() {
  const closeBtn = safeGetElement("toastClose");
  if (closeBtn) {
    closeBtn.onclick = function() {
      const toast = safeGetElement("toast");
      if (toast) toast.classList.remove("visible");
    };
  }
}

// ============================================
// MAIN INITIALIZATION
// ============================================

function initDashboard() {
  console.log("🚀 Starting Dashboard...");

  try {
    // Auth
    initAuth();

    // Load stats
    loadUserStats();
    checkDailyStreak();
    checkWeeklyReset();

    // Start time tracking
    startTimeTracking();

    // UI
    initSidebar();
    initNavigation();
    initDropdowns();
    initParticles();
    initCalendar();
    initToast();
    initCelebration();
    setupDropdownLinks();

    // Initial data
    updateAllStatsDisplays();
    renderGoals();
    updateContinueLearning();
    renderActivityHeatmap();

    // Hide loader
    setTimeout(hidePageLoader, 1000);

    console.log("✅ Dashboard Initialized!");

  } catch (error) {
    console.error("❌ Dashboard Error:", error);
    hidePageLoader();
  }
}

// ============================================
// START
// ============================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}

// Console branding
console.log("%c🚀 RoadMap-HUB Dashboard", "font-size: 20px; font-weight: bold; color: #4cc9f0;");
console.log("✅ Dashboard script loaded successfully");