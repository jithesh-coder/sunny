// quiz-data.js - Quiz Questions Database

export const QUIZZES = {
  
  'html-fundamentals-quiz': {
    id: 'html-fundamentals-quiz',
    title: 'HTML Fundamentals Quiz',
    description: 'Test your HTML knowledge',
    timeLimit: 15, // minutes
    passingScore: 70,
    
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyperlink Text Management Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for HyperText Markup Language. It is the standard language for creating web pages.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<h1>', '<heading>', '<head>'],
        correctAnswer: 1,
        explanation: '<h1> is used for the largest heading. Heading tags range from <h1> (largest) to <h6> (smallest).'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which HTML element is used to define an unordered list?',
        options: ['<ol>', '<list>', '<ul>', '<li>'],
        correctAnswer: 2,
        explanation: '<ul> defines an unordered (bulleted) list, while <ol> defines an ordered (numbered) list.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<lb>', '<br>', '<newline>'],
        correctAnswer: 2,
        explanation: '<br> is the correct element for inserting a line break. It is a self-closing tag.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Which attribute specifies an alternate text for an image?',
        options: ['title', 'alt', 'src', 'longdesc'],
        correctAnswer: 1,
        explanation: 'The alt attribute provides alternative text for an image if it cannot be displayed.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'Which HTML element defines the title of a document?',
        options: ['<head>', '<title>', '<meta>', '<header>'],
        correctAnswer: 1,
        explanation: 'The <title> element defines the title shown in the browser tab and search results.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'What is the correct HTML for creating a hyperlink?',
        options: [
          '<a url="http://example.com">',
          '<a href="http://example.com">',
          '<link href="http://example.com">',
          '<hyperlink="http://example.com">'
        ],
        correctAnswer: 1,
        explanation: 'The <a> tag with href attribute is used to create hyperlinks.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'Which element is used for semantic navigation?',
        options: ['<navigation>', '<nav>', '<menu>', '<links>'],
        correctAnswer: 1,
        explanation: '<nav> is the semantic HTML5 element for defining navigation links.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'What does the <article> element represent?',
        options: [
          'A navigation section',
          'A sidebar',
          'Self-contained content',
          'A footer section'
        ],
        correctAnswer: 2,
        explanation: 'The <article> element represents self-contained content that could be distributed independently.'
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'Which input type is used for email addresses?',
        options: ['text', 'mail', 'email', 'address'],
        correctAnswer: 2,
        explanation: 'input type="email" provides built-in email validation in modern browsers.'
      }
    ]
  },
  
  'css-basics-quiz': {
    id: 'css-basics-quiz',
    title: 'CSS Basics Quiz',
    description: 'Test your CSS fundamentals',
    timeLimit: 15,
    passingScore: 70,
    
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 2,
        explanation: 'CSS stands for Cascading Style Sheets.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which property is used to change the text color?',
        options: ['font-color', 'text-color', 'color', 'foreground-color'],
        correctAnswer: 2,
        explanation: 'The color property is used to set the text color.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which CSS property controls the text size?',
        options: ['text-size', 'font-style', 'font-size', 'text-style'],
        correctAnswer: 2,
        explanation: 'font-size is used to set the size of text.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'How do you select an element with id "header"?',
        options: ['.header', '#header', 'header', '*header'],
        correctAnswer: 1,
        explanation: '# is used to select elements by ID in CSS.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'How do you select elements with class "intro"?',
        options: ['#intro', '.intro', 'intro', '*intro'],
        correctAnswer: 1,
        explanation: '. (dot) is used to select elements by class in CSS.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'Which property sets the background color?',
        options: ['bgcolor', 'background-color', 'color', 'background'],
        correctAnswer: 1,
        explanation: 'background-color sets the background color of an element.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'What is the default value of the position property?',
        options: ['relative', 'fixed', 'absolute', 'static'],
        correctAnswer: 3,
        explanation: 'Elements are positioned static by default.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'Which property is used to add space inside an element?',
        options: ['margin', 'spacing', 'padding', 'border'],
        correctAnswer: 2,
        explanation: 'padding adds space inside an element, between content and border.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'Which property is used to add space outside an element?',
        options: ['padding', 'spacing', 'margin', 'border'],
        correctAnswer: 2,
        explanation: 'margin adds space outside an element.'
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'How do you make text bold in CSS?',
        options: [
          'font-weight: bold',
          'text-style: bold',
          'font-style: bold',
          'text-weight: bold'
        ],
        correctAnswer: 0,
        explanation: 'font-weight: bold makes text bold.'
      }
    ]
  },
  
  'css-layout-quiz': {
    id: 'css-layout-quiz',
    title: 'CSS Flexbox & Grid Quiz',
    description: 'Test your layout knowledge',
    timeLimit: 20,
    passingScore: 70,
    
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What property enables Flexbox?',
        options: [
          'display: flexbox',
          'display: flex',
          'flex: enable',
          'flexbox: true'
        ],
        correctAnswer: 1,
        explanation: 'display: flex enables Flexbox on a container.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which property aligns items along the main axis in Flexbox?',
        options: ['align-items', 'align-content', 'justify-content', 'flex-align'],
        correctAnswer: 2,
        explanation: 'justify-content aligns items along the main axis.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is the default flex-direction?',
        options: ['column', 'row-reverse', 'row', 'column-reverse'],
        correctAnswer: 2,
        explanation: 'The default flex-direction is row (horizontal).'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'How do you center items both horizontally and vertically with Flexbox?',
        options: [
          'align: center',
          'justify-content: center; align-items: center',
          'center: all',
          'flex-align: center'
        ],
        correctAnswer: 1,
        explanation: 'Use justify-content: center and align-items: center together.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What property enables CSS Grid?',
        options: ['display: grid', 'display: css-grid', 'grid: enable', 'layout: grid'],
        correctAnswer: 0,
        explanation: 'display: grid enables CSS Grid on a container.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'What does "fr" unit represent in CSS Grid?',
        options: ['Fixed ratio', 'Fraction of available space', 'Frame rate', 'Full row'],
        correctAnswer: 1,
        explanation: 'fr represents a fraction of the available space in the grid container.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'Which property defines grid columns?',
        options: ['grid-columns', 'columns', 'grid-template-columns', 'template-columns'],
        correctAnswer: 2,
        explanation: 'grid-template-columns defines the columns in a grid.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'What does gap do in Grid/Flexbox?',
        options: [
          'Adds border',
          'Adds space between items',
          'Adds padding',
          'Removes items'
        ],
        correctAnswer: 1,
        explanation: 'gap adds space between grid/flex items.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'Which property allows a grid item to span multiple columns?',
        options: ['grid-span', 'grid-column', 'column-span', 'span-columns'],
        correctAnswer: 1,
        explanation: 'grid-column with span value allows items to span multiple columns.'
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'What is the purpose of grid-template-areas?',
        options: [
          'Define grid size',
          'Name and position grid areas',
          'Add grid borders',
          'Set grid colors'
        ],
        correctAnswer: 1,
        explanation: 'grid-template-areas allows you to name areas and position items visually.'
      }
    ]
  },
  
  'js-basics-quiz': {
    id: 'js-basics-quiz',
    title: 'JavaScript Basics Quiz',
    description: 'Test your JavaScript fundamentals',
    timeLimit: 25,
    passingScore: 70,
    
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'How do you declare a variable in JavaScript?',
        options: ['variable x', 'var x', 'v x', 'declare x'],
        correctAnswer: 1,
        explanation: 'var, let, or const are used to declare variables in JavaScript.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which is the correct way to write an array?',
        options: [
          'var colors = "red", "green", "blue"',
          'var colors = (1:"red", 2:"green", 3:"blue")',
          'var colors = ["red", "green", "blue"]',
          'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
        ],
        correctAnswer: 2,
        explanation: 'Arrays are written with square brackets containing comma-separated values.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'How do you create a function in JavaScript?',
        options: [
          'function = myFunction()',
          'function myFunction()',
          'create myFunction()',
          'function:myFunction()'
        ],
        correctAnswer: 1,
        explanation: 'Functions are declared using the function keyword followed by the name.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What is the output of: console.log(typeof [])?',
        options: ['array', 'object', 'list', 'undefined'],
        correctAnswer: 1,
        explanation: 'In JavaScript, arrays are technically objects.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Which operator is used for strict equality?',
        options: ['=', '==', '===', '===='],
        correctAnswer: 2,
        explanation: '=== checks both value and type equality.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'How do you add a comment in JavaScript?',
        options: ['<!-- comment -->', '// comment', '/* comment */', 'Both // and /* */'],
        correctAnswer: 3,
        explanation: 'JavaScript supports both // for single-line and /* */ for multi-line comments.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'What does the push() method do?',
        options: [
          'Removes the first element',
          'Adds element to the end',
          'Removes the last element',
          'Adds element to the beginning'
        ],
        correctAnswer: 1,
        explanation: 'push() adds one or more elements to the end of an array.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'What is the correct way to write an arrow function?',
        options: [
          'x => x * 2',
          'x -> x * 2',
          'x --> x * 2',
          'function(x) => x * 2'
        ],
        correctAnswer: 0,
        explanation: 'Arrow functions use => syntax.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'What does NaN stand for?',
        options: ['Not a Null', 'Not a Number', 'New and Null', 'None and Nothing'],
        correctAnswer: 1,
        explanation: 'NaN stands for "Not a Number" and represents an invalid number.'
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'Which method converts JSON to a JavaScript object?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.toObject()'],
        correctAnswer: 0,
        explanation: 'JSON.parse() parses a JSON string into a JavaScript object.'
      }
    ]
  }
  
  // Add more quizzes as needed...
};

// ============================================
// QUIZ HELPER FUNCTIONS
// ============================================

export function getQuizById(quizId) {
  return QUIZZES[quizId] || null;
}

export function calculateQuizScore(answers, quizId) {
  const quiz = QUIZZES[quizId];
  if (!quiz) return { score: 0, passed: false };
  
  let correct = 0;
  const results = [];
  
  quiz.questions.forEach((question, index) => {
    const userAnswer = answers[index];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) correct++;
    
    results.push({
      questionId: question.id,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation
    });
  });
  
  const score = Math.round((correct / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;
  
  return {
    score,
    correct,
    total: quiz.questions.length,
    passed,
    results
  };
}

export function getQuizRecommendations(results) {
  const wrongAnswers = results.filter(r => !r.isCorrect);
  
  return wrongAnswers.map(r => ({
    questionId: r.questionId,
    explanation: r.explanation
  }));
}