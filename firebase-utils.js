// firebase-utils.js - Shared Firebase Functions for RoadMap-HUB

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { ROADMAPS, BADGES, XP_CONFIG, generateWeeklyTasks } from './roadmaps-data.js';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

// ============================================
// USER MANAGEMENT
// ============================================

export async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getUserData(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

export async function updateUserData(userId, data) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
}

// ============================================
// ROADMAP ENROLLMENT
// ============================================

export async function enrollInRoadmap(userId, roadmapId) {
  try {
    const roadmap = ROADMAPS[roadmapId];
    if (!roadmap) {
      throw new Error('Roadmap not found');
    }
    
    // Create enrollment document
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    await setDoc(enrollmentRef, {
      roadmapId: roadmapId,
      enrolledAt: serverTimestamp(),
      status: 'in-progress',
      currentModuleIndex: 0,
      currentLessonIndex: 0,
      progress: 0,
      completedModules: [],
      completedLessons: [],
      completedTasks: [],
      completedQuizzes: [],
      earnedBadges: [],
      xpEarned: 0,
      timeSpent: 0,
      lastAccessedAt: serverTimestamp()
    });
    
    // Update user's active roadmaps count
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      activeRoadmaps: increment(1),
      enrolledRoadmaps: arrayUnion(roadmapId)
    });
    
    // Award "First Roadmap" badge if first enrollment
    const userData = await getUserData(userId);
    if (!userData?.enrolledRoadmaps || userData.enrolledRoadmaps.length === 0) {
      await awardBadge(userId, 'first-roadmap');
    }
    
    return { success: true, message: 'Successfully enrolled in roadmap!' };
    
  } catch (error) {
    console.error("Error enrolling in roadmap:", error);
    return { success: false, message: error.message };
  }
}

export async function unenrollFromRoadmap(userId, roadmapId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    await deleteDoc(enrollmentRef);
    
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      activeRoadmaps: increment(-1),
      enrolledRoadmaps: arrayRemove(roadmapId)
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error unenrolling:", error);
    return { success: false, message: error.message };
  }
}

export async function getEnrolledRoadmaps(userId) {
  try {
    const enrollmentsRef = collection(db, 'users', userId, 'enrollments');
    const querySnapshot = await getDocs(enrollmentsRef);
    
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const roadmap = ROADMAPS[data.roadmapId];
      if (roadmap) {
        enrollments.push({
          ...data,
          roadmap: roadmap
        });
      }
    });
    
    return enrollments;
  } catch (error) {
    console.error("Error getting enrollments:", error);
    return [];
  }
}

export async function getRoadmapProgress(userId, roadmapId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    
    if (enrollmentDoc.exists()) {
      return enrollmentDoc.data();
    }
    
    return null;
  } catch (error) {
    console.error("Error getting roadmap progress:", error);
    return null;
  }
}

// ============================================
// LESSON PROGRESS
// ============================================

export async function completeLesson(userId, roadmapId, moduleId, lessonId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    
    if (!enrollmentDoc.exists()) {
      throw new Error('Not enrolled in this roadmap');
    }
    
    const data = enrollmentDoc.data();
    const lessonKey = `${moduleId}:${lessonId}`;
    
    // Check if already completed
    if (data.completedLessons?.includes(lessonKey)) {
      return { success: true, alreadyCompleted: true };
    }
    
    // Get roadmap to calculate progress
    const roadmap = ROADMAPS[roadmapId];
    const totalLessons = roadmap.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedCount = (data.completedLessons?.length || 0) + 1;
    const progress = Math.round((completedCount / totalLessons) * 100);
    
    // Update enrollment
    await updateDoc(enrollmentRef, {
      completedLessons: arrayUnion(lessonKey),
      progress: progress,
      lastAccessedAt: serverTimestamp()
    });
    
    // Award XP
    await addXP(userId, XP_CONFIG.rewards.lessonComplete, 'lesson_complete');
    
    // Check for first lesson badge
    if (data.completedLessons?.length === 0) {
      await awardBadge(userId, 'first-lesson');
    }
    
    // Update streak
    await updateStreak(userId);
    
    return { 
      success: true, 
      xpEarned: XP_CONFIG.rewards.lessonComplete,
      progress: progress
    };
    
  } catch (error) {
    console.error("Error completing lesson:", error);
    return { success: false, message: error.message };
  }
}

