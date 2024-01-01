var scoresBtn = document.querySelector("#view-high-scores"); 


//get score data from localStorage 

function printHighscores() { 
	var highscores = 
		JSON.parse(window.localStorage.getItem("highscores")) || []; 
//sort scores in descending order 
	highscores.sort(function (a, b) { 
		return b.score - a.score; 
	}); 
	highscores.forEach(function (record) { 
		var list = 
			document.createElement("li"); 
		list.textContent = record.name + " - " + record.score; 
		var olEl = 
			document.getElementById("highscores"); 
		olEl.appendChild(list); 
	}); 
} 

// Clear previous scores when users click clear 
function clearHighscores() { 
	window.localStorage.removeItem("highscores"); 
	window.location.reload(); 
} 
document.getElementById("clear").onclick = clearHighscores; 

printHighscores();
