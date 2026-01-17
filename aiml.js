/**
 * ============================================
 * AI-ML ROADMAP HUB - Complete JavaScript
 * ============================================
 * Features:
 * - Progress tracking with localStorage
 * - Dynamic quiz generation
 * - Video player modal
 * - Theme switching
 * - Toast notifications
 * - Smooth animations
 * - Real-time updates
 * ============================================
 */

// ==========================================
// CONFIGURATION & DATA
// ==========================================

const CONFIG = {
    STORAGE_KEYS: {
        PROGRESS: 'aiml_progress',
        THEME: 'aiml_theme',
        GOALS: 'aiml_goals',
        STREAK: 'aiml_streak',
        QUIZ_SCORES: 'aiml_quiz_scores',
        USER: 'aiml_user'
    },
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    AUTO_SAVE_INTERVAL: 30000
};

// Complete Roadmap Data with Real YouTube Videos
const ROADMAP_DATA = {
    foundations: {
        id: 'foundations',
        title: 'Foundations',
        description: 'Build your programming and mathematical foundation',
        icon: '🏗️',
        topics: [
            {
                id: 'python-basics',
                title: 'Python Programming Fundamentals',
                description: 'Learn Python from scratch - variables, data types, control flow, functions, and OOP concepts.',
                videoId: 'rfscVS0vtbw',
                videoTitle: 'Learn Python - Full Course for Beginners',
                channel: 'freeCodeCamp',
                duration: '4:26:52',
                thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
                goal: 'Master Python syntax and write basic programs',
                estimatedTime: '2 weeks',
                difficulty: 'beginner',
                resources: [
                    { title: 'Python Documentation', url: 'https://docs.python.org/3/' },
                    { title: 'Python Practice', url: 'https://www.hackerrank.com/domains/python' }
                ]
            },
            {
                id: 'python-advanced',
                title: 'Advanced Python Concepts',
                description: 'Deep dive into advanced Python - decorators, generators, context managers, and more.',
                videoId: 'HGOBQPFzWKo',
                videoTitle: 'Intermediate Python Programming',
                channel: 'freeCodeCamp',
                duration: '5:55:46',
                thumbnail: 'https://img.youtube.com/vi/HGOBQPFzWKo/maxresdefault.jpg',
                goal: 'Write Pythonic code and understand advanced concepts',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'linear-algebra',
                title: 'Linear Algebra for Machine Learning',
                description: 'Essential linear algebra concepts - vectors, matrices, eigenvalues, and transformations.',
                videoId: 'fNk_zzaMoSs',
                videoTitle: 'Linear Algebra - Full College Course',
                channel: 'freeCodeCamp',
                duration: '11:39:00',
                thumbnail: 'https://img.youtube.com/vi/fNk_zzaMoSs/maxresdefault.jpg',
                goal: 'Understand matrix operations and vector spaces',
                estimatedTime: '3 weeks',
                difficulty: 'intermediate',
                resources: [
                    { title: '3Blue1Brown Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' }
                ]
            },
            {
                id: 'probability-stats',
                title: 'Probability & Statistics',
                description: 'Probability theory, distributions, hypothesis testing, and statistical inference.',
                videoId: 'xxpc-HPKN28',
                videoTitle: 'Statistics - Full University Course',
                channel: 'freeCodeCamp',
                duration: '8:15:00',
                thumbnail: 'https://img.youtube.com/vi/xxpc-HPKN28/maxresdefault.jpg',
                goal: 'Apply statistical methods to data analysis',
                estimatedTime: '2 weeks',
                difficulty: 'intermediate',
                resources: [
                    { title: 'StatQuest YouTube', url: 'https://www.youtube.com/c/joshstarmer' }
                ]
            },
            {
                id: 'calculus',
                title: 'Calculus for Machine Learning',
                description: 'Derivatives, gradients, chain rule, and optimization - essential for understanding ML algorithms.',
                videoId: 'HfACrKJ_Y2w',
                videoTitle: 'Calculus 1 - Full College Course',
                channel: 'freeCodeCamp',
                duration: '11:53:00',
                thumbnail: 'https://img.youtube.com/vi/HfACrKJ_Y2w/maxresdefault.jpg',
                goal: 'Understand gradients and optimization concepts',
                estimatedTime: '2 weeks',
                difficulty: 'intermediate',
                resources: []
            }
        ]
    },
    dataHandling: {
        id: 'data-handling',
        title: 'Data Handling',
        description: 'Master data manipulation and visualization',
        icon: '📊',
        topics: [
            {
                id: 'numpy',
                title: 'NumPy for Numerical Computing',
                description: 'Master NumPy arrays, broadcasting, vectorization, and numerical operations.',
                videoId: 'QUT1VHiLmmI',
                videoTitle: 'NumPy Tutorial - Complete Course',
                channel: 'freeCodeCamp',
                duration: '1:00:00',
                thumbnail: 'https://img.youtube.com/vi/QUT1VHiLmmI/maxresdefault.jpg',
                goal: 'Perform efficient numerical computations with NumPy',
                estimatedTime: '3 days',
                difficulty: 'beginner',
                resources: [
                    { title: 'NumPy Documentation', url: 'https://numpy.org/doc/' }
                ]
            },
            {
                id: 'pandas',
                title: 'Pandas for Data Analysis',
                description: 'DataFrames, data cleaning, manipulation, grouping, and merging operations.',
                videoId: 'vmEHCJofslg',
                videoTitle: 'Pandas Tutorial - Complete Course',
                channel: 'Keith Galli',
                duration: '1:00:27',
                thumbnail: 'https://img.youtube.com/vi/vmEHCJofslg/maxresdefault.jpg',
                goal: 'Analyze and manipulate datasets effectively',
                estimatedTime: '1 week',
                difficulty: 'beginner',
                resources: [
                    { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/' }
                ]
            },
            {
                id: 'matplotlib',
                title: 'Matplotlib & Data Visualization',
                description: 'Create stunning visualizations - plots, charts, histograms, and custom graphics.',
                videoId: '3Xc3CA655Y4',
                videoTitle: 'Matplotlib Tutorial - Complete Course',
                channel: 'freeCodeCamp',
                duration: '1:20:00',
                thumbnail: 'https://img.youtube.com/vi/3Xc3CA655Y4/maxresdefault.jpg',
                goal: 'Create professional data visualizations',
                estimatedTime: '4 days',
                difficulty: 'beginner',
                resources: []
            },
            {
                id: 'seaborn',
                title: 'Seaborn for Statistical Visualization',
                description: 'Advanced statistical visualizations with Seaborn - heatmaps, pair plots, and more.',
                videoId: '6GUZXDef2U0',
                videoTitle: 'Seaborn Tutorial - Complete Course',
                channel: 'Derek Banas',
                duration: '1:30:00',
                thumbnail: 'https://img.youtube.com/vi/6GUZXDef2U0/maxresdefault.jpg',
                goal: 'Create advanced statistical visualizations',
                estimatedTime: '3 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'eda',
                title: 'Exploratory Data Analysis',
                description: 'Complete EDA workflow - data profiling, pattern discovery, and insights extraction.',
                videoId: 'xi0vhXFPegw',
                videoTitle: 'Exploratory Data Analysis with Python',
                channel: 'freeCodeCamp',
                duration: '1:45:00',
                thumbnail: 'https://img.youtube.com/vi/xi0vhXFPegw/maxresdefault.jpg',
                goal: 'Perform comprehensive data exploration',
                estimatedTime: '4 days',
                difficulty: 'intermediate',
                resources: []
            }
        ]
    },
    machineLearning: {
        id: 'machine-learning',
        title: 'Machine Learning',
        description: 'Learn core ML algorithms and techniques',
        icon: '🤖',
        topics: [
            {
                id: 'ml-intro',
                title: 'Introduction to Machine Learning',
                description: 'Understand ML fundamentals - types of learning, workflow, and key concepts.',
                videoId: 'Gv9_4yMHFhI',
                videoTitle: 'Machine Learning Course for Beginners',
                channel: 'freeCodeCamp',
                duration: '9:52:00',
                thumbnail: 'https://img.youtube.com/vi/Gv9_4yMHFhI/maxresdefault.jpg',
                goal: 'Understand the complete ML pipeline',
                estimatedTime: '2 weeks',
                difficulty: 'beginner',
                resources: [
                    { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable/' }
                ]
            },
            {
                id: 'linear-regression',
                title: 'Linear & Polynomial Regression',
                description: 'Simple and multiple linear regression, polynomial features, and regularization.',
                videoId: 'VmbA0lUNVYk',
                videoTitle: 'Linear Regression - StatQuest',
                channel: 'StatQuest',
                duration: '27:00',
                thumbnail: 'https://img.youtube.com/vi/VmbA0lUNVYk/maxresdefault.jpg',
                goal: 'Build and evaluate regression models',
                estimatedTime: '4 days',
                difficulty: 'beginner',
                resources: []
            },
            {
                id: 'logistic-regression',
                title: 'Logistic Regression & Classification',
                description: 'Binary and multiclass classification, sigmoid function, and decision boundaries.',
                videoId: 'yIYKR4sgzI8',
                videoTitle: 'Logistic Regression - StatQuest',
                channel: 'StatQuest',
                duration: '19:00',
                thumbnail: 'https://img.youtube.com/vi/yIYKR4sgzI8/maxresdefault.jpg',
                goal: 'Implement classification algorithms',
                estimatedTime: '4 days',
                difficulty: 'beginner',
                resources: []
            },
            {
                id: 'decision-trees',
                title: 'Decision Trees & Random Forests',
                description: 'Tree-based models, ensemble methods, feature importance, and hyperparameter tuning.',
                videoId: '_L39rN6gz7Y',
                videoTitle: 'Decision Trees - StatQuest',
                channel: 'StatQuest',
                duration: '18:00',
                thumbnail: 'https://img.youtube.com/vi/_L39rN6gz7Y/maxresdefault.jpg',
                goal: 'Master tree-based algorithms',
                estimatedTime: '5 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'svm',
                title: 'Support Vector Machines',
                description: 'SVM classification, kernel trick, margin optimization, and SVM regression.',
                videoId: 'efR1C6CvhmE',
                videoTitle: 'SVM Clearly Explained - StatQuest',
                channel: 'StatQuest',
                duration: '21:00',
                thumbnail: 'https://img.youtube.com/vi/efR1C6CvhmE/maxresdefault.jpg',
                goal: 'Apply SVM for complex classifications',
                estimatedTime: '4 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'clustering',
                title: 'Clustering Algorithms',
                description: 'K-Means, hierarchical clustering, DBSCAN, and cluster evaluation metrics.',
                videoId: '4b5d3muPQmA',
                videoTitle: 'K-Means Clustering - StatQuest',
                channel: 'StatQuest',
                duration: '9:00',
                thumbnail: 'https://img.youtube.com/vi/4b5d3muPQmA/maxresdefault.jpg',
                goal: 'Implement unsupervised clustering',
                estimatedTime: '4 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'model-evaluation',
                title: 'Model Evaluation & Validation',
                description: 'Cross-validation, metrics (accuracy, precision, recall, F1), and model selection.',
                videoId: 'Kdsp6soqA7o',
                videoTitle: 'Cross Validation - StatQuest',
                channel: 'StatQuest',
                duration: '6:00',
                thumbnail: 'https://img.youtube.com/vi/Kdsp6soqA7o/maxresdefault.jpg',
                goal: 'Properly evaluate and validate models',
                estimatedTime: '3 days',
                difficulty: 'intermediate',
                resources: []
            }
        ]
    },
    deepLearning: {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning frameworks',
        icon: '🧠',
        topics: [
            {
                id: 'neural-networks',
                title: 'Neural Networks Fundamentals',
                description: 'Perceptrons, activation functions, backpropagation, and gradient descent.',
                videoId: 'aircAruvnKk',
                videoTitle: 'Neural Networks - 3Blue1Brown',
                channel: '3Blue1Brown',
                duration: '19:00',
                thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg',
                goal: 'Understand how neural networks learn',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: [
                    { title: '3Blue1Brown Neural Networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' }
                ]
            },
            {
                id: 'tensorflow',
                title: 'TensorFlow Complete Course',
                description: 'Build neural networks with TensorFlow - layers, training, saving, and deployment.',
                videoId: 'tPYj3fFJGjk',
                videoTitle: 'TensorFlow 2.0 Complete Course',
                channel: 'freeCodeCamp',
                duration: '6:52:00',
                thumbnail: 'https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg',
                goal: 'Build and train models with TensorFlow',
                estimatedTime: '2 weeks',
                difficulty: 'intermediate',
                resources: [
                    { title: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' }
                ]
            },
            {
                id: 'pytorch',
                title: 'PyTorch for Deep Learning',
                description: 'Dynamic computation graphs, tensors, autograd, and building neural networks.',
                videoId: 'V_xro1bcAuA',
                videoTitle: 'PyTorch for Deep Learning',
                channel: 'freeCodeCamp',
                duration: '25:37:00',
                thumbnail: 'https://img.youtube.com/vi/V_xro1bcAuA/maxresdefault.jpg',
                goal: 'Master PyTorch for deep learning projects',
                estimatedTime: '3 weeks',
                difficulty: 'intermediate',
                resources: [
                    { title: 'PyTorch Documentation', url: 'https://pytorch.org/tutorials/' }
                ]
            },
            {
                id: 'cnn',
                title: 'Convolutional Neural Networks',
                description: 'Image recognition, convolution layers, pooling, and CNN architectures.',
                videoId: 'YRhxdVk_sIs',
                videoTitle: 'CNNs Explained - StatQuest',
                channel: 'StatQuest',
                duration: '35:00',
                thumbnail: 'https://img.youtube.com/vi/YRhxdVk_sIs/maxresdefault.jpg',
                goal: 'Build image classification models',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            },
            {
                id: 'rnn-lstm',
                title: 'RNN & LSTM Networks',
                description: 'Sequence modeling, recurrent connections, LSTM, GRU, and time series.',
                videoId: 'WCUNPb-5EYI',
                videoTitle: 'Recurrent Neural Networks - StatQuest',
                channel: 'StatQuest',
                duration: '25:00',
                thumbnail: 'https://img.youtube.com/vi/WCUNPb-5EYI/maxresdefault.jpg',
                goal: 'Model sequential data with RNNs',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            },
            {
                id: 'transformers',
                title: 'Transformers & Attention',
                description: 'Self-attention mechanism, transformer architecture, BERT, and GPT.',
                videoId: 'XSSTuhyAmnI',
                videoTitle: 'Transformers Explained',
                channel: 'StatQuest',
                duration: '30:00',
                thumbnail: 'https://img.youtube.com/vi/XSSTuhyAmnI/maxresdefault.jpg',
                goal: 'Understand modern transformer architectures',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            }
        ]
    },
    aiApplications: {
        id: 'ai-applications',
        title: 'AI Applications',
        description: 'Natural Language Processing and Computer Vision',
        icon: '🎯',
        topics: [
            {
                id: 'nlp-basics',
                title: 'Natural Language Processing',
                description: 'Text processing, tokenization, embeddings, and NLP pipelines.',
                videoId: 'X2vAabgKiuM',
                videoTitle: 'NLP with Python Tutorial',
                channel: 'freeCodeCamp',
                duration: '1:30:00',
                thumbnail: 'https://img.youtube.com/vi/X2vAabgKiuM/maxresdefault.jpg',
                goal: 'Process and analyze text data',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: [
                    { title: 'NLTK Documentation', url: 'https://www.nltk.org/' },
                    { title: 'spaCy Documentation', url: 'https://spacy.io/' }
                ]
            },
            {
                id: 'text-classification',
                title: 'Text Classification & Sentiment',
                description: 'Sentiment analysis, text classification, and practical NLP projects.',
                videoId: 'M7SWr5xObkA',
                videoTitle: 'Sentiment Analysis with Python',
                channel: 'codebasics',
                duration: '45:00',
                thumbnail: 'https://img.youtube.com/vi/M7SWr5xObkA/maxresdefault.jpg',
                goal: 'Build text classification systems',
                estimatedTime: '5 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'computer-vision',
                title: 'Computer Vision Fundamentals',
                description: 'Image processing, OpenCV, object detection, and image classification.',
                videoId: 'oXlwWbU8l2o',
                videoTitle: 'OpenCV Course - Full Tutorial',
                channel: 'freeCodeCamp',
                duration: '4:00:00',
                thumbnail: 'https://img.youtube.com/vi/oXlwWbU8l2o/maxresdefault.jpg',
                goal: 'Process and analyze images with OpenCV',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: [
                    { title: 'OpenCV Documentation', url: 'https://docs.opencv.org/' }
                ]
            },
            {
                id: 'object-detection',
                title: 'Object Detection & YOLO',
                description: 'YOLO, SSD, Faster R-CNN, and real-time object detection systems.',
                videoId: 'ag3DLKsl2vk',
                videoTitle: 'YOLO Object Detection',
                channel: 'Nicholas Renotte',
                duration: '2:00:00',
                thumbnail: 'https://img.youtube.com/vi/ag3DLKsl2vk/maxresdefault.jpg',
                goal: 'Implement object detection systems',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            },
            {
                id: 'huggingface',
                title: 'Hugging Face Transformers',
                description: 'Pre-trained models, fine-tuning, and state-of-the-art NLP with Hugging Face.',
                videoId: 'QEaBAZQCtwE',
                videoTitle: 'Hugging Face Course',
                channel: 'Hugging Face',
                duration: '3:00:00',
                thumbnail: 'https://img.youtube.com/vi/QEaBAZQCtwE/maxresdefault.jpg',
                goal: 'Use pre-trained transformers for NLP tasks',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: [
                    { title: 'Hugging Face Course', url: 'https://huggingface.co/course' }
                ]
            }
        ]
    },
    projects: {
        id: 'projects',
        title: 'Projects',
        description: 'Hands-on projects to build your portfolio',
        icon: '🚀',
        topics: [
            {
                id: 'project-titanic',
                title: 'Titanic Survival Prediction',
                description: 'Classic ML project - data cleaning, feature engineering, and classification.',
                videoId: 'I3FBJdiExcg',
                videoTitle: 'Titanic Survival Prediction',
                channel: 'codebasics',
                duration: '45:00',
                thumbnail: 'https://img.youtube.com/vi/I3FBJdiExcg/maxresdefault.jpg',
                goal: 'Complete your first end-to-end ML project',
                estimatedTime: '3 days',
                difficulty: 'beginner',
                resources: [
                    { title: 'Kaggle Titanic Dataset', url: 'https://www.kaggle.com/c/titanic' }
                ]
            },
            {
                id: 'project-housing',
                title: 'House Price Prediction',
                description: 'Regression project with feature engineering and model optimization.',
                videoId: 'fw5rkjq4TlE',
                videoTitle: 'House Price Prediction',
                channel: 'codebasics',
                duration: '1:00:00',
                thumbnail: 'https://img.youtube.com/vi/fw5rkjq4TlE/maxresdefault.jpg',
                goal: 'Build a complete regression pipeline',
                estimatedTime: '4 days',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'project-image-classifier',
                title: 'Image Classification Project',
                description: 'Build a CNN-based image classifier with TensorFlow/PyTorch.',
                videoId: 'qFJeN9V1ZsI',
                videoTitle: 'Image Classification with CNN',
                channel: 'Nicholas Renotte',
                duration: '1:30:00',
                thumbnail: 'https://img.youtube.com/vi/qFJeN9V1ZsI/maxresdefault.jpg',
                goal: 'Deploy an image classification model',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'project-chatbot',
                title: 'AI Chatbot Project',
                description: 'Build an intelligent chatbot using NLP and deep learning.',
                videoId: 'RpWeNzfSUHw',
                videoTitle: 'Build an AI Chatbot',
                channel: 'Python Engineer',
                duration: '1:00:00',
                thumbnail: 'https://img.youtube.com/vi/RpWeNzfSUHw/maxresdefault.jpg',
                goal: 'Create a functional AI chatbot',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            },
            {
                id: 'project-recommendation',
                title: 'Recommendation System',
                description: 'Build a movie/product recommendation engine using collaborative filtering.',
                videoId: 'eyEabQRBMQg',
                videoTitle: 'Build a Recommendation System',
                channel: 'codebasics',
                duration: '1:15:00',
                thumbnail: 'https://img.youtube.com/vi/eyEabQRBMQg/maxresdefault.jpg',
                goal: 'Implement a recommendation algorithm',
                estimatedTime: '1 week',
                difficulty: 'advanced',
                resources: []
            }
        ]
    },
    career: {
        id: 'career',
        title: 'Career Preparation',
        description: 'Resume building and interview preparation',
        icon: '💼',
        topics: [
            {
                id: 'ml-interview',
                title: 'ML Interview Preparation',
                description: 'Common ML interview questions, concepts, and problem-solving strategies.',
                videoId: 'BrGWz3Bgkl4',
                videoTitle: 'Machine Learning Interview Questions',
                channel: 'codebasics',
                duration: '1:00:00',
                thumbnail: 'https://img.youtube.com/vi/BrGWz3Bgkl4/maxresdefault.jpg',
                goal: 'Prepare for ML technical interviews',
                estimatedTime: '1 week',
                difficulty: 'intermediate',
                resources: []
            },
            {
                id: 'portfolio',
                title: 'Building ML Portfolio',
                description: 'Create an impressive GitHub portfolio and personal website.',
                videoId: 'Iv9PRWxZH-0',
                videoTitle: 'Build a Data Science Portfolio',
                channel: 'codebasics',
                duration: '30:00',
                thumbnail: 'https://img.youtube.com/vi/Iv9PRWxZH-0/maxresdefault.jpg',
                goal: 'Create a professional portfolio',
                estimatedTime: '1 week',
                difficulty: 'beginner',
                resources: []
            },
            {
                id: 'resume-tips',
                title: 'ML Resume & LinkedIn',
                description: 'Craft a compelling resume and optimize your LinkedIn for ML roles.',
                videoId: 'J6GhYmUlA5g',
                videoTitle: 'Data Science Resume Tips',
                channel: 'codebasics',
                duration: '20:00',
                thumbnail: 'https://img.youtube.com/vi/J6GhYmUlA5g/maxresdefault.jpg',
                goal: 'Create an ATS-friendly ML resume',
                estimatedTime: '3 days',
                difficulty: 'beginner',
                resources: []
            }
        ]
    }
};

// Quiz Questions Database
const QUIZ_DATABASE = {
    python: [
        {
            question: "What is the output of print(type([]) is list)?",
            options: ["True", "False", "Error", "None"],
            correct: 0,
            explanation: "The type() function returns <class 'list'> for a list, which is equal to list."
        },
        {
            question: "Which of the following is immutable in Python?",
            options: ["List", "Dictionary", "Tuple", "Set"],
            correct: 2,
            explanation: "Tuples are immutable - once created, their elements cannot be changed."
        },
        {
            question: "What does the 'self' keyword refer to in Python?",
            options: ["The class itself", "The instance of the class", "A global variable", "A built-in function"],
            correct: 1,
            explanation: "self refers to the instance of the class and is used to access instance variables and methods."
        },
        {
            question: "What is a decorator in Python?",
            options: ["A design pattern", "A function that modifies another function", "A type of loop", "A data structure"],
            correct: 1,
            explanation: "A decorator is a function that takes another function and extends its behavior without modifying it."
        },
        {
            question: "What is the difference between '==' and 'is' in Python?",
            options: ["No difference", "'==' checks value, 'is' checks identity", "'is' checks value, '==' checks identity", "Both check identity"],
            correct: 1,
            explanation: "'==' compares values while 'is' compares object identities (memory locations)."
        }
    ],
    numpy: [
        {
            question: "What does NumPy's broadcasting allow you to do?",
            options: ["Stream data", "Perform operations on arrays of different shapes", "Broadcast audio", "None of the above"],
            correct: 1,
            explanation: "Broadcasting allows NumPy to perform operations on arrays of different shapes by automatically expanding dimensions."
        },
        {
            question: "How do you create a 3x3 identity matrix in NumPy?",
            options: ["np.identity(3)", "np.eye(3)", "Both A and B", "np.ones(3,3)"],
            correct: 2,
            explanation: "Both np.identity(3) and np.eye(3) create a 3x3 identity matrix."
        },
        {
            question: "What is the purpose of np.reshape()?",
            options: ["Delete array elements", "Change array dimensions", "Sort the array", "Copy the array"],
            correct: 1,
            explanation: "np.reshape() changes the shape of an array without changing its data."
        }
    ],
    pandas: [
        {
            question: "What is a DataFrame in Pandas?",
            options: ["A 1D array", "A 2D labeled data structure", "A dictionary", "A tuple"],
            correct: 1,
            explanation: "A DataFrame is a 2D labeled data structure with columns of potentially different types."
        },
        {
            question: "How do you handle missing values in Pandas?",
            options: ["dropna()", "fillna()", "Both A and B", "None of the above"],
            correct: 2,
            explanation: "dropna() removes missing values while fillna() fills them with specified values."
        },
        {
            question: "What does the groupby() function do?",
            options: ["Sorts the data", "Splits data into groups based on criteria", "Merges dataframes", "Drops duplicates"],
            correct: 1,
            explanation: "groupby() splits the DataFrame into groups based on column values for aggregate operations."
        }
    ],
    machineLearning: [
        {
            question: "What is overfitting in machine learning?",
            options: ["Model performs well on training data but poorly on new data", "Model performs poorly on all data", "Model is too simple", "Model trains too fast"],
            correct: 0,
            explanation: "Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize."
        },
        {
            question: "What is the purpose of cross-validation?",
            options: ["Speed up training", "Evaluate model performance more reliably", "Increase model complexity", "Reduce features"],
            correct: 1,
            explanation: "Cross-validation helps evaluate model performance by testing on multiple subsets of data."
        },
        {
            question: "Which algorithm is used for classification?",
            options: ["Linear Regression", "Logistic Regression", "Both", "Neither"],
            correct: 1,
            explanation: "Logistic Regression is used for classification despite its name, while Linear Regression is for continuous values."
        },
        {
            question: "What is the bias-variance tradeoff?",
            options: ["Choosing between bias and variance", "Balance between underfitting and overfitting", "A type of loss function", "A regularization technique"],
            correct: 1,
            explanation: "The bias-variance tradeoff is about finding the right model complexity to minimize both bias (underfitting) and variance (overfitting)."
        },
        {
            question: "What does regularization do?",
            options: ["Increases model complexity", "Prevents overfitting by adding penalty", "Speeds up training", "Increases accuracy always"],
            correct: 1,
            explanation: "Regularization prevents overfitting by adding a penalty term to the loss function."
        }
    ],
    deepLearning: [
        {
            question: "What is the purpose of an activation function?",
            options: ["Activate the GPU", "Introduce non-linearity", "Speed up training", "Reduce parameters"],
            correct: 1,
            explanation: "Activation functions introduce non-linearity, allowing neural networks to learn complex patterns."
        },
        {
            question: "What is backpropagation?",
            options: ["Forward pass through network", "Algorithm to calculate gradients", "A type of neural network", "Data augmentation technique"],
            correct: 1,
            explanation: "Backpropagation is the algorithm used to calculate gradients for updating weights in neural networks."
        },
        {
            question: "What is a convolutional layer used for?",
            options: ["Text processing", "Feature extraction from images", "Audio processing only", "Regression tasks"],
            correct: 1,
            explanation: "Convolutional layers extract features from images using learnable filters."
        },
        {
            question: "What problem do LSTMs solve?",
            options: ["Image classification", "Vanishing gradient in RNNs", "Slow training", "Overfitting"],
            correct: 1,
            explanation: "LSTMs solve the vanishing gradient problem in standard RNNs for learning long-term dependencies."
        },
        {
            question: "What is dropout in neural networks?",
            options: ["Removing layers", "Randomly setting neurons to zero during training", "Decreasing learning rate", "Batch processing"],
            correct: 1,
            explanation: "Dropout randomly sets a fraction of neurons to zero during training to prevent overfitting."
        }
    ],
    nlp: [
        {
            question: "What is tokenization in NLP?",
            options: ["Encrypting text", "Breaking text into smaller units", "Translating text", "Summarizing text"],
            correct: 1,
            explanation: "Tokenization is the process of breaking text into smaller units like words or subwords."
        },
        {
            question: "What are word embeddings?",
            options: ["HTML elements", "Dense vector representations of words", "Word counts", "Grammar rules"],
            correct: 1,
            explanation: "Word embeddings are dense vector representations that capture semantic meaning of words."
        },
        {
            question: "What is attention mechanism?",
            options: ["User interface feature", "Allows model to focus on relevant parts of input", "A loss function", "Optimization algorithm"],
            correct: 1,
            explanation: "Attention mechanism allows models to focus on relevant parts of the input when making predictions."
        }
    ]
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

class StateManager {
    constructor() {
        this.state = {
            progress: {},
            theme: 'light',
            goals: {
                daily: [],
                weekly: []
            },
            streak: {
                current: 0,
                lastActive: null,
                history: []
            },
            quizScores: [],
            currentSection: 'dashboard',
            user: {
                name: 'Learner',
                avatar: 'L'
            }
        };
        this.listeners = [];
        this.loadState();
    }

    loadState() {
        try {
            // Load progress
            const savedProgress = localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
            if (savedProgress) {
                this.state.progress = JSON.parse(savedProgress);
            }

            // Load theme
            const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
            if (savedTheme) {
                this.state.theme = savedTheme;
            }

            // Load goals
            const savedGoals = localStorage.getItem(CONFIG.STORAGE_KEYS.GOALS);
            if (savedGoals) {
                this.state.goals = JSON.parse(savedGoals);
            }

            // Load streak
            const savedStreak = localStorage.getItem(CONFIG.STORAGE_KEYS.STREAK);
            if (savedStreak) {
                this.state.streak = JSON.parse(savedStreak);
                this.updateStreak();
            }

            // Load quiz scores
            const savedQuizScores = localStorage.getItem(CONFIG.STORAGE_KEYS.QUIZ_SCORES);
            if (savedQuizScores) {
                this.state.quizScores = JSON.parse(savedQuizScores);
            }

            // Load user
            const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
            if (savedUser) {
                this.state.user = JSON.parse(savedUser);
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }

    saveState() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.PROGRESS, JSON.stringify(this.state.progress));
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.state.theme);
            localStorage.setItem(CONFIG.STORAGE_KEYS.GOALS, JSON.stringify(this.state.goals));
            localStorage.setItem(CONFIG.STORAGE_KEYS.STREAK, JSON.stringify(this.state.streak));
            localStorage.setItem(CONFIG.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(this.state.quizScores));
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.state.user));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActive = this.state.streak.lastActive;
        
        if (lastActive) {
            const lastDate = new Date(lastActive);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate.toDateString() === yesterday.toDateString()) {
                // Continued streak
            } else if (lastDate.toDateString() !== today) {
                // Streak broken
                this.state.streak.current = 0;
            }
        }
    }

    recordActivity() {
        const today = new Date().toDateString();
        if (this.state.streak.lastActive !== today) {
            const lastActive = this.state.streak.lastActive;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActive === yesterday.toDateString()) {
                this.state.streak.current++;
            } else if (lastActive !== today) {
                this.state.streak.current = 1;
            }
            
            this.state.streak.lastActive = today;
            if (!this.state.streak.history.includes(today)) {
                this.state.streak.history.push(today);
            }
            this.saveState();
            this.notify();
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    getProgress(topicId) {
        return this.state.progress[topicId] || { completed: false, watchedSeconds: 0 };
    }

    setProgress(topicId, progress) {
        this.state.progress[topicId] = { ...this.getProgress(topicId), ...progress };
        this.saveState();
        this.recordActivity();
        this.notify();
    }

    toggleTopicComplete(topicId) {
        const current = this.getProgress(topicId);
        this.setProgress(topicId, { completed: !current.completed });
    }

    getOverallProgress() {
        let totalTopics = 0;
        let completedTopics = 0;

        Object.values(ROADMAP_DATA).forEach(section => {
            section.topics.forEach(topic => {
                totalTopics++;
                if (this.state.progress[topic.id]?.completed) {
                    completedTopics++;
                }
            });
        });

        return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    }

    getSectionProgress(sectionId) {
        const section = ROADMAP_DATA[sectionId];
        if (!section) return 0;

        let completed = 0;
        section.topics.forEach(topic => {
            if (this.state.progress[topic.id]?.completed) {
                completed++;
            }
        });

        return section.topics.length > 0 ? Math.round((completed / section.topics.length) * 100) : 0;
    }

    setTheme(theme) {
        this.state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.saveState();
        this.notify();
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    addGoal(type, text) {
        const goal = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.state.goals[type].push(goal);
        this.saveState();
        this.notify();
    }

    toggleGoal(type, goalId) {
        const goal = this.state.goals[type].find(g => g.id === goalId);
        if (goal) {
            goal.completed = !goal.completed;
            this.saveState();
            this.notify();
        }
    }

    removeGoal(type, goalId) {
        this.state.goals[type] = this.state.goals[type].filter(g => g.id !== goalId);
        this.saveState();
        this.notify();
    }

    addQuizScore(score) {
        this.state.quizScores.push({
            ...score,
            date: new Date().toISOString()
        });
        this.saveState();
        this.notify();
    }

    getStats() {
        let totalTopics = 0;
        let completedTopics = 0;
        let inProgressTopics = 0;

        Object.values(ROADMAP_DATA).forEach(section => {
            section.topics.forEach(topic => {
                totalTopics++;
                const progress = this.state.progress[topic.id];
                if (progress?.completed) {
                    completedTopics++;
                } else if (progress?.watchedSeconds > 0) {
                    inProgressTopics++;
                }
            });
        });

        const totalQuizzes = this.state.quizScores.length;
        const avgScore = totalQuizzes > 0
            ? Math.round(this.state.quizScores.reduce((sum, s) => sum + s.percentage, 0) / totalQuizzes)
            : 0;

        return {
            totalTopics,
            completedTopics,
            inProgressTopics,
            pendingTopics: totalTopics - completedTopics - inProgressTopics,
            overallProgress: this.getOverallProgress(),
            streak: this.state.streak.current,
            totalQuizzes,
            avgQuizScore: avgScore
        };
    }
}

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(type, title, message, duration = CONFIG.TOAST_DURATION) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-close">
                <i class="fas fa-times"></i>
            </div>
            <div class="toast-progress"></div>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        this.container.appendChild(toast);

        setTimeout(() => this.remove(toast), duration);

        return toast;
    }

    remove(toast) {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }

    success(title, message) {
        return this.show('success', title, message);
    }

    error(title, message) {
        return this.show('error', title, message);
    }

    warning(title, message) {
        return this.show('warning', title, message);
    }

    info(title, message) {
        return this.show('info', title, message);
    }
}

