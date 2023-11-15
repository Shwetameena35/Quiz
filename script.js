const container = document.querySelector('.container');
const questionBox = document.querySelector('.questions');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Make an array of objects that store Questions, choices and answer
const quiz = [
    {
        question:"Q. What is my name??",
        choices:["Shweta","Shalini","Samiksha","Amitaa"],
        answer: "Shweta"
    },
    {
        question:"Q. What is my age??",
        choices:["12","18","21","10"],
        answer: "18"
    },
    {
        question:"Q. What is my Favorite colour??",
        choices:["Pink","Blue","Black","Green"],
        answer: "Blue"
    },
    {
        question:"Q. What is my favorite Place??",
        choices:["Temple","Cafe","Pub","Home"],
        answer: "Temple"
    },
];

let currentIndex = 0;
let score = 0;
let quizOver = false
let timeLeft = 15;
let timerId = null;

const showQuestions = ()=>
{
    const quesDetails = quiz[currentIndex];
    questionBox.textContent = quesDetails.question;
    choicesBox.textContent = "";
    for(let i = 0;i<quesDetails.choices.length;i++)
    {
        const currentchoice = quesDetails.choices[i];
        const choicDiv = document.createElement('div');
        choicDiv.textContent = currentchoice;
        choicDiv.classList.add('choice');
        choicesBox.appendChild(choicDiv);

        choicDiv.addEventListener('click',()=>{
            if(choicDiv.classList.contains('selected')){
                choicDiv.classList.remove('selected');
            }
            else{
                choicDiv.classList.add('selected');
            }
        });
    }
    if(currentIndex<quiz.length){
        startTimer();
    }
    
}

// Function to check answer

const checkAnswer =()=>{
      const selechoice = document.querySelector('.choice.selected');
      if(selechoice.textContent === quiz[currentIndex].answer){
    //    alert("Correct");
       displayAlert("Correct Answer!!");
       score++;
      }
      else{
        // alert("Wrong");
        displayAlert(`Wrong Answer!! ${quiz[currentIndex].answer} is Correct answer `);
      }
      timeLeft = 15;
      currentIndex++;
      if(currentIndex<quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        timer.style.display = "none";
    }
    
}
// Function to show score
const showScore = ()=>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed the quiz");
    nextBtn.textContent = "Play Again";
   quizOver = true;
   timer.style.display = "none";
}

// Function to show Lalert
const displayAlert = (msg) =>{
    alert.style.display = "Block";
    alert.textContent = msg;
    setTimeout(() =>{
        alert.style.display = "none";
    },2000);
}

// Function to start timer
const startTimer = () => {
    clearInterval(timerId);  
    const countDown = () =>{

        timer.textContent = timeLeft;
        timeLeft--;
        if(timeLeft == 0){
            const confirmUser = confirm("Time Up!! Do You want to play the Quiz again");
         if(confirmUser){
            timeLeft = 15;
            startQuiz();
         }
         else{
            startBtn.style.display = "block";
            container.style.display = "none";
            return;
         }
        }
    }
     timerId =   setInterval(countDown,1000);
}
// Function to stop timer
const stopTimer =() =>{
clearInterval(timerId);
}

// Adding Event Listner to start Button
startBtn.addEventListener('click',()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    // showQuestions();
    startQuiz();
});

// Function to Shuffle question
const shuffleQuestion = () =>{
    for(let i = quiz.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i],quiz[j]] = [quiz[j],quiz[i]];
    }
    currentIndex = 0;
    showQuestions();
}
// Function to start quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestion();
}

// Adding event listner to start Button
nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent == "Next"){
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
       
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentIndex = 0;
          startQuiz();
            quizOver = false;
            score = 0;
    }
    else{
       checkAnswer();
    }
});


