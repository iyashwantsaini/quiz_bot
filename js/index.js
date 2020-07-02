function gk() {
  setUserResponse("General Knowledge");
  setTimeout(function () {
    startquiz();
  }, 800);
}
function sp() {
  setUserResponse("Sports");
  setTimeout(function () {
    startsportsquiz();
  }, 800);
}

$(document).ready(function () {
  $(".chat_on").click(function () {
    $(".Layout").toggle();
    $(".chat_on").hide(300);
    something();
  });
  $(".chat_close_icon").click(function () {
    $(".Layout").hide();
    $(".chat_on").show(300);
  });
});

$(document).ready(function () {
  $("#enter").click(function () {
    $(".Layout").toggle();
    $(".chat_on").hide(300);
    something();
  });
  $(".chat_close_icon").click(function () {
    $(".Layout").hide();
    $(".chat_on").show(300);
  });
});

var something = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;

      // setTimeout(function () {
      //   var BotResponse5 =
      //     '<img class="botAvatar" src="img/popcorn.png"><p class="botMsg">' +
      //     "Hey, What is your name?" +
      //     '</p><div class="clearfix"></div>';
      //   $(BotResponse5).appendTo(".chats").hide().fadeIn(600);
      // }, 800);

      setTimeout(function () {
        // const input = $("#mymessage").val();

        // if (input) {
        //   var BotResponse2 =
        //     '<img class="botAvatar" src="img/popcorn.png"><p class="botMsg">' +
        //     `Hey ${input}, Lets Play a Quiz! <br> Choose a category` +
        //     '</p><div class="clearfix"></div>';
        //   $(BotResponse2).appendTo(".chats").hide().fadeIn(600);
        // } else {
          var BotResponse2 =
            '<img class="botAvatar" src="img/popcorn.png"><p class="botMsg">' +
            `Hey, Lets Play a Quiz! <br> Choose a category` +
            '</p><div class="clearfix"></div>';
          $(BotResponse2).appendTo(".chats").hide().fadeIn(600);
        // }
      }, 1000);

      setTimeout(function () {
        var bt =
          '<button id="gk" onclick="gk()" type="button" class="btn btn-secondary" style="margin-left:7px;margin-right:7px;">General Knowledge</button><button id="sports" onclick="sp()" type="button" class="btn btn-secondary" style="margin-left:7px;margin-right:7px;">Sports</button>' +
          '</p><div class="clearfix"></div>';
        $(bt).appendTo(".chats").hide().fadeIn(600);
      }, 1500);
    }
  };
})();





function setUserResponse(val) {
  var UserResponse =
    '<img class="userAvatar" src=' +
    "img/userAvatar.jpg" +
    '><p class="userMsg">' +
    val +
    ' </p><div class="clearfix"></div>';
  $(UserResponse).appendTo(".chats").show("slow");
  $("#mymessage").val("");
  scrollToBottomOfResults();
}

function scrollToBottomOfResults() {
  var terminalResultsDiv = document.getElementById("chats");
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function setBotResponse(val) {
  var BotResponse =
    '<img class="botAvatar" src=' +
    "img/popcorn.png" +
    '><p class="botMsg">' +
    val +
    ' </p><div class="clearfix"></div>';
  $(BotResponse).appendTo(".chats").show("slow");
  $("#mymessage").val("");
  scrollToBottomOfResults();
}

function startquiz() {
  var BotResponse =
    '<img class="botAvatar" src="img/popcorn.png"><div class="quiz-container"><div id="quiz"></div></div>';
  $(BotResponse).appendTo(".chats").hide().fadeIn(600);
  scrollToBottomOfResults();

  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label id="${letter}${questionNumber}">
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide botMsg">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
      );
      scrollToBottomOfResults();
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        // answerContainers[questionNumber].style.color = "lightgreen";
        const correctans = myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(
          `${correctans}${questionNumber}`
        );
        correctElement.classList.add("correctElement");
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        // answerContainers[questionNumber].style.color = "red";
        const correctans = myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(
          `${correctans}${questionNumber}`
        );
        correctElement.classList.add("correctElement");
      }
    });

    // show number of correct answers out of total
    // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    if (numCorrect === 0) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}.`
      );
      setBotResponse(
        `You got poor skills. I think you were the one who cheated in exams. 🤭`
      );

    }
    if (numCorrect === 1) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}.`
      );
      setBotResponse(
        `You gotta drink a cup of milk and try again 🥛🍼
