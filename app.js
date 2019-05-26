var images = ["fas fa-american-sign-language-interpreting" , "fas fa-american-sign-language-interpreting" , "fas fa-cut" ,"fas fa-cut", "fas fa-bicycle" , "fas fa-bicycle" ,"fas fa-asterisk","fas fa-asterisk","fas fa-atom","fas fa-atom","fas fa-car-crash","fas fa-car-crash", "fas fa-chess", "fas fa-chess", "fas fa-drum" , "fas fa-drum"];

var oppened_card=[];
var matched_card=[];
var matchedCardContainer=[];
var moves=0;
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");


const restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', restart);

function Shuffle(array){
    var i= array.length , tempValue , randomindex ;
    while (--i >0){
        randomindex = Math.floor(Math.random() * (i+1));
        tempValue = array[randomindex];
        array[randomindex] = array[i] ;
        array[i] = tempValue ;
    }
    return array;
}
function startGame(){
images = Shuffle(images);

const game_structure = document.getElementById('game_structure');
const fragment = document.createDocumentFragment();

for (let i=0 ; i<images.length ; i++){
    const card= document.createElement("section");
    const front = document.createElement("div");
    const back = document.createElement("div");
    front.classList.add("front");
    back.classList.add("back");
    card.classList.remove('stopPointer' , 'cardAnimate' , 'hidden');
    front.classList.remove('front_ro');
    back.classList.remove('back_ro' , "open"); 
    card.appendChild(front);
    card.appendChild(back);
    back.innerHTML=`<i class="${images[i]}"></i>`;
    fragment.appendChild(card);
     
}
game_structure.appendChild(fragment);
}

game_structure.addEventListener('click' , element_Listener);


function element_Listener(event){
    if (event.target.nodeName === 'SECTION') {
        startTimer();
        if (oppened_card.length<2){
            flip_Card(event);
        }
    }
}

function flip_Card(event){
        event.target.childNodes[0].classList.add('front_ro');
        event.target.childNodes[1].classList.add('back_ro' , "open");
        event.target.classList.add('stopPointer');
    if(oppened_card.length==0){
        oppened_card.push(event.target.childNodes[1].innerHTML);
        matched_card.push(event.target);
    }
    else if(oppened_card.length==1){
        oppened_card.push(event.target.childNodes[1].innerHTML);
        matched_card.push(event.target);
        moveCounter(); 
        matched_card[0].classList.add('cardAnimate');
        matched_card[1].classList.add('cardAnimate');

        if (oppened_card[0]==oppened_card[1]){
            matchedCardContainer.push(matched_card[0],matched_card[1]);
            console.log(matchedCardContainer);
            match();
            game_over();
            }
            else{                    
                unmatch();    
            }    
        }
    }

function moveCounter(){
    moves++;
    document.getElementById("steps").innerHTML = moves ;
    rating ();
}

function match(){
  
    setTimeout(function(){
        matched_card[0].classList.add('hidden');
        matched_card[1].classList.add('hidden');
        oppened_card=[];
        matched_card=[];
    },1000);   
}

function unmatch(){
    setTimeout(function(){
        matched_card[0].childNodes[0].classList.remove('front_ro');
        matched_card[0].childNodes[1].classList.remove('back_ro');
        matched_card[0].classList.remove('cardAnimate' , 'stopPointer');
        matched_card[1].childNodes[0].classList.remove('front_ro');
        matched_card[1].childNodes[1].classList.remove('back_ro');
        matched_card[1].classList.remove('cardAnimate' , 'stopPointer');
        oppened_card=[];
        matched_card=[]; 
    },1000);  
}
    let timerRunning = false;
    var gameTime;
function startTimer(){
    if(!timerRunning){
        timerRunning = true;
        var totalSeconds = 0;
        gameTime=setInterval(setTime, 1000);
    }
   
    function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
         return "0" + valString;
        } else {
        return valString;
        }
    }
}
function stopTimer(){
    if(timerRunning){
        timerRunning = false; 
        clearInterval(gameTime);
    }
}
const winner = document.getElementById("winner");
function game_over(){
    const totalMoves = document.querySelector("#trails");
    const starScore = document.querySelector("#starScore");
    const playTime = document.querySelector("#playTime");
    if(matchedCardContainer.length == images.length){
        stopTimer();
    setTimeout(function(){
            winner.style.display ="block";
            totalMoves.innerHTML = `${document.getElementById("steps").innerHTML} Moves`;
            playTime.innerHTML = `${document.getElementById("minutes").innerHTML}M:${document.getElementById("seconds").innerHTML} S`;
            starScore.innerText = `${star} star`;
    },1000);
}
}
const starOne=document.getElementById("starOne");
const starTwo=document.getElementById("starTwo");
const starThree=document.getElementById("starThree");
let star=3;

function rating (){
    
    switch (moves){
        case 10:
            star=2;
            starOne.style.display="none";
            break;
        case 20:
            star=1;
            starTwo.style.display="none";
            break;
        case 30:
            star=0;
            starThree.style.display="none";
            break;
    }
}
const playAgain = document.getElementById("playAgain").addEventListener("click" ,  function(){
    winner.style.display = "none";
    restart();
});
function restart(){
    game_structure.innerHTML='';
    moves = 0;
    document.getElementById("steps").innerHTML = moves ;
    star=3;
    starOne.style.display = "inline-block";
    starTwo.style.display = "inline-block";
    starThree.style.display = "inline-block";
    secondsLabel.innerHTML=00;
    minutesLabel.innerHTML=00;
    stopTimer();
    oppened_card=[];
    matched_card=[];
    matchedCardContainer=[];
    startGame();
}
startGame();