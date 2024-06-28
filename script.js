const playNowBtn = document.querySelector('.play-now-btn');
const welcomePageWrapper = document.querySelector('.welcome-page-wrapper');
const categoryWrapper = document.querySelector('.category-wrapper');
const category = document.querySelectorAll('#category');
const mainContainer = document.querySelector('.main-container');
let time = document.querySelector('.time');
const timlineUpdate = document.querySelector('.timeline-update');


let upgradeProgressBar = null;
let upgradeStatus = 'stopped';


//starting the app 
playNowBtn.addEventListener('click',()=>{
    if (!categoryWrapper.classList.contains('hide')) {
        categoryWrapper.classList.add('hide')
        categoryWrapper.style.display = 'block'
        welcomePageWrapper.style.display ='none'
    } else {
        categoryWrapper.style.display = 'none'
    }
})



let url = './questions.json'

//fetching the json object data
let readJSONFile=(url)=> {
    fetch(url)
    .then(response =>response.json())
    .then(data =>{
        listData = data
        getRandomQuestions();
    });

}

let leadingZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits:2
});

//update timeline function
let duration = 0;

const timerFunction= ()=>{
    duration++
    time.textContent = `${leadingZero.format(duration)}`;
    let dividedValue = 10;
    let percent = duration/dividedValue;
    
    timlineUpdate.style.setProperty('--progress', percent)

    if (duration===10) {
        duration= 0
    }
       
}


//geting random question from the json object
let key;
let randomNumber;
let newquestionIndex;
let newQuestion;

function getRandomQuestions(html, css,all, num) {
    num = 5;
   
    js = listData.js;
    all = listData.all;

    //manipulating the response to get the type html, css, javastrict, or all.


    category.forEach((categories)=>{
        categories.addEventListener('click', (e)=>{
            let targetClicked = e.target.classList
            

            if (targetClicked.contains('html') ) {
                result = listData.html
                key = Object.keys(result)
                randomNumber = Math.floor(Math.random()*key.length);
                newquestionIndex = key[randomNumber];
                newQuestion = result[newquestionIndex];
            } else if(targetClicked.contains('css')) {
                result = listData.css;
                key = Object.keys(result);
                randomNumber = Math.floor(Math.random()*key.length);
                newquestionIndex = key[randomNumber];
                newQuestion = result[newquestionIndex];
            } else if(targetClicked.contains('javascript')) {
                result = listData.js;
                key = Object.keys(result);
                randomNumber = Math.floor(Math.random()*key.length);
                newquestionIndex = key[randomNumber];
                newQuestion = result[newquestionIndex];
            } else {
                result = listData.all;
                key = Object.keys(result);
                randomNumber = Math.floor(Math.random()*key.length);
                newquestionIndex = key[randomNumber];
                newQuestion = result[newquestionIndex];
            }

            displayQuestion(newQuestion)
        })
    })
 
}


//displaying the random question based on the 
let question = document.querySelector('.question');
let optionList = document.querySelector('.options-list');

function displayQuestion(questions){
    if (categoryWrapper.style.display === 'block') {
        categoryWrapper.style.display = 'none'
        mainContainer.style.display = 'block'
    }

    question.textContent = `${questions.question}`;
    
    optionList.innerHTML = `
    <div class="option">${questions.choices.a}</div>
    <div class="option">${questions.choices.b}</div>
    <div class="option">${questions.choices.c}</div>
    <div class="option">${questions.choices.d}</div>
    `

    
    const options = document.querySelectorAll('.option');
    
    options.forEach((option)=>{
        let checkFailBtn = document.createElement('div')
        checkFailBtn.classList.add('check-fail-btn');

        checkFailBtn.innerHTML = ` 
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="check-btn" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
        </svg>
        

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="fail-btn" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>

        `

        option.appendChild(checkFailBtn)



        console.log(checkFailBtn);
        option.addEventListener('click', e =>{
            let targetOption = e.target;
            console.log(targetOption);

            if (targetOption.innerHTML === questions.answer) {
                checkFailBtn.classList.add('check')
                console.log('yes');
                option.classList.add('correct');
            } else{
                option.classList.add('wrong');
                checkFailBtn.classList.add('fail') 
                console.log('fail'); 
            }

            //clearOption(option)

        })
    })

  function clearOption(option) {
    option.classList.remove('correct')
    option.classList.remove('wrong')
  }
   

    if (upgradeStatus === 'stopped') {
        upgradeProgressBar = setInterval(timerFunction, 1000);
        upgradeStatus = 'started'
        //console.log(upgradeStatus); 
    }

    
    
}



readJSONFile(url);