// ==========================================
// VIDEO PLAYER MODAL
// ==========================================

class VideoPlayer {
    constructor() {
        this.modal = null;
        this.currentTopic = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('videoModal');
        if (!this.modal) {
            this.createModal();
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'videoModal';
        this.modal.className = 'video-modal';
        this.modal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3 class="video-modal-title"></h3>
                    <div class="video-modal-close">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="video-container">
                    <iframe 
                        id="videoIframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-modal-footer">
                    <div class="video-progress-controls">
                        <button class="btn btn-success" id="markCompleteBtn">
                            <i class="fas fa-check"></i>
                            <span>Mark as Complete</span>
                        </button>
                    </div>
                    <div class="video-info">
                        <span class="badge badge-primary" id="videoDuration"></span>
                        <span class="badge badge-info" id="videoChannel"></span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Event listeners
        const closeBtn = this.modal.querySelector('.video-modal-close');
        closeBtn.addEventListener('click', () => this.close());

        const markCompleteBtn = this.modal.querySelector('#markCompleteBtn');
        markCompleteBtn.addEventListener('click', () => this.markComplete());
    }

    open(topic) {
        this.currentTopic = topic;
        
        const iframe = this.modal.querySelector('#videoIframe');
        const title = this.modal.querySelector('.video-modal-title');
        const duration = this.modal.querySelector('#videoDuration');
        const channel = this.modal.querySelector('#videoChannel');
        const markBtn = this.modal.querySelector('#markCompleteBtn');

        iframe.src = `https://www.youtube.com/embed/${topic.videoId}?rel=0&modestbranding=1`;
        title.textContent = topic.title;
        duration.textContent = topic.duration;
        channel.textContent = topic.channel;

        const progress = stateManager.getProgress(topic.id);
        if (progress.completed) {
            markBtn.innerHTML = '<i class="fas fa-check-double"></i><span>Completed!</span>';
            markBtn.classList.add('completed');
        } else {
            markBtn.innerHTML = '<i class="fas fa-check"></i><span>Mark as Complete</span>';
            markBtn.classList.remove('completed');
        }

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        const iframe = this.modal.querySelector('#videoIframe');
        iframe.src = '';
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentTopic = null;
    }

    markComplete() {
        if (this.currentTopic) {
            stateManager.toggleTopicComplete(this.currentTopic.id);
            const progress = stateManager.getProgress(this.currentTopic.id);
            const markBtn = this.modal.querySelector('#markCompleteBtn');
            
            if (progress.completed) {
                markBtn.innerHTML = '<i class="fas fa-check-double"></i><span>Completed!</span>';
                markBtn.classList.add('completed');
                toast.success('Topic Completed!', `You've completed "${this.currentTopic.title}"`);
            } else {
                markBtn.innerHTML = '<i class="fas fa-check"></i><span>Mark as Complete</span>';
                markBtn.classList.remove('completed');
            }
            
            renderApp();
        }
    }
}

// ==========================================
// QUIZ SYSTEM
// ==========================================

class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.answers = [];
        this.score = 0;
        this.selectedCategory = 'all';
        this.difficulty = 'all';
    }

    generateQuiz(category = 'all', numQuestions = 10) {
        let questions = [];

        if (category === 'all') {
            Object.values(QUIZ_DATABASE).forEach(categoryQuestions => {
                questions = questions.concat(categoryQuestions);
            });
        } else if (QUIZ_DATABASE[category]) {
            questions = [...QUIZ_DATABASE[category]];
        }

        // Shuffle and select questions
        questions = this.shuffleArray(questions).slice(0, numQuestions);
        
        // Shuffle options for each question
        questions = questions.map(q => ({
            ...q,
            originalCorrect: q.options[q.correct],
            options: this.shuffleArray([...q.options])
        }));

        // Update correct answer index after shuffling
        questions = questions.map(q => ({
            ...q,
            correct: q.options.indexOf(q.originalCorrect)
        }));

        this.currentQuiz = questions;
        this.currentQuestion = 0;
        this.answers = [];
        this.score = 0;

        return this.currentQuiz;
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    submitAnswer(answerIndex) {
        const question = this.currentQuiz[this.currentQuestion];
        const isCorrect = answerIndex === question.correct;
        
        this.answers.push({
            questionIndex: this.currentQuestion,
            selectedAnswer: answerIndex,
            correctAnswer: question.correct,
            isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        return {
            isCorrect,
            correctAnswer: question.correct,
            explanation: question.explanation
        };
    }

    nextQuestion() {
        if (this.currentQuestion < this.currentQuiz.length - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            return true;
        }
        return false;
    }

    getResults() {
        const percentage = Math.round((this.score / this.currentQuiz.length) * 100);
        
        const result = {
            score: this.score,
            total: this.currentQuiz.length,
            percentage,
            answers: this.answers,
            category: this.selectedCategory,
            difficulty: this.difficulty
        };

        stateManager.addQuizScore(result);
        
        return result;
    }

    isComplete() {
        return this.answers.length === this.currentQuiz.length;
    }
}

// ==========================================
// UI RENDERING
// ==========================================

function renderDashboard() {
    const stats = stateManager.getStats();
    
    return `
        <div class="dashboard-stats">
            <div class="stat-card accent-1" data-aos="fade-up" data-aos-delay="100">
                <div class="stat-card-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="stat-card-content">
                    <h3>Topics Completed</h3>
                    <div class="stat-card-value">${stats.completedTopics}/${stats.totalTopics}</div>
                    <div class="stat-card-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>${stats.overallProgress}% complete</span>
                    </div>
                </div>
                <div class="stat-card-bg-icon">
                    <i class="fas fa-book-open"></i>
                </div>
            </div>
            
            <div class="stat-card accent-2" data-aos="fade-up" data-aos-delay="200">
                <div class="stat-card-icon">
                    <i class="fas fa-fire"></i>
                </div>
                <div class="stat-card-content">
                    <h3>Current Streak</h3>
                    <div class="stat-card-value">${stats.streak} days</div>
                    <div class="stat-card-change positive">
                        <i class="fas fa-trophy"></i>
                        <span>Keep it up!</span>
                    </div>
                </div>
                <div class="stat-card-bg-icon">
                    <i class="fas fa-fire"></i>
                </div>
            </div>
            
            <div class="stat-card accent-3" data-aos="fade-up" data-aos-delay="300">
                <div class="stat-card-icon">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="stat-card-content">
                    <h3>Quizzes Taken</h3>
                    <div class="stat-card-value">${stats.totalQuizzes}</div>
                    <div class="stat-card-change ${stats.avgQuizScore >= 70 ? 'positive' : 'negative'}">
                        <i class="fas fa-chart-line"></i>
                        <span>${stats.avgQuizScore}% avg score</span>
                    </div>
                </div>
                <div class="stat-card-bg-icon">
                    <i class="fas fa-brain"></i>
                </div>
            </div>
            
            <div class="stat-card accent-4" data-aos="fade-up" data-aos-delay="400">
                <div class="stat-card-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-card-content">
                    <h3>In Progress</h3>
                    <div class="stat-card-value">${stats.inProgressTopics}</div>
                    <div class="stat-card-change positive">
                        <i class="fas fa-hourglass-half"></i>
                        <span>${stats.pendingTopics} pending</span>
                    </div>
                </div>
                <div class="stat-card-bg-icon">
                    <i class="fas fa-clock"></i>
                </div>
            </div>
        </div>
        
        ${renderRoadmapPreview()}
    `;
}

function renderRoadmapPreview() {
    let html = `
        <div class="section-header">
            <div class="section-title">
                <div class="section-title-icon">
                    <i class="fas fa-route"></i>
                </div>
                <h2>Your Learning Path</h2>
            </div>
            <div class="section-actions">
                <button class="btn btn-primary" onclick="navigateTo('roadmap')">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>View Full Roadmap</span>
                </button>
            </div>
        </div>
        <div class="roadmap-container">
    `;

    Object.entries(ROADMAP_DATA).slice(0, 3).forEach(([key, section], index) => {
        const progress = stateManager.getSectionProgress(key);
        html += renderRoadmapLevel(section, key, index, progress);
    });

    html += '</div>';
    return html;
}

function renderRoadmap() {
    let html = `
        <div class="section-header">
            <div class="section-title">
                <div class="section-title-icon">
                    <i class="fas fa-route"></i>
                </div>
                <h2>Complete AI/ML Roadmap</h2>
            </div>
        </div>
        <div class="roadmap-container">
    `;

    Object.entries(ROADMAP_DATA).forEach(([key, section], index) => {
        const progress = stateManager.getSectionProgress(key);
        html += renderRoadmapLevel(section, key, index, progress);
    });

    html += '</div>';
    return html;
}

function renderRoadmapLevel(section, key, index, progress) {
    return `
        <div class="roadmap-level" id="level-${key}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="roadmap-level-header" onclick="toggleLevel('${key}')">
                <div class="roadmap-level-info">
                    <div class="roadmap-level-number">${section.icon}</div>
                    <div class="roadmap-level-title">
                        <h3>${section.title}</h3>
                        <p>${section.description}</p>
                    </div>
                </div>
                <div class="roadmap-level-meta">
                    <div class="roadmap-level-progress">
                        <span>${progress}%</span>
                        <p>Complete</p>
                    </div>
                    <div class="roadmap-level-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="roadmap-level-content">
                <div class="topics-grid">
                    ${section.topics.map(topic => renderTopicCard(topic)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderTopicCard(topic) {
    const progress = stateManager.getProgress(topic.id);
    const statusClass = progress.completed ? 'completed' : (progress.watchedSeconds > 0 ? 'in-progress' : '');
    const statusText = progress.completed ? 'Completed' : (progress.watchedSeconds > 0 ? 'In Progress' : 'Not Started');
    const statusBadgeClass = progress.completed ? 'completed' : (progress.watchedSeconds > 0 ? 'in-progress' : 'pending');

    return `
        <div class="topic-card ${statusClass}" data-topic-id="${topic.id}">
            <div class="video-thumbnail">
                <img src="${topic.thumbnail}" alt="${topic.title}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/480x270/667eea/ffffff?text=Video'">
                <div class="video-thumbnail-overlay">
                    <div class="play-button" onclick="openVideo('${topic.id}')">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-duration">${topic.duration}</div>
                <div class="topic-status-badge ${statusBadgeClass}">
                    <i class="fas fa-${progress.completed ? 'check-circle' : (progress.watchedSeconds > 0 ? 'clock' : 'circle')}"></i>
                    ${statusText}
                </div>
            </div>
            <div class="topic-card-body">
                <div class="topic-card-header">
                    <h4 class="topic-card-title">${topic.title}</h4>
                    <div class="topic-checkbox ${progress.completed ? 'checked' : ''}" 
                         onclick="toggleTopicComplete('${topic.id}')">
                    </div>
                </div>
                <p class="topic-card-description">${topic.description}</p>
                <div class="topic-card-meta">
                    <div class="topic-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${topic.estimatedTime}</span>
                    </div>
                    <div class="topic-meta-item">
                        <i class="fas fa-signal"></i>
                        <span>${topic.difficulty}</span>
                    </div>
                    <div class="topic-meta-item">
                        <i class="fab fa-youtube"></i>
                        <span>${topic.channel}</span>
                    </div>
                </div>
                <div class="topic-card-goal">
                    <h4><i class="fas fa-bullseye"></i> Goal</h4>
                    <p>${topic.goal}</p>
                </div>
                <div class="topic-card-actions">
                    <button class="btn btn-primary" onclick="openVideo('${topic.id}')">
                        <i class="fas fa-play"></i>
                        <span>Watch</span>
                    </button>
                    <button class="btn btn-secondary" onclick="toggleTopicComplete('${topic.id}')">
                        <i class="fas fa-${progress.completed ? 'times' : 'check'}"></i>
                        <span>${progress.completed ? 'Undo' : 'Complete'}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderQuizSection() {
    return `
        <div class="quiz-container" data-aos="fade-up">
            <div class="quiz-header">
                <div class="quiz-header-content">
                    <h2 class="quiz-title">AI/ML Knowledge Quiz</h2>
                    <div class="quiz-meta">
                        <div class="quiz-meta-item">
                            <i class="fas fa-question-circle"></i>
                            <span>Questions: <strong>10</strong></span>
                        </div>
                        <div class="quiz-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>Time: <strong>Unlimited</strong></span>
                        </div>
                    </div>
                </div>
                <div class="quiz-filters">
                    <div class="quiz-filter-group">
                        <label>Category:</label>
                        <select id="quizCategory" onchange="updateQuizCategory(this.value)">
                            <option value="all">All Topics</option>
                            <option value="python">Python</option>
                            <option value="numpy">NumPy</option>
                            <option value="pandas">Pandas</option>
                            <option value="machineLearning">Machine Learning</option>
                            <option value="deepLearning">Deep Learning</option>
                            <option value="nlp">NLP</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="quiz-body" id="quizBody">
                <div class="quiz-start-screen">
                    <div class="empty-state">
                        <div class="empty-state-icon">🧠</div>
                        <h3 class="empty-state-title">Ready to Test Your Knowledge?</h3>
                        <p class="empty-state-text">Take a quiz to reinforce your learning and track your progress.</p>
                        <button class="btn btn-primary btn-lg" onclick="startQuiz()">
                            <i class="fas fa-play"></i>
                            <span>Start Quiz</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderQuizQuestion(question, index, total) {
    const quizBody = document.getElementById('quizBody');
    if (!quizBody) return;

    quizBody.innerHTML = `
        <div class="quiz-question-container">
            <div class="quiz-progress-bar">
                ${Array.from({length: total}, (_, i) => `
                    <div class="quiz-progress-step ${i < index ? 'completed' : (i === index ? 'current' : '')}"></div>
                `).join('')}
            </div>
            <div class="quiz-question-number">Question ${index + 1} of ${total}</div>
            <h3 class="quiz-question-text">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, i) => `
                    <div class="quiz-option" data-index="${i}" onclick="selectQuizOption(${i})">
                        <div class="quiz-option-letter">${String.fromCharCode(65 + i)}</div>
                        <div class="quiz-option-text">${option}</div>
                        <div class="quiz-option-icon">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="quizFeedback"></div>
            <div class="quiz-actions">
                <button class="btn btn-secondary" onclick="skipQuestion()" id="skipBtn">
                    <i class="fas fa-forward"></i>
                    <span>Skip</span>
                </button>
                <button class="btn btn-primary" onclick="submitQuizAnswer()" id="submitBtn" disabled>
                    <i class="fas fa-check"></i>
                    <span>Submit Answer</span>
                </button>
            </div>
        </div>
    `;
}

function renderQuizResults(results) {
    const quizBody = document.getElementById('quizBody');
    if (!quizBody) return;

    let emoji = '🎉';
    let message = 'Excellent work!';
    
    if (results.percentage < 50) {
        emoji = '📚';
        message = 'Keep practicing!';
    } else if (results.percentage < 70) {
        emoji = '💪';
        message = 'Good effort!';
    } else if (results.percentage < 90) {
        emoji = '🌟';
        message = 'Great job!';
    }

    quizBody.innerHTML = `
        <div class="quiz-results">
            <div class="quiz-results-icon">${emoji}</div>
            <div class="quiz-results-score">${results.percentage}%</div>
            <p class="quiz-results-text">${message}</p>
            <div class="quiz-results-stats">
                <div class="quiz-results-stat correct">
                    <div class="quiz-results-stat-value">${results.score}</div>
                    <div class="quiz-results-stat-label">Correct</div>
                </div>
                <div class="quiz-results-stat incorrect">
                    <div class="quiz-results-stat-value">${results.total - results.score}</div>
                    <div class="quiz-results-stat-label">Incorrect</div>
                </div>
                <div class="quiz-results-stat">
                    <div class="quiz-results-stat-value">${results.total}</div>
                    <div class="quiz-results-stat-label">Total</div>
                </div>
            </div>
            <div class="quiz-results-actions">
                <button class="btn btn-primary btn-lg" onclick="startQuiz()">
                    <i class="fas fa-redo"></i>
                    <span>Try Again</span>
                </button>
                <button class="btn btn-secondary btn-lg" onclick="navigateTo('roadmap')">
                    <i class="fas fa-book"></i>
                    <span>Continue Learning</span>
                </button>
            </div>
        </div>
    `;
}

function renderGoalsSection() {
    const goals = stateManager.state.goals;
    const streak = stateManager.state.streak;

    return `
        <div class="section-header">
            <div class="section-title">
                <div class="section-title-icon">
                    <i class="fas fa-bullseye"></i>
                </div>
                <h2>Goals & Progress</h2>
            </div>
        </div>
        <div class="goals-container">
            <div class="goals-card" data-aos="fade-up" data-aos-delay="100">
                <div class="goals-card-header">
                    <div class="goals-card-title">
                        <i class="fas fa-sun"></i>
                        <h3>Daily Goals</h3>
                    </div>
                    <span class="badge badge-primary">${goals.daily.filter(g => g.completed).length}/${goals.daily.length}</span>
                </div>
                <div class="goals-card-body">
                    ${goals.daily.length > 0 ? goals.daily.map(goal => renderGoalItem(goal, 'daily')).join('') : `
                        <div class="empty-state" style="padding: 20px;">
                            <p style="color: var(--text-muted);">No daily goals set</p>
                        </div>
                    `}
                    <div class="add-goal-form">
                        <input type="text" class="add-goal-input" id="dailyGoalInput" placeholder="Add a daily goal...">
                        <button class="btn btn-primary btn-icon" onclick="addGoal('daily')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="goals-card" data-aos="fade-up" data-aos-delay="200">
                <div class="goals-card-header">
                    <div class="goals-card-title">
                        <i class="fas fa-calendar-week"></i>
                        <h3>Weekly Goals</h3>
                    </div>
                    <span class="badge badge-success">${goals.weekly.filter(g => g.completed).length}/${goals.weekly.length}</span>
                </div>
                <div class="goals-card-body">
                    ${goals.weekly.length > 0 ? goals.weekly.map(goal => renderGoalItem(goal, 'weekly')).join('') : `
                        <div class="empty-state" style="padding: 20px;">
                            <p style="color: var(--text-muted);">No weekly goals set</p>
                        </div>
                    `}
                    <div class="add-goal-form">
                        <input type="text" class="add-goal-input" id="weeklyGoalInput" placeholder="Add a weekly goal...">
                        <button class="btn btn-primary btn-icon" onclick="addGoal('weekly')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="goals-card streak-card" data-aos="fade-up" data-aos-delay="300" style="grid-column: span 2;">
                <div class="streak-icon">🔥</div>
                <div class="streak-count">${streak.current}</div>
                <div class="streak-label">Day Streak</div>
                <div class="streak-calendar">
                    ${renderStreakCalendar()}
                </div>
            </div>
        </div>
    `;
}

function renderGoalItem(goal, type) {
    return `
        <div class="goal-item ${goal.completed ? 'completed' : ''}">
            <div class="goal-checkbox ${goal.completed ? 'checked' : ''}" 
                 onclick="toggleGoal('${type}', ${goal.id})">
            </div>
            <span class="goal-text">${goal.text}</span>
            <button class="btn btn-ghost btn-icon" onclick="removeGoal('${type}', ${goal.id})" 
                    style="width: 30px; height: 30px; min-width: auto;">
                <i class="fas fa-trash" style="font-size: 12px;"></i>
            </button>
        </div>
    `;
}

function renderStreakCalendar() {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date();
    const streak = stateManager.state.streak;
    
    let html = '';
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        const isActive = streak.history.includes(dateStr);
        const isToday = i === 0;
        
        html += `
            <div class="streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}" 
                 data-tooltip="${dateStr}">
                ${days[date.getDay()]}
            </div>
        `;
    }
    return html;
}

function renderProgressSection() {
    const stats = stateManager.getStats();
    
    let sectionsHtml = '';
    Object.entries(ROADMAP_DATA).forEach(([key, section]) => {
        const progress = stateManager.getSectionProgress(key);
        const completed = section.topics.filter(t => stateManager.getProgress(t.id).completed).length;
        
        sectionsHtml += `
            <div class="progress-section-item" data-aos="fade-up">
                <div class="progress-section-header">
                    <div class="progress-section-icon">${section.icon}</div>
                    <div class="progress-section-info">
                        <h4>${section.title}</h4>
                        <span>${completed}/${section.topics.length} topics completed</span>
                    </div>
                    <div class="progress-section-percentage">${progress}%</div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    });

    return `
        <div class="section-header">
            <div class="section-title">
                <div class="section-title-icon">
                    <i class="fas fa-chart-pie"></i>
                </div>
                <h2>Progress Overview</h2>
            </div>
        </div>
        
        <div class="progress-overview-container">
            <div class="progress-main-card" data-aos="fade-up">
                <div class="progress-circle-container">
                    <svg class="progress-circle" viewBox="0 0 100 100">
                        <circle class="progress-circle-bg" cx="50" cy="50" r="45"></circle>
                        <circle class="progress-circle-fill" cx="50" cy="50" r="45" 
                                style="stroke-dasharray: ${stats.overallProgress * 2.83}, 283"></circle>
                    </svg>
                    <div class="progress-circle-text">
                        <span class="progress-circle-percentage">${stats.overallProgress}%</span>
                        <span class="progress-circle-label">Complete</span>
                    </div>
                </div>
                <div class="progress-main-stats">
                    <div class="progress-stat-item">
                        <i class="fas fa-check-circle" style="color: var(--accent-green)"></i>
                        <div>
                            <strong>${stats.completedTopics}</strong>
                            <span>Completed</span>
                        </div>
                    </div>
                    <div class="progress-stat-item">
                        <i class="fas fa-clock" style="color: var(--accent-yellow)"></i>
                        <div>
                            <strong>${stats.inProgressTopics}</strong>
                            <span>In Progress</span>
                        </div>
                    </div>
                    <div class="progress-stat-item">
                        <i class="fas fa-circle" style="color: var(--text-muted)"></i>
                        <div>
                            <strong>${stats.pendingTopics}</strong>
                            <span>Pending</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="progress-sections-card" data-aos="fade-up" data-aos-delay="100">
                <h3>Progress by Section</h3>
                <div class="progress-sections-list">
                    ${sectionsHtml}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// NAVIGATION & ROUTING
// ==========================================

function navigateTo(section) {
    stateManager.state.currentSection = section;
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    renderApp();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApp() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    let content = '';
    
    switch (stateManager.state.currentSection) {
        case 'dashboard':
            content = renderDashboard();
            break;
        case 'roadmap':
            content = renderRoadmap();
            break;
        case 'quiz':
            content = renderQuizSection();
            break;
        case 'goals':
            content = renderGoalsSection();
            break;
        case 'progress':
            content = renderProgressSection();
            break;
        default:
            content = renderDashboard();
    }

    mainContent.innerHTML = content;
    
    // Update sidebar progress
    updateSidebarProgress();
    
    // Reinitialize animations
    initAnimations();
}

function updateSidebarProgress() {
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    
    if (progressPercentage && progressBarFill) {
        const progress = stateManager.getOverallProgress();
        progressPercentage.textContent = `${progress}%`;
        progressBarFill.style.width = `${progress}%`;
    }
}

// ==========================================
// EVENT HANDLERS
// ==========================================

function toggleLevel(levelId) {
    const level = document.getElementById(`level-${levelId}`);
    if (level) {
        level.classList.toggle('expanded');
    }
}

function toggleTopicComplete(topicId) {
    stateManager.toggleTopicComplete(topicId);
    
    const progress = stateManager.getProgress(topicId);
    if (progress.completed) {
        toast.success('Topic Completed!', 'Great job! Keep up the momentum!');
        
        // Trigger confetti animation
        triggerConfetti();
    }
    
    renderApp();
}

function openVideo(topicId) {
    let topic = null;
    
    Object.values(ROADMAP_DATA).forEach(section => {
        const found = section.topics.find(t => t.id === topicId);
        if (found) topic = found;
    });
    
    if (topic) {
        videoPlayer.open(topic);
    }
}

function toggleTheme() {
    stateManager.toggleTheme();
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');
    
    sidebar.classList.toggle('collapsed');
    mainWrapper.classList.toggle('sidebar-collapsed');
    
    // Save preference
    localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
}

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Goal handlers
function addGoal(type) {
    const input = document.getElementById(`${type}GoalInput`);
    if (input && input.value.trim()) {
        stateManager.addGoal(type, input.value.trim());
        input.value = '';
        toast.success('Goal Added!', 'Stay focused and achieve your goals!');
        renderApp();
    }
}

function toggleGoal(type, goalId) {
    stateManager.toggleGoal(type, goalId);
    renderApp();
}

function removeGoal(type, goalId) {
    stateManager.removeGoal(type, goalId);
    toast.info('Goal Removed', 'Goal has been removed from your list.');
    renderApp();
}

// Quiz handlers
let selectedQuizOption = null;

function updateQuizCategory(category) {
    quizSystem.selectedCategory = category;
}

function startQuiz() {
    const category = document.getElementById('quizCategory')?.value || 'all';
    quizSystem.generateQuiz(category, 10);
    renderQuizQuestion(quizSystem.currentQuiz[0], 0, quizSystem.currentQuiz.length);
    selectedQuizOption = null;
}

function selectQuizOption(index) {
    // Remove previous selection
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const option = document.querySelector(`.quiz-option[data-index="${index}"]`);
    if (option) {
        option.classList.add('selected');
        selectedQuizOption = index;
        
        // Enable submit button
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }
}

function submitQuizAnswer() {
    if (selectedQuizOption === null) return;
    
    const result = quizSystem.submitAnswer(selectedQuizOption);
    const feedbackContainer = document.getElementById('quizFeedback');
    const submitBtn = document.getElementById('submitBtn');
    const skipBtn = document.getElementById('skipBtn');
    
    // Show correct/incorrect styling
    document.querySelectorAll('.quiz-option').forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === result.correctAnswer) {
            opt.classList.add('correct');
        } else if (i === selectedQuizOption && !result.isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Show feedback
    feedbackContainer.innerHTML = `
        <div class="quiz-feedback ${result.isCorrect ? 'correct' : 'incorrect'}">
            <div class="quiz-feedback-icon">
                <i class="fas fa-${result.isCorrect ? 'check' : 'times'}"></i>
            </div>
            <div class="quiz-feedback-text">
                <h4>${result.isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                <p>${result.explanation}</p>
            </div>
        </div>
    `;
    
    // Update buttons
    submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i><span>Next Question</span>';
    submitBtn.onclick = nextQuizQuestion;
    skipBtn.style.display = 'none';
}

function nextQuizQuestion() {
    if (quizSystem.nextQuestion()) {
        const question = quizSystem.currentQuiz[quizSystem.currentQuestion];
        renderQuizQuestion(question, quizSystem.currentQuestion, quizSystem.currentQuiz.length);
        selectedQuizOption = null;
    } else {
        // Quiz complete
        const results = quizSystem.getResults();
        renderQuizResults(results);
        toast.success('Quiz Complete!', `You scored ${results.percentage}%!`);
    }
}

function skipQuestion() {
    // Mark as incorrect and move on
    quizSystem.submitAnswer(-1); // Invalid answer = incorrect
    nextQuizQuestion();
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        }, 300));
    }
}