`
      );

    }
    if (numCorrect === 2) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `Your score is still poor . Your parents will not be happy if they see this.  👨‍👩‍👧`
      );

    }
    if (numCorrect === 3) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `You can do it better. Go wash your face and try again. 🚿`
      );

    }
    if (numCorrect === 4) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `You are close. Why don't hit a champion mark. Lets do it. 🥂`
      );

    }
    if (numCorrect === 5) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `Oh. I see , You are a champion🐒 . I am jealous. Congratulations 🥳`
      );

    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const myQuestions = [
    {
      question: "The language spoken by the people by Pakistan is ?",
      answers: {
        1: "Hindi",
        2: "Sindhi",
        3: "Palauan",
      },
      correctAnswer: "2",
    },
    {
      question: "The World Largest desert is ?",
      answers: {
        1: "Thar",
        2: "Kalahari",
        3: "Sahara",
      },
      correctAnswer: "3",
    },
    {
      question: "Country that has the highest in Barley Production ?",
      answers: {
        1: "Russia",
        2: "China",
        3: "India",
        4: "France ",
      },
      correctAnswer: "1",
    },
    {
      question: "The metal whose salts are sensitive to light is ?",
      answers: {
        1: "Zinc",
        2: "Silver",
        3: "Copper",
        4: "Aluminium",
      },
      correctAnswer: "2",
    },
    {
      question:
        "What are the cannibalistic beasts called in H.G. Wells book The Time Machine?",
      answers: {
        1: "Marlocks",
        2: "Warlocks",
        3: "Yahoos",
      },
      correctAnswer: "1",
    },
  ];

  // Kick things off
  buildQuiz();

  var BotResponse =
    '<button id="next" type="button" class="btn btn-secondary butn">Next Question</button><button id="previous" type="button" class="btn btn-secondary butn">Previous Question</button><button id="submit" type="button" class="btn btn-secondary butn">Submit Quiz</button><div id="results"></div>';
  $(BotResponse).appendTo(".chats").hide().fadeIn(600);
  scrollToBottomOfResults();

  // Pagination
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
}

function startsportsquiz() {
  var BotResponse =
    '<img class="botAvatar" src="img/popcorn.png"><div class="quiz-container"><div id="quiz"></div></div>';
  $(BotResponse).appendTo(".chats").hide().fadeIn(600);
  scrollToBottomOfResults();

  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label id="${letter}${questionNumber}">
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide botMsg">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
      );
      scrollToBottomOfResults();
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        // answerContainers[questionNumber].style.color = "lightgreen";
        const correctans = myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(
          `${correctans}${questionNumber}`
        );
        correctElement.classList.add("correctElement");
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        // answerContainers[questionNumber].style.color = "red";
        const correctans = myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(
          `${correctans}${questionNumber}`
        );
        correctElement.classList.add("correctElement");
      }
    });

    // show number of correct answers out of total
    // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    if (numCorrect === 0) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}.`
      );
      setBotResponse(
        `You got poor skills. I think you were the one who cheated in exams. 🤭`
      );

    }
    if (numCorrect === 1) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}.`
      );
      setBotResponse(
        `You gotta drink a cup of milk and try again 🥛🍼
`
      );

    }
    if (numCorrect === 2) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `Your score is still poor . Your parents will not be happy if they see this.  👨‍👩‍👧`
      );

    }
    if (numCorrect === 3) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `You can do it better. Go wash your face and try again. 🚿`
      );

    }
    if (numCorrect === 4) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `You are close. Why don't hit a champion mark. Lets do it. 🥂`
      );

    }
    if (numCorrect === 5) {
      setBotResponse(
        `Score : ${numCorrect} out of ${myQuestions.length}. Try harder next time!`
      );
      setBotResponse(
        `Oh. I see , You are a champion🐒 . I am jealous. Congratulations 🥳`
      );

    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const myQuestions = [
    {
      question: "When was the first Commonwealth Games held?",
      answers: {
        1: "1930",
        2: "1934",
        3: "1938",
      },
      correctAnswer: "1",
    },
    {
      question: "The term 'Butterfly Stroke' is referred to in which sport?",
      answers: {
        1: "Swimming",
        2: "Wrestling",
        3: "Tennis",
      },
      correctAnswer: "1",
    },
    {
      question: "The number of players in each side in Water Polo is",
      answers: {
        1: "6",
        2: "8",
        3: "9",
        4: "7",
      },
      correctAnswer: "4",
    },
    {
      question: "'Wedel' is a term in which sport?",
      answers: {
        1: "Darts",
        2: "Skiing",
        3: "Chess",
        4: "Formula One",
      },
      correctAnswer: "2",
    },
    {
      question:
        "The famous football player Maradona belongs to which among the following countries?",
      answers: {
        1: "Brazil",
        2: "Chile",
        3: "Argentina",
      },
      correctAnswer: "3",
    },
  ];

  // Kick things off
  buildQuiz();

  var BotResponse =
    '<button id="next" type="button" class="btn btn-secondary butn">Next Question</button><button id="previous" type="button" class="btn btn-secondary butn">Previous Question</button><button id="submit" type="button" class="btn btn-secondary butn">Submit Quiz</button><div id="results"></div>';
  $(BotResponse).appendTo(".chats").hide().fadeIn(600);
  scrollToBottomOfResults();

  // Pagination
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
}

