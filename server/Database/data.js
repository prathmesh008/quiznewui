export default [
    {
    id: 1,
    question: "Which one is the JavaScript logo?",
    options: [
        "Option A",
        "Option B",
        "Option C"
    ],
    explanation: "The yellow JS shield is the official JavaScript logo.",
    questionImage: "",
    optionImages: [
        "https://cdn-icons-png.flaticon.com/512/136/136530.png",  // JavaScript logo (correct)
        "https://cdn-icons-png.flaticon.com/512/226/226777.png",  // Java logo
        "https://cdn-icons-png.flaticon.com/512/5968/5968350.png" // Python logo
    ]
    },
   {
  id: 2,
  question: "Which one is the official Node.js logo?",
  options: [
    "Option A",
    "Option B",
    "Option C"
  ],
  explanation: "The green hexagon logo represents Node.js.",
  questionImage: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  optionImages: [
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",     // Node.js logo (correct)
    "https://cdn-icons-png.flaticon.com/512/732/732212.png",                    // HTML5 logo
    "https://cdn-icons-png.flaticon.com/512/5968/5968292.png"                   // JS logo
  ]
},
    {
        id: 3,
        question: "When an operator value is NULL, the typeof returned by the unary operator is",
        options: [
            'object',
            'null',
            'undefined',
        ],
        explanation: "In JavaScript, typeof null returns 'object'. This is a known bug in JavaScript.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 4,
        question: "What does the toString() method return?",
        options: [
            'Return Object',
            'Return String',
            'Return Integer'
        ],
        explanation: "The toString() method returns a string representing the object.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 5,
        question: "Which function is used to serialize an object into a JSON string?",
        options: [
            'stringify()',
            'parse()',
            'convert()',
        ],
        explanation: "JSON.stringify() converts a JavaScript object or value to a JSON string.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 6,
        question: "Which method is used to remove the last element from an array?",
        options: [
            "pop()",
            "shift()",
            "slice()"
        ],
        explanation: "The pop() method removes the last element from an array and returns that element.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 7,
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "//",
            "/* */",
            "#"
        ],
        explanation: "// is used for single-line comments in JavaScript.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 8,
        question: "What will typeof NaN return?",
        options: [
            "number",
            "NaN",
            "undefined"
        ],
        explanation: "NaN stands for 'Not-a-Number', but its type is actually 'number'.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 9,
        question: "Which JavaScript method is used to schedule a function after a delay?",
        options: [
            "setTimeout()",
            "setInterval()",
            "delay()"
        ],
        explanation: "setTimeout() executes a function after a specified number of milliseconds.",
        questionImage: "",
        optionImages: []
    },
    {
        id: 10,
        question: "Which method converts a JavaScript value to a JSON string?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.encode()"
        ],
        explanation: "JSON.stringify() is the standard method to convert a value to a JSON string.",
        questionImage: "",
        optionImages: []
    }
]

export const answers = [0, 0, 2, 1, 0, 0, 0, 0, 0, 0];