function performSearch(query) {
    const results = [];
    
    Object.values(ROADMAP_DATA).forEach(section => {
        section.topics.forEach(topic => {
            if (topic.title.toLowerCase().includes(query) ||
                topic.description.toLowerCase().includes(query)) {
                results.push({
                    ...topic,
                    section: section.title
                });
            }
        });
    });
    
    if (results.length > 0) {
        showSearchResults(results);
    }
}

function showSearchResults(results) {
    // Create search results dropdown
    let dropdown = document.querySelector('.search-results-dropdown');
    
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        document.querySelector('.header-search').appendChild(dropdown);
    }
    
    dropdown.innerHTML = results.slice(0, 5).map(result => `
        <div class="search-result-item" onclick="openVideo('${result.id}')">
            <div class="search-result-icon">
                <i class="fas fa-play-circle"></i>
            </div>
            <div class="search-result-content">
                <h4>${result.title}</h4>
                <span>${result.section}</span>
            </div>
        </div>
    `).join('');
    
    dropdown.classList.add('active');
    
    // Close on click outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.header-search')) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

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

function triggerConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#10b981'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.remove(), 4000);
}

function initAnimations() {
    // Simple scroll-based animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// INITIALIZATION
// ==========================================

let stateManager;
let toast;
let videoPlayer;
let quizSystem;

function initApp() {
    // Initialize managers
    stateManager = new StateManager();
    toast = new ToastManager();
    videoPlayer = new VideoPlayer();
    quizSystem = new QuizSystem();
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', stateManager.state.theme);
    
    // Apply saved sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (sidebarCollapsed) {
        document.querySelector('.sidebar')?.classList.add('collapsed');
        document.querySelector('.main-wrapper')?.classList.add('sidebar-collapsed');
    }
    
    // Set up navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            if (section) {
                navigateTo(section);
                
                // Close mobile sidebar
                document.querySelector('.sidebar')?.classList.remove('mobile-open');
            }
        });
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
    }
    
    // Initialize search
    initSearch();
    
    // Handle enter key for goal inputs
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'dailyGoalInput') {
                addGoal('daily');
            } else if (e.target.id === 'weeklyGoalInput') {
                addGoal('weekly');
            }
        }
    });
    
    // Auto-save interval
    setInterval(() => {
        stateManager.saveState();
    }, CONFIG.AUTO_SAVE_INTERVAL);
    
    // Save on page unload
    window.addEventListener('beforeunload', () => {
        stateManager.saveState();
    });
    
    // Initial render
    renderApp();
    
    // Hide page loader
    setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000);
    
    // Record activity
    stateManager.recordActivity();
    
    // Welcome toast
    setTimeout(() => {
        const stats = stateManager.getStats();
        if (stats.streak > 0) {
            toast.success('Welcome Back!', `🔥 You're on a ${stats.streak} day streak!`);
        } else {
            toast.info('Welcome!', 'Start your AI/ML learning journey today!');
        }
    }, 1500);
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stateManager,
        ROADMAP_DATA,
        QUIZ_DATABASE
    };
}
// ==========================================
// PROFILE & SETTINGS SYSTEM
// ==========================================

