function gk() {
  setUserResponse("General Knowledge");
  setTimeout(function () {
    startquiz();
  }, 800);
}
function sp() {
  setUserResponse("Sports");
  setTimeout(function () {
    startquiz();
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

var something = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;

      setTimeout(function () {
        var BotResponse2 =
          '<img class="botAvatar" src="static/img/popcorn.png"><p class="botMsg">' +
          "Lets Play a Quiz! <br> Tell me when to start" +
          '</p><div class="clearfix"></div>';
        $(BotResponse2).appendTo(".chats").hide().fadeIn(600);
      }, 800);

      setTimeout(function () {
        var bt =
          '<button id="gk" onclick="gk()" type="button" class="btn btn-secondary" style="margin-left:7px;margin-right:7px;">General Knowledge</button><button id="sports" onclick="sp()" type="button" class="btn btn-secondary" style="margin-left:7px;margin-right:7px;">Sports</button>' +
          '</p><div class="clearfix"></div>';
        $(bt).appendTo(".chats").hide().fadeIn(600);
      }, 801);
    }
  };
})();

function setUserResponse(val) {
  var UserResponse =
    '<img class="userAvatar" src=' +
    "static/img/userAvatar.jpg" +
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
    "static/img/popcorn.png" +
    '><p class="botMsg">' +
    val +
    ' </p><div class="clearfix"></div>';
  $(BotResponse).appendTo(".chats").show("slow");
  $("#mymessage").val("");
  scrollToBottomOfResults();
}


function startquiz(){


  var BotResponse =
      '<img class="botAvatar" src="static/img/popcorn.png"><div class="quiz-container"><div id="quiz"></div></div>';
    $(BotResponse).appendTo(".chats").hide().fadeIn(600);
    scrollToBottomOfResults()

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
        const correctans=myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(`${correctans}${questionNumber}`);
        correctElement.classList.add("correctElement");
      }
      // if answer is wrong or blank
      else {

        // color the answers red
        // answerContainers[questionNumber].style.color = "red";
        const correctans=myQuestions[questionNumber].correctAnswer;
        const correctElement = document.getElementById(`${correctans}${questionNumber}`);
        correctElement.classList.add("correctElement");
        
      }
    });

    // show number of correct answers out of total
    // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    setBotResponse(`Score : ${numCorrect} out of ${myQuestions.length}`);
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
      question: "Who invented JS?",
      answers: {
        1: "Douglas Crockford",
        2: "Sheryl Sandberg",
        3: "Brendan Eich",
      },
      correctAnswer: "3",
    },
    {
      question: "Which is a JS package manager?",
      answers: {
        1: "Node.js",
        2: "TypeScript",
        3: "npm",
      },
      correctAnswer: "3",
    },
    {
      question: "Tool used to ensure code quality?",
      answers: {
        1: "Angular",
        2: "jQuery",
        3: "RequireJS",
        4: "ESLint",
      },
      correctAnswer: "4",
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