// ============================================
// TASK PROGRESS
// ============================================

export async function completeTask(userId, roadmapId, moduleId, taskId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    
    if (!enrollmentDoc.exists()) {
      throw new Error('Not enrolled in this roadmap');
    }
    
    const data = enrollmentDoc.data();
    const taskKey = `${moduleId}:${taskId}`;
    
    if (data.completedTasks?.includes(taskKey)) {
      return { success: true, alreadyCompleted: true };
    }
    
    // Find task to get XP reward
    const roadmap = ROADMAPS[roadmapId];
    const module = roadmap.modules.find(m => m.id === moduleId);
    const task = module?.tasks.find(t => t.id === taskId);
    const xpReward = task?.xpReward || XP_CONFIG.rewards.taskComplete;
    
    // Update enrollment
    await updateDoc(enrollmentRef, {
      completedTasks: arrayUnion(taskKey),
      lastAccessedAt: serverTimestamp()
    });
    
    // Award XP
    await addXP(userId, xpReward, 'task_complete');
    
    // Update user stats
    await updateDoc(doc(db, 'users', userId), {
      tasksCompleted: increment(1)
    });
    
    // Check for first project badge
    if (data.completedTasks?.length === 0) {
      await awardBadge(userId, 'first-project');
    }
    
    return { 
      success: true, 
      xpEarned: xpReward 
    };
    
  } catch (error) {
    console.error("Error completing task:", error);
    return { success: false, message: error.message };
  }
}

// ============================================
// QUIZ SYSTEM
// ============================================

export async function submitQuiz(userId, roadmapId, moduleId, quizId, answers, score) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    
    if (!enrollmentDoc.exists()) {
      throw new Error('Not enrolled in this roadmap');
    }
    
    const data = enrollmentDoc.data();
    
    // Get quiz to check passing score
    const roadmap = ROADMAPS[roadmapId];
    const module = roadmap.modules.find(m => m.id === moduleId);
    const quiz = module?.quiz;
    
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    const passed = score >= quiz.passingScore;
    const isPerfect = score === 100;
    
    // Save quiz attempt
    const attemptRef = doc(collection(db, 'users', userId, 'quizAttempts'));
    await setDoc(attemptRef, {
      quizId: quizId,
      roadmapId: roadmapId,
      moduleId: moduleId,
      answers: answers,
      score: score,
      passed: passed,
      attemptedAt: serverTimestamp()
    });
    
    let xpEarned = 0;
    
    if (passed) {
      const quizKey = `${moduleId}:${quizId}`;
      const alreadyPassed = data.completedQuizzes?.includes(quizKey);
      
      if (!alreadyPassed) {
        // First time passing
        await updateDoc(enrollmentRef, {
          completedQuizzes: arrayUnion(quizKey),
          lastAccessedAt: serverTimestamp()
        });
        
        // Award XP
        xpEarned = isPerfect ? XP_CONFIG.rewards.quizPerfect : XP_CONFIG.rewards.quizPass;
        await addXP(userId, xpEarned, isPerfect ? 'quiz_perfect' : 'quiz_pass');
        
        // Check for first quiz badge
        if (!data.completedQuizzes || data.completedQuizzes.length === 0) {
          await awardBadge(userId, 'first-quiz');
        }
        
        // Check if module is complete
        await checkModuleCompletion(userId, roadmapId, moduleId);
      }
    }
    
    return {
      success: true,
      passed: passed,
      score: score,
      xpEarned: xpEarned,
      isPerfect: isPerfect
    };
    
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return { success: false, message: error.message };
  }
}

// ============================================
// MODULE COMPLETION
// ============================================