// User Profile Data
const userProfile = {
    name: 'Learner',
    username: 'learner123',
    email: 'learner@aimlhub.com',
    phone: '',
    bio: 'Passionate about AI/ML and continuous learning!',
    location: '',
    timezone: 'UTC+5:30',
    avatar: '',
    social: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
    }
};

// Notifications Data
let notifications = [
    {
        id: 1,
        type: 'achievement',
        icon: 'fas fa-trophy',
        title: 'Achievement Unlocked!',
        message: 'You completed your first topic. Keep going!',
        time: new Date(Date.now() - 1000 * 60 * 30),
        read: false
    },
    {
        id: 2,
        type: 'streak',
        icon: 'fas fa-fire',
        title: 'Streak Alert! 🔥',
        message: 'You\'re on a 5-day learning streak! Don\'t break it!',
        time: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
    },
    {
        id: 3,
        type: 'reminder',
        icon: 'fas fa-bell',
        title: 'Daily Reminder',
        message: 'Time to continue your learning journey. You have 3 topics pending.',
        time: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
    },
    {
        id: 4,
        type: 'quiz',
        icon: 'fas fa-brain',
        title: 'Quiz Available',
        message: 'New quiz on Machine Learning basics is ready for you!',
        time: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true
    },
    {
        id: 5,
        type: 'complete',
        icon: 'fas fa-check-circle',
        title: 'Topic Completed',
        message: 'Great job completing "Python Fundamentals"!',
        time: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: true
    }
];

