$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ["Great Job!", "Closer to that Gym Badge!", "Pikachu choose you!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "How many pokemon can Eevee currently evolve into?",
            "c": ["7", "6", "8"],
            "answer": 2
        },
        // question 2
        {
            "q": "How many Pokemon types currently exist?",
            "c": ["19", "16", "18"],
            "answer": 2
        },
        // question 3
        {
            "q": "Which Pokemon type has the SECOND least amount of Pokemon?",
            "c": ["Ice", "Ghost", "Dragon"],
            "answer": 0
        },
        // question 4
        {
            "q": "If there was a hypothetical Pokemon that was all 18 types at once, it would only be weak to one Pokemon type. Which type would it be weak to?",
            "c": ["Rock", "Dark", "Ice"],
            "answer": 0
        },
        // question 5
        {
            "q": "How many non-legendary Pokemon cannot evolve?",
            "c": ["57", "71", "61"],
            "answer": 2
        },
        // question 6
        {
            "q": "Which generation of Pokemon has the most Pokemon with mega evolutions?",
            "c": ["Generation 4", "Generation 3", "Generation 1"],
            "answer": 1
        },
        // question 7
        {
            "q": "Which of these abilities does not double the Pokemon's attack stat?",
            "c": ["Huge Power", "Sheer Power", "Pure Power"],
            "answer": 1
        },
        // question 8
        {
            "q": "How many Pokemon have branch evolutions?",
            "c": ["9", "10", "8"],
            "answer": 1
        },
        // question 9
        {
            "q": "Fire resists Grass and is super effective against Grass, Water resists Fire and is super effective against Fire, and Grass resists Water and is super effective against Water. In other words they make a type triangle. Which other trio of Pokemon share the same relationship?",
            "c": ["Fire, Ice, Ground", "Rock, Flying, Fighting", "Fairy, Fire, Thunder"],
            "answer": 1
        },
        // question 10
        {
            "q": "What was the defualt name for the protagonist of Pokemon Red and Blue?",
            "c": ["Ash", "Blue", "Red"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});