async function checkModuleCompletion(userId, roadmapId, moduleId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    const data = enrollmentDoc.data();
    
    const roadmap = ROADMAPS[roadmapId];
    const module = roadmap.modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    // Check if all lessons completed
    const moduleLessons = module.lessons.map(l => `${moduleId}:${l.id}`);
    const completedLessons = data.completedLessons || [];
    const allLessonsComplete = moduleLessons.every(l => completedLessons.includes(l));
    
    // Check if quiz passed (if exists)
    const quizComplete = !module.quiz || 
      data.completedQuizzes?.includes(`${moduleId}:${module.quiz.id}`);
    
    if (allLessonsComplete && quizComplete) {
      // Module complete!
      if (!data.completedModules?.includes(moduleId)) {
        await updateDoc(enrollmentRef, {
          completedModules: arrayUnion(moduleId),
          currentModuleIndex: data.currentModuleIndex + 1
        });
        
        // Award XP and badge
        await addXP(userId, XP_CONFIG.rewards.moduleComplete, 'module_complete');
        
        if (module.badge) {
          await awardBadge(userId, module.badge.id, module.badge);
        }
        
        // Update user stats
        await updateDoc(doc(db, 'users', userId), {
          modulesCompleted: increment(1)
        });
        
        // Check for milestone badges
        const totalModules = (data.completedModules?.length || 0) + 1;
        if (totalModules === 5) await awardBadge(userId, 'modules-5');
        if (totalModules === 10) await awardBadge(userId, 'modules-10');
        
        // Check if roadmap is complete
        await checkRoadmapCompletion(userId, roadmapId);
        
        return { moduleCompleted: true, badge: module.badge };
      }
    }
    
    return { moduleCompleted: false };
    
  } catch (error) {
    console.error("Error checking module completion:", error);
    return { moduleCompleted: false };
  }
}

async function checkRoadmapCompletion(userId, roadmapId) {
  try {
    const enrollmentRef = doc(db, 'users', userId, 'enrollments', roadmapId);
    const enrollmentDoc = await getDoc(enrollmentRef);
    const data = enrollmentDoc.data();
    
    const roadmap = ROADMAPS[roadmapId];
    const totalModules = roadmap.modules.length;
    const completedModules = data.completedModules?.length || 0;
    
    if (completedModules >= totalModules) {
      // Roadmap complete!
      await updateDoc(enrollmentRef, {
        status: 'completed',
        completedAt: serverTimestamp(),
        progress: 100
      });
      
      // Award XP
      await addXP(userId, XP_CONFIG.rewards.roadmapComplete, 'roadmap_complete');
      
      // Generate certificate
      await generateCertificate(userId, roadmapId);
      
      // Update user stats
      await updateDoc(doc(db, 'users', userId), {
        roadmapsCompleted: increment(1),
        activeRoadmaps: increment(-1)
      });
      
      return { roadmapCompleted: true };
    }
    
    return { roadmapCompleted: false };
    
  } catch (error) {
    console.error("Error checking roadmap completion:", error);
    return { roadmapCompleted: false };
  }
}

// ============================================
// XP SYSTEM
// ============================================

export async function addXP(userId, amount, reason) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const currentXP = userData?.xpEarned || 0;
    const newXP = currentXP + amount;
    
    const currentLevel = XP_CONFIG.getLevelFromXP(currentXP);
    const newLevel = XP_CONFIG.getLevelFromXP(newXP);
    
    await updateDoc(userRef, {
      xpEarned: increment(amount),
      level: newLevel
    });
    
    // Log XP gain
    const xpLogRef = doc(collection(db, 'users', userId, 'xpLog'));
    await setDoc(xpLogRef, {
      amount: amount,
      reason: reason,
      timestamp: serverTimestamp()
    });
    
    // Check for XP milestones
    if (newXP >= 1000 && currentXP < 1000) {
      await awardBadge(userId, 'xp-1000');
    }
    if (newXP >= 5000 && currentXP < 5000) {
      await awardBadge(userId, 'xp-5000');
    }
    
    return {
      newXP: newXP,
      levelUp: newLevel > currentLevel,
      newLevel: newLevel
    };
    
  } catch (error) {
    console.error("Error adding XP:", error);
    return null;
  }
}