// Settings Preferences
let userPreferences = {
    appearance: {
        theme: 'light',
        accentColor: 'purple',
        fontSize: 16,
        compactMode: false,
        animations: true,
        blurEffects: true,
        sidebarVisible: true
    },
    notifications: {
        push: false,
        sound: true,
        dailyReminders: true,
        streakAlerts: true,
        achievements: true,
        reminderTime: '09:00'
    },
    preferences: {
        autoPlayVideos: false,
        showVideoProgress: true,
        confirmComplete: false,
        showExplanations: true,
        timedMode: false,
        defaultQuizCount: 10,
        defaultDifficulty: 'all',
        dailyGoalMinutes: 30,
        weeklyTopicGoal: 5
    },
    data: {
        autoSave: true,
        saveInterval: 30000
    }
};

// Confirm Modal State
let confirmModalCallback = null;

// Video Leave State
let videoWatchProgress = 0;
let dontAskOnLeave = false;

// Load Preferences from localStorage
function loadPreferences() {
    const savedProfile = localStorage.getItem('aiml_user_profile');
    const savedPreferences = localStorage.getItem('aiml_preferences');
    const savedNotifications = localStorage.getItem('aiml_notifications');
    
    if (savedProfile) {
        Object.assign(userProfile, JSON.parse(savedProfile));
    }
    
    if (savedPreferences) {
        userPreferences = { ...userPreferences, ...JSON.parse(savedPreferences) };
    }
    
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    }
    
    applyPreferences();
}

// Save Preferences to localStorage
function savePreferences() {
    localStorage.setItem('aiml_user_profile', JSON.stringify(userProfile));
    localStorage.setItem('aiml_preferences', JSON.stringify(userPreferences));
    localStorage.setItem('aiml_notifications', JSON.stringify(notifications));
}

// Apply Preferences to UI
function applyPreferences() {
    // Apply theme
    document.documentElement.setAttribute('data-theme', userPreferences.appearance.theme);
    
    // Apply font size
    document.documentElement.style.fontSize = userPreferences.appearance.fontSize + 'px';
    
    // Apply compact mode
    document.body.classList.toggle('compact-mode', userPreferences.appearance.compactMode);
    
    // Apply animations
    document.body.classList.toggle('no-animations', !userPreferences.appearance.animations);
    
    // Apply blur effects
    document.body.classList.toggle('no-blur', !userPreferences.appearance.blurEffects);
    
    // Update theme selector
    updateThemeSelector();
    
    // Update color selector
    updateColorSelector();
    
    // Update toggles
    updateSettingsToggles();
}

// ==========================================
// PROFILE DROPDOWN
// ==========================================

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const isActive = dropdown.classList.contains('active');
    
    // Close other dropdowns
    closeAllDropdowns();
    
    if (!isActive) {
        dropdown.classList.add('active');
        updateProfileDropdownStats();
        
        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', closeProfileDropdownOnClickOutside);
        }, 10);
    }
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.remove('active');
    document.removeEventListener('click', closeProfileDropdownOnClickOutside);
}

function closeProfileDropdownOnClickOutside(e) {
    const dropdown = document.getElementById('profileDropdown');
    const avatar = document.querySelector('.user-avatar');
    
    if (!dropdown.contains(e.target) && !avatar.contains(e.target)) {
        closeProfileDropdown();
    }
}

function updateProfileDropdownStats() {
    const stats = stateManager.getStats();
    
    document.getElementById('profileTopicsCount').textContent = stats.completedTopics;
    document.getElementById('profileStreakCount').textContent = stats.streak;
    document.getElementById('profileQuizCount').textContent = stats.totalQuizzes;
    
    document.getElementById('profileName').textContent = userProfile.name;
    document.getElementById('profileEmail').textContent = userProfile.email;
}

// ==========================================
// SETTINGS MODAL
// ==========================================

function openSettings(tab = 'profile') {
    const modal = document.getElementById('settingsModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    closeProfileDropdown();
    closeNotificationsPanel();
    
    switchSettingsTab(tab);
    loadSettingsData();
}

function closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchSettingsTab(tabName) {
    // Update nav items
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabName);
    });
    
    // Update tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`settingsTab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update title
    const titles = {
        profile: 'Profile Settings',
        appearance: 'Appearance',
        notifications: 'Notifications',
        data: 'Data & Storage',
        preferences: 'Preferences',
        keyboard: 'Keyboard Shortcuts',
        about: 'About'
    };
    
    document.getElementById('settingsTitle').textContent = titles[tabName] || 'Settings';
    
    // Load tab-specific data
    if (tabName === 'notifications') {
        renderNotificationsList();
    } else if (tabName === 'data') {
        updateStorageInfo();
    }
}

function loadSettingsData() {
    // Profile data
    document.getElementById('userName').value = userProfile.name;
    document.getElementById('userUsername').value = userProfile.username;
    document.getElementById('userEmail').value = userProfile.email;
    document.getElementById('userPhone').value = userProfile.phone || '';
    document.getElementById('userBio').value = userProfile.bio || '';
    document.getElementById('userLocation').value = userProfile.location || '';
    document.getElementById('userTimezone').value = userProfile.timezone;
    
    // Social links
    document.getElementById('socialGithub').value = userProfile.social.github || '';
    document.getElementById('socialLinkedin').value = userProfile.social.linkedin || '';
    document.getElementById('socialTwitter').value = userProfile.social.twitter || '';
    document.getElementById('socialWebsite').value = userProfile.social.website || '';
    
    // Avatar
    if (userProfile.avatar) {
        document.getElementById('avatarPreviewImg').src = userProfile.avatar;
        document.getElementById('profileAvatarImg').src = userProfile.avatar;
    }
}

function updateThemeSelector() {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === userPreferences.appearance.theme);
    });
}

function updateColorSelector() {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.toggle('active', option.dataset.color === userPreferences.appearance.accentColor);
    });
}

function updateSettingsToggles() {
    // Appearance toggles
    const compactMode = document.getElementById('compactMode');
    const enableAnimations = document.getElementById('enableAnimations');
    const enableBlur = document.getElementById('enableBlur');
    const sidebarVisible = document.getElementById('sidebarVisible');
    
    if (compactMode) compactMode.checked = userPreferences.appearance.compactMode;
    if (enableAnimations) enableAnimations.checked = userPreferences.appearance.animations;
    if (enableBlur) enableBlur.checked = userPreferences.appearance.blurEffects;
    if (sidebarVisible) sidebarVisible.checked = userPreferences.appearance.sidebarVisible;
    
    // Notification toggles
    const pushNotifications = document.getElementById('pushNotifications');
    const soundEffects = document.getElementById('soundEffects');
    const dailyReminders = document.getElementById('dailyReminders');
    const streakAlerts = document.getElementById('streakAlerts');
    const achievementNotifications = document.getElementById('achievementNotifications');
    
    if (pushNotifications) pushNotifications.checked = userPreferences.notifications.push;
    if (soundEffects) soundEffects.checked = userPreferences.notifications.sound;
    if (dailyReminders) dailyReminders.checked = userPreferences.notifications.dailyReminders;
    if (streakAlerts) streakAlerts.checked = userPreferences.notifications.streakAlerts;
    if (achievementNotifications) achievementNotifications.checked = userPreferences.notifications.achievements;
    
    // Preferences toggles
    const autoPlayVideos = document.getElementById('autoPlayVideos');
    const showVideoProgress = document.getElementById('showVideoProgress');
    const confirmComplete = document.getElementById('confirmComplete');
    const showExplanations = document.getElementById('showExplanations');
    const timedMode = document.getElementById('timedMode');
    
    if (autoPlayVideos) autoPlayVideos.checked = userPreferences.preferences.autoPlayVideos;
    if (showVideoProgress) showVideoProgress.checked = userPreferences.preferences.showVideoProgress;
    if (confirmComplete) confirmComplete.checked = userPreferences.preferences.confirmComplete;
    if (showExplanations) showExplanations.checked = userPreferences.preferences.showExplanations;
    if (timedMode) timedMode.checked = userPreferences.preferences.timedMode;
    
    // Font size slider
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    if (fontSizeSlider) {
        fontSizeSlider.value = userPreferences.appearance.fontSize;
    }
    if (fontSizeValue) {
        fontSizeValue.textContent = userPreferences.appearance.fontSize + 'px';
    }
    
    // Reminder time
    const reminderTime = document.getElementById('reminderTime');
    if (reminderTime) {
        reminderTime.value = userPreferences.notifications.reminderTime;
    }
    
    // Auto-save
    const autoSave = document.getElementById('autoSave');
    const saveInterval = document.getElementById('saveInterval');
    
    if (autoSave) autoSave.checked = userPreferences.data.autoSave;
    if (saveInterval) saveInterval.value = userPreferences.data.saveInterval;
}

// ==========================================
// PROFILE SETTINGS HANDLERS
// ==========================================

function saveProfileSettings() {
    userProfile.name = document.getElementById('userName').value;
    userProfile.username = document.getElementById('userUsername').value;
    userProfile.email = document.getElementById('userEmail').value;
    userProfile.phone = document.getElementById('userPhone').value;
    userProfile.bio = document.getElementById('userBio').value;
    userProfile.location = document.getElementById('userLocation').value;
    userProfile.timezone = document.getElementById('userTimezone').value;
    
    userProfile.social.github = document.getElementById('socialGithub').value;
    userProfile.social.linkedin = document.getElementById('socialLinkedin').value;
    userProfile.social.twitter = document.getElementById('socialTwitter').value;
    userProfile.social.website = document.getElementById('socialWebsite').value;
    
    savePreferences();
    
    // Update UI
    document.querySelector('.user-avatar').textContent = userProfile.name.charAt(0).toUpperCase();
    
    toast.success('Profile Updated', 'Your profile has been saved successfully!');
}

function resetProfileSettings() {
    loadSettingsData();
    toast.info('Changes Reverted', 'Your changes have been discarded.');
}

// Avatar Upload
document.getElementById('avatarInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File Too Large', 'Please select an image under 2MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            userProfile.avatar = event.target.result;
            document.getElementById('avatarPreviewImg').src = event.target.result;
            document.getElementById('profileAvatarImg').src = event.target.result;
            savePreferences();
            toast.success('Avatar Updated', 'Your profile picture has been changed.');
        };
        reader.readAsDataURL(file);
    }
});

function removeAvatar() {
    userProfile.avatar = '';
    document.getElementById('avatarPreviewImg').src = '';
    document.getElementById('profileAvatarImg').src = '';
    savePreferences();
    toast.info('Avatar Removed', 'Your profile picture has been removed.');
}

// ==========================================
// APPEARANCE SETTINGS HANDLERS
// ==========================================

function selectTheme(theme) {
    userPreferences.appearance.theme = theme;
    
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    updateThemeSelector();
    savePreferences();
    toast.success('Theme Changed', `Theme set to ${theme}.`);
}

function selectAccentColor(color) {
    userPreferences.appearance.accentColor = color;
    updateColorSelector();
    savePreferences();
    
    // Apply accent color (would need CSS custom properties update)
    applyAccentColor(color);
    
    toast.success('Color Updated', 'Accent color has been changed.');
}

function applyAccentColor(color) {
    const colors = {
        purple: { primary: '#667eea', secondary: '#764ba2' },
        blue: { primary: '#4facfe', secondary: '#00f2fe' },
        green: { primary: '#11998e', secondary: '#38ef7d' },
        orange: { primary: '#f093fb', secondary: '#f5576c' },
        red: { primary: '#eb3349', secondary: '#f45c43' },
        teal: { primary: '#20bf55', secondary: '#01baef' }
    };
    
    if (colors[color]) {
        document.documentElement.style.setProperty('--primary-color', colors[color].primary);
    }
}

function changeFontSize(value) {
    userPreferences.appearance.fontSize = parseInt(value);
    document.documentElement.style.fontSize = value + 'px';
    document.getElementById('fontSizeValue').textContent = value + 'px';
    savePreferences();
}

function toggleCompactMode(enabled) {
    userPreferences.appearance.compactMode = enabled;
    document.body.classList.toggle('compact-mode', enabled);
    savePreferences();
}

function toggleAnimations(enabled) {
    userPreferences.appearance.animations = enabled;
    document.body.classList.toggle('no-animations', !enabled);
    savePreferences();
}

function toggleBlurEffects(enabled) {
    userPreferences.appearance.blurEffects = enabled;
    document.body.classList.toggle('no-blur', !enabled);
    savePreferences();
}

function toggleSidebarVisibility(enabled) {
    userPreferences.appearance.sidebarVisible = enabled;
    savePreferences();
}

// ==========================================
// NOTIFICATION SETTINGS HANDLERS
// ==========================================

function togglePushNotifications(enabled) {
    if (enabled && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                userPreferences.notifications.push = true;
                savePreferences();
                toast.success('Notifications Enabled', 'You will receive push notifications.');
            } else {
                document.getElementById('pushNotifications').checked = false;
                toast.warning('Permission Denied', 'Please enable notifications in your browser settings.');
            }
        });
    } else {
        userPreferences.notifications.push = enabled;
        savePreferences();
    }
}

function toggleSoundEffects(enabled) {
    userPreferences.notifications.sound = enabled;
    savePreferences();
}

function toggleDailyReminders(enabled) {
    userPreferences.notifications.dailyReminders = enabled;
    savePreferences();
}

function toggleStreakAlerts(enabled) {
    userPreferences.notifications.streakAlerts = enabled;
    savePreferences();
}

function toggleAchievementNotifications(enabled) {
    userPreferences.notifications.achievements = enabled;
    savePreferences();
}

function setReminderTime(time) {
    userPreferences.notifications.reminderTime = time;
    savePreferences();
    toast.success('Reminder Set', `Daily reminder set for ${time}`);
}

// ==========================================
// NOTIFICATIONS PANEL
// ==========================================

function toggleNotificationsPanel() {
    const panel = document.getElementById('notificationsPanel');
    const isActive = panel.classList.contains('active');
    
    closeAllDropdowns();
    
    if (!isActive) {
        panel.classList.add('active');
        renderNotificationsPanel();
    } else {
        closeNotificationsPanel();
    }
}

function closeNotificationsPanel() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.remove('active');
}

function renderNotificationsPanel() {
    const container = document.getElementById('notificationsPanelBody');
    
    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="notifications-empty">
                <div class="notifications-empty-icon">🔔</div>
                <h4>No Notifications</h4>
                <p>You're all caught up! Check back later.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}" data-id="${notif.id}" onclick="handleNotificationClick(${notif.id})">
            <div class="notification-icon ${notif.type}">
                <i class="${notif.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">
                    ${notif.title}
                    ${!notif.read ? '<span class="unread-dot"></span>' : ''}
                </div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">
                    <i class="fas fa-clock"></i>
                    ${formatTimeAgo(notif.time)}
                </div>
            </div>
        </div>
    `).join('');
}

function renderNotificationsList() {
    const container = document.getElementById('notificationsList');
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="notifications-empty" style="padding: var(--space-xl);">
                <p style="color: var(--text-muted);">No notifications yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = notifications.slice(0, 5).map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}">
            <div class="notification-icon ${notif.type}">
                <i class="${notif.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">
                    <i class="fas fa-clock"></i>
                    ${formatTimeAgo(notif.time)}
                </div>
            </div>
        </div>
    `).join('');
}

function handleNotificationClick(id) {
    const notif = notifications.find(n => n.id === id);
    if (notif) {
        notif.read = true;
        savePreferences();
        renderNotificationsPanel();
        updateNotificationBadge();
    }
}

function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    savePreferences();
    renderNotificationsPanel();
    updateNotificationBadge();
    toast.success('All Read', 'All notifications marked as read.');
}

