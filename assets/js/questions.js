//quiz questions and answers stored as objects
var questions = [ 
{prompt: "1. Given the array below, how would you access the item whose value is 7?\n var numbers=[4, 7, 3, 5, 2];",
choices: 
["a) numbers(2)",
"b)	numbers[1]",
"c)	numbers[2]",
"d)	numbers(7)"],
answer: "b)	numbers[1]",
}
,
{prompt: "2.	What is logged in the console after this code is executed?\nvar sum = 23.95;\nvar tip = '3';\nconsole.log('The total is $' + sum + tip + '.');",
choices: 
["a) Syntax error.",
"b)	'The total is $26.95 + 3'",
"c)	'The total is $26.95.'",
"d)	'The total is $23.953.'"
],
answer: "d)	'The total is $23.953.'",
}
,
{prompt: "3.	What does a single equals symbol in JavaScript indicate?",
choices: 
["a) The values to the left and right are compared.",
    "b)	A value is matched with the value of a named variable.",
    "c)	The values to the left and right are equal.",
    "d)	A value is assigned to the named variable."
    
],
answer: "d)	A value is assigned to the named variable.",
}
,
{prompt: "4.	What will be printed to the console as the following script is running?\nvar sqrt = (function(x) {\nconsole.log(x*x);\n})(my_number)\nmy_number = 5;",
choices: 
["a) x*x",
    "b)	25",
    "c)	5",
    "d)	This code will error out."
],
answer: "d)	This code will error out.",
}
,
{prompt: "5.	In a SWITCH statement, what happens when several of the SWITCH cases resolve to TRUE?",
choices: 
["a) The SWITCH statement returns all cases that resolves to TRUE, then stops.",
    "b)	The SWITCH statement returns the last case that resolves to TRUE, then stops.",
    "c)	The SWITCH statement returns the first case that resolves to TRUE, then stops.",
    "d)	The SWITCH statement returns an error. Each switch case should be unique."
    
],
answer: "c)	The SWITCH statement returns the first case that resolves to TRUE , then stops.",
}
,
{prompt: "6.	What is the new value of myArray after this script executes?\nconst myArray = [1, 2, 3, 4]\nmyArray.forEach( (item, index) = > {\nmyArray[index] = ++item;\n});",
choices: 
["a) [1 2,3,4,2,3,4,5]",
"b)	[1,2,3,4]",
"c)	Syntax error: index not defined.",
"d)	[2,3,4,5]"
],
answer: "d)	[2,3,4,5]",
}
,
{prompt: "7.	What is the difference between the array.forEach() and array.map() methods?",
choices: 
["a) array.forEach() executes a provided callback function once for each item in the array. array.map() creates an object map of the original array to be placed in a new variable.",
    "b)	array.forEach() executes a provided callback function once for each item in the array and returns it to the original array. array.map() creates a new array with the results of executing a provided callback function once foreach item in the original array.",
    "c)	array.forEach() creates a new array for the original data and executes a provided callback function once for each item in the array. array.map() creates a new array with the results of executing a provided callback function once foreach item in the original array.",
    "d)	array.forEach() executes a provided callback function once for each item in the array. array.map() creates a new array with the results of executing a provided callback function once for each item in the original array."
    
],
answer: "d)	array.forEach() executes a provided callback function once for each item in the array. array.map() creates a new array with the results of executing a provided callback function once for each item in the original array.",
}
,
{prompt: "8.	Where in the HTML document does the new element appear when you use the document.createElement() method?",
choices: 
["a) Nowhere: The element is created, but has not been added to the DOM.",
"b)	At the bottom of the HTML document.",
"c)	Inside the specified element container.",
"d)	At the top of the HTML document."

],
answer: "a)	Nowhere: The element is created, but has not been added to the DOM.",
}
,
{prompt: "9.	What is the 'DOM'?",
choices: 
["a)	DOM is short for 'Document Object Model', the document object the browser creates when it renders an HTML document.",
"b)	DOM is the JavaScript environment the browser creates for each HTML document.",
"c)	DOM is the name of a 2012 album by German singer Joachim Witt.",
"d)	DOM is short for 'Document Object Master', the original document the browser renders."

],
answer: "a)	DOM is short for 'Document Object Model', the document object the browser creates when it renders an HTML document.",
}
,
{prompt: "10.	What goes in place of a and b in this standard event listener?\nelement.addEventListener('a','b');",
choices: 
["a) a: the event name;\nb: the function to call when the event fires",
"b)	a: the actions to perform when the event fires;\nb: the name of the event",
"c)	a: the count of how many such event listeners are defined;\nb: an array of functions to call when the event fires",
"d)	a: the function to call when the event fires;\nb: the object ID of the element"

],
answer: "a)	a: the event name\nb: the function to call when the event fires"
}
]