// ============================================
// BADGE SYSTEM
// ============================================

export async function awardBadge(userId, badgeId, customBadge = null) {
  try {
    const badge = customBadge || BADGES[badgeId];
    if (!badge) {
      console.warn("Badge not found:", badgeId);
      return { success: false };
    }
    
    // Check if already earned
    const badgeRef = doc(db, 'users', userId, 'badges', badgeId);
    const badgeDoc = await getDoc(badgeRef);
    
    if (badgeDoc.exists()) {
      return { success: true, alreadyEarned: true };
    }
    
    // Award badge
    await setDoc(badgeRef, {
      ...badge,
      earnedAt: serverTimestamp()
    });
    
    // Update user badge count
    await updateDoc(doc(db, 'users', userId), {
      badgesEarned: increment(1)
    });
    
    // Award bonus XP for badge
    if (badge.xpReward) {
      await addXP(userId, badge.xpReward, 'badge_earned');
    }
    
    return { success: true, badge: badge };
    
  } catch (error) {
    console.error("Error awarding badge:", error);
    return { success: false };
  }
}

export async function getUserBadges(userId) {
  try {
    const badgesRef = collection(db, 'users', userId, 'badges');
    const querySnapshot = await getDocs(badgesRef);
    
    const badges = [];
    querySnapshot.forEach((doc) => {
      badges.push({ id: doc.id, ...doc.data() });
    });
    
    return badges;
  } catch (error) {
    console.error("Error getting badges:", error);
    return [];
  }
}

// ============================================
// STREAK SYSTEM
// ============================================

export async function updateStreak(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const lastActive = userData?.lastActiveDate?.toDate() || new Date(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastActive.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    let newStreak = userData?.streak || 0;
    let streakBroken = false;
    
    if (diffDays === 0) {
      // Same day, no change
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak += 1;
      
      // Award streak XP
      await addXP(userId, XP_CONFIG.rewards.streakDay, 'streak_bonus');
      
      // Check streak milestones
      if (newStreak === 3) await awardBadge(userId, 'streak-3');
      if (newStreak === 7) await awardBadge(userId, 'streak-7');
      if (newStreak === 14) await awardBadge(userId, 'streak-14');
      if (newStreak === 30) await awardBadge(userId, 'streak-30');
      
    } else if (diffDays > 1) {
      // Streak broken
      if (newStreak > 0) {
        streakBroken = true;
      }
      newStreak = 1;
    }
    
    // Update best streak
    const bestStreak = Math.max(userData?.bestStreak || 0, newStreak);
    
    await updateDoc(userRef, {
      streak: newStreak,
      bestStreak: bestStreak,
      lastActiveDate: serverTimestamp()
    });
    
    return {
      streak: newStreak,
      bestStreak: bestStreak,
      streakBroken: streakBroken
    };
    
  } catch (error) {
    console.error("Error updating streak:", error);
    return null;
  }
}

// ============================================
// WEEKLY TASKS
// ============================================

export async function getWeeklyTasks(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    const enrollments = await getEnrolledRoadmaps(userId);
    const activeEnrollment = enrollments.find(e => e.status === 'in-progress');
    
    if (!activeEnrollment) {
      return [];
    }
    
    const currentModule = activeEnrollment.roadmap.modules[activeEnrollment.currentModuleIndex];
    
    return generateWeeklyTasks(currentModule, {
      lessonsThisWeek: userData?.lessonsThisWeek || 0,
      hoursThisWeek: userData?.hoursThisWeek || 0,
      currentStreak: userData?.streak || 0,
      completedTasks: activeEnrollment.completedTasks || [],
      completedQuizzes: activeEnrollment.completedQuizzes || []
    });
    
  } catch (error) {
    