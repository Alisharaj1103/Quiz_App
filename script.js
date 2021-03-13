function showDiv1(){
    document.getElementById("q1").style.display = 'block';
    //document.getElementById("countdown").style.display = 'block';
    }
    //timer timer here
    /*const startMinutes= 5;
    let time= startMinutes * 60;
    const countdownEl=document.getElementById('countdown');


    function updateCount(){
        const minutes= Math.floor(time/60);
        let seconds = time % 60;
        seconds =seconds < 5 ? '0' + seconds : seconds;
        countdownEl.innerHTML = '${minutes}: ${seconds}';
        time--;
    }
  
        setInterval(updateCount, 5000);
        */
    
    const questionNumberSpan = document.querySelector(".question-num-value") //getting the current question no
    const question=document.querySelector(".question")    //div elemnt which will render questions
    const totalQuestionsSpan =document.querySelector(".total-questions")     // out of total questions
    
    const options = document.querySelector(".options").children
   //variables for accesing questions
    let currentIndex;
    let index = 0;  //index of questions in the questions array
     // array of anwered question indexes
    let score = 0;
    const opt1 = document.querySelector(".option1")
    const opt2 = document.querySelector(".option2")
    const opt3 = document.querySelector(".option3")
    const opt4 = document.querySelector(".option4")


    const questions = [
    {
        q:'How do you call a function named "myFunction"?',
        options:['myFunction()', 'call myFunction()', 'call function myFunction()', 'all of the above'],
        answer:0
    },
    {
        q:'How to write an IF statemente in JavaScript?',
        options:['if i==5 then', 'if(i==5)', 'if i= 5', 'if i = 5 then'],
        answer:1
    },
    {
        q:'How to you select an element based on its css class',
        options:['getElementById', 'getElementByClass', 'querySelector', 'getElementByCss'],
        answer:2
    }
]

totalQuestionsSpan.innerHTML = questions.length //total no of questions displayed
//function to load questions on dom

function load(){
    questionNumberSpan.innerHTML = index + 1
    question.innerHTML = questions[currentIndex].q;
    opt1.innerHTML = questions[currentIndex].options[0]    
    opt2.innerHTML = questions[currentIndex].options[1]
    opt3.innerHTML = questions[currentIndex].options[2]
    opt4.innerHTML = questions[currentIndex].options[3]
    index++
}


window.onload=function(){
    this.getQuestion();
    this.answersTracker();
}


//function to call load to render questions one after the other
let answeredQuestions =[];
function getQuestion(){
    let questionNumber = index
    if(index == questions.length){
        quizOver();
    }
    else{
        if(answeredQuestions.length > 0){
             // this might be removed, next else part should do the job
            if(answeredQuestions.includes(questionNumber)){
                getQuestion();
            }
            else {
                currentIndex = questionNumber;
                load();
            }
        }
        if(answeredQuestions.length == 0){ //visit it again
            currentIndex = questionNumber
            load()
        }
        //add the question to list of anwered questions
        answeredQuestions.push(questionNumber)
    }
}

//Check if selected answer is correct or wrong
function check(element){
    /*gets called by click on any option, id of that button is passed
    and is compared with defined answer in the questions array */
    if(element.id == questions[currentIndex].answer){
        element.className="correct"
        updateAnswersTracker("correct")
        score++
    }
    else {
        element.className="wrong"
        updateAnswersTracker("wrong")
    }
    disableClick();
}

//Make sure the user selected an item before clicking on the Next button
function validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select an option")
    }
    else{
        getQuestion();
        enableClick();
    }
}

//Function to reanable click in the options
function enableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

//Listener function for click event on Next button
function next(){
    validate();
}

//Function to disable click for the options
function disableClick(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled")

        if(options[i].id == questions[currentIndex].answer){
            options[i].classList.add('correct');
        }
    }
}
// 
const answersTrackerContainer = document.querySelector(".answers-tracker")
/*this function attaches one child div to var
 answersTrackerContainer for every question*/
function answersTracker(){
    for(let i=0; i< questions.length; i++){
        const div =document.createElement("div")
        answersTrackerContainer.appendChild(div);
    }
}

//Update the answers tracker elements on being called by answer check function
function updateAnswersTracker(newClass){
    answersTrackerContainer.children[index -1]
    .classList.add(newClass)
}

//Displays the quiz-over page if quiz is over
const correctAnswersSpan =document.querySelector(".correct-answers")
const totalQuestionsSpan2 =document.querySelector(".total-questions2")

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show")
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = questions.length
   
}
