//set up DOM variables
var questionsEl = document.querySelector("#questions"); 
var timerEl = document.querySelector("#time"); 
var choicesEl = document.querySelector("#choices"); 
var submitBtn = document.querySelector("#submit"); 
var startBtn = document.querySelector("#start"); 
var nameEl = document.querySelector("#name"); 
var feedbackEl = document.querySelector("#feedback"); 
var reStartBtn = document.querySelector("#restart"); 

//set the time limit to 200 seconds for 10 questions
var currentQuestionIndex = 0; 
var time = 200 ; 
var timerId; 

//function triggers when Start Quiz button is hit
function quizStart() { 
    timerId = setInterval(countdown, 1000); 
    timerEl.textContent = time; 
    var startScreenEl = 
        document.getElementById("start-screen"); 
//start screen will be hidden and questions will show
    startScreenEl.setAttribute("class", "hide"); 
    questionsEl.removeAttribute("class"); 
    getQuestion(); 
} 

//function to get all questions rolling in order
function getQuestion() { 
    var currentQuestion = 
        questions[currentQuestionIndex]; 
    var promptEl = 
        document.getElementById("question-title"); 
    promptEl.textContent = 
        currentQuestion.prompt; 
    choicesEl.innerHTML = ""; 
//use forEach method to modify each choice and create the buttons for selection
    currentQuestion.choices.forEach( 
        function (choice, i) { 
            var choiceBtn = 
                document.createElement("button"); 
                choiceBtn.setAttribute("style", "text-align: left");
                choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = choice;
            choiceBtn.onclick = questionClick; 
            choicesEl.appendChild(choiceBtn); 
        } 
    ); 
} 

//set up conditions for correct/wrong answers, 20s penalty
function questionClick() { 
    if (this.value !== questions[currentQuestionIndex].answer) { 
        time -= 20; 
        if (time < 0) { 
            time = 0; 
        } 
        timerEl.textContent = time; 
        feedbackEl.textContent = "Oops!";
        var wrongAudio = new Audio("./assets/sfx/incorrect.wav");
        wrongAudio.play(); 
    } else {feedbackEl.textContent = "Correct!";
    var correctAudio = new Audio("./assets/sfx/correct.wav");
        correctAudio.play(); 
    } 
    feedbackEl.setAttribute("class", "feedback"); 
    setTimeout(function () { 
        feedbackEl.setAttribute("class", "feedback hide"); 
    }, 1000); 
    currentQuestionIndex++; 
    if (currentQuestionIndex === questions.length) { 
        quizEnd(); 
    } else { 
        getQuestion(); 
    } 
} 

function quizEnd() { 
    clearInterval(timerId); 
    var endScreenEl = document.getElementById("end-screen"); 
    endScreenEl.removeAttribute("class"); 
    var finalScoreEl = 
        document.getElementById("final-score"); 
    finalScoreEl.textContent = time/2; 
    questionsEl.setAttribute("class", "hide"); 
} 
  
//game over when time is up  
function countdown() { 
    time--; 
    timerEl.textContent = time; 
    if (time <= 0) { 
        quizEnd();
    } 
} 

//save to local storage
function saveHighscore() { 
    var name = nameEl.value.trim(); 
    if (name !== "") { 
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
        var newScore = { 
            score: time/2, 
            name: name, 
        }; 
        highscores.push(newScore); 
        window.localStorage.setItem( 
            "highscores", 
            JSON.stringify(highscores) 
        ); 
        window.open("highscores.html","_self"); 
    } 
} 
  
//save scores when clicking submit button  
submitBtn.onclick = saveHighscore; 

//Start quiz after clicking start quiz 
startBtn.onclick = quizStart;