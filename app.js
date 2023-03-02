const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let bloqTab = false;
let firstCard, secondCard;
let move= 0;

function flipCard() {
    if(bloqTab) return;
    if (this === firstCard) return;

     this.classList.add('flip');

     if(!hasFlippedCard){
         hasFlippedCard = true;
         firstCard = this;
        return;
    } 
    secondCard = this;
    verifMatch();
    
}

function verifMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? desacCards() : retournerCards();
    move=move+1;
    document.getElementById("score").innerHTML = move;

}

function desacCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetTab();
}

function retournerCards(){
    bloqTab = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTab();
        },1300);
}

function resetTab(){
    [hasFlippedCard, bloqTab]= [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));