/**
 * CSE ROADMAP HUB - Complete JavaScript Application
 * Version: 1.0.0
 * 
 * A comprehensive learning platform for Computer Science Engineering students
 * Features: Roadmap, Video Tutorials, AI Quiz, Progress Tracking, Notes, Goals
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const CONFIG = {
    API_BASE_URL: '/api',
    QUIZ_API_ENDPOINT: '/api/quiz/generate',
    STORAGE_KEYS: {
        USER_DATA: 'cse_hub_user',
        PROGRESS: 'cse_hub_progress',
        SETTINGS: 'cse_hub_settings',
        NOTES: 'cse_hub_notes',
        GOALS: 'cse_hub_goals',
        QUIZ_HISTORY: 'cse_hub_quiz_history',
        THEME: 'cse_hub_theme'
    },
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 5000,
    AUTO_SAVE_INTERVAL: 30000,
    DEBOUNCE_DELAY: 300
};

// Video Tutorial Data - Curated Best YouTube Tutorials
const VIDEO_TUTORIALS = {
    programming: [
        {
            id: 'c-programming-1',
            title: 'C Programming Tutorial for Beginners',
            channel: 'freeCodeCamp',
            duration: '3:46:13',
            thumbnail: 'https://img.youtube.com/vi/KJgsSFOSQv0/maxresdefault.jpg',
            videoId: 'KJgsSFOSQv0',
            topic: 'c-programming',
            description: 'Complete C programming course covering all fundamentals from scratch.',
            outcome: 'Master C programming basics, pointers, arrays, and file handling'
        },
        {
            id: 'cpp-programming-1',
            title: 'C++ Tutorial for Beginners - Full Course',
            channel: 'freeCodeCamp',
            duration: '4:01:19',
            thumbnail: 'https://img.youtube.com/vi/vLnPwxZdW4Y/maxresdefault.jpg',
            videoId: 'vLnPwxZdW4Y',
            topic: 'cpp-programming',
            description: 'Learn C++ from scratch with this comprehensive tutorial.',
            outcome: 'Understand OOP concepts, classes, inheritance, and polymorphism'
        },
        {
            id: 'cpp-apna-college',
            title: 'C++ Full Course | C++ Tutorial',
            channel: 'Apna College',
            duration: '11:59:59',
            thumbnail: 'https://img.youtube.com/vi/z9bZufPHFLU/maxresdefault.jpg',
            videoId: 'z9bZufPHFLU',
            topic: 'cpp-programming',
            description: 'Complete C++ course in Hindi with practical examples.',
            outcome: 'Build strong foundation in C++ and object-oriented programming'
        },
        {
            id: 'python-programming-1',
            title: 'Python Tutorial - Full Course for Beginners',
            channel: 'freeCodeCamp',
            duration: '4:26:52',
            thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
            videoId: 'rfscVS0vtbw',
            topic: 'python-programming',
            description: 'Learn Python programming from absolute basics to advanced.',
            outcome: 'Write Python programs, understand data structures, and build projects'
        },
        {
            id: 'python-codewithharry',
            title: 'Python Tutorial in Hindi',
            channel: 'CodeWithHarry',
            duration: '9:20:02',
            thumbnail: 'https://img.youtube.com/vi/gfDE2a7MKjA/maxresdefault.jpg',
            videoId: 'gfDE2a7MKjA',
            topic: 'python-programming',
            description: 'Complete Python tutorial in Hindi for beginners.',
            outcome: 'Master Python programming with practical projects'
        }
    ],
    dsa: [
        {
            id: 'dsa-apna-college',
            title: 'Complete DSA Course in C++',
            channel: 'Apna College',
            duration: '45:00:00',
            thumbnail: 'https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg',
            videoId: '8hly31xKli0',
            topic: 'dsa',
            description: 'Master Data Structures and Algorithms with this complete course.',
            outcome: 'Solve complex coding problems and crack technical interviews'
        },
        {
            id: 'dsa-abdul-bari',
            title: 'Algorithms Course - Abdul Bari',
            channel: 'Abdul Bari',
            duration: '12:00:00',
            thumbnail: 'https://img.youtube.com/vi/0IAPZzGSbME/maxresdefault.jpg',
            videoId: '0IAPZzGSbME',
            topic: 'dsa',
            description: 'Learn algorithms with detailed explanations and visualizations.',
            outcome: 'Understand algorithm design, analysis, and optimization'
        },
        {
            id: 'dsa-freecodecamp',
            title: 'Data Structures - Full Course',
            channel: 'freeCodeCamp',
            duration: '8:03:06',
            thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg',
            videoId: 'RBSGKlAvoiM',
            topic: 'dsa',
            description: 'Comprehensive data structures course for beginners.',
            outcome: 'Implement and use various data structures efficiently'
        },
        {
            id: 'dsa-striver',
            title: 'Striver A2Z DSA Course',
            channel: 'take U forward',
            duration: '200+ videos',
            thumbnail: 'https://img.youtube.com/vi/0bHoB32fuj0/maxresdefault.jpg',
            videoId: '0bHoB32fuj0',
            topic: 'dsa',
            description: 'Complete DSA sheet with video explanations.',
            outcome: 'Prepare for FAANG and top product company interviews'
        }
    ],
    core: [
        {
            id: 'os-gate-smashers',
            title: 'Operating System (Complete Playlist)',
            channel: 'Gate Smashers',
            duration: '8:00:00',
            thumbnail: 'https://img.youtube.com/vi/bkSWJJZNgf8/maxresdefault.jpg',
            videoId: 'bkSWJJZNgf8',
            topic: 'os',
            description: 'Complete OS course for GATE and university exams.',
            outcome: 'Master process management, memory, file systems, and scheduling'
        },
        {
            id: 'os-jenny',
            title: 'Operating System Tutorials',
            channel: "Jenny's Lectures",
            duration: '10:00:00',
            thumbnail: 'https://img.youtube.com/vi/vBURTt97EkA/maxresdefault.jpg',
            videoId: 'vBURTt97EkA',
            topic: 'os',
            description: 'OS concepts explained with examples and diagrams.',
            outcome: 'Understand operating system internals and concepts'
        },
        {
            id: 'dbms-gate-smashers',
            title: 'DBMS (Complete Playlist)',
            channel: 'Gate Smashers',
            duration: '6:00:00',
            thumbnail: 'https://img.youtube.com/vi/kBdlM6hNDAE/maxresdefault.jpg',
            videoId: 'kBdlM6hNDAE',
            topic: 'dbms',
            description: 'Complete DBMS course covering SQL, normalization, and transactions.',
            outcome: 'Design databases and write efficient SQL queries'
        },
        {
            id: 'dbms-neso',
            title: 'Database Management System',
            channel: 'Neso Academy',
            duration: '12:00:00',
            thumbnail: 'https://img.youtube.com/vi/6Iu45VZGQDk/maxresdefault.jpg',
            videoId: '6Iu45VZGQDk',
            topic: 'dbms',
            description: 'DBMS concepts for university and competitive exams.',
            outcome: 'Master relational algebra, SQL, and database design'
        },
        {
            id: 'cn-gate-smashers',
            title: 'Computer Networks (Complete Playlist)',
            channel: 'Gate Smashers',
            duration: '8:00:00',
            thumbnail: 'https://img.youtube.com/vi/JFF2vJaN0Cw/maxresdefault.jpg',
            videoId: 'JFF2vJaN0Cw',
            topic: 'cn',
            description: 'Complete computer networks course with OSI and TCP/IP models.',
            outcome: 'Understand network protocols, routing, and security'
        },
        {
            id: 'cn-neso',
            title: 'Computer Networks',
            channel: 'Neso Academy',
            duration: '10:00:00',
            thumbnail: 'https://img.youtube.com/vi/VwN91x5i25g/maxresdefault.jpg',
            videoId: 'VwN91x5i25g',
            topic: 'cn',
            description: 'Networking fundamentals explained clearly.',
            outcome: 'Master networking concepts for GATE and interviews'
        },
        {
            id: 'coa-neso',
            title: 'Computer Organization & Architecture',
            channel: 'Neso Academy',
            duration: '8:00:00',
            thumbnail: 'https://img.youtube.com/vi/Ol8D69VKX2k/maxresdefault.jpg',
            videoId: 'Ol8D69VKX2k',
            topic: 'coa',
            description: 'Complete COA course covering CPU design and memory hierarchy.',
            outcome: 'Understand computer architecture and organization'
        },
        {
            id: 'toc-neso',
            title: 'Theory of Computation',
            channel: 'Neso Academy',
            duration: '6:00:00',
            thumbnail: 'https://img.youtube.com/vi/58N2N7zJGrQ/maxresdefault.jpg',
            videoId: '58N2N7zJGrQ',
            topic: 'toc',
            description: 'Automata theory, formal languages, and Turing machines.',
            outcome: 'Master TOC concepts for GATE preparation'
        }
    ],
    webdev: [
        {
            id: 'webdev-freecodecamp',
            title: 'Web Development Full Course',
            channel: 'freeCodeCamp',
            duration: '12:00:00',
            thumbnail: 'https://img.youtube.com/vi/pQN-pnXPaVg/maxresdefault.jpg',
            videoId: 'pQN-pnXPaVg',
            topic: 'webdev',
            description: 'Complete web development course covering HTML, CSS, JavaScript.',
            outcome: 'Build responsive websites from scratch'
        },
        {
            id: 'html-css-freecodecamp',
            title: 'HTML & CSS Full Course',
            channel: 'freeCodeCamp',
            duration: '11:29:00',
            thumbnail: 'https://img.youtube.com/vi/mU6anWqZJcc/maxresdefault.jpg',
            videoId: 'mU6anWqZJcc',
            topic: 'webdev',
            description: 'Learn HTML and CSS from absolute basics.',
            outcome: 'Create beautiful, responsive web pages'
        },
        {
            id: 'javascript-freecodecamp',
            title: 'JavaScript Full Course',
            channel: 'freeCodeCamp',
            duration: '8:00:00',
            thumbnail: 'https://img.youtube.com/vi/jS4aFq5-91M/maxresdefault.jpg',
            videoId: 'jS4aFq5-91M',
            topic: 'webdev',
            description: 'Complete JavaScript tutorial for beginners.',
            outcome: 'Master JavaScript fundamentals and DOM manipulation'
        },
        {
            id: 'react-freecodecamp',
            title: 'React Course - Beginner\'s Tutorial',
            channel: 'freeCodeCamp',
            duration: '12:00:00',
            thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg',
            videoId: 'bMknfKXIFA8',
            topic: 'webdev',
            description: 'Learn React.js from scratch with projects.',
            outcome: 'Build modern React applications'
        },
        {
            id: 'nodejs-freecodecamp',
            title: 'Node.js and Express.js - Full Course',
            channel: 'freeCodeCamp',
            duration: '8:16:48',
            thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
            videoId: 'Oe421EPjeBE',
            topic: 'webdev',
            description: 'Backend development with Node.js and Express.',
            outcome: 'Create RESTful APIs and server-side applications'
        },
        {
            id: 'mern-codewithharry',
            title: 'MERN Stack Tutorial',
            channel: 'CodeWithHarry',
            duration: '6:00:00',
            thumbnail: 'https://img.youtube.com/vi/WDrU305J1yw/maxresdefault.jpg',
            videoId: 'WDrU305J1yw',
            topic: 'webdev',
            description: 'Full stack development with MongoDB, Express, React, Node.',
            outcome: 'Build full-stack web applications'
        }
    ],
    ml: [
        {
            id: 'ml-freecodecamp',
            title: 'Machine Learning Course for Beginners',
            channel: 'freeCodeCamp',
            duration: '9:52:19',
            thumbnail: 'https://img.youtube.com/vi/NWONeJKn6kc/maxresdefault.jpg',
            videoId: 'NWONeJKn6kc',
            topic: 'ml',
            description: 'Complete machine learning course with Python.',
            outcome: 'Understand ML algorithms and build models'
        },
        {
            id: 'ml-andrew-ng',
            title: 'Machine Learning Specialization',
            channel: 'Stanford Online',
            duration: '60+ hours',
            thumbnail: 'https://img.youtube.com/vi/jGwO_UgTS7I/maxresdefault.jpg',
            videoId: 'jGwO_UgTS7I',
            topic: 'ml',
            description: 'Andrew Ng\'s famous ML course from Stanford.',
            outcome: 'Master ML fundamentals and mathematical concepts'
        },
        {
            id: 'dl-freecodecamp',
            title: 'Deep Learning Crash Course',
            channel: 'freeCodeCamp',
            duration: '4:25:55',
            thumbnail: 'https://img.youtube.com/vi/VyWAvY2CF9c/maxresdefault.jpg',
            videoId: 'VyWAvY2CF9c',
            topic: 'ml',
            description: 'Introduction to deep learning and neural networks.',
            outcome: 'Build deep learning models with TensorFlow'
        },
        {
            id: 'python-ml-sentdex',
            title: 'Python Machine Learning Tutorial',
            channel: 'sentdex',
            duration: '20+ hours',
            thumbnail: 'https://img.youtube.com/vi/OGxgnH8y2NM/maxresdefault.jpg',
            videoId: 'OGxgnH8y2NM',
            topic: 'ml',
            description: 'Practical machine learning with scikit-learn.',
            outcome: 'Apply ML algorithms to real-world problems'
        }
    ]
};

// Topic Data for Roadmap
const ROADMAP_DATA = {
    year1: {
        title: 'Programming Foundations',
        topics: [
            {
                id: 'c-programming',
                name: 'C Programming',
                description: 'Master the fundamentals of programming with C - the mother of all languages.',
                duration: '25 hours',
                difficulty: 'beginner',
                icon: 'C',
                color: '#A8B9CC'
            },
            {
                id: 'cpp-programming',
                name: 'C++ & OOP',
                description: 'Learn object-oriented programming concepts with C++.',
                duration: '30 hours',
                difficulty: 'beginner',
                icon: 'C++',
                color: '#00599C'
            },
            {
                id: 'python-programming',
                name: 'Python Programming',
                description: 'Master Python for versatile programming applications.',
                duration: '20 hours',
                difficulty: 'beginner',
                icon: 'fab fa-python',
                color: '#3776AB'
            },
            {
                id: 'math-cs',
                name: 'Mathematics for CS',
                description: 'Discrete math, linear algebra, and probability fundamentals.',
                duration: '35 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-square-root-alt',
                color: '#FF6B6B'
            },
            {
                id: 'digital-logic',
                name: 'Digital Logic Design',
                description: 'Gates, circuits, Boolean algebra, and combinational logic.',
                duration: '20 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-microchip',
                color: '#9B59B6'
            },
            {
                id: 'intro-cs',
                name: 'Computer Fundamentals',
                description: 'Hardware, software, and basic computer organization.',
                duration: '15 hours',
                difficulty: 'beginner',
                icon: 'fas fa-laptop-code',
                color: '#2ECC71'
            }
        ]
    },
    year2: {
        title: 'Core CS Subjects',
        topics: [
            {
                id: 'dsa',
                name: 'Data Structures & Algorithms',
                description: 'The backbone of programming - arrays, trees, graphs, and algorithmic problem solving.',
                duration: '60 hours',
                difficulty: 'advanced',
                icon: 'fas fa-project-diagram',
                color: '#E74C3C',
                featured: true
            },
            {
                id: 'os',
                name: 'Operating Systems',
                description: 'Process management, memory, file systems, and system calls.',
                duration: '40 hours',
                difficulty: 'advanced',
                icon: 'fas fa-server',
                color: '#3498DB'
            },
            {
                id: 'dbms',
                name: 'Database Management Systems',
                description: 'SQL, normalization, transactions, and database design.',
                duration: '35 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-database',
                color: '#F39C12'
            },
            {
                id: 'cn',
                name: 'Computer Networks',
                description: 'OSI model, TCP/IP, routing, and network protocols.',
                duration: '30 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-network-wired',
                color: '#1ABC9C'
            },
            {
                id: 'toc',
                name: 'Theory of Computation',
                description: 'Automata, formal languages, Turing machines, and computability.',
                duration: '25 hours',
                difficulty: 'advanced',
                icon: 'fas fa-infinity',
                color: '#9B59B6'
            },
            {
                id: 'cd',
                name: 'Compiler Design',
                description: 'Lexical analysis, parsing, code generation, and optimization.',
                duration: '30 hours',
                difficulty: 'advanced',
                icon: 'fas fa-cogs',
                color: '#E67E22'
            },
            {
                id: 'se',
                name: 'Software Engineering',
                description: 'SDLC, Agile, design patterns, and project management.',
                duration: '25 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-tasks',
                color: '#27AE60'
            },
            {
                id: 'coa',
                name: 'Computer Organization & Architecture',
                description: 'CPU design, memory hierarchy, pipelining, and I/O.',
                duration: '35 hours',
                difficulty: 'advanced',
                icon: 'fas fa-memory',
                color: '#8E44AD'
            }
        ]
    },
    year3: {
        title: 'Advanced Topics & Specializations',
        topics: [
            {
                id: 'webdev',
                name: 'Full Stack Web Development',
                description: 'HTML, CSS, JavaScript, React, Node.js, and modern frameworks.',
                duration: '80 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-code',
                color: '#E44D26'
            },
            {
                id: 'mobile',
                name: 'Mobile App Development',
                description: 'Android, iOS, Flutter, and React Native development.',
                duration: '60 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-mobile-alt',
                color: '#3DDC84'
            },
            {
                id: 'ml',
                name: 'Machine Learning & AI',
                description: 'Supervised, unsupervised learning, neural networks, and deep learning.',
                duration: '70 hours',
                difficulty: 'advanced',
                icon: 'fas fa-robot',
                color: '#FF6F00'
            },
            {
                id: 'cloud',
                name: 'Cloud Computing',
                description: 'AWS, Azure, GCP, serverless, and cloud architecture.',
                duration: '45 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-cloud',
                color: '#FF9900'
            },
            {
                id: 'security',
                name: 'Cyber Security',
                description: 'Network security, cryptography, ethical hacking, and penetration testing.',
                duration: '50 hours',
                difficulty: 'advanced',
                icon: 'fas fa-shield-alt',
                color: '#00D4AA'
            },
            {
                id: 'devops',
                name: 'DevOps & CI/CD',
                description: 'Docker, Kubernetes, Jenkins, Git, and automation.',
                duration: '40 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-infinity',
                color: '#326CE5'
            }
        ]
    },
    year4: {
        title: 'Projects & Career Preparation',
        topics: [
            {
                id: 'major-project',
                name: 'Major Project Development',
                description: 'Plan, design, and build a complete final year project.',
                duration: '100 hours',
                difficulty: 'advanced',
                icon: 'fas fa-rocket',
                color: '#6C5CE7'
            },
            {
                id: 'system-design',
                name: 'System Design',
                description: 'Scalability, load balancing, caching, and distributed systems.',
                duration: '40 hours',
                difficulty: 'advanced',
                icon: 'fas fa-sitemap',
                color: '#00B894'
            },
            {
                id: 'interview',
                name: 'Interview Preparation',
                description: 'DSA interviews, behavioral questions, and mock interviews.',
                duration: '50 hours',
                difficulty: 'intermediate',
                icon: 'fas fa-user-tie',
                color: '#FDCB6E'
            },
            {
                id: 'resume',
                name: 'Resume & Portfolio',
                description: 'Build an impressive resume and portfolio website.',
                duration: '10 hours',
                difficulty: 'beginner',
                icon: 'fas fa-file-alt',
                color: '#74B9FF'
            },
            {
                id: 'opensource',
                name: 'Open Source Contribution',
                description: 'Learn to contribute to open source projects effectively.',
                duration: '20 hours',
                difficulty: 'intermediate',
                icon: 'fab fa-github',
                color: '#2D3436'
            },
            {
                id: 'aptitude',
                name: 'Aptitude & Reasoning',
                description: 'Quantitative aptitude, logical reasoning, and verbal ability.',
                duration: '30 hours',
                difficulty: 'beginner',
                icon: 'fas fa-brain',
                color: '#A29BFE'
            }
        ]
    }
};

// Quiz Question Templates for AI Generation
const QUIZ_TOPICS = {
    dsa: {
        name: 'Data Structures & Algorithms',
        subtopics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Sorting', 'Searching', 'Dynamic Programming', 'Recursion']
    },
    os: {
        name: 'Operating Systems',
        subtopics: ['Process Management', 'CPU Scheduling', 'Memory Management', 'Deadlock', 'File Systems', 'Disk Scheduling', 'Virtual Memory', 'Paging', 'Segmentation']
    },
    dbms: {
        name: 'Database Management Systems',
        subtopics: ['SQL', 'Normalization', 'ER Diagrams', 'Transactions', 'ACID Properties', 'Indexing', 'Joins', 'Relational Algebra', 'Concurrency Control']
    },
    cn: {
        name: 'Computer Networks',
        subtopics: ['OSI Model', 'TCP/IP', 'Routing', 'Subnetting', 'DNS', 'HTTP', 'Network Security', 'IP Addressing', 'Protocols']
    },
    oops: {
        name: 'Object-Oriented Programming',
        subtopics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interfaces', 'Design Patterns']
    },
    python: {
        name: 'Python Programming',
        subtopics: ['Variables', 'Data Types', 'Functions', 'Lists', 'Dictionaries', 'OOP in Python', 'File Handling', 'Exception Handling', 'Libraries']
    },
    cpp: {
        name: 'C++ Programming',
        subtopics: ['Pointers', 'References', 'Classes', 'Inheritance', 'STL', 'Templates', 'Memory Management', 'Exception Handling']
    },
    webdev: {
        name: 'Web Development',
        subtopics: ['HTML', 'CSS', 'JavaScript', 'DOM', 'React', 'Node.js', 'REST APIs', 'HTTP Methods', 'Responsive Design']
    },
    ml: {
        name: 'Machine Learning',
        subtopics: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'Neural Networks', 'Deep Learning', 'Feature Engineering']
    },
    se: {
        name: 'Software Engineering',
        subtopics: ['SDLC', 'Agile', 'Scrum', 'Testing', 'Requirements', 'Design Patterns', 'Version Control', 'CI/CD']
    }
};


// ============================================
// MAIN APPLICATION CLASS
// ============================================

class CSEHubApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.user = null;
        this.settings = null;
        this.progress = null;
        this.notes = [];
        this.goals = [];
        this.quizHistory = [];
        this.currentQuiz = null;
        this.quizTimer = null;
        this.sidebarCollapsed = false;
        
        this.init();
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    async init() {
        try {
            // Load stored data
            this.loadStoredData();
            
            // Initialize UI
            this.initializeUI();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load video tutorials
            this.loadVideoTutorials();
            
            // Update dashboard stats
            this.updateDashboardStats();
            
            // Hide preloader
            this.hidePreloader();
            
            // Check for daily reminder
            this.checkDailyReminder();
            
            // Start auto-save
            this.startAutoSave();
            
            console.log('CSE Roadmap Hub initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('error', 'Initialization Error', 'Failed to load the application. Please refresh the page.');
        }
    }

    loadStoredData() {
        // Load user data
        const storedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
        this.user = storedUser ? JSON.parse(storedUser) : this.getDefaultUser();

        // Load settings
        const storedSettings = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
        this.settings = storedSettings ? JSON.parse(storedSettings) : this.getDefaultSettings();

        // Load progress
        const storedProgress = localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
        this.progress = storedProgress ? JSON.parse(storedProgress) : this.getDefaultProgress();

        // Load notes
        const storedNotes = localStorage.getItem(CONFIG.STORAGE_KEYS.NOTES);
        this.notes = storedNotes ? JSON.parse(storedNotes) : [];

        // Load goals
        const storedGoals = localStorage.getItem(CONFIG.STORAGE_KEYS.GOALS);
        this.goals = storedGoals ? JSON.parse(storedGoals) : this.getDefaultGoals();

        // Load quiz history
        const storedQuizHistory = localStorage.getItem(CONFIG.STORAGE_KEYS.QUIZ_HISTORY);
        this.quizHistory = storedQuizHistory ? JSON.parse(storedQuizHistory) : [];

        // Apply theme
        this.applyTheme(this.settings.theme);
    }

    getDefaultUser() {
        return {
            name: 'John Smith',
            email: 'john.smith@example.com',
            branch: 'Computer Science Engineering',
            year: '3rd Year',
            college: 'IIT Mumbai',
            avatar: null,
            joinedDate: new Date().toISOString(),
            streak: 7,
            bestStreak: 15
        };
    }

    getDefaultSettings() {
        return {
            theme: 'dark',
            accentColor: 'blue',
            fontSize: 'medium',
            animations: true,
            compactMode: false,
            pushNotifications: true,
            dailyReminder: true,
            reminderTime: '18:00',
            goalAlerts: true,
            quizReminders: true,
            streakAlerts: true,
            dailyLearningGoal: 60,
            weeklyTarget: 20,
            defaultQuizDifficulty: 'medium',
            playbackSpeed: 1,
            autoplay: true,
            showExplanations: true,
            profileVisibility: 'friends',
            leaderboard: true,
            analytics: true,
            language: 'en',
            timezone: 'Asia/Kolkata',
            dateFormat: 'DD/MM/YYYY',
            shortcuts: true
        };
    }

    getDefaultProgress() {
        return {
            topicsCompleted: ['c-programming', 'cpp-programming', 'math-cs', 'dbms', 'coa'],
            topicsInProgress: ['python-programming', 'digital-logic', 'dsa', 'os', 'cn', 'se', 'webdev', 'ml', 'system-design'],
            videosWatched: [],
            quizzesPassed: 32,
            totalLearningTime: 148 * 60, // in minutes
            lastActive: new Date().toISOString(),
            yearProgress: {
                1: 85,
                2: 62,
                3: 28,
                4: 5
            },
            topicProgress: {
                'c-programming': 100,
                'cpp-programming': 100,
                'python-programming': 65,
                'math-cs': 100,
                'digital-logic': 45,
                'intro-cs': 0,
                'dsa': 45,
                'os': 70,
                'dbms': 100,
                'cn': 55,
                'toc': 0,
                'cd': 0,
                'se': 30,
                'coa': 100,
                'webdev': 40,
                'mobile': 0,
                'ml': 25,
                'cloud': 0,
                'security': 0,
                'devops': 0,
                'major-project': 0,
                'system-design': 15,
                'interview': 0,
                'resume': 0,
                'opensource': 0,
                'aptitude': 0
            },
            dailyActivity: {
                mon: 192,
                tue: 245,
                wed: 138,
                thu: 282,
                fri: 218,
                sat: 172,
                sun: 105
            }
        };
    }

    getDefaultGoals() {
        return {
            daily: [
                { id: 'd1', text: 'Complete Array chapter in DSA', completed: true, category: 'video', createdAt: new Date().toISOString() },
                { id: 'd2', text: 'Take DSA quiz on Trees', completed: false, category: 'quiz', createdAt: new Date().toISOString() },
                { id: 'd3', text: 'Practice 5 coding problems', completed: false, category: 'coding', createdAt: new Date().toISOString() },
                { id: 'd4', text: 'Review DBMS normalization notes', completed: false, category: 'notes', createdAt: new Date().toISOString() }
            ],
            weekly: [
                { id: 'w1', text: 'Complete DSA Trees & Graphs section', completed: false, progress: 60, createdAt: new Date().toISOString() },
                { id: 'w2', text: 'Watch OS Process Management playlist', completed: false, progress: 40, createdAt: new Date().toISOString() },
                { id: 'w3', text: 'Take 3 practice quizzes', completed: true, progress: 100, createdAt: new Date().toISOString() }
            ],
            reminders: [
                { id: 'r1', title: 'Complete DSA Assignment', desc: 'Submit the binary tree implementation', date: new Date().toISOString(), time: '18:00', urgent: true },
                { id: 'r2', title: 'OS Chapter 5 - Deadlock', desc: 'Watch the video lecture and take notes', date: new Date(Date.now() + 86400000).toISOString(), time: '10:00', urgent: false },
                { id: 'r3', title: 'Weekly Revision Session', desc: 'Review all topics covered this week', date: new Date(Date.now() + 5 * 86400000).toISOString(), time: '14:00', urgent: false }
            ]
        };
    }

    // ============================================
    // UI INITIALIZATION
    // ============================================

    initializeUI() {
        // Update user info
        this.updateUserInfo();
        
        // Update greeting
        this.updateGreeting();
        
        // Update progress displays
        this.updateProgressDisplays();
        
        // Apply settings
        this.applySettings();
        
        // Set current date
        this.updateDateDisplays();
    }

    updateUserInfo() {
        // Update name displays
        const userName = document.getElementById('userName');
        const profileName = document.getElementById('profileName');
        const dropdownName = document.getElementById('dropdownName');
        const infoName = document.getElementById('infoName');
        
                if (userName) userName.textContent = this.user.name.split(' ')[0];
        if (profileName) profileName.textContent = this.user.name;
        if (dropdownName) dropdownName.textContent = this.user.name;
        if (infoName) infoName.textContent = this.user.name;

        // Update email displays
        const profileEmail = document.getElementById('profileEmail');
        const dropdownEmail = document.getElementById('dropdownEmail');
        const infoEmail = document.getElementById('infoEmail');
        
        if (profileEmail) profileEmail.textContent = this.user.email;
        if (dropdownEmail) dropdownEmail.textContent = this.user.email;
        if (infoEmail) infoEmail.textContent = this.user.email;

        // Update other profile info
        const infoBranch = document.getElementById('infoBranch');
        const infoYear = document.getElementById('infoYear');
        const infoCollege = document.getElementById('infoCollege');
        const infoJoined = document.getElementById('infoJoined');

        if (infoBranch) infoBranch.textContent = this.user.branch;
        if (infoYear) infoYear.textContent = this.user.year;
        if (infoCollege) infoCollege.textContent = this.user.college;
        if (infoJoined) infoJoined.textContent = this.formatDate(this.user.joinedDate);

        // Update avatar
        this.updateAvatar();

        // Update streak displays
        this.updateStreakDisplays();
    }

    updateAvatar() {
        const avatarImg = document.getElementById('avatarImg');
        const avatarFallback = document.getElementById('avatarFallback');
        const profileImage = document.getElementById('profileImage');
        const profileFallback = document.getElementById('profileFallback');

        const initials = this.user.name.split(' ').map(n => n[0]).join('').toUpperCase();

        if (this.user.avatar) {
            if (avatarImg) {
                avatarImg.src = this.user.avatar;
                avatarImg.style.display = 'block';
            }
            if (avatarFallback) avatarFallback.style.display = 'none';
            if (profileImage) {
                profileImage.src = this.user.avatar;
                profileImage.style.display = 'block';
            }
            if (profileFallback) profileFallback.style.display = 'none';
        } else {
            if (avatarImg) avatarImg.style.display = 'none';
            if (avatarFallback) {
                avatarFallback.textContent = initials;
                avatarFallback.style.display = 'flex';
            }
            if (profileImage) profileImage.style.display = 'none';
            if (profileFallback) {
                profileFallback.textContent = initials;
                profileFallback.style.display = 'flex';
            }
        }
    }

    updateStreakDisplays() {
        const streakCount = document.getElementById('streakCount');
        const currentStreak = document.getElementById('currentStreak');
        const currentStreakDisplay = document.getElementById('currentStreakDisplay');

        if (streakCount) streakCount.textContent = this.user.streak;
        if (currentStreak) currentStreak.textContent = this.user.streak;
        if (currentStreakDisplay) currentStreakDisplay.textContent = this.user.streak;
    }

    updateGreeting() {
        const greeting = document.getElementById('greeting');
        if (!greeting) return;

        const hour = new Date().getHours();
        let greetingText = 'Good Morning';

        if (hour >= 12 && hour < 17) {
            greetingText = 'Good Afternoon';
        } else if (hour >= 17 && hour < 21) {
            greetingText = 'Good Evening';
        } else if (hour >= 21 || hour < 5) {
            greetingText = 'Good Night';
        }

        greeting.textContent = greetingText;
    }

    updateProgressDisplays() {
        // Update topic completion count
        const topicsCompleted = document.getElementById('topicsCompleted');
        if (topicsCompleted) {
            topicsCompleted.textContent = this.progress.topicsCompleted.length;
        }

        // Update hours learned
        const hoursLearned = document.getElementById('hoursLearned');
        if (hoursLearned) {
            hoursLearned.textContent = Math.floor(this.progress.totalLearningTime / 60);
        }

        // Update quiz score
        const quizScore = document.getElementById('quizScore');
        if (quizScore) {
            const avgScore = this.calculateAverageQuizScore();
            quizScore.textContent = `${avgScore}%`;
        }

        // Update videos watched
        const videosWatched = document.getElementById('videosWatched');
        if (videosWatched) {
            videosWatched.textContent = this.progress.videosWatched.length;
        }

        // Update total topics completed display
        const totalTopicsCompleted = document.getElementById('totalTopicsCompleted');
        if (totalTopicsCompleted) {
            totalTopicsCompleted.textContent = this.progress.topicsCompleted.length;
        }
    }

    updateDateDisplays() {
        const todayDate = document.getElementById('todayDate');
        if (todayDate) {
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            todayDate.textContent = new Date().toLocaleDateString('en-US', options);
        }
    }

    calculateAverageQuizScore() {
        if (this.quizHistory.length === 0) return 85; // Default
        const total = this.quizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
        return Math.round(total / this.quizHistory.length);
    }

    applySettings() {
        // Apply font size
        document.documentElement.setAttribute('data-font-size', this.settings.fontSize);

        // Apply compact mode
        if (this.settings.compactMode) {
            document.body.classList.add('compact-mode');
        }

        // Apply animations setting
        if (!this.settings.animations) {
            document.body.classList.add('no-animations');
        }
    }

    applyTheme(theme) {
        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }

        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000);
        }
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    setupEventListeners() {
        // Navigation
        this.setupNavigationListeners();
        
        // Sidebar
        this.setupSidebarListeners();
        
        // Header
        this.setupHeaderListeners();
        
        // Quiz
        this.setupQuizListeners();
        
        // Goals
        this.setupGoalsListeners();
        
        // Notes
        this.setupNotesListeners();
        
        // Profile & Settings
        this.setupProfileSettingsListeners();
        
        // Modals
        this.setupModalListeners();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Roadmap
        this.setupRoadmapListeners();
        
        // Career section
        this.setupCareerListeners();
        
        // Projects section
        this.setupProjectsListeners();

        // FAB
        this.setupFABListeners();
    }

    setupNavigationListeners() {
        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        // Resume learning button
        const resumeLearningBtn = document.getElementById('resumeLearningBtn');
        if (resumeLearningBtn) {
            resumeLearningBtn.addEventListener('click', () => {
                this.resumeLearning();
            });
        }
    }

    setupSidebarListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                this.sidebarCollapsed = !this.sidebarCollapsed;
                sidebar.classList.toggle('collapsed', this.sidebarCollapsed);
            });
        }

        // Mobile menu button
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }
    }

    setupHeaderListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Notification button
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationPanel.classList.toggle('hidden');
            });

            // Close notification panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                    notificationPanel.classList.add('hidden');
                }
            });

            // Mark all as read
            const markAllReadBtn = document.getElementById('markAllReadBtn');
            if (markAllReadBtn) {
                markAllReadBtn.addEventListener('click', () => {
                    this.markAllNotificationsRead();
                });
            }
        }

        // User menu
        const userMenu = document.getElementById('userMenu');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenu && userDropdown) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                userDropdown.classList.remove('active');
            });
        }

        // Global search
        const globalSearch = document.getElementById('globalSearch');
        const searchModal = document.getElementById('searchModal');
        
        if (globalSearch && searchModal) {
            globalSearch.addEventListener('focus', () => {
                this.openSearchModal();
            });
        }

        // Search modal
        if (searchModal) {
            const modalSearchInput = document.getElementById('modalSearchInput');
            const searchModalOverlay = searchModal.querySelector('.search-modal-overlay');

            if (modalSearchInput) {
                modalSearchInput.addEventListener('input', (e) => {
                    this.handleSearch(e.target.value);
                });
            }

            if (searchModalOverlay) {
                searchModalOverlay.addEventListener('click', () => {
                    this.closeSearchModal();
                });
            }
        }
    }

    setupQuizListeners() {
        // Topic selection
        const topicChips = document.querySelectorAll('.topic-chip');
        topicChips.forEach(chip => {
            chip.addEventListener('click', () => {
                topicChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });

        // Difficulty selection
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Question count selection
        const countBtns = document.querySelectorAll('.count-btn');
        countBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                countBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Time selection
        const timeBtns = document.querySelectorAll('.time-btn');
        timeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Start quiz button
        const startQuizBtn = document.getElementById('startQuizBtn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                this.startQuiz();
            });
        }

        // Start quick quiz (from dashboard)
        const startQuickQuiz = document.getElementById('startQuickQuiz');
        if (startQuickQuiz) {
            startQuickQuiz.addEventListener('click', () => {
                this.navigateToSection('quiz');
            });
        }

        // Quiz navigation buttons
        const prevQuestionBtn = document.getElementById('prevQuestionBtn');
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        const skipQuestionBtn = document.getElementById('skipQuestionBtn');
        const submitQuizBtn = document.getElementById('submitQuizBtn');

        if (prevQuestionBtn) {
            prevQuestionBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }

        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        if (skipQuestionBtn) {
            skipQuestionBtn.addEventListener('click', () => {
                this.skipQuestion();
            });
        }

        if (submitQuizBtn) {
            submitQuizBtn.addEventListener('click', () => {
                this.submitQuiz();
            });
        }

        // Results buttons
        const retakeQuizBtn = document.getElementById('retakeQuizBtn');
        const newQuizBtn = document.getElementById('newQuizBtn');
        const reviewAnswersBtn = document.getElementById('reviewAnswersBtn');

        if (retakeQuizBtn) {
            retakeQuizBtn.addEventListener('click', () => {
                this.retakeQuiz();
            });
        }

        if (newQuizBtn) {
            newQuizBtn.addEventListener('click', () => {
                this.resetQuizSetup();
            });
        }

        if (reviewAnswersBtn) {
            reviewAnswersBtn.addEventListener('click', () => {
                this.reviewQuizAnswers();
            });
        }

        // Quiz history button
        const quizHistoryBtn = document.getElementById('quizHistoryBtn');
        if (quizHistoryBtn) {
            quizHistoryBtn.addEventListener('click', () => {
                this.openQuizHistoryModal();
            });
        }
    }

    setupGoalsListeners() {
        // Add new goal button
        const addNewGoalBtn = document.getElementById('addNewGoalBtn');
        const addGoalModal = document.getElementById('addGoalModal');

        if (addNewGoalBtn && addGoalModal) {
            addNewGoalBtn.addEventListener('click', () => {
                this.openModal('addGoalModal');
            });
        }

        // Close goal modal
        const closeGoalModal = document.getElementById('closeGoalModal');
        const cancelGoalBtn = document.getElementById('cancelGoalBtn');

        if (closeGoalModal) {
            closeGoalModal.addEventListener('click', () => {
                this.closeModal('addGoalModal');
            });
        }

        if (cancelGoalBtn) {
            cancelGoalBtn.addEventListener('click', () => {
                this.closeModal('addGoalModal');
            });
        }

        // Save goal button
        const saveGoalBtn = document.getElementById('saveGoalBtn');
        if (saveGoalBtn) {
            saveGoalBtn.addEventListener('click', () => {
                this.saveNewGoal();
            });
        }

        // Add daily goal inline
        const addDailyGoalBtn = document.getElementById('addDailyGoalBtn');
        const addDailyGoalForm = document.getElementById('addDailyGoalForm');

        if (addDailyGoalBtn && addDailyGoalForm) {
            addDailyGoalBtn.addEventListener('click', () => {
                addDailyGoalForm.classList.toggle('hidden');
                const input = document.getElementById('newDailyGoalInput');
                if (input) input.focus();
            });
        }

        // Save daily goal inline
        const saveDailyGoalBtn = document.getElementById('saveDailyGoalBtn');
        if (saveDailyGoalBtn) {
            saveDailyGoalBtn.addEventListener('click', () => {
                this.saveDailyGoalInline();
            });
        }

        // Goal checkboxes
        this.setupGoalCheckboxListeners();

        // Add reminder buttons
        const addReminderBtn = document.getElementById('addReminderBtn');
        const addReminderBtnMain = document.getElementById('addReminderBtnMain');
        const addReminderModal = document.getElementById('addReminderModal');

        if ((addReminderBtn || addReminderBtnMain) && addReminderModal) {
            if (addReminderBtn) {
                addReminderBtn.addEventListener('click', () => {
                    this.openModal('addReminderModal');
                });
            }
            if (addReminderBtnMain) {
                addReminderBtnMain.addEventListener('click', () => {
                    this.openModal('addReminderModal');
                });
            }
        }

        // Close reminder modal
        const closeReminderModal = document.getElementById('closeReminderModal');
        const cancelReminderBtn = document.getElementById('cancelReminderBtn');

        if (closeReminderModal) {
            closeReminderModal.addEventListener('click', () => {
                this.closeModal('addReminderModal');
            });
        }

        if (cancelReminderBtn) {
            cancelReminderBtn.addEventListener('click', () => {
                this.closeModal('addReminderModal');
            });
        }

        // Save reminder button
        const saveReminderBtn = document.getElementById('saveReminderBtn');
        if (saveReminderBtn) {
            saveReminderBtn.addEventListener('click', () => {
                this.saveNewReminder();
            });
        }
    }

    setupGoalCheckboxListeners() {
        const goalCheckboxes = document.querySelectorAll('.goal-checkbox input');
        goalCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const goalItem = e.target.closest('.goal-item');
                const goalId = goalItem?.dataset.goalId;
                if (goalId) {
                    this.toggleGoalCompletion(goalId, e.target.checked);
                }
            });
        });

        // Goal delete buttons
        const deleteButtons = document.querySelectorAll('.goal-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const goalItem = e.target.closest('.goal-item');
                const goalId = goalItem?.dataset.goalId;
                if (goalId) {
                    this.deleteGoal(goalId);
                }
            });
        });
    }

    setupNotesListeners() {
        // Create note button
        const createNoteBtn = document.getElementById('createNoteBtn');
        if (createNoteBtn) {
            createNoteBtn.addEventListener('click', () => {
                this.openNoteEditor();
            });
        }

        // Add note card
        const addNoteCard = document.getElementById('addNoteCard');
        if (addNoteCard) {
            addNoteCard.addEventListener('click', () => {
                this.openNoteEditor();
            });
        }

        // Close note editor
        const closeNoteEditor = document.getElementById('closeNoteEditor');
        if (closeNoteEditor) {
            closeNoteEditor.addEventListener('click', () => {
                this.closeModal('noteEditorModal');
            });
        }

        // Note editor buttons
        const discardNoteBtn = document.getElementById('discardNoteBtn');
        const saveNoteDraftBtn = document.getElementById('saveNoteDraftBtn');
        const publishNoteBtn = document.getElementById('publishNoteBtn');

        if (discardNoteBtn) {
            discardNoteBtn.addEventListener('click', () => {
                this.closeModal('noteEditorModal');
            });
        }

        if (saveNoteDraftBtn) {
            saveNoteDraftBtn.addEventListener('click', () => {
                this.saveNote(true);
            });
        }

        if (publishNoteBtn) {
            publishNoteBtn.addEventListener('click', () => {
                this.saveNote(false);
            });
        }

        // Note filter chips
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.filterNotes(chip.dataset.filter);
            });
        });

        // View options
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.changeNotesView(btn.dataset.view);
            });
        });

        // Notes search
        const notesSearch = document.getElementById('notesSearch');
        if (notesSearch) {
            notesSearch.addEventListener('input', (e) => {
                this.searchNotes(e.target.value);
            });
        }

        // Upload PDF button
        const uploadPdfBtn = document.getElementById('uploadPdfBtn');
        if (uploadPdfBtn) {
            uploadPdfBtn.addEventListener('click', () => {
                this.openModal('pdfUploadModal');
            });
        }

        // PDF upload modal
        const closePdfUpload = document.getElementById('closePdfUpload');
        const cancelPdfUpload = document.getElementById('cancelPdfUpload');
        const pdfUploadZone = document.getElementById('pdfUploadZone');
        const browsePdfBtn = document.getElementById('browsePdfBtn');
        const pdfFileInput = document.getElementById('pdfFileInput');

        if (closePdfUpload) {
            closePdfUpload.addEventListener('click', () => {
                this.closeModal('pdfUploadModal');
            });
        }

        if (cancelPdfUpload) {
            cancelPdfUpload.addEventListener('click', () => {
                this.closeModal('pdfUploadModal');
            });
        }

        if (pdfUploadZone && pdfFileInput) {
            pdfUploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                pdfUploadZone.classList.add('dragover');
            });

            pdfUploadZone.addEventListener('dragleave', () => {
                pdfUploadZone.classList.remove('dragover');
            });

            pdfUploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                pdfUploadZone.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handlePdfUpload(files[0]);
                }
            });

            if (browsePdfBtn) {
                browsePdfBtn.addEventListener('click', () => {
                    pdfFileInput.click();
                });
            }

            pdfFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handlePdfUpload(e.target.files[0]);
                }
            });
        }

        // Existing note cards
        const noteCards = document.querySelectorAll('.note-card:not(.add-note-card):not(.pdf-card)');
        noteCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.note-actions')) {
                    const noteId = card.dataset.noteId;
                    this.openNote(noteId);
                }
            });
        });

        // Editor toolbar buttons
        const toolbarBtns = document.querySelectorAll('.toolbar-btn');
        toolbarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.executeEditorCommand(btn.dataset.action);
            });
        });
    }

    setupProfileSettingsListeners() {
        // Edit profile button
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.openModal('editProfileModal');
            });
        }

        // Close edit profile modal
        const closeEditProfile = document.getElementById('closeEditProfile');
        const cancelEditProfile = document.getElementById('cancelEditProfile');

        if (closeEditProfile) {
            closeEditProfile.addEventListener('click', () => {
                this.closeModal('editProfileModal');
            });
        }

        if (cancelEditProfile) {
            cancelEditProfile.addEventListener('click', () => {
                this.closeModal('editProfileModal');
            });
        }

        // Save profile button
        const saveProfile = document.getElementById('saveProfile');
        if (saveProfile) {
            saveProfile.addEventListener('click', () => {
                this.saveProfile();
            });
        }

        // Change avatar button
        const changeAvatarBtn = document.getElementById('changeAvatarBtn');
        const avatarUpload = document.getElementById('avatarUpload');

        if (changeAvatarBtn && avatarUpload) {
            changeAvatarBtn.addEventListener('click', () => {
                avatarUpload.click();
            });

            avatarUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleAvatarUpload(e.target.files[0]);
                }
            });
        }

        // Theme options
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                this.changeTheme(option.dataset.theme);
            });
        });

        // Color options
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                this.changeAccentColor(option.dataset.color);
            });
        });

        // Font size options
        const fontBtns = document.querySelectorAll('.font-btn');
        fontBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                fontBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.changeFontSize(btn.dataset.size);
            });
        });

        // Toggle switches
        const toggleSwitches = [
            { id: 'animationsToggle', setting: 'animations' },
            { id: 'compactModeToggle', setting: 'compactMode' },
            { id: 'pushNotifToggle', setting: 'pushNotifications' },
            { id: 'dailyReminderToggle', setting: 'dailyReminder' },
            { id: 'goalAlertToggle', setting: 'goalAlerts' },
            { id: 'quizReminderToggle', setting: 'quizReminders' },
            { id: 'streakAlertToggle', setting: 'streakAlerts' },
            { id: 'autoplayToggle', setting: 'autoplay' },
            { id: 'explanationsToggle', setting: 'showExplanations' },
            { id: 'leaderboardToggle', setting: 'leaderboard' },
            { id: 'analyticsToggle', setting: 'analytics' },
            { id: 'shortcutsToggle', setting: 'shortcuts' }
        ];

        toggleSwitches.forEach(({ id, setting }) => {
            const toggle = document.getElementById(id);
            if (toggle) {
                toggle.checked = this.settings[setting];
                toggle.addEventListener('change', (e) => {
                    this.updateSetting(setting, e.target.checked);
                });
            }
        });

        // Select dropdowns
        const selectSettings = [
            { id: 'dailyGoalSelect', setting: 'dailyLearningGoal' },
            { id: 'weeklyTargetSelect', setting: 'weeklyTarget' },
            { id: 'quizDifficultySelect', setting: 'defaultQuizDifficulty' },
            { id: 'playbackSpeedSelect', setting: 'playbackSpeed' },
            { id: 'profileVisibilitySelect', setting: 'profileVisibility' },
            { id: 'languageSelect', setting: 'language' },
            { id: 'timezoneSelect', setting: 'timezone' },
            { id: 'dateFormatSelect', setting: 'dateFormat' }
        ];

        selectSettings.forEach(({ id, setting }) => {
            const select = document.getElementById(id);
            if (select) {
                select.value = this.settings[setting];
                select.addEventListener('change', (e) => {
                    this.updateSetting(setting, e.target.value);
                });
            }
        });

        // Reminder time input
        const reminderTimeInput = document.getElementById('reminderTimeInput');
        if (reminderTimeInput) {
            reminderTimeInput.value = this.settings.reminderTime;
            reminderTimeInput.addEventListener('change', (e) => {
                this.updateSetting('reminderTime', e.target.value);
            });
        }

        // Export data button
        const exportDataBtn = document.getElementById('exportDataBtn');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                this.exportUserData();
            });
        }

        // Clear progress button
        const clearProgressBtn = document.getElementById('clearProgressBtn');
        if (clearProgressBtn) {
            clearProgressBtn.addEventListener('click', () => {
                this.confirmClearProgress();
            });
        }

        // Delete account button
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                this.confirmDeleteAccount();
            });
        }

        // Check for updates button
        const checkUpdatesBtn = document.getElementById('checkUpdatesBtn');
        if (checkUpdatesBtn) {
            checkUpdatesBtn.addEventListener('click', () => {
                this.checkForUpdates();
            });
        }

        // Download progress report
        const downloadProgressBtn = document.getElementById('downloadProgressBtn');
        if (downloadProgressBtn) {
            downloadProgressBtn.addEventListener('click', () => {
                this.downloadProgressReport();
            });
        }
    }

    setupModalListeners() {
        // Close modals when clicking overlay
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const overlay = modal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });
            }
        });

        // Quiz history modal
        const closeHistoryModal = document.getElementById('closeHistoryModal');
        if (closeHistoryModal) {
            closeHistoryModal.addEventListener('click', () => {
                this.closeModal('quizHistoryModal');
            });
        }

        // Topic details modal
        const closeTopicModal = document.getElementById('closeTopicModal');
        if (closeTopicModal) {
            closeTopicModal.addEventListener('click', () => {
                this.closeModal('topicDetailsModal');
            });
        }

        // Video player modal
        const closeVideoModal = document.getElementById('closeVideoModal');
        if (closeVideoModal) {
            closeVideoModal.addEventListener('click', () => {
                this.closeVideoPlayer();
            });
        }

        // Confirmation modal
        const closeConfirmModal = document.getElementById('closeConfirmModal');
        const confirmCancelBtn = document.getElementById('confirmCancelBtn');

        if (closeConfirmModal) {
            closeConfirmModal.addEventListener('click', () => {
                this.closeModal('confirmModal');
            });
        }

        if (confirmCancelBtn) {
            confirmCancelBtn.addEventListener('click', () => {
                this.closeModal('confirmModal');
            });
        }
    }

    setupKeyboardShortcuts() {
        if (!this.settings.shortcuts) return;

        document.addEventListener('keydown', (e) => {
            // Check if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                if (e.key === 'Escape') {
                    e.target.blur();
                }
                return;
            }

            // Command/Ctrl + K - Open search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }

            // Command/Ctrl + D - Toggle theme
            if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }

            // Command/Ctrl + B - Toggle sidebar
            if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                e.preventDefault();
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    this.sidebarCollapsed = !this.sidebarCollapsed;
                    sidebar.classList.toggle('collapsed', this.sidebarCollapsed);
                }
            }

            // Command/Ctrl + N - New note
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                this.navigateToSection('notes');
                setTimeout(() => this.openNoteEditor(), 300);
            }

            // G + D - Go to dashboard
            if (e.key === 'g') {
                const handleSecondKey = (e2) => {
                    if (e2.key === 'd') {
                        e2.preventDefault();
                        this.navigateToSection('dashboard');
                    } else if (e2.key === 'r') {
                        e2.preventDefault();
                        this.navigateToSection('roadmap');
                    } else if (e2.key === 'q') {
                        e2.preventDefault();
                        this.navigateToSection('quiz');
                    }
                    document.removeEventListener('keydown', handleSecondKey);
                };
                setTimeout(() => {
                    document.removeEventListener('keydown', handleSecondKey);
                }, 1000);
                document.addEventListener('keydown', handleSecondKey);
            }

            // Escape - Close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupRoadmapListeners() {
        // Year filter tabs
        const roadmapTabs = document.querySelectorAll('.roadmap-tab');
        roadmapTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                roadmapTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterRoadmapByYear(tab.dataset.year);
            });
        });

        // View toggle
        const viewToggleBtns = document.querySelectorAll('.view-toggle .toggle-btn');
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewToggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Implement view change logic
            });
        });
    }

    setupCareerListeners() {
        // Career tabs
        const careerTabs = document.querySelectorAll('.career-tab');
        careerTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                careerTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showCareerContent(tab.dataset.tab);
            });
        });

        // Resume template selection
        const templateCards = document.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', () => {
                templateCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        // Resume form buttons
        const previewResumeBtn = document.getElementById('previewResumeBtn');
        const downloadResumeBtn = document.getElementById('downloadResumeBtn');

        if (previewResumeBtn) {
            previewResumeBtn.addEventListener('click', () => {
                this.previewResume();
            });
        }

        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener('click', () => {
                this.downloadResume();
            });
        }
    }

    setupProjectsListeners() {
        // Project tabs
        const projectTabs = document.querySelectorAll('.project-tab');
        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                projectTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showProjectsContent(tab.dataset.tab);
            });
        });
    }

    setupFABListeners() {
        const fabMain = document.getElementById('fabMain');
        const fabOptions = document.getElementById('fabOptions');

        if (fabMain && fabOptions) {
            fabMain.addEventListener('click', () => {
                fabMain.classList.toggle('active');
                fabOptions.classList.toggle('hidden');
            });

            const fabOptionBtns = fabOptions.querySelectorAll('.fab-option');
            fabOptionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    this.handleFabAction(action);
                    fabMain.classList.remove('active');
                    fabOptions.classList.add('hidden');
                });
            });
        }
    }

    // ============================================
    // NAVIGATION
    // ============================================

    navigateToSection(section) {
        // Update active nav item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Show/hide sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === section);
        });

        this.currentSection = section;

        // Close mobile sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Section-specific initialization
        this.onSectionEnter(section);
    }

    onSectionEnter(section) {
        switch (section) {
            case 'dashboard':
                this.updateDashboardStats();
                break;
            case 'roadmap':
                this.initializeRoadmap();
                break;
            case 'videos':
                this.loadVideoTutorials();
                break;
            case 'quiz':
                this.resetQuizSetup();
                break;
            case 'progress':
                this.updateProgressCharts();
                break;
            case 'goals':
                this.refreshGoalsDisplay();
                break;
            case 'notes':
                this.refreshNotesDisplay();
                break;
        }
    }

    resumeLearning() {
        // Find the current in-progress topic
        const inProgressTopics = this.progress.topicsInProgress;
        if (inProgressTopics.length > 0) {
            const currentTopic = inProgressTopics[0];
            this.openTopicDetails(currentTopic);
        } else {
            this.navigateToSection('roadmap');
        }
    }

    // ============================================
    // DASHBOARD
    // ============================================

    updateDashboardStats() {
        // Animate stat counters
        this.animateCounter('topicsCompleted', this.progress.topicsCompleted.length);
        this.animateCounter('hoursLearned', Math.floor(this.progress.totalLearningTime / 60));
        this.animateCounter('currentStreak', this.user.streak);

        // Update goal progress
        this.updateGoalProgress();

        // Update activity chart
        this.updateActivityChart();
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateGoalProgress() {
        const dailyGoals = this.goals.daily;
        const completedGoals = dailyGoals.filter(g => g.completed).length;
        const totalGoals = dailyGoals.length;
        const percentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

        // Update circular progress
        const dailyProgressCircle = document.getElementById('dailyProgressCircle');
        if (dailyProgressCircle) {
            const circumference = 339; // 2 * PI * 54 (radius)
            const offset = circumference - (percentage / 100) * circumference;
            dailyProgressCircle.style.strokeDashoffset = offset;
        }

        // Update text
        const dailyProgressValue = document.getElementById('dailyProgressValue');
        if (dailyProgressValue) {
            dailyProgressValue.textContent = `${percentage}%`;
        }

        const goalsCompletedToday = document.getElementById('goalsCompletedToday');
        if (goalsCompletedToday) {
            goalsCompletedToday.textContent = completedGoals;
        }
    }

    updateActivityChart() {
        const activity = this.progress.dailyActivity;
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        
        days.forEach(day => {
            const minutes = activity[day] || 0;
            const maxMinutes = 300; // 5 hours max
            const percentage = Math.min((minutes / maxMinutes) * 100, 100);
            
            // Update bar height (this would need actual bar elements with day-specific IDs)
        });
    }

    // ============================================
    // VIDEO TUTORIALS
    // ============================================

    loadVideoTutorials() {
        const categories = ['programming', 'dsa', 'core', 'webdev'];
        
        categories.forEach(category => {
            const containerId = `${category}Videos`;
            const container = document.getElementById(containerId);
            if (!container) return;

            const videos = VIDEO_TUTORIALS[category] || [];
            
            if (videos.length === 0) {
                container.innerHTML = '<p class="text-secondary">No videos available for this category.</p>';
                return;
            }

            container.innerHTML = videos.map(video => this.createVideoCard(video)).join('');

            // Add click listeners to video cards
            const videoCards = container.querySelectorAll('.video-card');
            videoCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    this.openVideoPlayer(videos[index]);
                });
            });
        });
    }

    createVideoCard(video) {
        const isWatched = this.progress.videosWatched.includes(video.id);
        
        return `
            <div class="video-card" data-video-id="${video.id}">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                    <div class="video-play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <span class="video-duration-badge">${video.duration}</span>
                    ${isWatched ? '<span class="video-watched-badge"><i class="fas fa-check"></i> Watched</span>' : ''}
                </div>
                <div class="video-info">
                    <h4 class="video-title">${video.title}</h4>
                    <div class="video-meta">
                        <span class="video-channel">
                            <i class="fab fa-youtube"></i> ${video.channel}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    openVideoPlayer(video) {
        const modal = document.getElementById('videoPlayerModal');
        if (!modal) return;

        // Update modal content
        const videoModalTitle = document.getElementById('videoModalTitle');
        const videoWrapper = document.getElementById('videoWrapper');
        const videoChannel = document.getElementById('videoChannel');
        const videoDurationBadge = document.getElementById('videoDurationBadge');
        const videoDescription = document.getElementById('videoDescription');

        if (videoModalTitle) {
            videoModalTitle.innerHTML = `<i class="fas fa-play-circle"></i> ${video.title}`;
        }

        if (videoWrapper) {
            videoWrapper.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${video.videoId}?autoplay=1" 
                    title="${video.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        }

        if (videoChannel) {
            videoChannel.innerHTML = `<i class="fab fa-youtube"></i> ${video.channel}`;
        }

        if (videoDurationBadge) {
            videoDurationBadge.innerHTML = `<i class="fas fa-clock"></i> ${video.duration}`;
        }

        if (videoDescription) {
            videoDescription.textContent = video.description;
        }

        // Store current video
        this.currentVideo = video;

        // Mark as watched button
        const markWatchedBtn = document.getElementById('markWatchedBtn');
        if (markWatchedBtn) {
            const isWatched = this.progress.videosWatched.includes(video.id);
            markWatchedBtn.innerHTML = isWatched 
                ? '<i class="fas fa-check-circle"></i> Watched'
                : '<i class="fas fa-check"></i> Mark as Watched';
            
            markWatchedBtn.onclick = () => {
                this.toggleVideoWatched(video.id);
            };
        }

        // Take quiz button
        const takeVideoQuizBtn = document.getElementById('takeVideoQuizBtn');
        if (takeVideoQuizBtn) {
            takeVideoQuizBtn.onclick = () => {
                this.closeVideoPlayer();
                this.navigateToSection('quiz');
                // Pre-select the topic based on video topic
                this.preselectQuizTopic(video.topic);
            };
        }

        this.openModal('videoPlayerModal');
    }

    closeVideoPlayer() {
        const videoWrapper = document.getElementById('videoWrapper');
        if (videoWrapper) {
            videoWrapper.innerHTML = '';
        }
        this.closeModal('videoPlayerModal');
    }

    toggleVideoWatched(videoId) {
        const index = this.progress.videosWatched.indexOf(videoId);
        if (index === -1) {
            this.progress.videosWatched.push(videoId);
            this.showToast('success', 'Video Marked', 'Video marked as watched!');
        } else {
            this.progress.videosWatched.splice(index, 1);
            this.showToast('info', 'Video Unmarked', 'Video removed from watched list.');
        }
        this.saveProgress();
        this.loadVideoTutorials();

        // Update button text
        const markWatchedBtn = document.getElementById('markWatchedBtn');
        if (markWatchedBtn) {
            const isWatched = this.progress.videosWatched.includes(videoId);
            markWatchedBtn.innerHTML = isWatched 
                ? '<i class="fas fa-check-circle"></i> Watched'
                : '<i class="fas fa-check"></i> Mark as Watched';
        }
    }

    // ============================================
    // QUIZ SYSTEM
    // ============================================

    async startQuiz() {
        // Get selected options
        const selectedTopic = document.querySelector('.topic-chip.active')?.dataset.topic || 'dsa';
        const selectedDifficulty = document.querySelector('.difficulty-btn.active')?.dataset.difficulty || 'medium';
        const questionCount = parseInt(document.querySelector('.count-btn.active')?.dataset.count) || 10;
        const timeLimit = parseInt(document.querySelector('.time-btn.active')?.dataset.time) || 10;

        // Show loading state
        const startQuizBtn = document.getElementById('startQuizBtn');
        if (startQuizBtn) {
            startQuizBtn.classList.add('loading');
            startQuizBtn.disabled = true;
        }

        try {
            // Generate quiz questions using AI
            const questions = await this.generateQuizQuestions(selectedTopic, selectedDifficulty, questionCount);

            if (questions && questions.length > 0) {
                this.currentQuiz = {
                    topic: selectedTopic,
                    topicName: QUIZ_TOPICS[selectedTopic]?.name || selectedTopic,
                    difficulty: selectedDifficulty,
                    questions: questions,
                    currentIndex: 0,
                    answers: new Array(questions.length).fill(null),
                    skipped: new Array(questions.length).fill(false),
                    timeLimit: timeLimit * 60, // Convert to seconds
                    timeRemaining: timeLimit * 60,
                    startTime: Date.now()
                };

                // Hide setup panel, show quiz panel
                document.getElementById('quizSetupPanel')?.classList.add('hidden');
                document.getElementById('quizActivePanel')?.classList.remove('hidden');

                // Initialize quiz UI
                this.initializeQuizUI();

                // Start timer if time limit is set
                if (timeLimit > 0) {
                    this.startQuizTimer();
                }

                // Display first question
                this.displayQuestion(0);
            } else {
                throw new Error('Failed to generate questions');
            }
        } catch (error) {
            console.error('Failed to start quiz:', error);
            this.showToast('error', 'Quiz Error', 'Failed to generate quiz. Please try again.');
        } finally {
            if (startQuizBtn) {
                startQuizBtn.classList.remove('loading');
                startQuizBtn.disabled = false;
            }
        }
    }

    async generateQuizQuestions(topic, difficulty, count) {
        // Use the Gemini API through our backend proxy
        try {
            const response = await fetch(CONFIG.QUIZ_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: QUIZ_TOPICS[topic]?.name || topic,
                    subtopics: QUIZ_TOPICS[topic]?.subtopics || [],
                    difficulty: difficulty,
                    count: count
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.questions;
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to sample questions
            return this.getSampleQuestions(topic, difficulty, count);
        }
    }

    getSampleQuestions(topic, difficulty, count) {
        // Sample questions for fallback when API is not available
        const sampleQuestions = {
            dsa: [
                {
                    question: "What is the time complexity of binary search?",
                    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                    correct: 1,
                    explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity."
                },
                {
                    question: "Which data structure uses LIFO (Last In First Out) principle?",
                    options: ["Queue", "Stack", "Array", "Linked List"],
                    correct: 1,
                    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed."
                },
                {
                    question: "What is the worst-case time complexity of QuickSort?",
                    options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
                    correct: 2,
                    explanation: "QuickSort has O(n²) worst-case complexity when the pivot selection consistently creates unbalanced partitions."
                },
                {
                    question: "Which traversal of a Binary Search Tree gives elements in sorted order?",
                    options: ["Preorder", "Postorder", "Inorder", "Level order"],
                    correct: 2,
                    explanation: "Inorder traversal (Left-Root-Right) of a BST visits nodes in ascending order."
                },
                {
                    question: "What is the space complexity of merge sort?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 2,
                    explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging."
                },
                {
                    question: "Which algorithm is used to find the shortest path in a weighted graph?",
                    options: ["BFS", "DFS", "Dijkstra's", "Prim's"],
                    correct: 2,
                    explanation: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph."
                },
                {
                    question: "What is the time complexity of inserting an element at the beginning of an array?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 2,
                    explanation: "Inserting at the beginning requires shifting all existing elements, resulting in O(n) complexity."
                },
                {
                    question: "Which data structure is best suited for implementing a priority queue?",
                    options: ["Array", "Linked List", "Heap", "Stack"],
                    correct: 2,
                    explanation: "Heap provides O(log n) insertion and extraction of min/max, making it ideal for priority queues."
                },
                {
                    question: "What is the maximum number of nodes in a binary tree of height h?",
                    options: ["2^h", "2^(h+1) - 1", "h²", "2h + 1"],
                    correct: 1,
                    explanation: "A complete binary tree of height h can have at most 2^(h+1) - 1 nodes."
                },
                {
                    question: "Which sorting algorithm has the best average-case time complexity?",
                    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
                    correct: 2,
                    explanation: "Merge Sort has O(n log n) average-case complexity, which is optimal for comparison-based sorting."
                }
            ],
            os: [
                {
                    question: "What is a deadlock in operating systems?",
                    options: [
                        "A process that runs indefinitely",
                        "A situation where processes are waiting for each other indefinitely",
                        "A fast process execution",
                        "A memory leak"
                    ],
                    correct: 1,
                    explanation: "Deadlock occurs when processes are waiting for resources held by each other, creating a circular wait."
                },
                {
                    question: "Which scheduling algorithm may cause starvation?",
                    options: ["Round Robin", "FCFS", "Priority Scheduling", "SJF"],
                    correct: 2,
                    explanation: "Priority Scheduling can cause starvation when low-priority processes never get CPU time."
                },
                {
                    question: "What is the purpose of paging in memory management?",
                    options: [
                        "To increase CPU speed",
                        "To eliminate external fragmentation",
                        "To reduce disk space",
                        "To speed up I/O operations"
                    ],
                    correct: 1,
                    explanation: "Paging divides memory into fixed-size pages, eliminating external fragmentation."
                }
            ],
            dbms: [
                {
                    question: "What does ACID stand for in database transactions?",
                    options: [
                        "Atomicity, Consistency, Isolation, Durability",
                        "Addition, Correction, Insertion, Deletion",
                        "Access, Control, Identity, Data",
                        "None of the above"
                    ],
                    correct: 0,
                    explanation: "ACID properties ensure reliable database transactions: Atomicity, Consistency, Isolation, and Durability."
                },
                {
                    question: "Which normal form eliminates transitive dependencies?",
                    options: ["1NF", "2NF", "3NF", "BCNF"],
                    correct: 2,
                    explanation: "Third Normal Form (3NF) removes transitive dependencies on the primary key."
                }
            ],
            cn: [
                {
                    question: "Which layer of the OSI model handles routing?",
                    options: ["Physical", "Data Link", "Network", "Transport"],
                    correct: 2,
                    explanation: "The Network layer (Layer 3) is responsible for routing packets between networks."
                },
                {
                    question: "What is the default port for HTTP?",
                    options: ["21", "22", "80", "443"],
                    correct: 2,
                    explanation: "HTTP uses port 80 by default, while HTTPS uses port 443."
                }
            ]
        };

        const topicQuestions = sampleQuestions[topic] || sampleQuestions.dsa;
        
        // Shuffle and return requested number of questions
        const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    initializeQuizUI() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        // Update header info
        const activeQuizTopic = document.getElementById('activeQuizTopic');
        const activeQuizDifficulty = document.getElementById('activeQuizDifficulty');
        const totalQuestions = document.getElementById('totalQuestions');

        if (activeQuizTopic) {
            activeQuizTopic.innerHTML = `<i class="fas fa-project-diagram"></i> ${quiz.topicName}`;
        }

        if (activeQuizDifficulty) {
            activeQuizDifficulty.textContent = quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1);
            activeQuizDifficulty.className = `quiz-difficulty-badge ${quiz.difficulty}`;
        }

        if (totalQuestions) {
            totalQuestions.textContent = quiz.questions.length;
        }

        // Create question indicators
        const questionIndicators = document.getElementById('questionIndicators');
        if (questionIndicators) {
            questionIndicators.innerHTML = quiz.questions.map((_, index) => 
                `<span class="question-indicator" data-index="${index}"></span>`
            ).join('');
        }

        // Update timer display
        this.updateTimerDisplay();
    }

    displayQuestion(index) {
        const quiz = this.currentQuiz;
        if (!quiz || index < 0 || index >= quiz.questions.length) return;

        const question = quiz.questions[index];
        quiz.currentIndex = index;

        // Update question number
        const currentQuestion = document.getElementById('currentQuestion');
        const qNum = document.getElementById('qNum');
        if (currentQuestion) currentQuestion.textContent = index + 1;
        if (qNum) qNum.textContent = index + 1;

        // Update question text
        const questionText = document.getElementById('questionText');
        if (questionText) {
            questionText.textContent = question.question;
        }

        // Update options
        const optionsContainer = document.getElementById('optionsContainer');
        if (optionsContainer) {
            const letters = ['A', 'B', 'C', 'D'];
            optionsContainer.innerHTML = question.options.map((option, i) => {
                const isSelected = quiz.answers[index] === i;
                return `
                    <button class="option-btn ${isSelected ? 'selected' : ''}" data-option="${i}">
                        <span class="option-letter">${letters[i]}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `;
            }).join('');

            // Add click listeners
            const optionBtns = optionsContainer.querySelectorAll('.option-btn');
            optionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const optionIndex = parseInt(btn.dataset.option);
                    this.selectAnswer(optionIndex);
                });
            });
        }

        // Hide explanation box
        const explanationBox = document.getElementById('explanationBox');
        if (explanationBox) {
            explanationBox.classList.add('hidden');
        }

        // Update progress bar
        const quizProgressFill = document.getElementById('quizProgressFill');
        if (quizProgressFill) {
            const progress = ((index + 1) / quiz.questions.length) * 100;
            quizProgressFill.style.width = `${progress}%`;
        }

        // Update question indicators
        this.updateQuestionIndicators();

        // Update navigation buttons
        this.updateQuizNavigation();
    }

    selectAnswer(optionIndex) {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        quiz.answers[quiz.currentIndex] = optionIndex;
        quiz.skipped[quiz.currentIndex] = false;

        // Update option buttons
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, i) => {
            btn.classList.toggle('selected', i === optionIndex);
        });

        // Update indicators
        this.updateQuestionIndicators();
    }

    updateQuestionIndicators() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        const indicators = document.querySelectorAll('.question-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('current', 'answered', 'skipped');
            
            if (index === quiz.currentIndex) {
                indicator.classList.add('current');
            } else if (quiz.answers[index] !== null) {
                indicator.classList.add('answered');
            } else if (quiz.skipped[index]) {
                indicator.classList.add('skipped');
            }
        });
    }

    updateQuizNavigation() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        const submitBtn = document.getElementById('submitQuizBtn');

        if (prevBtn) {
            prevBtn.disabled = quiz.currentIndex === 0;
        }

        if (nextBtn && submitBtn) {
            if (quiz.currentIndex === quiz.questions.length - 1) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
        }
    }

    previousQuestion() {
        const quiz = this.currentQuiz;
        if (!quiz || quiz.currentIndex <= 0) return;
        this.displayQuestion(quiz.currentIndex - 1);
    }

    nextQuestion() {
        const quiz = this.currentQuiz;
        if (!quiz || quiz.currentIndex >= quiz.questions.length - 1) return;
        this.displayQuestion(quiz.currentIndex + 1);
    }

    skipQuestion() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        quiz.skipped[quiz.currentIndex] = true;
        this.updateQuestionIndicators();
        
        if (quiz.currentIndex < quiz.questions.length - 1) {
            this.nextQuestion();
        }
    }

    startQuizTimer() {
        const quiz = this.currentQuiz;
        if (!quiz || quiz.timeLimit === 0) return;

        this.quizTimer = setInterval(() => {
            quiz.timeRemaining--;
            this.updateTimerDisplay();

            if (quiz.timeRemaining <= 0) {
                clearInterval(this.quizTimer);
                this.submitQuiz();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        const timerDisplay = document.getElementById('timerDisplay');
        const quizTimer = document.getElementById('quizTimer');

        if (timerDisplay) {
            const minutes = Math.floor(quiz.timeRemaining / 60);
            const seconds = quiz.timeRemaining % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Add warning classes
        if (quizTimer) {
            quizTimer.classList.remove('warning', 'danger');
            if (quiz.timeRemaining <= 60) {
                quizTimer.classList.add('danger');
            } else if (quiz.timeRemaining <= 180) {
                quizTimer.classList.add('warning');
            }
        }
    }

    submitQuiz() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        // Stop timer
        if (this.quizTimer) {
            clearInterval(this.quizTimer);
            this.quizTimer = null;
        }

        // Calculate results
        let correct = 0;
        let incorrect = 0;
        let skipped = 0;

        quiz.questions.forEach((question, index) => {
            if (quiz.answers[index] === null || quiz.skipped[index]) {
                skipped++;
            } else if (quiz.answers[index] === question.correct) {
                correct++;
            } else {
                incorrect++;
            }
        });

        const score = Math.round((correct / quiz.questions.length) * 100);
        const timeTaken = quiz.timeLimit > 0 
            ? quiz.timeLimit - quiz.timeRemaining 
            : Math.round((Date.now() - quiz.startTime) / 1000);

        // Store results
        quiz.results = {
            correct,
            incorrect,
            skipped,
            score,
            timeTaken
        };

        // Save to history
        this.saveQuizToHistory({
            topic: quiz.topic,
            topicName: quiz.topicName,
            difficulty: quiz.difficulty,
            score,
            correct,
            total: quiz.questions.length,
            date: new Date().toISOString(),
            timeTaken
        });

        // Show results
        this.showQuizResults();
    }

    showQuizResults() {
        const quiz = this.currentQuiz;
        if (!quiz || !quiz.results) return;

        // Hide quiz panel, show results panel
        document.getElementById('quizActivePanel')?.classList.add('hidden');
        document.getElementById('quizResultsPanel')?.classList.remove('hidden');

        const { correct, incorrect, skipped, score, timeTaken } = quiz.results;

        // Update results icon and title
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');

        if (resultsIcon && resultsTitle && resultsSubtitle) {
            resultsIcon.className = 'results-icon';
            
            if (score >= 80) {
                resultsIcon.classList.add('excellent');
                resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
                resultsTitle.textContent = 'Excellent Performance!';
                resultsSubtitle.textContent = "You've demonstrated strong understanding of this topic.";
            } else if (score >= 60) {
                resultsIcon.classList.add('good');
                resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
                resultsTitle.textContent = 'Good Job!';
                resultsSubtitle.textContent = 'You have a solid grasp of the concepts.';
            } else if (score >= 40) {
                resultsIcon.classList.add('average');
                resultsIcon.innerHTML = '<i class="fas fa-star-half-alt"></i>';
                resultsTitle.textContent = 'Keep Practicing!';
                resultsSubtitle.textContent = 'Review the topics and try again.';
            } else {
                resultsIcon.classList.add('poor');
                resultsIcon.innerHTML = '<i class="fas fa-book"></i>';
                resultsTitle.textContent = 'Time to Study!';
                resultsSubtitle.textContent = 'We recommend reviewing the learning materials.';
            }
        }

        // Update score circle
        const scorePercent = document.getElementById('scorePercent');
        const scoreFillCircle = document.getElementById('scoreFillCircle');

        if (scorePercent) {
            scorePercent.textContent = score;
        }

        if (scoreFillCircle) {
            const circumference = 283; // 2 * PI * 45
            const offset = circumference - (score / 100) * circumference;
            scoreFillCircle.style.strokeDashoffset = offset;
            
            // Update stroke color based on score
            if (score >= 80) {
                scoreFillCircle.style.stroke = 'var(--accent-green)';
            } else if (score >= 60) {
                scoreFillCircle.style.stroke = 'var(--primary-500)';
            } else if (score >= 40) {
                scoreFillCircle.style.stroke = 'var(--accent-yellow)';
            } else {
                scoreFillCircle.style.stroke = 'var(--accent-red)';
            }
        }

        // Update score details
        document.getElementById('correctCount').textContent = correct;
        document.getElementById('incorrectCount').textContent = incorrect;
        document.getElementById('skippedCount').textContent = skipped;
        
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Generate review list
        const reviewList = document.getElementById('reviewList');
        if (reviewList) {
            reviewList.innerHTML = quiz.questions.map((question, index) => {
                let className = 'skipped';
                if (quiz.answers[index] !== null && !quiz.skipped[index]) {
                    className = quiz.answers[index] === question.correct ? 'correct' : 'incorrect';
                }
                return `<div class="review-item ${className}" title="Question ${index + 1}">${index + 1}</div>`;
            }).join('');
        }

        // Show recommendations if score is low
        const recommendationsBox = document.getElementById('recommendationsBox');
        if (recommendationsBox) {
            if (score < 70) {
                recommendationsBox.style.display = 'block';
                const recommendationTopics = document.getElementById('recommendationTopics');
                if (recommendationTopics) {
                    const subtopics = QUIZ_TOPICS[quiz.topic]?.subtopics || [];
                    const randomTopics = subtopics.sort(() => Math.random() - 0.5).slice(0, 3);
                    recommendationTopics.innerHTML = randomTopics.map(t => 
                        `<span class="rec-topic">${t}</span>`
                    ).join('');
                }
            } else {
                recommendationsBox.style.display = 'none';
            }
        }
    }

    retakeQuiz() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        // Reset quiz state
        quiz.currentIndex = 0;
        quiz.answers = new Array(quiz.questions.length).fill(null);
        quiz.skipped = new Array(quiz.questions.length).fill(false);
        quiz.timeRemaining = quiz.timeLimit;
        quiz.startTime = Date.now();
        quiz.results = null;

        // Hide results, show quiz panel
        document.getElementById('quizResultsPanel')?.classList.add('hidden');
        document.getElementById('quizActivePanel')?.classList.remove('hidden');

        // Reinitialize
        this.initializeQuizUI();
        if (quiz.timeLimit > 0) {
            this.startQuizTimer();
        }
        this.displayQuestion(0);
    }

    resetQuizSetup() {
        // Stop any running timer
        if (this.quizTimer) {
            clearInterval(this.quizTimer);
            this.quizTimer = null;
        }

        this.currentQuiz = null;

        // Show setup panel, hide others
        document.getElementById('quizSetupPanel')?.classList.remove('hidden');
        document.getElementById('quizActivePanel')?.classList.add('hidden');
        document.getElementById('quizResultsPanel')?.classList.add('hidden');
    }

    reviewQuizAnswers() {
        // This would open a detailed review of all questions with explanations
        this.showToast('info', 'Feature Coming', 'Detailed review feature is coming soon!');
    }

    saveQuizToHistory(quizResult) {
        this.quizHistory.unshift(quizResult);
        
        // Keep only last 50 quizzes
        if (this.quizHistory.length > 50) {
            this.quizHistory = this.quizHistory.slice(0, 50);
        }
        
        // Update progress
        this.progress.quizzesPassed = this.quizHistory.filter(q => q.score >= 60).length;
        
        this.saveQuizHistory();
        this.saveProgress();
    }

    preselectQuizTopic(topic) {
        const topicChips = document.querySelectorAll('.topic-chip');
        topicChips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.topic === topic);
        });
    }

    openQuizHistoryModal() {
        const modal = document.getElementById('quizHistoryModal');
        const tableBody = document.getElementById('historyTableBody');

                if (modal && tableBody) {
            tableBody.innerHTML = this.quizHistory.map(quiz => `
                <tr>
                    <td>${this.formatDate(quiz.date)}</td>
                    <td>${quiz.topicName}</td>
                    <td><span class="difficulty ${quiz.difficulty}">${quiz.difficulty}</span></td>
                    <td><span class="quiz-score ${quiz.score >= 70 ? 'high' : quiz.score >= 50 ? 'medium' : 'low'}">${quiz.score}%</span></td>
                    <td>${this.formatTime(quiz.timeTaken)}</td>
                    <td>
                        <button class="btn btn-sm btn-ghost" onclick="CSEHub.viewQuizDetails('${quiz.date}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `).join('');

            if (this.quizHistory.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-secondary p-4">
                            <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            No quiz history yet. Take your first quiz!
                        </td>
                    </tr>
                `;
            }

            this.openModal('quizHistoryModal');
        }
    }

    viewQuizDetails(date) {
        const quiz = this.quizHistory.find(q => q.date === date);
        if (quiz) {
            this.showToast('info', 'Quiz Details', `Score: ${quiz.score}% | ${quiz.correct}/${quiz.total} correct`);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ============================================
    // ROADMAP FUNCTIONALITY
    // ============================================

    initializeRoadmap() {
        this.updateTopicCardStates();
    }

    updateTopicCardStates() {
        const topicCards = document.querySelectorAll('.topic-card');
        
        topicCards.forEach(card => {
            const topicId = card.dataset.topic;
            if (!topicId) return;

            const progress = this.progress.topicProgress[topicId] || 0;
            const isCompleted = this.progress.topicsCompleted.includes(topicId);
            const isInProgress = this.progress.topicsInProgress.includes(topicId);

            // Update card classes
            card.classList.remove('completed', 'in-progress', 'locked');
            
            if (isCompleted) {
                card.classList.add('completed');
            } else if (isInProgress) {
                card.classList.add('in-progress');
            } else if (progress === 0 && !isCompleted && !isInProgress) {
                // Check if prerequisites are met (simplified logic)
                const shouldLock = this.shouldLockTopic(topicId);
                if (shouldLock) {
                    card.classList.add('locked');
                }
            }

            // Update progress bar
            const progressBar = card.querySelector('.topic-progress .progress-fill');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            // Update progress text
            const progressSpan = card.querySelector('.topic-progress span');
            if (progressSpan) {
                progressSpan.textContent = `${progress}%`;
            }

            // Update status icon
            const statusIcon = card.querySelector('.topic-status');
            if (statusIcon) {
                statusIcon.className = 'topic-status';
                if (isCompleted) {
                    statusIcon.classList.add('completed');
                    statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                } else if (isInProgress) {
                    statusIcon.classList.add('in-progress');
                    statusIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                } else {
                    statusIcon.classList.add('locked');
                    statusIcon.innerHTML = '<i class="fas fa-lock"></i>';
                }
            }
        });
    }

    shouldLockTopic(topicId) {
        // Define prerequisites for topics
        const prerequisites = {
            'digital-logic': ['c-programming'],
            'intro-cs': ['c-programming'],
            'dsa': ['c-programming', 'cpp-programming'],
            'os': ['c-programming'],
            'dbms': ['c-programming'],
            'cn': ['c-programming'],
            'toc': ['math-cs'],
            'cd': ['toc', 'dsa'],
            'se': ['cpp-programming'],
            'coa': ['digital-logic'],
            'webdev': ['python-programming'],
            'mobile': ['webdev'],
            'ml': ['python-programming', 'math-cs'],
            'cloud': ['webdev', 'cn'],
            'security': ['cn', 'os'],
            'devops': ['webdev'],
            'major-project': ['webdev', 'dsa'],
            'system-design': ['dsa', 'dbms'],
            'interview': ['dsa', 'os', 'dbms'],
            'resume': [],
            'opensource': ['webdev'],
            'aptitude': []
        };

        const topicPrereqs = prerequisites[topicId] || [];
        
        // Check if all prerequisites are completed or in progress
        return topicPrereqs.some(prereq => {
            const prereqProgress = this.progress.topicProgress[prereq] || 0;
            return prereqProgress < 50; // Must be at least 50% complete
        });
    }

    filterRoadmapByYear(year) {
        const roadmapYears = document.querySelectorAll('.roadmap-year');
        
        roadmapYears.forEach(yearSection => {
            if (year === 'all') {
                yearSection.style.display = 'block';
            } else {
                yearSection.style.display = yearSection.dataset.year === year ? 'block' : 'none';
            }
        });
    }

    openTopicDetails(topicId) {
        // Find topic data
        let topicData = null;
        let yearKey = null;

        for (const [year, data] of Object.entries(ROADMAP_DATA)) {
            const topic = data.topics.find(t => t.id === topicId);
            if (topic) {
                topicData = topic;
                yearKey = year;
                break;
            }
        }

        if (!topicData) {
            this.showToast('error', 'Topic Not Found', 'Unable to load topic details.');
            return;
        }

        const modal = document.getElementById('topicDetailsModal');
        if (!modal) return;

        // Update modal content
        const topicModalTitle = document.getElementById('topicModalTitle');
        const topicDuration = document.getElementById('topicDuration');
        const topicVideos = document.getElementById('topicVideos');
        const topicQuizzes = document.getElementById('topicQuizzes');
        const topicDifficulty = document.getElementById('topicDifficulty');
        const topicDescription = document.getElementById('topicDescription');
        const topicOutcomes = document.getElementById('topicOutcomes');
        const topicVideosList = document.getElementById('topicVideosList');

        if (topicModalTitle) {
            topicModalTitle.innerHTML = `<i class="fas fa-book"></i> ${topicData.name}`;
        }

        if (topicDuration) topicDuration.textContent = topicData.duration;
        if (topicVideos) topicVideos.textContent = this.getTopicVideoCount(topicId) + ' videos';
        if (topicQuizzes) topicQuizzes.textContent = '5 quizzes';

        if (topicDifficulty) {
            topicDifficulty.textContent = topicData.difficulty.charAt(0).toUpperCase() + topicData.difficulty.slice(1);
            topicDifficulty.className = `difficulty-badge ${topicData.difficulty}`;
        }

        if (topicDescription) {
            topicDescription.innerHTML = `
                <h4>About this topic</h4>
                <p>${topicData.description}</p>
            `;
        }

        if (topicOutcomes) {
            topicOutcomes.innerHTML = `
                <h4>What you'll learn</h4>
                <ul>
                    <li>Understand fundamental concepts and their applications</li>
                    <li>Solve practical problems using learned techniques</li>
                    <li>Prepare for technical interviews on this topic</li>
                    <li>Build projects showcasing your skills</li>
                </ul>
            `;
        }

        // Load videos for this topic
        if (topicVideosList) {
            const videos = this.getVideosForTopic(topicId);
            topicVideosList.innerHTML = videos.map(video => `
                <div class="video-list-item" onclick="CSEHub.openVideoPlayer(${JSON.stringify(video).replace(/"/g, '&quot;')})">
                    <div class="video-thumb">
                        <img src="${video.thumbnail}" alt="${video.title}">
                        <span class="duration">${video.duration}</span>
                    </div>
                    <div class="video-details">
                        <span class="video-name">${video.title}</span>
                        <span class="video-channel-name">${video.channel}</span>
                    </div>
                    <div class="video-status">
                        ${this.progress.videosWatched.includes(video.id) ? '<i class="fas fa-check-circle"></i>' : ''}
                    </div>
                </div>
            `).join('');

            if (videos.length === 0) {
                topicVideosList.innerHTML = '<p class="text-secondary text-center p-4">No videos available for this topic yet.</p>';
            }
        }

        // Setup action buttons
        const startTopicBtn = document.getElementById('startTopicBtn');
        const takeTopicQuizBtn = document.getElementById('takeTopicQuizBtn');

        if (startTopicBtn) {
            startTopicBtn.onclick = () => {
                this.closeModal('topicDetailsModal');
                this.startLearning(topicId);
            };
        }

        if (takeTopicQuizBtn) {
            takeTopicQuizBtn.onclick = () => {
                this.closeModal('topicDetailsModal');
                this.navigateToSection('quiz');
                this.preselectQuizTopic(topicId);
            };
        }

        this.openModal('topicDetailsModal');
    }

    getTopicVideoCount(topicId) {
        let count = 0;
        for (const category of Object.values(VIDEO_TUTORIALS)) {
            count += category.filter(v => v.topic === topicId).length;
        }
        return count;
    }

    getVideosForTopic(topicId) {
        const videos = [];
        for (const category of Object.values(VIDEO_TUTORIALS)) {
            videos.push(...category.filter(v => v.topic === topicId));
        }
        return videos;
    }

    startLearning(topicId) {
        // Add to in-progress if not already
        if (!this.progress.topicsInProgress.includes(topicId) && 
            !this.progress.topicsCompleted.includes(topicId)) {
            this.progress.topicsInProgress.push(topicId);
        }

        // Navigate to videos section with topic filter
        this.navigateToSection('videos');
        
        // Find and play the first video for this topic
        const videos = this.getVideosForTopic(topicId);
        if (videos.length > 0) {
            setTimeout(() => {
                this.openVideoPlayer(videos[0]);
            }, 500);
        }

        this.saveProgress();
        this.showToast('success', 'Learning Started', `Started learning ${this.getTopicName(topicId)}!`);
    }

    getTopicName(topicId) {
        for (const data of Object.values(ROADMAP_DATA)) {
            const topic = data.topics.find(t => t.id === topicId);
            if (topic) return topic.name;
        }
        return topicId;
    }

    updateTopicProgress(topicId, progress) {
        this.progress.topicProgress[topicId] = Math.min(100, Math.max(0, progress));

        if (progress >= 100 && !this.progress.topicsCompleted.includes(topicId)) {
            this.progress.topicsCompleted.push(topicId);
            
            const inProgressIndex = this.progress.topicsInProgress.indexOf(topicId);
            if (inProgressIndex > -1) {
                this.progress.topicsInProgress.splice(inProgressIndex, 1);
            }

            this.showToast('success', 'Topic Completed! 🎉', `You've completed ${this.getTopicName(topicId)}!`);
        }

        this.saveProgress();
        this.updateTopicCardStates();
    }

    // ============================================
    // GOALS & REMINDERS
    // ============================================

    refreshGoalsDisplay() {
        this.renderDailyGoals();
        this.renderWeeklyGoals();
        this.renderReminders();
        this.updateGoalProgress();
    }

    renderDailyGoals() {
        const container = document.getElementById('dailyGoalsList');
        if (!container) return;

        container.innerHTML = this.goals.daily.map(goal => `
            <div class="goal-item ${goal.completed ? 'completed' : ''}" data-goal-id="${goal.id}">
                <label class="goal-checkbox">
                    <input type="checkbox" ${goal.completed ? 'checked' : ''}>
                    <span class="checkmark">
                        <i class="fas fa-check"></i>
                    </span>
                </label>
                <div class="goal-content">
                    <span class="goal-text">${goal.text}</span>
                    <span class="goal-meta">
                        <i class="fas fa-${this.getGoalCategoryIcon(goal.category)}"></i> ${this.capitalizeFirst(goal.category)}
                    </span>
                </div>
                <button class="goal-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.setupGoalCheckboxListeners();
    }

    renderWeeklyGoals() {
        const container = document.getElementById('weeklyGoalsList');
        if (!container) return;

        container.innerHTML = this.goals.weekly.map(goal => `
            <div class="goal-item ${goal.completed ? 'completed' : ''}" data-goal-id="${goal.id}">
                <label class="goal-checkbox">
                    <input type="checkbox" ${goal.completed ? 'checked' : ''}>
                    <span class="checkmark">
                        <i class="fas fa-check"></i>
                    </span>
                </label>
                <div class="goal-content">
                    <span class="goal-text">${goal.text}</span>
                    <span class="goal-meta">
                        <i class="fas fa-chart-line"></i> ${goal.progress || 0}% done
                    </span>
                </div>
                <div class="goal-progress-mini">
                    <div class="progress-fill" style="width: ${goal.progress || 0}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderReminders() {
        const container = document.getElementById('remindersListMain');
        if (!container) return;

        container.innerHTML = this.goals.reminders.map(reminder => `
            <div class="reminder-card ${reminder.urgent ? 'urgent' : ''}" data-reminder-id="${reminder.id}">
                <div class="reminder-time-badge">
                    <i class="fas fa-clock"></i>
                    <span>${this.formatReminderDate(reminder.date, reminder.time)}</span>
                </div>
                <h4 class="reminder-title">${reminder.title}</h4>
                <p class="reminder-desc">${reminder.desc}</p>
                <div class="reminder-actions">
                    <button class="btn btn-sm btn-ghost" onclick="CSEHub.completeReminder('${reminder.id}')">
                        <i class="fas fa-check"></i> Done
                    </button>
                    <button class="btn btn-sm btn-ghost" onclick="CSEHub.snoozeReminder('${reminder.id}')">
                        <i class="fas fa-clock"></i> Snooze
                    </button>
                </div>
            </div>
        `).join('');
    }

    getGoalCategoryIcon(category) {
        const icons = {
            video: 'play-circle',
            quiz: 'brain',
            coding: 'code',
            notes: 'sticky-note',
            project: 'project-diagram',
            other: 'tasks'
        };
        return icons[category] || 'tasks';
    }

    formatReminderDate(date, time) {
        const reminderDate = new Date(date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let dateStr = '';
        if (reminderDate.toDateString() === today.toDateString()) {
            dateStr = 'Today';
        } else if (reminderDate.toDateString() === tomorrow.toDateString()) {
            dateStr = 'Tomorrow';
        } else {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            dateStr = reminderDate.toLocaleDateString('en-US', options);
        }

        return `${dateStr}, ${time}`;
    }

    toggleGoalCompletion(goalId, completed) {
        // Check daily goals
        const dailyGoal = this.goals.daily.find(g => g.id === goalId);
        if (dailyGoal) {
            dailyGoal.completed = completed;
            this.saveGoals();
            this.updateGoalProgress();

            if (completed) {
                this.showToast('success', 'Goal Completed! 🎉', 'Keep up the great work!');
            }
            return;
        }

        // Check weekly goals
        const weeklyGoal = this.goals.weekly.find(g => g.id === goalId);
        if (weeklyGoal) {
            weeklyGoal.completed = completed;
            if (completed) {
                weeklyGoal.progress = 100;
            }
            this.saveGoals();

            if (completed) {
                this.showToast('success', 'Weekly Goal Completed! 🎉', 'Amazing progress!');
            }
        }
    }

    deleteGoal(goalId) {
        // Try to find and delete from daily goals
        const dailyIndex = this.goals.daily.findIndex(g => g.id === goalId);
        if (dailyIndex > -1) {
            this.goals.daily.splice(dailyIndex, 1);
            this.saveGoals();
            this.refreshGoalsDisplay();
            this.showToast('info', 'Goal Deleted', 'Goal has been removed.');
            return;
        }

        // Try to find and delete from weekly goals
        const weeklyIndex = this.goals.weekly.findIndex(g => g.id === goalId);
        if (weeklyIndex > -1) {
            this.goals.weekly.splice(weeklyIndex, 1);
            this.saveGoals();
            this.refreshGoalsDisplay();
            this.showToast('info', 'Goal Deleted', 'Goal has been removed.');
        }
    }

    saveNewGoal() {
        const title = document.getElementById('goalTitle')?.value.trim();
        const type = document.querySelector('input[name="goalType"]:checked')?.value || 'daily';
        const category = document.getElementById('goalCategory')?.value || 'other';
        const date = document.getElementById('goalDate')?.value;
        const notes = document.getElementById('goalNotes')?.value.trim();

        if (!title) {
            this.showToast('error', 'Error', 'Please enter a goal title.');
            return;
        }

        const newGoal = {
            id: `goal_${Date.now()}`,
            text: title,
            category: category,
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: date || null,
            notes: notes || null
        };

        if (type === 'daily') {
            this.goals.daily.push(newGoal);
        } else if (type === 'weekly') {
            newGoal.progress = 0;
            this.goals.weekly.push(newGoal);
        }

        this.saveGoals();
        this.closeModal('addGoalModal');
        this.refreshGoalsDisplay();
        this.showToast('success', 'Goal Added', 'New goal has been added successfully!');

        // Clear form
        document.getElementById('goalTitle').value = '';
        document.getElementById('goalNotes').value = '';
        document.getElementById('goalDate').value = '';
    }

    saveDailyGoalInline() {
        const input = document.getElementById('newDailyGoalInput');
        const text = input?.value.trim();

        if (!text) {
            return;
        }

        const newGoal = {
            id: `goal_${Date.now()}`,
            text: text,
            category: 'other',
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.goals.daily.push(newGoal);
        this.saveGoals();
        this.refreshGoalsDisplay();

        // Clear and hide form
        input.value = '';
        document.getElementById('addDailyGoalForm')?.classList.add('hidden');
        
        this.showToast('success', 'Goal Added', 'New daily goal added!');
    }

    saveNewReminder() {
        const title = document.getElementById('reminderTitle')?.value.trim();
        const desc = document.getElementById('reminderDesc')?.value.trim();
        const date = document.getElementById('reminderDate')?.value;
        const time = document.getElementById('reminderTime')?.value;
        const repeat = document.getElementById('reminderRepeat')?.value || 'none';

        if (!title || !date || !time) {
            this.showToast('error', 'Error', 'Please fill in all required fields.');
            return;
        }

        const newReminder = {
            id: `reminder_${Date.now()}`,
            title: title,
            desc: desc || '',
            date: new Date(date).toISOString(),
            time: time,
            repeat: repeat,
            urgent: new Date(date).toDateString() === new Date().toDateString()
        };

        this.goals.reminders.push(newReminder);
        this.saveGoals();
        this.closeModal('addReminderModal');
        this.refreshGoalsDisplay();
        this.showToast('success', 'Reminder Set', 'Reminder has been added!');

        // Clear form
        document.getElementById('reminderTitle').value = '';
        document.getElementById('reminderDesc').value = '';
        document.getElementById('reminderDate').value = '';
        document.getElementById('reminderTime').value = '';
    }

    completeReminder(reminderId) {
        const index = this.goals.reminders.findIndex(r => r.id === reminderId);
        if (index > -1) {
            this.goals.reminders.splice(index, 1);
            this.saveGoals();
            this.refreshGoalsDisplay();
            this.showToast('success', 'Reminder Completed', 'Great job staying on track!');
        }
    }

    snoozeReminder(reminderId) {
        const reminder = this.goals.reminders.find(r => r.id === reminderId);
        if (reminder) {
            // Snooze for 1 hour
            const currentDate = new Date(reminder.date);
            const [hours, minutes] = reminder.time.split(':');
            currentDate.setHours(parseInt(hours) + 1, parseInt(minutes));
            
            reminder.time = currentDate.toTimeString().slice(0, 5);
            reminder.urgent = false;
            
            this.saveGoals();
            this.refreshGoalsDisplay();
            this.showToast('info', 'Reminder Snoozed', 'Reminder snoozed for 1 hour.');
        }
    }

    // ============================================
    // NOTES FUNCTIONALITY
    // ============================================

    refreshNotesDisplay() {
        this.renderNotes();
    }

    renderNotes() {
        const container = document.getElementById('notesGrid');
        if (!container) return;

        // Get add note card HTML
        const addNoteCard = `
            <div class="note-card add-note-card" id="addNoteCard">
                <div class="add-note-content">
                    <i class="fas fa-plus-circle"></i>
                    <span>Add New Note</span>
                </div>
            </div>
        `;

        // Generate note cards
        const noteCards = this.notes.map(note => this.createNoteCard(note)).join('');

        container.innerHTML = noteCards + addNoteCard;

        // Reattach event listeners
        const addNoteCardEl = document.getElementById('addNoteCard');
        if (addNoteCardEl) {
            addNoteCardEl.addEventListener('click', () => {
                this.openNoteEditor();
            });
        }

        // Add click listeners to note cards
        const noteCardElements = container.querySelectorAll('.note-card:not(.add-note-card):not(.pdf-card)');
        noteCardElements.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.note-actions')) {
                    const noteId = card.dataset.noteId;
                    this.openNote(noteId);
                }
            });
        });
    }

    createNoteCard(note) {
        const topicClass = note.topic === 'os' ? 'os' : 
                          note.topic === 'dbms' ? 'dbms' : 
                          note.topic === 'cn' ? 'cn' : '';

        const tags = note.tags ? note.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';

        if (note.type === 'pdf') {
            return `
                <div class="note-card pdf-card" data-note-id="${note.id}" data-topic="${note.topic}">
                    <div class="note-header">
                        <span class="note-topic-badge ${topicClass}">${note.topic.toUpperCase()}</span>
                        <div class="note-actions">
                            <button class="note-action-btn" title="Download" onclick="CSEHub.downloadNote('${note.id}')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="note-action-btn" title="Delete" onclick="CSEHub.deleteNote('${note.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="pdf-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-footer">
                        <span class="note-date"><i class="fas fa-file"></i> ${note.size || 'N/A'}</span>
                        <span class="note-date"><i class="fas fa-clock"></i> ${this.timeAgo(note.createdAt)}</span>
                    </div>
                </div>
            `;
        }

        return `
            <div class="note-card" data-note-id="${note.id}" data-topic="${note.topic}">
                <div class="note-header">
                    <span class="note-topic-badge ${topicClass}">${note.topic.toUpperCase()}</span>
                    <div class="note-actions">
                        <button class="note-action-btn ${note.pinned ? 'pinned' : ''}" title="${note.pinned ? 'Unpin' : 'Pin'}" onclick="CSEHub.togglePinNote('${note.id}')">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                        <button class="note-action-btn" title="Delete" onclick="CSEHub.deleteNote('${note.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <h3 class="note-title">${note.title}</h3>
                <p class="note-preview">${this.stripHtml(note.content).substring(0, 150)}...</p>
                <div class="note-footer">
                    <span class="note-date"><i class="fas fa-clock"></i> ${this.timeAgo(note.createdAt)}</span>
                    <div class="note-tags">${tags}</div>
                </div>
            </div>
        `;
    }

    openNoteEditor(noteId = null) {
        const modal = document.getElementById('noteEditorModal');
        if (!modal) return;

        const titleInput = document.getElementById('noteEditorTitleInput');
        const contentEditor = document.getElementById('noteContentEditor');
        const tagsInput = document.getElementById('noteTagsInput');
        const topicSelect = document.getElementById('noteTopic');
        const modalTitle = document.getElementById('noteEditorTitle');

        if (noteId) {
            // Edit existing note
            const note = this.notes.find(n => n.id === noteId);
            if (note) {
                if (titleInput) titleInput.value = note.title;
                if (contentEditor) contentEditor.innerHTML = note.content;
                if (tagsInput) tagsInput.value = note.tags ? note.tags.join(', ') : '';
                if (topicSelect) topicSelect.value = note.topic;
                if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Note';
                
                this.currentEditingNote = noteId;
            }
        } else {
            // Create new note
            if (titleInput) titleInput.value = '';
            if (contentEditor) contentEditor.innerHTML = '<p>Start writing your notes here...</p>';
            if (tagsInput) tagsInput.value = '';
            if (topicSelect) topicSelect.value = 'dsa';
            if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-edit"></i> Create Note';
            
            this.currentEditingNote = null;
        }

        this.openModal('noteEditorModal');

        // Focus on title input
        setTimeout(() => {
            if (titleInput) titleInput.focus();
        }, 300);
    }

    openNote(noteId) {
        this.openNoteEditor(noteId);
    }

    saveNote(isDraft = false) {
        const titleInput = document.getElementById('noteEditorTitleInput');
        const contentEditor = document.getElementById('noteContentEditor');
        const tagsInput = document.getElementById('noteTagsInput');
        const topicSelect = document.getElementById('noteTopic');

        const title = titleInput?.value.trim();
        const content = contentEditor?.innerHTML;
        const tags = tagsInput?.value.split(',').map(t => t.trim()).filter(t => t);
        const topic = topicSelect?.value || 'dsa';

        if (!title) {
            this.showToast('error', 'Error', 'Please enter a title for your note.');
            return;
        }

        if (this.currentEditingNote) {
            // Update existing note
            const note = this.notes.find(n => n.id === this.currentEditingNote);
            if (note) {
                note.title = title;
                note.content = content;
                note.tags = tags;
                note.topic = topic;
                note.updatedAt = new Date().toISOString();
                note.isDraft = isDraft;
            }
        } else {
            // Create new note
            const newNote = {
                id: `note_${Date.now()}`,
                title: title,
                content: content,
                tags: tags,
                topic: topic,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                pinned: false,
                isDraft: isDraft,
                type: 'note'
            };
            this.notes.unshift(newNote);
        }

        this.saveNotes();
        this.closeModal('noteEditorModal');
        this.refreshNotesDisplay();
        
        this.showToast('success', isDraft ? 'Draft Saved' : 'Note Saved', 
            isDraft ? 'Your draft has been saved.' : 'Your note has been saved successfully!');
    }

    togglePinNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            note.pinned = !note.pinned;
            
            // Sort notes: pinned first
            this.notes.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return 0;
            });

            this.saveNotes();
            this.refreshNotesDisplay();
            this.showToast('info', note.pinned ? 'Note Pinned' : 'Note Unpinned', '');
        }
    }

    deleteNote(noteId) {
        const index = this.notes.findIndex(n => n.id === noteId);
        if (index > -1) {
            this.notes.splice(index, 1);
            this.saveNotes();
            this.refreshNotesDisplay();
            this.showToast('info', 'Note Deleted', 'Note has been removed.');
        }
    }

    downloadNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            // For PDF notes, we would trigger a download
            // For text notes, we can create a downloadable file
            if (note.type === 'pdf' && note.fileData) {
                // Download PDF
                const link = document.createElement('a');
                link.href = note.fileData;
                link.download = note.title;
                link.click();
            } else {
                // Download as text file
                const content = `# ${note.title}\n\n${this.stripHtml(note.content)}`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${note.title}.txt`;
                link.click();
                URL.revokeObjectURL(url);
            }
            this.showToast('success', 'Download Started', 'Your note is being downloaded.');
        }
    }

    filterNotes(filter) {
        const noteCards = document.querySelectorAll('.note-card:not(.add-note-card)');
        noteCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
            } else {
                card.style.display = card.dataset.topic === filter ? '' : 'none';
            }
        });
    }

    searchNotes(query) {
        const lowerQuery = query.toLowerCase();
        const noteCards = document.querySelectorAll('.note-card:not(.add-note-card)');
        
        noteCards.forEach(card => {
            const noteId = card.dataset.noteId;
            const note = this.notes.find(n => n.id === noteId);
            
            if (note) {
                const matches = note.title.toLowerCase().includes(lowerQuery) ||
                               (note.content && note.content.toLowerCase().includes(lowerQuery)) ||
                               (note.tags && note.tags.some(t => t.toLowerCase().includes(lowerQuery)));
                
                card.style.display = matches ? '' : 'none';
            }
        });
    }

    changeNotesView(view) {
        const container = document.getElementById('notesGrid');
        if (container) {
            container.classList.toggle('list-view', view === 'list');
        }
    }

    handlePdfUpload(file) {
        if (file.type !== 'application/pdf') {
            this.showToast('error', 'Invalid File', 'Please upload a PDF file.');
            return;
        }

        const uploadPreview = document.getElementById('uploadPreview');
        const uploadZone = document.getElementById('pdfUploadZone');
        const uploadFileName = document.getElementById('uploadFileName');
        const uploadFileSize = document.getElementById('uploadFileSize');
        const uploadPdfConfirmBtn = document.getElementById('uploadPdfConfirmBtn');

        if (uploadZone) uploadZone.style.display = 'none';
        if (uploadPreview) uploadPreview.classList.remove('hidden');
        if (uploadFileName) uploadFileName.textContent = file.name;
        if (uploadFileSize) uploadFileSize.textContent = this.formatFileSize(file.size);
        if (uploadPdfConfirmBtn) uploadPdfConfirmBtn.disabled = false;

        // Store file for upload
        this.pendingPdfUpload = file;

        // Setup confirm upload button
        if (uploadPdfConfirmBtn) {
            uploadPdfConfirmBtn.onclick = () => {
                this.confirmPdfUpload();
            };
        }

        // Setup remove file button
        const removeFileBtn = document.getElementById('removeFileBtn');
        if (removeFileBtn) {
            removeFileBtn.onclick = () => {
                this.cancelPdfUpload();
            };
        }
    }

    confirmPdfUpload() {
        if (!this.pendingPdfUpload) return;

        const file = this.pendingPdfUpload;
        const topic = document.getElementById('pdfTopic')?.value || 'dsa';

        // Read file as data URL
        const reader = new FileReader();
        reader.onload = (e) => {
            const newNote = {
                id: `pdf_${Date.now()}`,
                title: file.name,
                topic: topic,
                type: 'pdf',
                size: this.formatFileSize(file.size),
                fileData: e.target.result,
                createdAt: new Date().toISOString()
            };

            this.notes.unshift(newNote);
            this.saveNotes();
            this.closeModal('pdfUploadModal');
            this.refreshNotesDisplay();
            this.resetPdfUpload();
            this.showToast('success', 'PDF Uploaded', 'Your PDF has been added to notes.');
        };

        reader.readAsDataURL(file);
    }

    cancelPdfUpload() {
        this.resetPdfUpload();
    }

    resetPdfUpload() {
        this.pendingPdfUpload = null;
        
        const uploadPreview = document.getElementById('uploadPreview');
        const uploadZone = document.getElementById('pdfUploadZone');
        const uploadPdfConfirmBtn = document.getElementById('uploadPdfConfirmBtn');
        const pdfFileInput = document.getElementById('pdfFileInput');

        if (uploadPreview) uploadPreview.classList.add('hidden');
        if (uploadZone) uploadZone.style.display = '';
        if (uploadPdfConfirmBtn) uploadPdfConfirmBtn.disabled = true;
        if (pdfFileInput) pdfFileInput.value = '';
    }

    executeEditorCommand(action) {
        switch (action) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'underline':
                document.execCommand('underline', false, null);
                break;
            case 'list':
                document.execCommand('insertUnorderedList', false, null);
                break;
            case 'numbered':
                document.execCommand('insertOrderedList', false, null);
                break;
            case 'code':
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const code = document.createElement('code');
                    code.style.background = 'var(--bg-tertiary)';
                    code.style.padding = '2px 6px';
                    code.style.borderRadius = '4px';
                    code.style.fontFamily = 'var(--font-mono)';
                    range.surroundContents(code);
                }
                break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
        }
    }

    // ============================================
    // PROFILE & SETTINGS
    // ============================================

    saveProfile() {
        const editName = document.getElementById('editName')?.value.trim();
        const editEmail = document.getElementById('editEmail')?.value.trim();
        const editBranch = document.getElementById('editBranch')?.value;
        const editYear = document.getElementById('editYear')?.value;
        const editCollege = document.getElementById('editCollege')?.value.trim();

        if (!editName || !editEmail) {
            this.showToast('error', 'Error', 'Name and email are required.');
            return;
        }

        this.user.name = editName;
        this.user.email = editEmail;
        this.user.branch = this.getBranchName(editBranch);
        this.user.year = this.getYearName(editYear);
        this.user.college = editCollege;

        this.saveUser();
        this.updateUserInfo();
        this.closeModal('editProfileModal');
        this.showToast('success', 'Profile Updated', 'Your profile has been updated successfully!');
    }

    getBranchName(code) {
        const branches = {
            'cse': 'Computer Science Engineering',
            'it': 'Information Technology',
            'ece': 'Electronics & Communication',
            'ee': 'Electrical Engineering',
            'me': 'Mechanical Engineering'
        };
        return branches[code] || code;
    }

    getYearName(year) {
        const years = {
            '1': '1st Year',
            '2': '2nd Year',
            '3': '3rd Year',
            '4': '4th Year'
        };
        return years[year] || year;
    }

    handleAvatarUpload(file) {
        if (!file.type.startsWith('image/')) {
            this.showToast('error', 'Invalid File', 'Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.user.avatar = e.target.result;
            this.saveUser();
            this.updateAvatar();
            this.showToast('success', 'Avatar Updated', 'Your profile picture has been updated!');
        };
        reader.readAsDataURL(file);
    }

    toggleTheme() {
        const currentTheme = this.settings.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.changeTheme(newTheme);
    }

    changeTheme(theme) {
        this.settings.theme = theme;
        this.applyTheme(theme);
        this.saveSettings();

        // Update theme option buttons
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    changeAccentColor(color) {
        this.settings.accentColor = color;
        // Apply accent color (would need CSS custom properties update)
        this.saveSettings();
    }

    changeFontSize(size) {
        this.settings.fontSize = size;
        document.documentElement.setAttribute('data-font-size', size);
        this.saveSettings();
    }

    updateSetting(setting, value) {
        this.settings[setting] = value;
        this.saveSettings();

        // Apply setting-specific changes
        switch (setting) {
            case 'animations':
                document.body.classList.toggle('no-animations', !value);
                break;
            case 'compactMode':
                document.body.classList.toggle('compact-mode', value);
                break;
        }
    }

    exportUserData() {
        const data = {
            user: this.user,
            settings: this.settings,
            progress: this.progress,
            notes: this.notes,
            goals: this.goals,
            quizHistory: this.quizHistory,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cse_hub_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        this.showToast('success', 'Data Exported', 'Your data has been exported successfully!');
    }

    confirmClearProgress() {
        this.openConfirmModal(
            'Clear All Progress',
            'Are you sure you want to clear all your learning progress? This action cannot be undone.',
            () => {
                this.progress = this.getDefaultProgress();
                this.saveProgress();
                this.updateProgressDisplays();
                this.showToast('info', 'Progress Cleared', 'Your learning progress has been reset.');
            }
        );
    }

    confirmDeleteAccount() {
        this.openConfirmModal(
            'Delete Account',
            'Are you sure you want to delete your account? All your data will be permanently removed. This action cannot be undone.',
            () => {
                // Clear all local storage
                Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });

                this.showToast('info', 'Account Deleted', 'Your account has been deleted.');
                
                // Reload the page
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        );
    }

    checkForUpdates() {
        this.showToast('info', 'Up to Date', 'You are running the latest version (v1.0.0).');
    }

    downloadProgressReport() {
        // Generate a simple progress report
        const report = `
CSE ROADMAP HUB - PROGRESS REPORT
Generated: ${new Date().toLocaleString()}
=====================================

USER: ${this.user.name}
EMAIL: ${this.user.email}
BRANCH: ${this.user.branch}
YEAR: ${this.user.year}

LEARNING STATISTICS
-------------------
Topics Completed: ${this.progress.topicsCompleted.length}
Topics In Progress: ${this.progress.topicsInProgress.length}
Videos Watched: ${this.progress.videosWatched.length}
Quizzes Passed: ${this.progress.quizzesPassed}
Total Learning Time: ${Math.floor(this.progress.totalLearningTime / 60)} hours
Current Streak: ${this.user.streak} days
Best Streak: ${this.user.bestStreak} days

YEAR-WISE PROGRESS
------------------
1st Year: ${this.progress.yearProgress[1]}%
2nd Year: ${this.progress.yearProgress[2]}%
3rd Year: ${this.progress.yearProgress[3]}%
4th Year: ${this.progress.yearProgress[4]}%

COMPLETED TOPICS
----------------
${this.progress.topicsCompleted.map(t => `• ${this.getTopicName(t)}`).join('\n')}

IN-PROGRESS TOPICS
------------------
${this.progress.topicsInProgress.map(t => `• ${this.getTopicName(t)} (${this.progress.topicProgress[t] || 0}%)`).join('\n')}

QUIZ HISTORY (Last 10)
----------------------
${this.quizHistory.slice(0, 10).map(q => `• ${q.topicName} - ${q.score}% (${this.formatDate(q.date)})`).join('\n')}
        `;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `progress_report_${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        URL.revokeObjectURL(url);

        this.showToast('success', 'Report Downloaded', 'Your progress report has been downloaded.');
    }

    // ============================================
    // CAREER SECTION
    // ============================================

    showCareerContent(tab) {
        const contents = document.querySelectorAll('.career-content');
        contents.forEach(content => {
            content.classList.toggle('active', content.id === `${tab}Content`);
        });
    }

    previewResume() {
        this.showToast('info', 'Coming Soon', 'Resume preview feature is coming soon!');
    }

    downloadResume() {
        this.showToast('info', 'Coming Soon', 'Resume download feature is coming soon!');
    }

    // ============================================
    // PROJECTS SECTION
    // ============================================

    showProjectsContent(tab) {
        const containers = {
            'mini': 'miniProjectsContainer',
            'major': 'majorProjectsContainer',
            'opensource': 'opensourceContainer'
        };

        Object.entries(containers).forEach(([key, id]) => {
            const container = document.getElementById(id);
            if (container) {
                container.classList.toggle('hidden', key !== tab);
            }
        });
    }

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================

    openSearchModal() {
        const searchModal = document.getElementById('searchModal');
        if (searchModal) {
            searchModal.classList.remove('hidden');
            const modalSearchInput = document.getElementById('modalSearchInput');
            if (modalSearchInput) {
                modalSearchInput.focus();
            }
        }
    }

    closeSearchModal() {
        const searchModal = document.getElementById('searchModal');
        if (searchModal) {
            searchModal.classList.add('hidden');
        }
    }

    handleSearch(query) {
        const resultsSection = document.getElementById('searchResultsSection');
        const resultsList = document.getElementById('searchResultsList');

        if (!query.trim()) {
            if (resultsSection) resultsSection.style.display = 'none';
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = [];

        // Search topics
        for (const data of Object.values(ROADMAP_DATA)) {
            for (const topic of data.topics) {
                if (topic.name.toLowerCase().includes(lowerQuery) ||
                    topic.description.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'topic',
                        title: topic.name,
                        meta: topic.description.substring(0, 60) + '...',
                        icon: 'fas fa-book',
                        action: () => this.openTopicDetails(topic.id)
                    });
                }
            }
        }

        // Search videos
        for (const category of Object.values(VIDEO_TUTORIALS)) {
            for (const video of category) {
                if (video.title.toLowerCase().includes(lowerQuery) ||
                    video.channel.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'video',
                        title: video.title,
                        meta: video.channel,
                        icon: 'fas fa-play-circle',
                        action: () => {
                            this.closeSearchModal();
                            this.openVideoPlayer(video);
                        }
                    });
                }
            }
        }

        // Search notes
        for (const note of this.notes) {
            if (note.title.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'note',
                    title: note.title,
                    meta: note.topic.toUpperCase(),
                    icon: 'fas fa-sticky-note',
                    action: () => {
                        this.closeSearchModal();
                        this.navigateToSection('notes');
                        setTimeout(() => this.openNote(note.id), 300);
                    }
                });
            }
        }

        // Display results
        if (resultsSection && resultsList) {
            if (results.length > 0) {
                resultsSection.style.display = 'block';
                resultsList.innerHTML = results.slice(0, 10).map((result, index) => `
                    <div class="search-result-item" data-result-index="${index}">
                        <div class="search-result-icon">
                            <i class="${result.icon}"></i>
                        </div>
                        <div class="search-result-info">
                            <div class="search-result-title">${result.title}</div>
                            <div class="search-result-meta">${result.meta}</div>
                        </div>
                    </div>
                `).join('');

                // Add click handlers
                const resultItems = resultsList.querySelectorAll('.search-result-item');
                resultItems.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        results[index].action();
                        this.closeSearchModal();
                    });
                });
            } else {
                resultsSection.style.display = 'block';
                resultsList.innerHTML = `
                    <div class="text-center text-secondary p-4">
                        <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                        No results found for "${query}"
                    </div>
                `;
            }
        }
    }

    // ============================================
    // NOTIFICATIONS
    // ============================================

    markAllNotificationsRead() {
        const notifications = document.querySelectorAll('.notification-item.unread');
        notifications.forEach(notif => {
            notif.classList.remove('unread');
        });

        const badge = document.getElementById('notifBadge');
        if (badge) {
            badge.style.display = 'none';
        }

        this.showToast('info', 'Notifications', 'All notifications marked as read.');
    }

    checkDailyReminder() {
        if (!this.settings.dailyReminder) return;

        const now = new Date();
        const [hours, minutes] = this.settings.reminderTime.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);

        // Check if it's time for reminder (within 5 minutes)
        const diff = Math.abs(now - reminderTime);
        if (diff < 5 * 60 * 1000) {
            // Check if we've already shown today's reminder
            const lastReminder = localStorage.getItem('lastDailyReminder');
            if (lastReminder !== now.toDateString()) {
                this.showToast('info', 'Daily Reminder 📚', "Time to continue your learning journey!");
                localStorage.setItem('lastDailyReminder', now.toDateString());
            }
        }
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        
        const searchModal = document.getElementById('searchModal');
        if (searchModal && !searchModal.classList.contains('hidden')) {
            this.closeSearchModal();
        }

        const notificationPanel = document.getElementById('notificationPanel');
        if (notificationPanel && !notificationPanel.classList.contains('hidden')) {
            notificationPanel.classList.add('hidden');
        }

        document.body.style.overflow = '';
    }

    openConfirmModal(title, message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        const modalTitle = document.getElementById('confirmModalTitle');
        const modalMessage = document.getElementById('confirmModalMessage');
        const confirmBtn = document.getElementById('confirmActionBtn');

        if (modalTitle) modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${title}`;
        if (modalMessage) modalMessage.textContent = message;

        if (confirmBtn) {
            confirmBtn.onclick = () => {
                onConfirm();
                this.closeModal('confirmModal');
            };
        }

        this.openModal('confirmModal');
    }

    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toast.remove();
            });
        }

        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, CONFIG.TOAST_DURATION);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        
        return this.formatDate(dateString);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    debounce(func, wait) {
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

    handleFabAction(action) {
        switch (action) {
            case 'quiz':
                this.navigateToSection('quiz');
                break;
            case 'note':
                this.navigateToSection('notes');
                setTimeout(() => this.openNoteEditor(), 300);
                break;
            case 'goal':
                this.navigateToSection('goals');
                setTimeout(() => this.openModal('addGoalModal'), 300);
                break;
        }
    }

    // ============================================
    // DATA PERSISTENCE
    // ============================================

    saveUser() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(this.user));
    }

    saveSettings() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    }

    saveProgress() {
        this.progress.lastActive = new Date().toISOString();
        localStorage.setItem(CONFIG.STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    }

    saveNotes() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.NOTES, JSON.stringify(this.notes));
    }

    saveGoals() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.GOALS, JSON.stringify(this.goals));
    }

    saveQuizHistory() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(this.quizHistory));
    }

    startAutoSave() {
        setInterval(() => {
            this.saveProgress();
        }, CONFIG.AUTO_SAVE_INTERVAL);
    }

    updateProgressCharts() {
        // Update all progress-related charts and displays
        this.updateDashboardStats();
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

// Create global instance
let CSEHub;

document.addEventListener('DOMContentLoaded', () => {
    CSEHub = new CSEHubApp();
    
    // Make it globally accessible for onclick handlers
    window.CSEHub = CSEHub;
});

// Handle visibility change (update streak when returning to page)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && CSEHub) {
        CSEHub.progress.lastActive = new Date().toISOString();
        CSEHub.saveProgress();
    }
});

// Handle before unload (save data)
window.addEventListener('beforeunload', () => {
    if (CSEHub) {
        CSEHub.saveProgress();
        CSEHub.saveGoals();
        CSEHub.saveNotes();
    }
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js').then(reg => {
        //     console.log('Service Worker registered');
        // }).catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}