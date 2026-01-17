// roadmap-data.js - Complete Roadmap Database
// This contains all roadmaps, modules, steps, and resources

export const ROADMAPS = {
  
  // ============================================
  // 🎨 FRONTEND WEB DEVELOPMENT
  // ============================================
  frontend: {
    id: 'frontend',
    title: 'Frontend Web Development',
    subtitle: 'From Zero to Frontend Developer',
    description: 'Master HTML, CSS, JavaScript, and React to build modern, responsive websites and web applications.',
    icon: 'fa-code',
    color: '#4cc9f0',
    gradient: 'linear-gradient(135deg, #4cc9f0, #a855f7)',
    level: 'beginner',
    duration: '3-6 months',
    estimatedHours: 200,
    prerequisites: ['Basic computer skills', 'Understanding of how websites work'],
    outcomes: [
      'Build responsive websites from scratch',
      'Create interactive web applications',
      'Work with modern frameworks like React',
      'Deploy websites to the internet',
      'Prepare for frontend developer roles'
    ],
    careerPaths: ['Frontend Developer', 'UI Developer', 'React Developer', 'Web Designer'],
    
    modules: [
      // Module 1: HTML Fundamentals
      {
        id: 'html-fundamentals',
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages',
        icon: 'fa-file-code',
        estimatedHours: 15,
        order: 1,
        
        steps: [
          {
            id: 'html-intro',
            title: 'Introduction to HTML',
            type: 'lesson',
            duration: '45 min',
            description: 'Understand what HTML is and how it structures web content',
            resources: [
              {
                title: 'MDN - HTML Basics',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics',
                type: 'article',
                duration: '20 min',
                isBest: true
              },
              {
                title: 'HTML Crash Course - Traversy Media',
                url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
                type: 'video',
                duration: '60 min'
              },
              {
                title: 'W3Schools HTML Tutorial',
                url: 'https://www.w3schools.com/html/',
                type: 'course',
                duration: '2 hours'
              }
            ],
            tasks: [
              'Read the MDN HTML Basics article',
              'Set up VS Code with Live Server extension',
              'Create your first HTML file'
            ]
          },
          {
            id: 'html-elements',
            title: 'HTML Elements & Tags',
            type: 'lesson',
            duration: '60 min',
            description: 'Learn about different HTML elements and how to use them',
            resources: [
              {
                title: 'HTML Elements Reference',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
                type: 'article',
                duration: '30 min',
                isBest: true
              },
              {
                title: 'HTML Tags Explained',
                url: 'https://www.youtube.com/watch?v=salY_Sm6mv4',
                type: 'video',
                duration: '45 min'
              }
            ],
            tasks: [
              'Practice using headings (h1-h6)',
              'Create paragraphs and text formatting',
              'Add images and links to your page'
            ]
          },
          {
            id: 'html-forms',
            title: 'HTML Forms & Inputs',
            type: 'lesson',
            duration: '90 min',
            description: 'Create interactive forms with various input types',
            resources: [
              {
                title: 'HTML Forms Guide',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms',
                type: 'article',
                duration: '45 min',
                isBest: true
              },
              {
                title: 'HTML Forms Tutorial',
                url: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
                type: 'video',
                duration: '60 min'
              }
            ],
            tasks: [
              'Create a contact form',
              'Add form validation',
              'Style your form with basic CSS'
            ]
          },
          {
            id: 'html-semantic',
            title: 'Semantic HTML',
            type: 'lesson',
            duration: '45 min',
            description: 'Write meaningful, accessible HTML',
            resources: [
              {
                title: 'Semantic HTML Guide',
                url: 'https://www.freecodecamp.org/news/semantic-html5-elements/',
                type: 'article',
                duration: '20 min',
                isBest: true
              }
            ],
            tasks: [
              'Refactor your pages using semantic elements',
              'Add proper document structure',
              'Ensure accessibility basics'
            ]
          },
          {
            id: 'html-project',
            title: 'Project: Personal Portfolio Page',
            type: 'project',
            duration: '3 hours',
            description: 'Build a complete HTML portfolio page',
            projectRequirements: [
              'Header with navigation',
              'About section',
              'Skills section',
              'Contact form',
              'Footer with social links'
            ],
            tasks: [
              'Plan your portfolio structure',
              'Create all HTML sections',
              'Add proper semantic elements',
              'Test on different browsers'
            ]
          },
          {
            id: 'html-quiz',
            title: 'HTML Fundamentals Quiz',
            type: 'quiz',
            duration: '20 min',
            description: 'Test your HTML knowledge',
            passingScore: 70,
            quizId: 'html-fundamentals-quiz'
          }
        ],
        
        badge: {
          id: 'html-master',
          title: 'HTML Master',
          description: 'Completed HTML Fundamentals module',
          icon: 'fa-file-code',
          color: '#e34c26',
          xp: 100
        }
      },
      
      // Module 2: CSS Basics
      {
        id: 'css-basics',
        title: 'CSS Basics',
        description: 'Style your web pages with CSS',
        icon: 'fa-paint-brush',
        estimatedHours: 20,
        order: 2,
        
        steps: [
          {
            id: 'css-intro',
            title: 'Introduction to CSS',
            type: 'lesson',
            duration: '45 min',
            description: 'Learn how CSS works and its basic syntax',
            resources: [
              {
                title: 'CSS Basics - MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics',
                type: 'article',
                duration: '25 min',
                isBest: true
              },
              {
                title: 'CSS Crash Course - Traversy Media',
                url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
                type: 'video',
                duration: '85 min'
              }
            ],
            tasks: [
              'Link CSS to your HTML file',
              'Style text with colors and fonts',
              'Add backgrounds to elements'
            ]
          },
          {
            id: 'css-selectors',
            title: 'CSS Selectors',
            type: 'lesson',
            duration: '60 min',
            description: 'Master different ways to select elements',
            resources: [
              {
                title: 'CSS Selectors Reference',
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
                type: 'article',
                duration: '30 min',
                isBest: true
              },
              {
                title: 'CSS Diner Game',
                url: 'https://flukeout.github.io/',
                type: 'interactive',
                duration: '30 min'
              }
            ],
            tasks: [
              'Practice element selectors',
              'Use class and ID selectors',
              'Combine selectors for specificity'
            ]
          },
          {
            id: 'css-box-model',
            title: 'The Box Model',
            type: 'lesson',
            duration: '60 min',
            description: 'Understand spacing, borders, and element sizing',
            resources: [
              {
                title: 'The Box Model - MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Experiment with padding and margin',
              'Set width and height',
              'Add borders and shadows'
            ]
          },
          {
            id: 'css-layout',
            title: 'CSS Layout Basics',
            type: 'lesson',
            duration: '90 min',
            description: 'Position elements on the page',
            resources: [
              {
                title: 'CSS Layout - MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout',
                type: 'article',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Use display property',
              'Position elements',
              'Create basic layouts'
            ]
          },
          {
            id: 'css-project',
            title: 'Project: Styled Portfolio',
            type: 'project',
            duration: '4 hours',
            description: 'Add beautiful CSS to your portfolio',
            projectRequirements: [
              'Custom color scheme',
              'Typography styling',
              'Hover effects',
              'Responsive basics'
            ],
            tasks: [
              'Create a color palette',
              'Style all sections',
              'Add hover interactions',
              'Test responsiveness'
            ]
          },
          {
            id: 'css-quiz',
            title: 'CSS Basics Quiz',
            type: 'quiz',
            duration: '20 min',
            passingScore: 70,
            quizId: 'css-basics-quiz'
          }
        ],
        
        badge: {
          id: 'css-stylist',
          title: 'CSS Stylist',
          description: 'Completed CSS Basics module',
          icon: 'fa-paint-brush',
          color: '#264de4',
          xp: 120
        }
      },
      
      // Module 3: CSS Flexbox & Grid
      {
        id: 'css-layout-advanced',
        title: 'CSS Flexbox & Grid',
        description: 'Master modern CSS layout systems',
        icon: 'fa-th-large',
        estimatedHours: 18,
        order: 3,
        
        steps: [
          {
            id: 'flexbox-intro',
            title: 'Flexbox Introduction',
            type: 'lesson',
            duration: '60 min',
            description: 'Learn the flexible box layout',
            resources: [
              {
                title: 'A Complete Guide to Flexbox',
                url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
                type: 'article',
                duration: '30 min',
                isBest: true
              },
              {
                title: 'Flexbox Froggy',
                url: 'https://flexboxfroggy.com/',
                type: 'interactive',
                duration: '30 min'
              },
              {
                title: 'Flexbox Crash Course',
                url: 'https://www.youtube.com/watch?v=3YW65K6LcIA',
                type: 'video',
                duration: '45 min'
              }
            ],
            tasks: [
              'Complete Flexbox Froggy game',
              'Create a navigation with flexbox',
              'Build a card layout'
            ]
          },
          {
            id: 'flexbox-advanced',
            title: 'Advanced Flexbox',
            type: 'lesson',
            duration: '60 min',
            description: 'Master flexbox properties',
            resources: [
              {
                title: 'Flexbox - The Ultimate Guide',
                url: 'https://www.youtube.com/watch?v=u044iM9xsWU',
                type: 'video',
                duration: '60 min',
                isBest: true
              }
            ],
            tasks: [
              'Use flex-grow and flex-shrink',
              'Create complex alignments',
              'Build a responsive header'
            ]
          },
          {
            id: 'grid-intro',
            title: 'CSS Grid Introduction',
            type: 'lesson',
            duration: '75 min',
            description: 'Learn the CSS Grid layout system',
            resources: [
              {
                title: 'A Complete Guide to CSS Grid',
                url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
                type: 'article',
                duration: '40 min',
                isBest: true
              },
              {
                title: 'CSS Grid Garden',
                url: 'https://cssgridgarden.com/',
                type: 'interactive',
                duration: '30 min'
              }
            ],
            tasks: [
              'Complete CSS Grid Garden',
              'Create a photo gallery grid',
              'Build a dashboard layout'
            ]
          },
          {
            id: 'grid-advanced',
            title: 'Advanced Grid Layouts',
            type: 'lesson',
            duration: '60 min',
            description: 'Complex layouts with Grid',
            resources: [
              {
                title: 'CSS Grid Crash Course',
                url: 'https://www.youtube.com/watch?v=0xMQfnTU6oo',
                type: 'video',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Use grid template areas',
              'Create responsive grids',
              'Combine flexbox and grid'
            ]
          },
          {
            id: 'layout-project',
            title: 'Project: Landing Page',
            type: 'project',
            duration: '5 hours',
            description: 'Build a complete landing page using Flexbox and Grid',
            projectRequirements: [
              'Hero section with flexbox',
              'Features grid',
              'Testimonials carousel',
              'Footer with grid layout',
              'Fully responsive'
            ],
            tasks: [
              'Design the layout structure',
              'Implement mobile-first',
              'Add smooth transitions',
              'Test all breakpoints'
            ]
          },
          {
            id: 'layout-quiz',
            title: 'Flexbox & Grid Quiz',
            type: 'quiz',
            duration: '25 min',
            passingScore: 70,
            quizId: 'css-layout-quiz'
          }
        ],
        
        badge: {
          id: 'layout-wizard',
          title: 'Layout Wizard',
          description: 'Mastered CSS Flexbox and Grid',
          icon: 'fa-th-large',
          color: '#9b59b6',
          xp: 150
        }
      },
      
      // Module 4: Responsive Design
      {
        id: 'responsive-design',
        title: 'Responsive Web Design',
        description: 'Make websites work on all devices',
        icon: 'fa-mobile-alt',
        estimatedHours: 15,
        order: 4,
        
        steps: [
          {
            id: 'responsive-intro',
            title: 'Introduction to Responsive Design',
            type: 'lesson',
            duration: '45 min',
            description: 'Understand responsive design principles',
            resources: [
              {
                title: 'Responsive Web Design Basics',
                url: 'https://web.dev/responsive-web-design-basics/',
                type: 'article',
                duration: '25 min',
                isBest: true
              }
            ],
            tasks: [
              'Learn viewport meta tag',
              'Understand breakpoints',
              'Study mobile-first approach'
            ]
          },
          {
            id: 'media-queries',
            title: 'Media Queries',
            type: 'lesson',
            duration: '60 min',
            description: 'Apply styles based on device characteristics',
            resources: [
              {
                title: 'Using Media Queries',
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Write mobile-first media queries',
              'Create tablet breakpoints',
              'Handle desktop layouts'
            ]
          },
          {
            id: 'responsive-images',
            title: 'Responsive Images',
            type: 'lesson',
            duration: '45 min',
            description: 'Optimize images for all devices',
            resources: [
              {
                title: 'Responsive Images Guide',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
                type: 'article',
                duration: '25 min',
                isBest: true
              }
            ],
            tasks: [
              'Use srcset attribute',
              'Implement picture element',
              'Optimize image loading'
            ]
          },
          {
            id: 'responsive-project',
            title: 'Project: Responsive Portfolio',
            type: 'project',
            duration: '4 hours',
            description: 'Make your portfolio fully responsive',
            projectRequirements: [
              'Mobile-first approach',
              'Tablet layout',
              'Desktop layout',
              'Responsive navigation',
              'Responsive images'
            ],
            tasks: [
              'Audit current responsiveness',
              'Add all breakpoints',
              'Test on real devices',
              'Optimize performance'
            ]
          },
          {
            id: 'responsive-quiz',
            title: 'Responsive Design Quiz',
            type: 'quiz',
            duration: '15 min',
            passingScore: 70,
            quizId: 'responsive-quiz'
          }
        ],
        
        badge: {
          id: 'responsive-pro',
          title: 'Responsive Pro',
          description: 'Mastered responsive web design',
          icon: 'fa-mobile-alt',
          color: '#27ae60',
          xp: 130
        }
      },
      
      // Module 5: JavaScript Basics
      {
        id: 'javascript-basics',
        title: 'JavaScript Fundamentals',
        description: 'Add interactivity to your websites',
        icon: 'fa-js-square',
        estimatedHours: 30,
        order: 5,
        
        steps: [
          {
            id: 'js-intro',
            title: 'Introduction to JavaScript',
            type: 'lesson',
            duration: '60 min',
            description: 'Understand JavaScript basics',
            resources: [
              {
                title: 'JavaScript First Steps',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps',
                type: 'article',
                duration: '60 min',
                isBest: true
              },
              {
                title: 'JavaScript Crash Course',
                url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
                type: 'video',
                duration: '100 min'
              }
            ],
            tasks: [
              'Set up JavaScript in HTML',
              'Use the browser console',
              'Write your first script'
            ]
          },
          {
            id: 'js-variables',
            title: 'Variables & Data Types',
            type: 'lesson',
            duration: '60 min',
            description: 'Learn to store and work with data',
            resources: [
              {
                title: 'JavaScript Variables',
                url: 'https://javascript.info/variables',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Declare variables with let, const, var',
              'Work with strings and numbers',
              'Use arrays and objects'
            ]
          },
          {
            id: 'js-functions',
            title: 'Functions',
            type: 'lesson',
            duration: '90 min',
            description: 'Create reusable code with functions',
            resources: [
              {
                title: 'JavaScript Functions',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
                type: 'article',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Write function declarations',
              'Use arrow functions',
              'Understand parameters and returns'
            ]
          },
          {
            id: 'js-conditionals',
            title: 'Conditionals & Loops',
            type: 'lesson',
            duration: '60 min',
            description: 'Control program flow',
            resources: [
              {
                title: 'Control Flow',
                url: 'https://javascript.info/ifelse',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Write if/else statements',
              'Use switch statements',
              'Create for and while loops'
            ]
          },
          {
            id: 'js-arrays',
            title: 'Arrays & Array Methods',
            type: 'lesson',
            duration: '90 min',
            description: 'Work with collections of data',
            resources: [
              {
                title: 'JavaScript Array Methods',
                url: 'https://javascript.info/array-methods',
                type: 'article',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Use map, filter, reduce',
              'Practice array manipulation',
              'Solve array challenges'
            ]
          },
          {
            id: 'js-project',
            title: 'Project: Interactive Quiz App',
            type: 'project',
            duration: '5 hours',
            description: 'Build a quiz application with JavaScript',
            projectRequirements: [
              'Multiple choice questions',
              'Score tracking',
              'Timer functionality',
              'Results display',
              'Restart option'
            ],
            tasks: [
              'Create question data structure',
              'Build the UI',
              'Implement game logic',
              'Add scoring system'
            ]
          },
          {
            id: 'js-quiz',
            title: 'JavaScript Basics Quiz',
            type: 'quiz',
            duration: '30 min',
            passingScore: 70,
            quizId: 'js-basics-quiz'
          }
        ],
        
        badge: {
          id: 'js-ninja',
          title: 'JavaScript Ninja',
          description: 'Completed JavaScript Fundamentals',
          icon: 'fa-js-square',
          color: '#f7df1e',
          xp: 200
        }
      },
      
      // Module 6: DOM Manipulation
      {
        id: 'dom-manipulation',
        title: 'DOM Manipulation',
        description: 'Interact with web page elements',
        icon: 'fa-sitemap',
        estimatedHours: 20,
        order: 6,
        
        steps: [
          {
            id: 'dom-intro',
            title: 'Understanding the DOM',
            type: 'lesson',
            duration: '45 min',
            description: 'Learn what the DOM is and how it works',
            resources: [
              {
                title: 'Introduction to the DOM',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Explore DOM in DevTools',
              'Understand DOM tree structure',
              'Learn about nodes and elements'
            ]
          },
          {
            id: 'dom-selection',
            title: 'Selecting Elements',
            type: 'lesson',
            duration: '60 min',
            description: 'Find and select DOM elements',
            resources: [
              {
                title: 'DOM Selection Methods',
                url: 'https://javascript.info/searching-elements-dom',
                type: 'article',
                duration: '25 min',
                isBest: true
              }
            ],
            tasks: [
              'Use getElementById',
              'Use querySelector and querySelectorAll',
              'Select by class and tag'
            ]
          },
          {
            id: 'dom-manipulation-lesson',
            title: 'Modifying Elements',
            type: 'lesson',
            duration: '75 min',
            description: 'Change content, styles, and attributes',
            resources: [
              {
                title: 'Modifying the Document',
                url: 'https://javascript.info/modifying-document',
                type: 'article',
                duration: '40 min',
                isBest: true
              }
            ],
            tasks: [
              'Change text content',
              'Modify CSS styles',
              'Update attributes'
            ]
          },
          {
            id: 'dom-events',
            title: 'Event Handling',
            type: 'lesson',
            duration: '90 min',
            description: 'Respond to user interactions',
            resources: [
              {
                title: 'Introduction to Events',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events',
                type: 'article',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Add click event listeners',
              'Handle form events',
              'Use keyboard and mouse events'
            ]
          },
          {
            id: 'dom-project',
            title: 'Project: Todo List App',
            type: 'project',
            duration: '5 hours',
            description: 'Build a functional todo list application',
            projectRequirements: [
              'Add new todos',
              'Mark as complete',
              'Delete todos',
              'Filter by status',
              'Local storage persistence'
            ],
            tasks: [
              'Create HTML structure',
              'Implement add functionality',
              'Add complete/delete features',
              'Save to local storage'
            ]
          },
          {
            id: 'dom-quiz',
            title: 'DOM Manipulation Quiz',
            type: 'quiz',
            duration: '20 min',
            passingScore: 70,
            quizId: 'dom-quiz'
          }
        ],
        
        badge: {
          id: 'dom-master',
          title: 'DOM Master',
          description: 'Mastered DOM manipulation',
          icon: 'fa-sitemap',
          color: '#e74c3c',
          xp: 180
        }
      },
      
      // Module 7: React Fundamentals
      {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        description: 'Build modern UIs with React',
        icon: 'fa-react',
        estimatedHours: 35,
        order: 7,
        
        steps: [
          {
            id: 'react-intro',
            title: 'Introduction to React',
            type: 'lesson',
            duration: '60 min',
            description: 'Understand React and its benefits',
            resources: [
              {
                title: 'React Official Tutorial',
                url: 'https://react.dev/learn',
                type: 'article',
                duration: '60 min',
                isBest: true
              },
              {
                title: 'React Crash Course',
                url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
                type: 'video',
                duration: '90 min'
              }
            ],
            tasks: [
              'Set up React with Vite',
              'Understand component-based architecture',
              'Run your first React app'
            ]
          },
          {
            id: 'react-components',
            title: 'Components & JSX',
            type: 'lesson',
            duration: '90 min',
            description: 'Create and compose React components',
            resources: [
              {
                title: 'Your First Component',
                url: 'https://react.dev/learn/your-first-component',
                type: 'article',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Create functional components',
              'Use JSX syntax',
              'Pass props to components'
            ]
          },
          {
            id: 'react-state',
            title: 'State Management',
            type: 'lesson',
            duration: '90 min',
            description: 'Manage component state with useState',
            resources: [
              {
                title: 'State: A Component\'s Memory',
                url: 'https://react.dev/learn/state-a-components-memory',
                type: 'article',
                duration: '40 min',
                isBest: true
              }
            ],
            tasks: [
              'Use useState hook',
              'Handle state updates',
              'Lift state up'
            ]
          },
          {
            id: 'react-effects',
            title: 'Side Effects with useEffect',
            type: 'lesson',
            duration: '75 min',
            description: 'Handle side effects in React',
            resources: [
              {
                title: 'Synchronizing with Effects',
                url: 'https://react.dev/learn/synchronizing-with-effects',
                type: 'article',
                duration: '45 min',
                isBest: true
              }
            ],
            tasks: [
              'Use useEffect hook',
              'Fetch data from APIs',
              'Clean up effects'
            ]
          },
          {
            id: 'react-project',
            title: 'Project: Weather App',
            type: 'project',
            duration: '8 hours',
            description: 'Build a weather application with React',
            projectRequirements: [
              'Search by city',
              'Display current weather',
              '5-day forecast',
              'Loading states',
              'Error handling'
            ],
            tasks: [
              'Set up project structure',
              'Create components',
              'Integrate weather API',
              'Add styling and polish'
            ]
          },
          {
            id: 'react-quiz',
            title: 'React Fundamentals Quiz',
            type: 'quiz',
            duration: '30 min',
            passingScore: 70,
            quizId: 'react-quiz'
          }
        ],
        
        badge: {
          id: 'react-developer',
          title: 'React Developer',
          description: 'Completed React Fundamentals',
          icon: 'fa-react',
          color: '#61dafb',
          xp: 250
        }
      },
      
      // Module 8: Final Project
      {
        id: 'final-project',
        title: 'Capstone Project',
        description: 'Build a complete web application',
        icon: 'fa-trophy',
        estimatedHours: 40,
        order: 8,
        
        steps: [
          {
            id: 'project-planning',
            title: 'Project Planning',
            type: 'lesson',
            duration: '2 hours',
            description: 'Plan your capstone project',
            resources: [
              {
                title: 'Project Ideas for Beginners',
                url: 'https://www.frontendmentor.io/challenges',
                type: 'interactive',
                duration: '30 min',
                isBest: true
              }
            ],
            tasks: [
              'Choose your project',
              'Create wireframes',
              'Plan component structure',
              'Set up repository'
            ]
          },
          {
            id: 'project-development',
            title: 'Development Phase',
            type: 'project',
            duration: '30 hours',
            description: 'Build your application',
            projectRequirements: [
              'Multiple pages/routes',
              'API integration',
              'User interactions',
              'Responsive design',
              'Clean, organized code'
            ],
            tasks: [
              'Set up project',
              'Build core features',
              'Add styling',
              'Implement API calls',
              'Test thoroughly'
            ]
          },
          {
            id: 'project-deployment',
            title: 'Deployment',
            type: 'lesson',
            duration: '3 hours',
            description: 'Deploy your application online',
            resources: [
              {
                title: 'Deploy to Vercel',
                url: 'https://vercel.com/docs',
                type: 'article',
                duration: '20 min',
                isBest: true
              },
              {
                title: 'Deploy to Netlify',
                url: 'https://docs.netlify.com/',
                type: 'article',
                duration: '20 min'
              }
            ],
            tasks: [
              'Prepare for deployment',
              'Deploy to hosting platform',
              'Set up custom domain',
              'Test live site'
            ]
          },
          {
            id: 'project-presentation',
            title: 'Project Presentation',
            type: 'project',
            duration: '2 hours',
            description: 'Document and present your project',
            projectRequirements: [
              'README documentation',
              'Screenshots/demo video',
              'Live demo link',
              'Source code on GitHub'
            ],
            tasks: [
              'Write comprehensive README',
              'Create demo video',
              'Share on portfolio',
              'Get feedback'
            ]
          }
        ],
        
        badge: {
          id: 'frontend-graduate',
          title: 'Frontend Graduate',
          description: 'Completed Frontend Web Development Roadmap',
          icon: 'fa-graduation-cap',
          color: '#9b59b6',
          xp: 500
        },
        
        certificate: {
          title: 'Frontend Web Development',
          description: 'Successfully completed the Frontend Web Development roadmap including all modules, projects, and assessments.'
        }
      }
    ]
  },
  
  // ============================================
  // 🖥️ BACKEND DEVELOPMENT
  // ============================================
  backend: {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'Server-Side Programming Mastery',
    description: 'Learn to build robust server-side applications with Node.js, Express, and databases.',
    icon: 'fa-server',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
    level: 'intermediate',
    duration: '4-8 months',
    estimatedHours: 280,
    prerequisites: ['HTML/CSS basics', 'JavaScript fundamentals'],
    outcomes: [
      'Build RESTful APIs',
      'Work with databases (SQL & NoSQL)',
      'Implement authentication',
      'Deploy backend applications',
      'Understand server architecture'
    ],
    careerPaths: ['Backend Developer', 'Node.js Developer', 'API Developer', 'Full Stack Developer'],
    
    modules: [
      {
        id: 'nodejs-basics',
        title: 'Node.js Fundamentals',
        description: 'Learn server-side JavaScript',
        icon: 'fa-node-js',
        estimatedHours: 25,
        order: 1,
        steps: [
          {
            id: 'node-intro',
            title: 'Introduction to Node.js',
            type: 'lesson',
            duration: '60 min',
            description: 'Understand Node.js and its ecosystem',
            resources: [
              {
                title: 'Node.js Official Guide',
                url: 'https://nodejs.org/en/docs/guides/',
                type: 'article',
                isBest: true
              }
            ],
            tasks: [
              'Install Node.js',
              'Run JavaScript files with Node',
              'Understand npm basics'
            ]
          }
          // More steps...
        ],
        badge: {
          id: 'nodejs-starter',
          title: 'Node.js Starter',
          icon: 'fa-node-js',
          color: '#68a063',
          xp: 150
        }
      }
      // More modules...
    ]
  },
  
  // ============================================
  // 📱 MOBILE DEVELOPMENT
  // ============================================
  mobile: {
    id: 'mobile',
    title: 'Mobile App Development',
    subtitle: 'Build iOS & Android Apps',
    description: 'Create cross-platform mobile applications using React Native.',
    icon: 'fa-mobile-alt',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    level: 'intermediate',
    duration: '4-6 months',
    estimatedHours: 220,
    prerequisites: ['JavaScript fundamentals', 'React basics (recommended)'],
    outcomes: [
      'Build cross-platform mobile apps',
      'Publish to App Store and Play Store',
      'Use native device features',
      'Implement mobile UI patterns'
    ],
    careerPaths: ['Mobile Developer', 'React Native Developer', 'App Developer'],
    modules: []
  },
  
  // ============================================
  // 📊 DATA SCIENCE
  // ============================================
  datascience: {
    id: 'datascience',
    title: 'Data Science',
    subtitle: 'From Data to Insights',
    description: 'Learn Python, data analysis, machine learning, and data visualization.',
    icon: 'fa-chart-bar',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    level: 'intermediate',
    duration: '6-10 months',
    estimatedHours: 350,
    prerequisites: ['Basic mathematics', 'Programming basics (any language)'],
    outcomes: [
      'Analyze and visualize data',
      'Build machine learning models',
      'Work with Python and libraries',
      'Create data-driven solutions'
    ],
    careerPaths: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Analyst'],
    modules: []
  },
  
  // ============================================
  // ☁️ DEVOPS
  // ============================================
  devops: {
    id: 'devops',
    title: 'DevOps Engineering',
    subtitle: 'Automate & Scale',
    description: 'Master CI/CD, Docker, Kubernetes, and cloud platforms.',
    icon: 'fa-cloud',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    level: 'advanced',
    duration: '4-8 months',
    estimatedHours: 250,
    prerequisites: ['Linux basics', 'Programming experience', 'Networking fundamentals'],
    outcomes: [
      'Set up CI/CD pipelines',
      'Containerize applications',
      'Manage Kubernetes clusters',
      'Automate infrastructure'
    ],
    careerPaths: ['DevOps Engineer', 'SRE', 'Cloud Engineer', 'Platform Engineer'],
    modules: []
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getRoadmapById(id) {
  return ROADMAPS[id] || null;
}

export function getAllRoadmaps() {
  return Object.values(ROADMAPS);
}

export function getModuleById(roadmapId, moduleId) {
  const roadmap = ROADMAPS[roadmapId];
  if (!roadmap) return null;
  return roadmap.modules.find(m => m.id === moduleId) || null;
}

export function getStepById(roadmapId, moduleId, stepId) {
  const module = getModuleById(roadmapId, moduleId);
  if (!module) return null;
  return module.steps.find(s => s.id === stepId) || null;
}

export function calculateModuleProgress(completedSteps, totalSteps) {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps / totalSteps) * 100);
}

export function calculateRoadmapProgress(completedModules, totalModules, currentModuleProgress = 0) {
  if (totalModules === 0) return 0;
  const baseProgress = (completedModules / totalModules) * 100;
  const currentModuleContribution = (1 / totalModules) * currentModuleProgress;
  return Math.round(baseProgress + currentModuleContribution);
}

export function getNextStep(roadmapId, currentModuleId, currentStepId) {
  const roadmap = ROADMAPS[roadmapId];
  if (!roadmap) return null;
  
  const moduleIndex = roadmap.modules.findIndex(m => m.id === currentModuleId);
  if (moduleIndex === -1) return null;
  
  const currentModule = roadmap.modules[moduleIndex];
  const stepIndex = currentModule.steps.findIndex(s => s.id === currentStepId);
  
  // Next step in current module
  if (stepIndex < currentModule.steps.length - 1) {
    return {
      moduleId: currentModuleId,
      step: currentModule.steps[stepIndex + 1]
    };
  }
  
  // First step of next module
  if (moduleIndex < roadmap.modules.length - 1) {
    const nextModule = roadmap.modules[moduleIndex + 1];
    return {
      moduleId: nextModule.id,
      step: nextModule.steps[0]
    };
  }
  
  // Roadmap complete
  return null;
}

export function estimateTimeRemaining(roadmapId, completedModuleIds, currentModuleProgress) {
  const roadmap = ROADMAPS[roadmapId];
  if (!roadmap) return 0;
  
  let remainingHours = 0;
  
  roadmap.modules.forEach(module => {
    if (!completedModuleIds.includes(module.id)) {
      remainingHours += module.estimatedHours;
    }
  });
  
  // Subtract current module progress
  const currentModule = roadmap.modules.find(m => !completedModuleIds.includes(m.id));
  if (currentModule && currentModuleProgress > 0) {
    remainingHours -= (currentModule.estimatedHours * currentModuleProgress / 100);
  }
  
  return Math.round(remainingHours);
}