function clearAllNotifications() {
    notifications = [];
    savePreferences();
    renderNotificationsPanel();
    renderNotificationsList();
    updateNotificationBadge();
    toast.info('Cleared', 'All notifications have been cleared.');
}

function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.header-btn .notification-dot');
    
    if (badge) {
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    const menuBadge = document.querySelector('.profile-menu-item .menu-badge');
    if (menuBadge) {
        menuBadge.textContent = unreadCount;
        menuBadge.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
}

function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(date).toLocaleDateString();
}

function addNotification(type, title, message) {
    const icons = {
        achievement: 'fas fa-trophy',
        streak: 'fas fa-fire',
        complete: 'fas fa-check-circle',
        quiz: 'fas fa-brain',
        reminder: 'fas fa-bell',
        system: 'fas fa-info-circle'
    };
    
    const newNotification = {
        id: Date.now(),
        type,
        icon: icons[type] || 'fas fa-bell',
        title,
        message,
        time: new Date(),
        read: false
    };
    
    notifications.unshift(newNotification);
    savePreferences();
    updateNotificationBadge();
    
    // Show toast
    if (userPreferences.notifications.achievements || userPreferences.notifications.streakAlerts) {
        toast.info(title, message);
    }
    
    // Show browser notification if enabled
    if (userPreferences.notifications.push && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: message, icon: '/favicon.ico' });
    }
}

// ==========================================
// DATA & STORAGE HANDLERS
// ==========================================

function updateStorageInfo() {
    let totalSize = 0;
    const sizes = {};
    
    // Calculate sizes
    const progressData = localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
    const goalsData = localStorage.getItem(CONFIG.STORAGE_KEYS.GOALS);
    const quizData = localStorage.getItem(CONFIG.STORAGE_KEYS.QUIZ_SCORES);
    const settingsData = localStorage.getItem('aiml_preferences');
    
    sizes.progress = progressData ? new Blob([progressData]).size : 0;
    sizes.goals = goalsData ? new Blob([goalsData]).size : 0;
    sizes.quiz = quizData ? new Blob([quizData]).size : 0;
    sizes.settings = settingsData ? new Blob([settingsData]).size : 0;
    
    totalSize = Object.values(sizes).reduce((a, b) => a + b, 0);
    
    // Update UI
    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };
    
    document.getElementById('storageUsed').textContent = formatSize(totalSize);
    document.getElementById('storageBarFill').style.width = Math.min((totalSize / (5 * 1024 * 1024)) * 100, 100) + '%';
    
    document.getElementById('progressDataSize').textContent = formatSize(sizes.progress);
    document.getElementById('goalsDataSize').textContent = formatSize(sizes.goals);
    document.getElementById('quizDataSize').textContent = formatSize(sizes.quiz);
    document.getElementById('settingsDataSize').textContent = formatSize(sizes.settings);
}

function exportAllData() {
    const data = {
        profile: userProfile,
        preferences: userPreferences,
        progress: stateManager.state.progress,
        goals: stateManager.state.goals,
        streak: stateManager.state.streak,
        quizScores: stateManager.state.quizScores,
        notifications: notifications,
        exportDate: new Date().toISOString(),
        version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `aiml-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data Exported', 'Your data has been downloaded successfully.');
}

function exportUserData() {
    exportAllData();
}

function importData(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.profile) Object.assign(userProfile, data.profile);
            if (data.preferences) userPreferences = { ...userPreferences, ...data.preferences };
            if (data.progress) stateManager.state.progress = data.progress;
            if (data.goals) stateManager.state.goals = data.goals;
            if (data.streak) stateManager.state.streak = data.streak;
            if (data.quizScores) stateManager.state.quizScores = data.quizScores;
            if (data.notifications) notifications = data.notifications;
            
            savePreferences();
            stateManager.saveState();
            applyPreferences();
            renderApp();
            
            toast.success('Data Imported', 'Your data has been restored successfully.');
            closeSettings();
        } catch (error) {
            toast.error('Import Failed', 'Invalid backup file format.');
        }
    };
    reader.readAsText(file);
}

function toggleAutoSave(enabled) {
    userPreferences.data.autoSave = enabled;
    savePreferences();
}

function setSaveInterval(interval) {
    userPreferences.data.saveInterval = parseInt(interval);
    savePreferences();
}

// ==========================================
// CONFIRMATION MODALS
// ==========================================

function showConfirmModal(title, message, callback, type = 'warning') {
    const modal = document.getElementById('confirmModal');
    const icon = document.getElementById('confirmModalIcon');
    
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    
    icon.className = 'confirm-modal-icon ' + type;
    
    const icons = {
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-trash-alt',
        success: 'fas fa-check-circle'
    };
    
    icon.innerHTML = `<i class="${icons[type] || icons.warning}"></i>`;
    
    confirmModalCallback = callback;
    modal.classList.add('active');
}

function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('active');
    confirmModalCallback = null;
}

function executeConfirmAction() {
    if (confirmModalCallback) {
        confirmModalCallback();
    }
    closeConfirmModal();
}

function confirmResetProgress() {
    showConfirmModal(
        'Reset Progress?',
        'This will clear all your learning progress. Your profile and settings will be kept. This action cannot be undone.',
        () => {
            stateManager.state.progress = {};
            stateManager.saveState();
            renderApp();
            updateSidebarProgress();
            toast.success('Progress Reset', 'Your learning progress has been cleared.');
            closeSettings();
        },
        'danger'
    );
}

function confirmDeleteAllData() {
    showConfirmModal(
        'Delete All Data?',
        'This will permanently delete all your data including profile, progress, goals, and settings. This action cannot be undone.',
        () => {
            localStorage.clear();
            location.reload();
        },
        'danger'
    );
}

function confirmLogout() {
    showConfirmModal(
        'Logout?',
        'Your progress is saved locally and will be available when you return.',
        () => {
            stateManager.saveState();
            savePreferences();
            toast.success('See you soon!', 'Your progress has been saved.');
            closeSettings();
            closeProfileDropdown();
        },
        'success'
    );
}

// ==========================================
// VIDEO LEAVE MODAL
// ==========================================

function showVideoLeaveModal(progress = 0) {
    if (dontAskOnLeave) {
        closeVideoModal();
        return;
    }
    
    videoWatchProgress = progress;
    
    const modal = document.getElementById('videoLeaveModal');
    document.getElementById('videoLeaveProgressFill').style.width = progress + '%';
    document.getElementById('videoLeaveProgressText').textContent = progress + '% watched';
    
    modal.classList.add('active');
}

function continueWatching() {
    const modal = document.getElementById('videoLeaveModal');
    modal.classList.remove('active');
}

function saveAndLeave() {
    // Save progress to current topic
    if (videoPlayer.currentTopic) {
        stateManager.setProgress(videoPlayer.currentTopic.id, {
            watchedSeconds: Math.floor(videoWatchProgress * 100),
            lastWatched: new Date().toISOString()
        });
    }
    
    const modal = document.getElementById('videoLeaveModal');
    modal.classList.remove('active');
    videoPlayer.close();
    
    toast.success('Progress Saved', 'You can continue where you left off.');
}

function leaveWithoutSaving() {
    const modal = document.getElementById('videoLeaveModal');
    modal.classList.remove('active');
    videoPlayer.close();
}

function toggleDontAskAgain(checked) {
    dontAskOnLeave = checked;
    localStorage.setItem('aiml_dont_ask_leave', checked);
}

// ==========================================
// PREFERENCES HANDLERS
// ==========================================

function toggleAutoPlayVideos(enabled) {
    userPreferences.preferences.autoPlayVideos = enabled;
    savePreferences();
}

function toggleVideoProgress(enabled) {
    userPreferences.preferences.showVideoProgress = enabled;
    savePreferences();
}

function toggleConfirmComplete(enabled) {
    userPreferences.preferences.confirmComplete = enabled;
    savePreferences();
}

function toggleExplanations(enabled) {
    userPreferences.preferences.showExplanations = enabled;
    savePreferences();
}

function toggleTimedMode(enabled) {
    userPreferences.preferences.timedMode = enabled;
    savePreferences();
}

function setDefaultQuizCount(count) {
    userPreferences.preferences.defaultQuizCount = parseInt(count);
    savePreferences();
}

function setDefaultDifficulty(difficulty) {
    userPreferences.preferences.defaultDifficulty = difficulty;
    savePreferences();
}

function setDailyGoal(minutes) {
    userPreferences.preferences.dailyGoalMinutes = parseInt(minutes);
    savePreferences();
}

function setWeeklyGoal(topics) {
    userPreferences.preferences.weeklyTopicGoal = parseInt(topics);
    savePreferences();
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function closeAllDropdowns() {
    closeProfileDropdown();
    closeNotificationsPanel();
}

function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openCustomColorPicker() {
    toast.info('Coming Soon', 'Custom color picker will be available in the next update.');
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

let keySequence = '';
let keySequenceTimeout;

document.addEventListener('keydown', function(e) {
    // Close modals with Escape
    if (e.key === 'Escape') {
        closeSettings();
        closeConfirmModal();
        closeAllDropdowns();
        
        const videoLeaveModal = document.getElementById('videoLeaveModal');
        if (videoLeaveModal.classList.contains('active')) {
            continueWatching();
        }
    }
    
    // Ctrl + , for settings
    if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        openSettings();
    }
    
    // Ctrl + Shift + T for theme toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        stateManager.toggleTheme();
    }
    
    // Ctrl + B for sidebar toggle
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Ctrl + K for search focus
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.header-search input');
        if (searchInput) searchInput.focus();
    }
    
    // G + key navigation
    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        clearTimeout(keySequenceTimeout);
        keySequence += e.key.toLowerCase();
        
        keySequenceTimeout = setTimeout(() => {
            keySequence = '';
        }, 500);
        
        if (keySequence === 'gd') {
            navigateTo('dashboard');
            keySequence = '';
        } else if (keySequence === 'gr') {
            navigateTo('roadmap');
            keySequence = '';
        } else if (keySequence === 'gq') {
            navigateTo('quiz');
            keySequence = '';
        } else if (keySequence === 'gg') {
            navigateTo('goals');
            keySequence = '';
        } else if (keySequence === 'gp') {
            navigateTo('progress');
            keySequence = '';
        }
    }
});

// ==========================================
// EVENT LISTENERS FOR NEW FEATURES
// ==========================================

// Profile avatar click
document.querySelector('.user-avatar')?.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleProfileDropdown();
});

// Notifications button click
document.querySelector('.header-btn[data-tooltip="Notifications"]')?.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNotificationsPanel();
});

// Close settings on backdrop click
document.getElementById('settingsModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeSettings();
    }
});

// Close confirm modal on backdrop click
document.getElementById('confirmModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeConfirmModal();
    }
});

// System theme preference change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (userPreferences.appearance.theme === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// ==========================================
// INITIALIZE NEW FEATURES
// ==========================================

function initNewFeatures() {
    // Load preferences
    loadPreferences();
    
    // Load dont ask again preference
    dontAskOnLeave = localStorage.getItem('aiml_dont_ask_leave') === 'true';
    
    // Update notification badge
    updateNotificationBadge();
    
    // Override video player close to show leave modal
    const originalVideoClose = videoPlayer.close.bind(videoPlayer);
    videoPlayer.close = function() {
        if (this.currentTopic && videoWatchProgress > 0 && videoWatchProgress < 100) {
            showVideoLeaveModal(videoWatchProgress);
        } else {
            originalVideoClose();
        }
    };
    
    // Simulate video progress tracking
    setInterval(() => {
        const iframe = document.getElementById('videoIframe');
        if (iframe && iframe.src && videoPlayer.currentTopic) {
            // Simulate progress (in real implementation, use YouTube API)
            videoWatchProgress = Math.min(videoWatchProgress + 1, 100);
        }
    }, 3000);
    
    console.log('✅ New features initialized');
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    // Wait for main app to initialize
    setTimeout(initNewFeatures, 100);
});

// Also run if DOM is already loaded
if (document.readyState !== 'loading') {
    setTimeout(initNewFeatures, 100);
}
// ==========================================
// FIX: VIDEO MODAL CLOSE FUNCTIONALITY
// ==========================================

// Update Video Player close functionality
class VideoPlayerFix {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.currentTopic = null;
        this.isPlaying = false;
        this.watchProgress = 0;
        this.dontAskOnLeave = localStorage.getItem('aiml_dont_ask_leave') === 'true';
        
        this.init();
    }
    
    init() {
        // Close button click
        const closeBtn = this.modal?.querySelector('.video-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleClose();
            });
        }
        
        // Click outside to close
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.handleClose();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.modal?.classList.contains('active')) {
                    e.preventDefault();
                    this.handleClose();
                }
            }
        });
        
        // Mark complete button
        const markCompleteBtn = document.getElementById('markCompleteBtn');
        if (markCompleteBtn) {
            markCompleteBtn.addEventListener('click', () => this.markComplete());
        }
    }
    
    open(topic) {
        this.currentTopic = topic;
        this.watchProgress = 0;
        this.isPlaying = true;
        
        const iframe = this.modal.querySelector('#videoIframe');
        const title = this.modal.querySelector('.video-modal-title');
        const duration = this.modal.querySelector('#videoDuration');
        const channel = this.modal.querySelector('#videoChannel');
        const markBtn = this.modal.querySelector('#markCompleteBtn');
        
        // Set video source
        if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${topic.videoId}?rel=0&modestbranding=1&enablejsapi=1`;
        }
        
        if (title) title.textContent = topic.title;
        if (duration) duration.textContent = topic.duration;
        if (channel) channel.textContent = topic.channel;
        
        // Update mark complete button
        const progress = stateManager?.getProgress(topic.id);
        if (markBtn) {
            if (progress?.completed) {
                markBtn.innerHTML = '<i class="fas fa-check-double"></i><span>Completed!</span>';
                markBtn.classList.add('completed');
            } else {
                markBtn.innerHTML = '<i class="fas fa-check"></i><span>Mark as Complete</span>';
                markBtn.classList.remove('completed');
            }
        }
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    handleClose() {
        // Check if we should show leave confirmation
        if (this.currentTopic && this.watchProgress > 0 && this.watchProgress < 95 && !this.dontAskOnLeave) {
            this.showLeaveConfirmation();
        } else {
            this.forceClose();
        }
    }
    
    forceClose() {
        const iframe = this.modal?.querySelector('#videoIframe');
        
        // Stop video by clearing src
        if (iframe) {
            iframe.src = '';
        }
        
        // Hide modal
        this.modal?.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset state
        this.currentTopic = null;
        this.isPlaying = false;
        this.watchProgress = 0;
        
        // Close leave modal if open
        const leaveModal = document.getElementById('videoLeaveModal');
        if (leaveModal) {
            leaveModal.classList.remove('active');
        }
    }
    
    showLeaveConfirmation() {
        const leaveModal = document.getElementById('videoLeaveModal');
        
        if (!leaveModal) {
            // If leave modal doesn't exist, just close
            this.forceClose();
            return;
        }
        
        // Update progress display
        const progressFill = document.getElementById('videoLeaveProgressFill');
        const progressText = document.getElementById('videoLeaveProgressText');
        
        if (progressFill) progressFill.style.width = this.watchProgress + '%';
        if (progressText) progressText.textContent = Math.round(this.watchProgress) + '% watched';
        
        leaveModal.classList.add('active');
    }
    
    markComplete() {
        if (this.currentTopic && stateManager) {
            stateManager.toggleTopicComplete(this.currentTopic.id);
            
            const progress = stateManager.getProgress(this.currentTopic.id);
            const markBtn = this.modal.querySelector('#markCompleteBtn');
            
            if (markBtn) {
                if (progress.completed) {
                    markBtn.innerHTML = '<i class="fas fa-check-double"></i><span>Completed!</span>';
                    markBtn.classList.add('completed');
                    
                    if (typeof toast !== 'undefined') {
                        toast.success('Topic Completed!', `You've completed "${this.currentTopic.title}"`);
                    }
                    
                    // Trigger confetti
                    if (typeof triggerConfetti === 'function') {
                        triggerConfetti();
                    }
                } else {
                    markBtn.innerHTML = '<i class="fas fa-check"></i><span>Mark as Complete</span>';
                    markBtn.classList.remove('completed');
                }
            }
            
            // Re-render app to update UI
            if (typeof renderApp === 'function') {
                renderApp();
            }
        }
    }
    
    saveProgress() {
        if (this.currentTopic && stateManager) {
            stateManager.setProgress(this.currentTopic.id, {
                watchedSeconds: Math.floor(this.watchProgress * 100),
                lastWatched: new Date().toISOString()
            });
        }
    }
}

