$(document).ready(function () {
  var options = [
    {
      question: "How many 10 cent stamps are there in a dozen?", 
      choice: ["10", "12", "120", "120"],
      answer: 2,
     },
     {
       question: "Your cat gave birth to two kittens. Two years later, those two kittens each gave birth to two kittens. On the fourth year, every cat in the house all gave birth to one kitten. How many cats do you have in total?", 
      choice: ["7", "11", "14", "22"],
      answer: 2,
     }, 
     {
       question: "Flammable and inflammable mean exactly the same thing.", 
      choice: ["True", "False"],
      answer: 0,
    }, 
    {
      question: "How many faces does a square based pyramid have?", 
      choice: ["3", "4", "5", "7" ],
      answer: 2,
    }, 
    {
      question: "How many items are there in a Bakers' Dozen?", 
      choice: ["12", "6", "24", "13" ],
      answer: 3,
    }, 
    {
      question: "What is JFK short for?", 
      choice: ["John Franklin Kennedy", "John Freddie Kennedy", "John Fitzerald Kennedy", "John Franco Kennedy" ],
      answer: 2,
     }, 
    {
      question: "Which country is largest in terms of land mass?", 
      choice: ["Spain", "Peru", "Brazil", "Australia" ],
      answer: 3,
    }, 
    {
      question: "He finished all of the candy __________ for one last piece which he gave to me.", 
      choice: ["except", "accept", "exerpt", "excellent" ],
      answer: 0,
    }];
  
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  
  
  
  $("#reset").hide();
  
  //click start button to start game
  $("#start").on("click", function () {
      $("#start").hide();
      displayQuestion();
      runTimer();
      for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
  }
    })
  //timer start
  function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
  
    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      reveal();
    }	
  }
  
  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //randomly pick question in array if not already shown
  //display question and loop though and display possible answers
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*options.length);
    pick = options[index];
  
  //	if (pick.shown) {
  //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
  //		displayQuestion();
  //	} else {
  //		console.log(pick.question);
      //iterate through answer array and display
      $("#questionblock").html("<h2>" + pick.question + "</h2>");
      for(var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choice[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
  //		}
  }
  
  
  
  //click function to select answer and outcomes
  $(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    //correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
      stop();
      correctCount++;
      userGuess="";
      $("#answerblock").html("<p>Correct!</p>");
      reveal();
  
    } else {
      stop();
      wrongCount++;
      userGuess="";
      $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      reveal();
    }
  })
  }
  
  
  function reveal () {
    newArray.push(pick);
    options.splice(index,1);
  
    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer= 20;
  
    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
      $("#questionblock").empty();
      $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
      $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
      $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
      $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
      $("#reset").show();
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
  
    } else {
      runTimer();
      displayQuestion();
  
    }
    }, 3000);
  
  
  }
  
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  
  })
  
  })