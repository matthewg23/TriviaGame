window.onload = function() {
    // $("#lap").on("click", recordLap);
    // $("#stop").on("click", stop);
    // $("#reset").on("click", reset);
    $("#start").on("click", start);
  };


  function start() {
    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalID = setInterval(decrement, 1);
    }
  }


  function decrement() {

    number--;

    $("#show-number").html("<h2>" + number + "</h2>");

    if (number === 0) {

    stop();

    alert("Time Up!");}
  }