// Video Leave Modal Functions
function continueWatching() {
    const leaveModal = document.getElementById('videoLeaveModal');
    if (leaveModal) {
        leaveModal.classList.remove('active');
    }
}

function saveAndLeave() {
    if (typeof videoPlayerFix !== 'undefined') {
        videoPlayerFix.saveProgress();
        videoPlayerFix.forceClose();
        
        if (typeof toast !== 'undefined') {
            toast.success('Progress Saved', 'You can continue where you left off.');
        }
    }
}

function leaveWithoutSaving() {
    if (typeof videoPlayerFix !== 'undefined') {
        videoPlayerFix.forceClose();
    }
}

function toggleDontAskAgain(checked) {
    localStorage.setItem('aiml_dont_ask_leave', checked ? 'true' : 'false');
    if (typeof videoPlayerFix !== 'undefined') {
        videoPlayerFix.dontAskOnLeave = checked;
    }
}

// Initialize the fixed video player
let videoPlayerFix;

document.addEventListener('DOMContentLoaded', function() {
    videoPlayerFix = new VideoPlayerFix();
    
    // Override the global openVideo function
    window.openVideo = function(topicId) {
        let topic = null;
        
        // Find the topic in roadmap data
        if (typeof ROADMAP_DATA !== 'undefined') {
            Object.values(ROADMAP_DATA).forEach(section => {
                const found = section.topics.find(t => t.id === topicId);
                if (found) topic = found;
            });
        }
        
        if (topic && videoPlayerFix) {
            videoPlayerFix.open(topic);
        }
    };
    
    // Simulate video progress (for demo purposes)
    setInterval(() => {
        if (videoPlayerFix && videoPlayerFix.isPlaying && videoPlayerFix.currentTopic) {
            videoPlayerFix.watchProgress = Math.min(videoPlayerFix.watchProgress + 0.5, 100);
        }
    }, 1000);
});

// If DOM already loaded
if (document.readyState !== 'loading') {
    videoPlayerFix = new VideoPlayerFix();
}
// ==========================================
// DIRECT FIX FOR VIDEO MODAL CLOSE
// ==========================================

(function() {
    'use strict';
    
    // Wait for DOM
    function initVideoCloseFix() {
        const videoModal = document.getElementById('videoModal');
        const closeBtn = videoModal?.querySelector('.video-modal-close');
        const videoIframe = document.getElementById('videoIframe');
        
        // Function to close video
        function closeVideoModal() {
            console.log('Closing video modal...');
            
            // Stop the video
            if (videoIframe) {
                videoIframe.src = '';
            }
            
            // Hide modal
            if (videoModal) {
                videoModal.classList.remove('active');
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            console.log('Video modal closed.');
        }
        
        // Close button click
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeVideoModal();
            };
        }
        
        // Click outside modal content
        if (videoModal) {
            videoModal.onclick = function(e) {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            };
        }
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
                closeVideoModal();
            }
        });
        
        // Also make it globally available
        window.closeVideoModal = closeVideoModal;
        
        console.log('✅ Video close fix initialized');
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoCloseFix);
    } else {
        initVideoCloseFix();
    }
    
    // Also run after a short delay to ensure everything is loaded
    setTimeout(initVideoCloseFix, 1000);
})();
// ==========================================
// VIDEO NOTES SYSTEM
// ==========================================

// Notes Storage
const NOTES_STORAGE_KEY = 'aiml_video_notes';
let allNotes = {};
let currentNoteTopicId = null;
let autoSaveTimeout = null;
let isNotesPanelOpen = false;

// Initialize Notes System
function initNotesSystem() {
    loadAllNotes();
    
    // Keyboard shortcuts for editor
    const notesEditor = document.getElementById('notesEditor');
    if (notesEditor) {
        notesEditor.addEventListener('keydown', handleNotesKeydown);
        notesEditor.addEventListener('input', updateNotesStats);
    }
    
    console.log('✅ Notes system initialized');
}

// Load all notes from localStorage
function loadAllNotes() {
    const saved = localStorage.getItem(NOTES_STORAGE_KEY);
    if (saved) {
        try {
            allNotes = JSON.parse(saved);
        } catch (e) {
            allNotes = {};
        }
    }
}

// Save all notes to localStorage
function saveAllNotes() {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));
}

// Toggle Notes Panel
function toggleVideoNotes() {
    const panel = document.getElementById('videoNotesPanel');
    const modalBody = document.querySelector('.video-modal-body');
    
    isNotesPanelOpen = !isNotesPanelOpen;
    
    if (isNotesPanelOpen) {
        panel.classList.add('active');
        modalBody.classList.add('notes-open');
        
        // Load notes for current topic
        if (currentNoteTopicId) {
            loadNotesForTopic(currentNoteTopicId);
        }
        
        // Focus editor
        setTimeout(() => {
            document.getElementById('notesEditor')?.focus();
        }, 300);
    } else {
        panel.classList.remove('active');
        modalBody.classList.remove('notes-open');
    }
}

// Load notes for a specific topic
function loadNotesForTopic(topicId) {
    const editor = document.getElementById('notesEditor');
    if (!editor) return;
    
    currentNoteTopicId = topicId;
    
    if (allNotes[topicId]) {
        editor.innerHTML = allNotes[topicId].content;
    } else {
        editor.innerHTML = '';
    }
    
    updateNotesStats();
    updateSaveStatus('saved');
}

// Auto-save notes
function autoSaveNotes() {
    clearTimeout(autoSaveTimeout);
    updateSaveStatus('saving');
    
    autoSaveTimeout = setTimeout(() => {
        saveCurrentNotes();
        updateSaveStatus('saved');
    }, 1000);
}

// Save current notes
function saveCurrentNotes() {
    const editor = document.getElementById('notesEditor');
    if (!editor || !currentNoteTopicId) return;
    
    const content = editor.innerHTML;
    const plainText = editor.innerText;
    
    if (plainText.trim()) {
        // Get topic title
        let topicTitle = 'Untitled';
        if (typeof ROADMAP_DATA !== 'undefined') {
            Object.values(ROADMAP_DATA).forEach(section => {
                const topic = section.topics.find(t => t.id === currentNoteTopicId);
                if (topic) topicTitle = topic.title;
            });
        }
        
        allNotes[currentNoteTopicId] = {
            content: content,
            plainText: plainText,
            topicTitle: topicTitle,
            updatedAt: new Date().toISOString(),
            createdAt: allNotes[currentNoteTopicId]?.createdAt || new Date().toISOString(),
            wordCount: getWordCount(plainText),
            charCount: plainText.length
        };
    } else {
        delete allNotes[currentNoteTopicId];
    }
    
    saveAllNotes();
    updateNotesStats();
}

// Update notes statistics
function updateNotesStats() {
    const editor = document.getElementById('notesEditor');
    if (!editor) return;
    
    const text = editor.innerText;
    const wordCount = getWordCount(text);
    const charCount = text.length;
    
    document.getElementById('notesWordCount').textContent = wordCount;
    document.getElementById('notesCharCount').textContent = charCount;
}

function getWordCount(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// Update save status
function updateSaveStatus(status) {
    const statusEl = document.getElementById('notesSaveStatus');
    if (!statusEl) return;
    
    if (status === 'saving') {
        statusEl.innerHTML = '<i class="fas fa-sync-alt"></i> Saving...';
        statusEl.className = 'notes-save-status saving';
    } else {
        statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Saved';
        statusEl.className = 'notes-save-status';
    }
}

// Format note (toolbar buttons)
function formatNote(command) {
    const editor = document.getElementById('notesEditor');
    if (!editor) return;
    
    editor.focus();
    
    switch (command) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'italic':
            document.execCommand('italic', false, null);
            break;
        case 'underline':
            document.execCommand('underline', false, null);
            break;
        case 'strikethrough':
            document.execCommand('strikeThrough', false, null);
            break;
        case 'heading':
            const selection = window.getSelection();
            const text = selection.toString() || 'Heading';
            document.execCommand('insertHTML', false, `<h3>${text}</h3>`);
            break;
        case 'bullet':
            document.execCommand('insertUnorderedList', false, null);
            break;
        case 'number':
            document.execCommand('insertOrderedList', false, null);
            break;
        case 'checkbox':
            insertCheckbox();
            break;
        case 'highlight':
            document.execCommand('hiliteColor', false, 'rgba(245, 158, 11, 0.3)');
            break;
        case 'code':
            insertCodeBlock();
            break;
        case 'link':
            insertLink();
            break;
    }
    
    autoSaveNotes();
}

// Insert timestamp
function insertTimestamp() {
    const editor = document.getElementById('notesEditor');
    if (!editor) return;
    
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const timestampHtml = `<span class="timestamp" contenteditable="false"><i class="fas fa-clock"></i> ${timestamp}</span>&nbsp;`;
    
    document.execCommand('insertHTML', false, timestampHtml);
    autoSaveNotes();
}

// Insert checkbox
function insertCheckbox() {
    const checkboxHtml = `<div class="checkbox-item"><input type="checkbox" onclick="autoSaveNotes()"><span contenteditable="true">Task item</span></div>`;
    document.execCommand('insertHTML', false, checkboxHtml);
}

// Insert code block
function insertCodeBlock() {
    const selection = window.getSelection();
    const text = selection.toString() || 'code here';
    document.execCommand('insertHTML', false, `<pre><code>${text}</code></pre>`);
}

// Insert link
function insertLink() {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
        const selection = window.getSelection();
        const text = selection.toString() || url;
        document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${text}</a>`);
    }
}

// Handle keyboard shortcuts in editor
function handleNotesKeydown(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
            case 'b':
                e.preventDefault();
                formatNote('bold');
                break;
            case 'i':
                e.preventDefault();
                formatNote('italic');
                break;
            case 'u':
                e.preventDefault();
                formatNote('underline');
                break;
            case 's':
                e.preventDefault();
                saveCurrentNotes();
                toast.success('Notes Saved', 'Your notes have been saved.');
                break;
        }
    }
}

// Clear current notes
function clearCurrentNotes() {
    if (confirm('Are you sure you want to clear these notes?')) {
        const editor = document.getElementById('notesEditor');
        if (editor) {
            editor.innerHTML = '';
            saveCurrentNotes();
        }
    }
}

// Save and close notes
function saveAndCloseNotes() {
    saveCurrentNotes();
    toggleVideoNotes();
    toast.success('Notes Saved', 'Your notes have been saved successfully.');
}

// ==========================================
// EXPORT NOTES FUNCTIONS
// ==========================================

// Save notes as Word Document (.doc)
function saveNotesToFile() {
    const editor = document.getElementById('notesEditor');
    if (!editor || !editor.innerText.trim()) {
        toast.warning('No Notes', 'Please add some notes before downloading.');
        return;
    }
    
    // Get topic title
    let topicTitle = 'Notes';
    if (currentNoteTopicId && typeof ROADMAP_DATA !== 'undefined') {
        Object.values(ROADMAP_DATA).forEach(section => {
            const topic = section.topics.find(t => t.id === currentNoteTopicId);
            if (topic) topicTitle = topic.title;
        });
    }
    
    // Create Word document HTML
    const docContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>${topicTitle} - Notes</title>
            <style>
                body {
                    font-family: 'Calibri', sans-serif;
                    font-size: 12pt;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                }
                h1 {
                    color: #667eea;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 10px;
                }
                h2, h3 {
                    color: #764ba2;
                    margin-top: 20px;
                }
                .timestamp {
                    background: #f0f0f0;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 10pt;
                    color: #667eea;
                }
                code {
                    background: #f5f5f5;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Consolas', monospace;
                }
                pre {
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
                mark {
                    background: #fff3cd;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    font-size: 10pt;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <h1>📝 ${topicTitle}</h1>
            <p style="color: #666; font-size: 10pt;">
                Notes from AI-ML Roadmap Hub<br>
                Created: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
            <hr>
            ${editor.innerHTML}
            <div class="footer">
                <p>Generated by AI-ML Roadmap Hub</p>
            </div>
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob(['\ufeff' + docContent], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/[^a-z0-9]/gi, '_')}_Notes.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Download Started', 'Your notes are being downloaded as a Word document.');
}

// Save notes as PDF
function saveNotesAsPDF() {
    const editor = document.getElementById('notesEditor');
    if (!editor || !editor.innerText.trim()) {
        toast.warning('No Notes', 'Please add some notes before downloading.');
        return;
    }
    
    // Get topic title
    let topicTitle = 'Notes';
    if (currentNoteTopicId && typeof ROADMAP_DATA !== 'undefined') {
        Object.values(ROADMAP_DATA).forEach(section => {
            const topic = section.topics.find(t => t.id === currentNoteTopicId);
            if (topic) topicTitle = topic.title;
        });
    }
    
    // Create print-friendly version
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${topicTitle} - Notes</title>
            <style>
                @page { margin: 2cm; }
                body {
                    font-family: 'Georgia', serif;
                    font-size: 12pt;
                    line-height: 1.8;
                    color: #333;
                }
                h1 {
                    color: #667eea;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 10px;
                }
                h2, h3 {
                    color: #764ba2;
                    margin-top: 24px;
                }
                .timestamp {
                    background: #f0f0f0;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 10pt;
                }
                code {
                    background: #f5f5f5;
                    padding: 2px 6px;
                    font-family: monospace;
                }
                pre {
                    background: #f5f5f5;
                    padding: 15px;
                    border-left: 4px solid #667eea;
                }
                mark {
                    background: #fff3cd;
                }
            </style>
        </head>
        <body>
            <h1>📝 ${topicTitle}</h1>
            <p style="color: #666; font-size: 10pt;">
                AI-ML Roadmap Hub | ${new Date().toLocaleDateString()}
            </p>
            <hr>
            ${editor.innerHTML}
        </body>
        </html>
    `;
    
    // Open print dialog
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close();
        };
    };
    
    toast.info('Print Dialog', 'Save as PDF from the print dialog.');
}

// Save notes as TXT
function saveNotesAsTXT() {
    const editor = document.getElementById('notesEditor');
    if (!editor || !editor.innerText.trim()) {
        toast.warning('No Notes', 'Please add some notes before downloading.');
        return;
    }
    
    // Get topic title
    let topicTitle = 'Notes';
    if (currentNoteTopicId && typeof ROADMAP_DATA !== 'undefined') {
        Object.values(ROADMAP_DATA).forEach(section => {
            const topic = section.topics.find(t => t.id === currentNoteTopicId);
            if (topic) topicTitle = topic.title;
        });
    }
    
    const textContent = `${topicTitle}
${'='.repeat(topicTitle.length)}

${editor.innerText}

---
Notes from AI-ML Roadmap Hub
Created: ${new Date().toLocaleString()}
`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/[^a-z0-9]/gi, '_')}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Download Started', 'Your notes are being downloaded as a text file.');
}

// ==========================================
// ALL NOTES MODAL
// ==========================================

