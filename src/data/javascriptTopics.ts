export interface Topic {
  id: string;
  title: string;
  content: string;
  category: 'javascript' | 'react' | 'design-patterns' | 'interviews' | 'quizzes';
  examples?: string[];
  practice?: {
    problem: string;
    solution: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

export const categories = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'design-patterns', name: 'Design Patterns' },
  { id: 'interviews', name: 'Interviews' },
  { id: 'quizzes', name: 'Quizzes' },
] as const;

export const javascriptTopics: Topic[] = [
  {
    id: 'introduction',
    title: 'Introduction to JavaScript',
    category: 'javascript',
    content: `JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. It enables interactive web pages and is an essential part of web applications.

Key Features:
• Dynamic typing
• Object-oriented programming
• Functional programming
• Event-driven programming
• Asynchronous programming

JavaScript can be used for:
• Frontend development
• Backend development (Node.js)
• Mobile app development
• Desktop applications
• Game development`,
    examples: [
      `// Basic JavaScript syntax
console.log("Hello, World!");

// Variables and basic operations
let x = 5;
let y = 10;
console.log(x + y); // Output: 15

// String manipulation
let name = "JavaScript";
console.log(name.toUpperCase()); // Output: JAVASCRIPT`,
    ],
    practice: [
      {
        problem: 'Write a program that prints your name and age.',
        solution: `let name = "John";
let age = 25;
console.log("My name is " + name + " and I am " + age + " years old.");`,
      },
    ],
    quiz: {
      question: 'Which of the following is NOT a use case for JavaScript?',
      options: [
        'Frontend development',
        'Backend development',
        'Mobile app development',
        'Operating system kernel development',
      ],
      correct: 3,
    },
  },
  {
    id: 'variables',
    title: 'Variables and Data Types',
    category: 'javascript',
    content: `JavaScript has three ways to declare variables:
1. var (function-scoped)
2. let (block-scoped)
3. const (block-scoped, cannot be reassigned)

Data Types:
• String: Text data
• Number: Both integers and floating-point numbers
• Boolean: true or false
• Object: Collection of key-value pairs
• Array: Ordered list of values
• Undefined: Variable declared but not assigned
• Null: Intentional absence of value
• Symbol: Unique identifier
• BigInt: Large integers

Best Practices:
• Use const by default
• Use let when you need to reassign
• Avoid var in modern JavaScript
• Use meaningful variable names
• Initialize variables when declaring`,
    examples: [
      `// Variable declaration and types
const PI = 3.14159;
let radius = 5;
var area = PI * radius * radius;

// String operations
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;

// Number operations
let x = 10;
let y = 3;
console.log(x + y);  // Addition: 13
console.log(x - y);  // Subtraction: 7
console.log(x * y);  // Multiplication: 30
console.log(x / y);  // Division: 3.333...
console.log(x % y);  // Modulus: 1

// Boolean operations
let isTrue = true;
let isFalse = false;
console.log(isTrue && isFalse);  // AND: false
console.log(isTrue || isFalse);  // OR: true
console.log(!isTrue);            // NOT: false`,
    ],
    practice: [
      {
        problem:
          "Create variables for a person's name, age, and whether they are a student. Then create a sentence using these variables.",
        solution: `const name = "Alice";
let age = 20;
const isStudent = true;

console.log(name + " is " + age + " years old and " + 
  (isStudent ? "is" : "is not") + " a student.");`,
      },
    ],
    quiz: {
      question: 'Which keyword declares a block-scoped variable?',
      options: ['var', 'let', 'function', 'def'],
      correct: 1,
    },
  },
  {
    id: 'functions',
    title: 'Functions and Scope',
    category: 'javascript',
    content: `Functions are blocks of code designed to perform a particular task. They are executed when they are called (invoked).

Types of Functions:
1. Function Declaration
2. Function Expression
3. Arrow Function
4. Immediately Invoked Function Expression (IIFE)

Function Features:
• Parameters and arguments
• Return values
• Default parameters
• Rest parameters
• Spread operator
• Callback functions
• Higher-order functions

Scope Types:
• Global scope
• Function scope
• Block scope
• Lexical scope (closure)`,
    examples: [
      `// Function Declaration
function greet(name) {
  return "Hello, " + name;
}

// Function Expression
const greet = function(name) {
  return "Hello, " + name;
};

// Arrow Function
const greet = (name) => "Hello, " + name;

// Default Parameters
function createUser(name, role = "user") {
  return { name, role };
}

// Rest Parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Callback Function
function processUser(name, callback) {
  const user = { name, id: Date.now() };
  callback(user);
}

// Higher-Order Function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);`,
    ],
    practice: [
      {
        problem:
          'Create a function that calculates the area of a rectangle and returns the result.',
        solution: `function calculateArea(length, width) {
  return length * width;
}

// Using the function
const area = calculateArea(5, 3);
console.log("Area:", area); // Output: Area: 15`,
      },
    ],
  },
  {
    id: 'objects',
    title: 'Objects and Arrays',
    category: 'javascript',
    content: `Objects and Arrays are fundamental data structures in JavaScript.

Objects:
• Key-value pairs
• Methods and properties
• Object destructuring
• Object methods
• Object spread operator

Arrays:
• Ordered collections
• Array methods
• Array destructuring
• Array spread operator
• Array iteration methods

Common Array Methods:
• map(): Transform elements
• filter(): Select elements
• reduce(): Combine elements
• find(): Find element
• some(): Check condition
• every(): Check all elements
• sort(): Sort elements
• slice(): Extract portion
• splice(): Modify array`,
    examples: [
      `// Object creation and manipulation
const person = {
  name: "John",
  age: 30,
  greet() {
    return "Hello, I'm " + this.name;
  }
};

// Object destructuring
const { name, age } = person;

// Array creation and manipulation
const fruits = ["Apple", "Banana", "Orange"];

// Array methods
const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(num => num * 2);

// Filter
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Find
const firstEven = numbers.find(num => num % 2 === 0);

// Sort
const sortedNumbers = numbers.sort((a, b) => a - b);`,
    ],
    practice: [
      {
        problem:
          'Create an array of objects representing books with title and author properties. Then filter the books by a specific author.',
        solution: `const books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "1984", author: "George Orwell" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien" }
];

const tolkienBooks = books.filter(book => book.author === "J.R.R. Tolkien");
console.log(tolkienBooks);`,
      },
    ],
  },
  {
    id: 'dom',
    title: 'DOM Manipulation',
    category: 'javascript',
    content: `The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.

Key Concepts:
• DOM Tree
• Nodes and Elements
• Event Handling
• Event Bubbling
• Event Delegation

Common DOM Operations:
• Selecting elements
• Modifying content
• Changing styles
• Adding/removing elements
• Event handling
• Form handling
• Animation

Best Practices:
• Cache DOM selections
• Use event delegation
• Batch DOM updates
• Use modern APIs
• Handle errors gracefully`,
    examples: [
      `// Selecting elements
const element = document.getElementById("myId");
const elements = document.getElementsByClassName("myClass");
const queryElement = document.querySelector(".myClass");
const queryElements = document.querySelectorAll(".myClass");

// Modifying content
element.innerHTML = "New content";
element.textContent = "New text";
element.setAttribute("class", "newClass");

// Creating and adding elements
const newDiv = document.createElement("div");
newDiv.textContent = "New element";
document.body.appendChild(newDiv);

// Event handling
element.addEventListener("click", (event) => {
  console.log("Clicked!");
});

// Form handling
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("username"));
});`,
    ],
    practice: [
      {
        problem: 'Create a button that changes the background color of a div when clicked.',
        solution: `// HTML
<div id="colorBox" style="width: 200px; height: 200px; background: #fff;"></div>
<button id="changeColor">Change Color</button>

// JavaScript
const box = document.getElementById("colorBox");
const button = document.getElementById("changeColor");

button.addEventListener("click", () => {
  const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  box.style.backgroundColor = randomColor;
});`,
      },
    ],
  },
  {
    id: 'async',
    title: 'Asynchronous JavaScript',
    category: 'javascript',
    content: `Asynchronous programming is essential for handling operations that take time, such as:
• API calls
• File operations
• Database queries
• Timers

Key Concepts:
• Callbacks
• Promises
• Async/Await
• Event Loop
• Error Handling

Best Practices:
• Use async/await over callbacks
• Handle errors properly
• Use Promise.all for parallel operations
• Avoid callback hell
• Use proper error boundaries`,
    examples: [
      `// Callback
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

// Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

// Async/Await
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Promise.all
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch("/api/users"),
    fetch("/api/posts")
  ]);
  return { users, posts };
}`,
    ],
    practice: [
      {
        problem: 'Create a function that fetches user data from an API and displays it.',
        solution: `async function displayUserData() {
  try {
    const response = await fetch("https://api.example.com/user/1");
    const user = await response.json();
    
    const userDiv = document.createElement("div");
    userDiv.innerHTML = \`
      <h2>\${user.name}</h2>
      <p>Email: \${user.email}</p>
    \`;
    
    document.body.appendChild(userDiv);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}`,
      },
    ],
  },
  {
    id: 'es6',
    title: 'ES6+ Features',
    category: 'javascript',
    content: `ES6 (ECMAScript 2015) and later versions introduced many powerful features to JavaScript:

Key Features:
• Arrow Functions
• Template Literals
• Destructuring
• Spread/Rest Operators
• Classes
• Modules
• Promises
• Async/Await
• Optional Chaining
• Nullish Coalescing

Benefits:
• More concise syntax
• Better code organization
• Enhanced functionality
• Improved readability
• Better error handling`,
    examples: [
      `// Arrow Functions
const add = (a, b) => a + b;

// Template Literals
const name = "John";
const greeting = \`Hello, \${name}!\`;

// Destructuring
const { title, author } = book;
const [first, second] = array;

// Spread Operator
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProperty: value };

// Classes
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return \`Hello, \${this.name}!\`;
  }
}

// Optional Chaining
const value = object?.property?.nestedProperty;

// Nullish Coalescing
const value = input ?? defaultValue;`,
    ],
    practice: [
      {
        problem: 'Convert the following function to use ES6+ features:',
        solution: `// Old version
function createUser(name, age, email) {
  var user = {
    name: name,
    age: age,
    email: email,
    sayHello: function() {
      return "Hello, " + this.name;
    }
  };
  return user;
}

// ES6+ version
const createUser = (name, age, email) => ({
  name,
  age,
  email,
  sayHello() {
    return \`Hello, \${this.name}\`;
  }
});`,
      },
    ],
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    category: 'javascript',
    content: `Error handling is crucial for building robust applications. JavaScript provides several ways to handle errors:

Error Types:
• SyntaxError
• ReferenceError
• TypeError
• RangeError
• Custom Errors

Best Practices:
• Use try-catch blocks
• Create custom error classes
• Handle promises properly
• Log errors appropriately
• Provide user-friendly messages
• Implement error boundaries

Error Handling Patterns:
• Try-Catch
• Promise Error Handling
• Async/Await Error Handling
• Error Boundaries (React)
• Global Error Handling`,
    examples: [
      `// Basic try-catch
try {
  // Risky operation
  throw new Error("Something went wrong");
} catch (error) {
  console.error("Error:", error.message);
} finally {
  // Cleanup code
}

// Custom Error Class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Promise Error Handling
fetch("https://api.example.com/data")
  .then(response => response.json())
  .catch(error => console.error("Fetch error:", error));

// Async/Await Error Handling
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw if needed
  }
}`,
    ],
    practice: [
      {
        problem: 'Create a function that validates user input and throws appropriate errors.',
        solution: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (!user.email) {
    throw new ValidationError("Email is required");
  }
  if (!user.email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
  return true;
}

// Usage
try {
  validateUser({ name: "John" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation failed:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}`,
      },
    ],
  },
  {
    id: 'testing',
    title: 'Testing in JavaScript',
    category: 'javascript',
    content: `Testing is essential for ensuring code quality and reliability. JavaScript has several testing frameworks and approaches:

Testing Types:
• Unit Testing
• Integration Testing
• End-to-End Testing
• Component Testing
• Snapshot Testing

Popular Testing Tools:
• Jest
• Mocha
• Cypress
• React Testing Library
• Vitest

Testing Best Practices:
• Write testable code
• Follow AAA pattern (Arrange, Act, Assert)
• Use meaningful test descriptions
• Mock external dependencies
• Test edge cases
• Maintain test coverage`,
    examples: [
      `// Jest Example
describe("Calculator", () => {
  test("adds two numbers correctly", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("handles negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

// React Testing Example
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("button click increments counter", async () => {
  render(<Counter />);
  const button = screen.getByRole("button");
  await userEvent.click(button);
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});

// API Testing Example
test("fetches user data", async () => {
  const user = await fetchUser(1);
  expect(user).toHaveProperty("name");
  expect(user).toHaveProperty("email");
});`,
    ],
    practice: [
      {
        problem:
          'Write tests for a function that calculates the total price of items in a shopping cart.',
        solution: `// Implementation
function calculateTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Tests
describe("calculateTotal", () => {
  test("calculates total for single item", () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(20);
  });

  test("calculates total for multiple items", () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  test("handles empty cart", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("handles zero quantity", () => {
    const items = [{ price: 10, quantity: 0 }];
    expect(calculateTotal(items)).toBe(0);
  });
});`,
      },
    ],
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns in JavaScript',
    category: 'design-patterns',
    content: `Design patterns are proven solutions to common software design problems. They help structure code for maintainability, scalability, and reusability.

Common JavaScript Patterns:
• Singleton
• Module
• Observer
• Factory
• Strategy
• Revealing Module

Benefits:
• Consistent code structure
• Easier maintenance
• Improved testability
• Better collaboration

Example Use Cases:
• Managing global state (Singleton)
• Encapsulating logic (Module)
• Event-driven systems (Observer)
• Object creation (Factory)
• Swappable algorithms (Strategy)`,
    examples: [
      `// Singleton Pattern
const Singleton = (function () {
  let instance;
  function createInstance() {
    return { id: Math.random() };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // true

// Module Pattern
const Counter = (function () {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; }
  };
})();
Counter.increment();
console.log(Counter.getCount()); // 1

// Observer Pattern
class Subject {
  constructor() { this.observers = []; }
  subscribe(fn) { this.observers.push(fn); }
  notify(data) { this.observers.forEach(fn => fn(data)); }
}
const subject = new Subject();
subject.subscribe(data => console.log('Observer:', data));
subject.notify('Hello!');`,
    ],
    practice: [
      {
        problem:
          'Implement a simple factory pattern that creates different types of shapes (Circle, Square) with a draw() method.',
        solution: `function ShapeFactory() {}
ShapeFactory.prototype.createShape = function(type) {
  switch(type) {
    case 'circle':
      return { draw: () => console.log('Drawing a circle') };
    case 'square':
      return { draw: () => console.log('Drawing a square') };
    default:
      throw new Error('Unknown shape');
  }
};
const factory = new ShapeFactory();
const circle = factory.createShape('circle');
circle.draw(); // Drawing a circle
const square = factory.createShape('square');
square.draw(); // Drawing a square;`,
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    category: 'javascript',
    content: `Performance optimization ensures your JavaScript code runs efficiently, especially in large or complex applications.

Key Techniques:
• Minimize DOM manipulation
• Debounce/throttle expensive operations
• Use efficient data structures
• Lazy loading
• Code splitting
• Memoization
• Avoid memory leaks
• Use web workers for heavy computation

Best Practices:
• Profile code with browser dev tools
• Optimize loops and recursion
• Batch DOM updates
• Use requestAnimationFrame for animations
• Avoid blocking the main thread`,
    examples: [
      `// Debounce Example
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
window.addEventListener('resize', debounce(() => {
  console.log('Resized!');
}, 200));

// Memoization Example
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
console.log(factorial(5)); // 120

// requestAnimationFrame Example
function animateBox(box) {
  let pos = 0;
  function frame() {
    pos++;
    box.style.left = pos + 'px';
    if (pos < 100) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}`,
    ],
    practice: [
      {
        problem: 'Write a throttle function that limits how often a function can be called.',
        solution: `function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
window.addEventListener('scroll', throttle(() => {
  console.log('Scrolled!');
}, 300));`,
      },
    ],
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    category: 'javascript',
    content: `Security is critical in JavaScript applications, especially those exposed to the web.

Common Threats:
• Cross-Site Scripting (XSS)
• Cross-Site Request Forgery (CSRF)
• Insecure dependencies
• Data exposure
• Injection attacks

Best Practices:
• Always escape user input
• Use Content Security Policy (CSP)
• Validate and sanitize data
• Avoid eval and Function constructors
• Use HTTPS
• Keep dependencies updated
• Store secrets securely
• Implement proper authentication and authorization`,
    examples: [
      `// Escaping user input (example for DOM)
const userInput = '<img src=x onerror=alert(1) />';
const safe = document.createElement('div');
safe.textContent = userInput; // Safe insertion

document.body.appendChild(safe);

// Avoid eval
// BAD:
// eval('alert(1)');
// GOOD:
const safeFunction = () => alert('Safe!');
safeFunction();

// Using CSP (meta tag example)
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">`,
    ],
    practice: [
      {
        problem: 'Sanitize a string to prevent XSS by removing < and > characters.',
        solution: `function sanitize(input) {
  return input.replace(/[<>]/g, '');
}
console.log(sanitize('<script>alert(1)</script>')); // scriptalert(1)/script`,
      },
    ],
  },
  {
    id: 'closures',
    title: 'Closures in JavaScript',
    category: 'javascript',
    content: `A closure is a function that remembers and can access variables from its outer scope, even after the outer function has finished running.

Think of it like a backpack that a function carries around. This backpack contains all the variables that were in scope when the function was created.

Why are closures useful?
• They help keep data private
• They let you create functions with "memory"
• They're great for event handlers and callbacks

Example Use Cases:
• Data privacy
• Function factories
• Event handlers
• Currying

Best Practices:
• Be careful with loops and closures
• Avoid creating unnecessary closures
• Use closures to create private variables`,
    examples: [
      `// Basic Closure Example
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Private Variables with Closure
function createPerson(name) {
  let privateName = name;
  return {
    getName() { return privateName; },
    setName(newName) { privateName = newName; }
  };
}
const person = createPerson("Alice");
console.log(person.getName()); // "Alice"
person.setName("Bob");
console.log(person.getName()); // "Bob"

// Closure in a Loop (Common Pitfall)
function createButtons() {
  for (var i = 1; i <= 3; i++) {
    (function(num) {
      const button = document.createElement("button");
      button.textContent = "Button " + num;
      button.onclick = function() { alert("You clicked button " + num); };
      document.body.appendChild(button);
    })(i);
  }
}`,
    ],
    practice: [
      {
        problem:
          'Create a function that generates a greeting message. The function should remember the greeting style (formal or casual) and return a function that takes a name and returns the greeting.',
        solution: `function createGreeter(style) {
  const greeting = style === 'formal' ? 'Hello, ' : 'Hey, ';
  return function(name) {
    return greeting + name + '!';
  };
}
const formalGreeter = createGreeter('formal');
const casualGreeter = createGreeter('casual');
console.log(formalGreeter('John')); // "Hello, John!"
console.log(casualGreeter('John')); // "Hey, John!"`,
      },
    ],
    quiz: {
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that has no parameters',
        'A function that remembers and can access variables from its outer scope',
        'A function that only runs once',
        'A function that returns a number',
      ],
      correct: 1,
    },
  },
  {
    id: 'event-loop',
    title: 'The Event Loop',
    category: 'javascript',
    content: `The Event Loop is what allows JavaScript to handle multiple tasks without getting stuck. It's like a chef in a kitchen who can work on multiple orders at once!

How it works:
1. JavaScript runs one piece of code at a time
2. When it needs to wait (like for a timer or network request), it doesn't stop everything
3. It puts that task aside and works on something else
4. When the waiting is done, it comes back to finish the task

Key Concepts:
• Call Stack: Where your code is actually running
• Callback Queue: Where tasks wait to be run
• Event Loop: Checks if the stack is empty and moves tasks from the queue to the stack

Common Examples:
• setTimeout and setInterval
• Network requests (fetch)
• User events (clicks, typing)
• File operations

Best Practices:
• Don't block the event loop with long-running tasks
• Use callbacks, promises, or async/await for waiting tasks
• Keep the main thread free for user interactions`,
    examples: [
      `// Basic Event Loop Example
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");
// Output: Start, End, Timeout

// Async Operations
console.log("First");
fetch('https://api.example.com/data')
  .then(() => console.log("Fetch done"));
console.log("Second");
// Output: First, Second, Fetch done

// Multiple Async Operations
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2`,
    ],
    practice: [
      {
        problem:
          'Write a function that prints numbers from 1 to 5 with a delay between each number. Use setTimeout to create the delays.',
        solution: `function printNumbers() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
printNumbers();
// Output: 1 (after 1 second), 2 (after 2 seconds), etc.`,
      },
    ],
    quiz: {
      question: 'What is the main purpose of the Event Loop in JavaScript?',
      options: [
        'To make JavaScript run faster',
        'To handle multiple tasks without blocking the main thread',
        'To create infinite loops',
        'To stop JavaScript from running',
      ],
      correct: 1,
    },
  },
  {
    id: 'react-intro',
    title: 'Introduction to React',
    category: 'react',
    content: `React is a popular JavaScript library for building user interfaces, particularly single-page applications.

Key Concepts:
• Components
• Props
• State
• JSX
• Virtual DOM

Why React?
• Reusable components
• Virtual DOM for performance
• Large ecosystem
• Strong community
• Backed by Facebook`,
    examples: [
      `// Basic React Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Using the component
<Welcome name="John" />

// Component with State
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    ],
    practice: [
      {
        problem:
          'Create a simple React component that displays a greeting message and a button to change the message.',
        solution: `function Greeting() {
  const [message, setMessage] = useState("Hello!");
  
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Welcome!")}>
        Change Message
      </button>
    </div>
  );
}`,
      },
    ],
    quiz: {
      question: 'What is React primarily used for?',
      options: [
        'Backend development',
        'Building user interfaces',
        'Database management',
        'Server configuration',
      ],
      correct: 1,
    },
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    category: 'react',
    content: `Hooks are functions that let you "hook into" React state and lifecycle features from function components.

Common Hooks:
• useState: Add state to functional components
• useEffect: Handle side effects
• useContext: Access context
• useReducer: Complex state logic
• useCallback: Memoize functions
• useMemo: Memoize values

Best Practices:
• Only call hooks at the top level
• Only call hooks from React functions
• Use multiple hooks for different concerns`,
    examples: [
      `// useState Hook
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// useEffect Hook
function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array means run once

  return <div>{data ? data.name : 'Loading...'}</div>;
}`,
    ],
    practice: [
      {
        problem:
          'Create a component that fetches and displays a list of users using useState and useEffect hooks.',
        solution: `function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      },
    ],
    quiz: {
      question: 'Which hook is used to add state to a functional component?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correct: 1,
    },
  },
  {
    id: 'system-design',
    title: 'System Design Basics',
    category: 'interviews',
    content: `System design is the process of defining the architecture, components, and interfaces of a system to satisfy specified requirements.

Key Concepts:
• Scalability
• Reliability
• Availability
• Performance
• Security

Common Topics:
• Load Balancing
• Caching
• Database Design
• API Design
• Microservices

Best Practices:
• Start with requirements
• Consider scalability
• Plan for failure
• Keep it simple
• Document your design`,
    examples: [
      `// Example API Design
// RESTful API endpoints
GET /api/users          // Get all users
GET /api/users/:id      // Get specific user
POST /api/users         // Create new user
PUT /api/users/:id      // Update user
DELETE /api/users/:id   // Delete user

// Database Schema
users {
  id: UUID
  name: String
  email: String
  created_at: Timestamp
}

// Caching Strategy
const cache = new Map();
function getUser(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  const user = fetchUserFromDB(id);
  cache.set(id, user);
  return user;
}`,
    ],
    practice: [
      {
        problem: 'Design a simple URL shortening service. What components would you need?',
        solution: `Components needed:
1. URL Shortener Service
   - Generate short codes
   - Store mappings
   - Handle redirects

2. Database
   - Store original URLs
   - Store short codes
   - Track usage

3. API
   - POST /shorten
   - GET /:shortCode

4. Cache
   - Store frequent URLs
   - Reduce database load

5. Load Balancer
   - Distribute traffic
   - Handle high load`,
      },
    ],
    quiz: {
      question: 'What is the main purpose of a load balancer in system design?',
      options: [
        'To store data',
        'To distribute traffic across servers',
        'To generate random numbers',
        'To compress files',
      ],
      correct: 1,
    },
  },
];