function openAllNotesModal() {
    const modal = document.getElementById('allNotesModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderAllNotes();
}

function closeAllNotesModal() {
    const modal = document.getElementById('allNotesModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderAllNotes(searchQuery = '') {
    const container = document.getElementById('allNotesBody');
    const countEl = document.getElementById('totalNotesCount');
    
    const notesArray = Object.entries(allNotes)
        .map(([topicId, note]) => ({ topicId, ...note }))
        .filter(note => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return note.topicTitle.toLowerCase().includes(query) ||
                   note.plainText.toLowerCase().includes(query);
        })
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    countEl.textContent = notesArray.length;
    
    if (notesArray.length === 0) {
        container.innerHTML = `
            <div class="notes-empty-state">
                <div class="notes-empty-icon">📝</div>
                <h4>${searchQuery ? 'No matching notes found' : 'No notes yet'}</h4>
                <p>${searchQuery ? 'Try a different search term' : 'Start watching videos and add notes!'}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="notes-grid">
            ${notesArray.map(note => `
                <div class="note-card" onclick="openNoteForViewing('${note.topicId}')">
                    <div class="note-card-header">
                        <div class="note-card-title">
                            <h5>${note.topicTitle}</h5>
                            <span>${formatNoteDate(note.updatedAt)}</span>
                        </div>
                        <div class="note-card-actions" onclick="event.stopPropagation()">
                            <button onclick="downloadSingleNote('${note.topicId}')" data-tooltip="Download">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="delete" onclick="deleteSingleNote('${note.topicId}')" data-tooltip="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="note-card-body">
                        <div class="note-card-preview">${note.plainText.substring(0, 200)}...</div>
                    </div>
                    <div class="note-card-footer">
                        <span><i class="fas fa-font"></i> ${note.wordCount} words</span>
                        <span><i class="fas fa-clock"></i> ${formatNoteDate(note.updatedAt)}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatNoteDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

function searchNotes(query) {
    renderAllNotes(query);
}

function openNoteForViewing(topicId) {
    closeAllNotesModal();
    
    // Find and open the topic
    if (typeof ROADMAP_DATA !== 'undefined') {
        let topic = null;
        Object.values(ROADMAP_DATA).forEach(section => {
            const found = section.topics.find(t => t.id === topicId);
            if (found) topic = found;
        });
        
        if (topic) {
            openVideo(topicId);
            setTimeout(() => {
                toggleVideoNotes();
            }, 500);
        }
    }
}

function downloadSingleNote(topicId) {
    const note = allNotes[topicId];
    if (!note) return;
    
    const docContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>${note.topicTitle} - Notes</title>
            <style>
                body { font-family: Calibri, sans-serif; font-size: 12pt; line-height: 1.6; padding: 40px; }
                h1 { color: #667eea; }
            </style>
        </head>
        <body>
            <h1>📝 ${note.topicTitle}</h1>
            <p style="color: #666;">Created: ${new Date(note.createdAt).toLocaleString()}</p>
            <hr>
            ${note.content}
        </body>
        </html>
    `;
    
    const blob = new Blob(['\ufeff' + docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.topicTitle.replace(/[^a-z0-9]/gi, '_')}_Notes.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Download Started', 'Note is being downloaded.');
}

function deleteSingleNote(topicId) {
    if (confirm('Are you sure you want to delete this note?')) {
        delete allNotes[topicId];
        saveAllNotes();
        renderAllNotes();
        toast.success('Note Deleted', 'The note has been deleted.');
    }
}

function exportAllNotes() {
    if (Object.keys(allNotes).length === 0) {
        toast.warning('No Notes', 'You don\'t have any notes to export.');
        return;
    }
    
    let combinedContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>All Notes - AI-ML Roadmap Hub</title>
            <style>
                body { font-family: Calibri, sans-serif; font-size: 12pt; line-height: 1.6; padding: 40px; }
                h1 { color: #667eea; }
                h2 { color: #764ba2; page-break-before: always; }
                h2:first-of-type { page-break-before: auto; }
                .note-meta { color: #666; font-size: 10pt; margin-bottom: 20px; }
                hr { margin: 30px 0; }
            </style>
        </head>
        <body>
            <h1>📚 All Notes - AI-ML Roadmap Hub</h1>
            <p style="color: #666;">Exported on ${new Date().toLocaleString()}</p>
            <hr>
    `;
    
    Object.values(allNotes).forEach(note => {
        combinedContent += `
            <h2>📝 ${note.topicTitle}</h2>
            <p class="note-meta">Last updated: ${new Date(note.updatedAt).toLocaleString()}</p>
            ${note.content}
            <hr>
        `;
    });
    
    combinedContent += `
            <p style="text-align: center; color: #666; margin-top: 40px;">
                Generated by AI-ML Roadmap Hub
            </p>
        </body>
        </html>
    `;
    
    const blob = new Blob(['\ufeff' + combinedContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `All_Notes_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Export Complete', 'All notes have been exported.');
}

function confirmDeleteAllNotes() {
    if (confirm('Are you sure you want to delete ALL notes? This cannot be undone.')) {
        allNotes = {};
        saveAllNotes();
        renderAllNotes();
        toast.success('All Notes Deleted', 'All your notes have been deleted.');
    }
}

// Toggle bookmark
function toggleVideoBookmark() {
    if (!currentNoteTopicId) return;
    
    let bookmarks = JSON.parse(localStorage.getItem('aiml_bookmarks') || '[]');
    
    if (bookmarks.includes(currentNoteTopicId)) {
        bookmarks = bookmarks.filter(id => id !== currentNoteTopicId);
        toast.info('Bookmark Removed', 'Video removed from bookmarks.');
    } else {
        bookmarks.push(currentNoteTopicId);
        toast.success('Bookmarked!', 'Video added to bookmarks.');
    }
    
    localStorage.setItem('aiml_bookmarks', JSON.stringify(bookmarks));
}

// ==========================================
// UPDATE VIDEO PLAYER TO SUPPORT NOTES
// ==========================================

// Override openVideo to set currentNoteTopicId
const originalOpenVideo = window.openVideo;
window.openVideo = function(topicId) {
    currentNoteTopicId = topicId;
    
    // Close notes panel if open
    const panel = document.getElementById('videoNotesPanel');
    const modalBody = document.querySelector('.video-modal-body');
    if (panel) panel.classList.remove('active');
    if (modalBody) modalBody.classList.remove('notes-open');
    isNotesPanelOpen = false;
    
    // Call original function
    if (typeof originalOpenVideo === 'function') {
        originalOpenVideo(topicId);
    } else {
        // Fallback implementation
        let topic = null;
        if (typeof ROADMAP_DATA !== 'undefined') {
            Object.values(ROADMAP_DATA).forEach(section => {
                const found = section.topics.find(t => t.id === topicId);
                if (found) topic = found;
            });
        }
        
        if (topic) {
            const modal = document.getElementById('videoModal');
            const iframe = document.getElementById('videoIframe');
            const title = document.querySelector('.video-modal-title');
            const duration = document.getElementById('videoDuration');
            const channel = document.getElementById('videoChannel');
            
            if (iframe) iframe.src = `https://www.youtube.com/embed/${topic.videoId}?rel=0&modestbranding=1`;
            if (title) title.textContent = topic.title;
            if (duration) duration.textContent = topic.duration;
            if (channel) channel.textContent = topic.channel;
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }
};

// Close video modal function
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    const panel = document.getElementById('videoNotesPanel');
    const modalBody = document.querySelector('.video-modal-body');
    
    // Save notes if any
    if (isNotesPanelOpen) {
        saveCurrentNotes();
    }
    
    // Stop video
    if (iframe) iframe.src = '';
    
    // Close notes panel
    if (panel) panel.classList.remove('active');
    if (modalBody) modalBody.classList.remove('notes-open');
    isNotesPanelOpen = false;
    
    // Close modal
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    
    currentNoteTopicId = null;
}

// Mark video complete
function markVideoComplete() {
    if (currentNoteTopicId && typeof stateManager !== 'undefined') {
        stateManager.toggleTopicComplete(currentNoteTopicId);
        
        const progress = stateManager.getProgress(currentNoteTopicId);
        const btn = document.getElementById('markCompleteBtn');
        
        if (btn) {
            if (progress.completed) {
                btn.innerHTML = '<i class="fas fa-check-double"></i><span>Completed!</span>';
                btn.classList.add('completed');
                
                if (typeof toast !== 'undefined') {
                    toast.success('Topic Completed!', 'Great job! Keep learning!');
                }
                
                if (typeof triggerConfetti === 'function') {
                    triggerConfetti();
                }
            } else {
                btn.innerHTML = '<i class="fas fa-check"></i><span>Mark as Complete</span>';
                btn.classList.remove('completed');
            }
        }
        
        if (typeof renderApp === 'function') {
            renderApp();
        }
    }
}

// Add "My Notes" to sidebar navigation
function addNotesToSidebar() {
    const navSection = document.querySelector('.nav-section:first-of-type');
    if (!navSection) return;
    
    // Check if already added
    if (document.querySelector('[data-section="my-notes"]')) return;
    
    const notesNavItem = document.createElement('div');
    notesNavItem.className = 'nav-item';
    notesNavItem.setAttribute('data-section', 'my-notes');
    notesNavItem.innerHTML = `
        <i class="fas fa-sticky-note"></i>
        <span>My Notes</span>
    `;
    notesNavItem.onclick = function() {
        openAllNotesModal();
    };
    
    // Insert after Goals
    const goalsItem = document.querySelector('[data-section="goals"]');
    if (goalsItem) {
        goalsItem.parentNode.insertBefore(notesNavItem, goalsItem.nextSibling);
    } else {
        navSection.appendChild(notesNavItem);
    }
}

// ==========================================
// INITIALIZE NOTES ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initNotesSystem();
    addNotesToSidebar();
    
    // Close modals on backdrop click
    document.getElementById('allNotesModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeAllNotesModal();
    });
    
    // Close video modal on backdrop click
    document.getElementById('videoModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeVideoModal();
    });
    
    // Escape key handlers
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('allNotesModal')?.classList.contains('active')) {
                closeAllNotesModal();
            } else if (document.getElementById('videoModal')?.classList.contains('active')) {
                closeVideoModal();
            }
        }
    });
});

// If DOM already loaded
if (document.readyState !== 'loading') {
    initNotesSystem();
    addNotesToSidebar();
}
// ==========================================
// PROFILE AVATAR/PHOTO UPLOAD FIX
// ==========================================

// Avatar Upload Handler
function initAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    
    if (avatarInput) {
        // Remove any existing listeners
        avatarInput.removeEventListener('change', handleAvatarUpload);
        // Add new listener
        avatarInput.addEventListener('change', handleAvatarUpload);
    }
    
    console.log('✅ Avatar upload initialized');
}

// Handle avatar file upload
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    console.log('File selected:', file.name, file.type, file.size);
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        toast.error('Invalid File Type', 'Please select a JPG, PNG, GIF, or WebP image.');
        event.target.value = ''; // Reset input
        return;
    }
    
    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
        toast.error('File Too Large', 'Please select an image under 2MB.');
        event.target.value = ''; // Reset input
        return;
    }
    
    // Read file and convert to base64
    const reader = new FileReader();
    
    reader.onloadstart = function() {
        console.log('Starting to read file...');
        // Show loading state
        const previewImg = document.getElementById('avatarPreviewImg');
        if (previewImg) {
            previewImg.style.opacity = '0.5';
        }
    };
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        console.log('File loaded successfully, data length:', imageData.length);
        
        // Update all avatar elements
        updateAllAvatars(imageData);
        
        // Save to localStorage
        saveAvatarToStorage(imageData);
        
        // Show success message
        toast.success('Photo Updated!', 'Your profile picture has been changed.');
        
        // Reset input for future uploads
        event.target.value = '';
    };
    
    reader.onerror = function(error) {
        console.error('Error reading file:', error);
        toast.error('Upload Failed', 'Could not read the image file. Please try again.');
        event.target.value = '';
    };
    
    reader.readAsDataURL(file);
}

// Update all avatar elements on the page
function updateAllAvatars(imageData) {
    console.log('Updating all avatars...');
    
    // 1. Settings modal preview
    const avatarPreviewImg = document.getElementById('avatarPreviewImg');
    if (avatarPreviewImg) {
        avatarPreviewImg.src = imageData;
        avatarPreviewImg.style.opacity = '1';
        avatarPreviewImg.style.display = 'block';
        console.log('Updated: avatarPreviewImg');
    }
    
    // Hide fallback text in settings
    const avatarFallback = document.querySelector('.avatar-preview .avatar-fallback');
    if (avatarFallback) {
        avatarFallback.style.display = 'none';
    }
    
    // 2. Profile dropdown avatar
    const profileAvatarImg = document.getElementById('profileAvatarImg');
    if (profileAvatarImg) {
        profileAvatarImg.src = imageData;
        profileAvatarImg.style.display = 'block';
        console.log('Updated: profileAvatarImg');
    }
    
    // Hide fallback in dropdown
    const profileFallback = document.querySelector('.profile-avatar-large .profile-avatar-fallback');
    if (profileFallback) {
        profileFallback.style.display = 'none';
    }
    
    // 3. Header avatar (main navigation)
    const headerAvatar = document.querySelector('.user-avatar');
    if (headerAvatar) {
        // Check if there's already an img inside
        let headerAvatarImg = headerAvatar.querySelector('img');
        
        if (!headerAvatarImg) {
            // Create new img element
            headerAvatarImg = document.createElement('img');
            headerAvatarImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 50%;';
            headerAvatar.innerHTML = ''; // Clear the letter
            headerAvatar.appendChild(headerAvatarImg);
        }
        
        headerAvatarImg.src = imageData;
        console.log('Updated: header avatar');
    }
    
    // 4. Update userProfile object if it exists
    if (typeof userProfile !== 'undefined') {
        userProfile.avatar = imageData;
    }
    
    console.log('All avatars updated!');
}

// Save avatar to localStorage
function saveAvatarToStorage(imageData) {
    try {
        // Save to userProfile in localStorage
        let profile = JSON.parse(localStorage.getItem('aiml_user_profile') || '{}');
        profile.avatar = imageData;
        localStorage.setItem('aiml_user_profile', JSON.stringify(profile));
        
        // Also save standalone for quick access
        localStorage.setItem('aiml_avatar', imageData);
        
        console.log('Avatar saved to storage');
    } catch (error) {
        console.error('Error saving avatar:', error);
        
        // If storage is full, try to compress or show error
        if (error.name === 'QuotaExceededError') {
            toast.error('Storage Full', 'Not enough storage space. Try a smaller image.');
        }
    }
}

// Load avatar from storage
function loadAvatarFromStorage() {
    try {
        let imageData = null;
        
        // Try to load from profile first
        const profile = JSON.parse(localStorage.getItem('aiml_user_profile') || '{}');
        if (profile.avatar) {
            imageData = profile.avatar;
        } else {
            // Fallback to standalone storage
            imageData = localStorage.getItem('aiml_avatar');
        }
        
        if (imageData) {
            console.log('Loading saved avatar...');
            updateAllAvatars(imageData);
        } else {
            console.log('No saved avatar found');
            showAvatarFallbacks();
        }
    } catch (error) {
        console.error('Error loading avatar:', error);
        showAvatarFallbacks();
    }
}

// Show fallback avatars (letter)
function showAvatarFallbacks() {
    const userName = localStorage.getItem('aiml_user_name') || 'Learner';
    const initial = userName.charAt(0).toUpperCase();
    
    // Header avatar
    const headerAvatar = document.querySelector('.user-avatar');
    if (headerAvatar) {
        const img = headerAvatar.querySelector('img');
        if (img) img.remove();
        headerAvatar.textContent = initial;
    }
    
    // Settings preview fallback
    const avatarFallback = document.querySelector('.avatar-preview .avatar-fallback');
    if (avatarFallback) {
        avatarFallback.style.display = 'flex';
        avatarFallback.textContent = initial;
    }
    
    // Profile dropdown fallback
    const profileFallback = document.querySelector('.profile-avatar-large .profile-avatar-fallback');
    if (profileFallback) {
        profileFallback.style.display = 'flex';
        profileFallback.textContent = initial;
    }
    
    // Hide images
    const avatarPreviewImg = document.getElementById('avatarPreviewImg');
    if (avatarPreviewImg) avatarPreviewImg.style.display = 'none';
    
    const profileAvatarImg = document.getElementById('profileAvatarImg');
    if (profileAvatarImg) profileAvatarImg.style.display = 'none';
}

// Remove avatar
function removeAvatar() {
    console.log('Removing avatar...');
    
    // Clear from storage
    try {
        let profile = JSON.parse(localStorage.getItem('aiml_user_profile') || '{}');
        delete profile.avatar;
        localStorage.setItem('aiml_user_profile', JSON.stringify(profile));
        localStorage.removeItem('aiml_avatar');
    } catch (error) {
        console.error('Error removing avatar from storage:', error);
    }
    
    // Clear userProfile object
    if (typeof userProfile !== 'undefined') {
        userProfile.avatar = '';
    }
    
    // Show fallbacks
    showAvatarFallbacks();
    
    toast.info('Photo Removed', 'Your profile picture has been removed.');
}

// Trigger file input click (for button)
function triggerAvatarUpload() {
    const input = document.getElementById('avatarInput');
    if (input) {
        input.click();
    }
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize avatar upload
    initAvatarUpload();
    
    // Load saved avatar
    setTimeout(loadAvatarFromStorage, 500);
});

// If DOM is already loaded
if (document.readyState !== 'loading') {
    initAvatarUpload();
    setTimeout(loadAvatarFromStorage, 500);
}

// Re-initialize when settings modal opens
const originalOpenSettings = typeof openSettings === 'function' ? openSettings : null;
window.openSettings = function(tab) {
    if (originalOpenSettings) {
        originalOpenSettings(tab);
    } else {
        const modal = document.getElementById('settingsModal');
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (tab) switchSettingsTab(tab);
    }
    
    // Re-initialize avatar upload and load avatar
    setTimeout(() => {
        initAvatarUpload();
        loadAvatarFromStorage();
    }, 100);
};