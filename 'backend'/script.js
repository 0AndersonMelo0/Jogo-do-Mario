var perdeu = 0;
var ponto = 0;
const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const nuvem = document.querySelector('.nuvem');
const nuvem2 = document.querySelector('.nuvem2');
const gameOver = document.querySelector('.game-over');
const button = document.querySelector('.button');
const pontos = document.querySelector(".pontos");
pontos.innerHTML = `0`;

function Verifcperdeu(){
    const loop = setInterval(()=>{

        const positionTubo = tubo.offsetLeft;
        const positionMario = +window.getComputedStyle(mario).bottom.replace('px','');
        const positionNuvem1 = nuvem.offsetLeft;
        const positionNuvem2 = nuvem2.offsetLeft;

        if(positionTubo <= 70 && positionTubo > 0 && positionMario <= 49){
            perdeu = 1;


            mario.src = 'imagens/perdeu.png';
            mario.style.width = `75px`;
            mario.style.left = "16px";

            tubo.classList.remove('aniTubo');
            tubo.style.left = `${positionTubo}px`

            mario.style.animation = 'none';
            mario.style.bottom = `${positionMario}px`;

            nuvem.style.animation = 'none';
            nuvem.style.left = `${positionNuvem1}px`;
            nuvem2.style.animation = 'none';
            nuvem2.style.left = `${positionNuvem2}px`;

            gameOver.classList.add('fim-do-jogo');
            setTimeout(()=>{

                button.removeAttribute("disabled");
                gameOver.classList.remove('fim-do-jogo');
                gameOver.style.opacity = "1";

            },1000)

            clearInterval(loop)
            
        }

    },10);
}

function contPontos(){
    function TubPont(){
        const pont = setInterval(()=>{
            if(perdeu==0){
                ponto+=1
                pontos.innerHTML = `${ponto}`;
            }
            else if(perdeu==1){
                clearInterval(pont)
            }
            if(ponto==10){
                tubo.style.right = "90000px";
                tubo.classList.remove('aniTubo');
                tubo.style.bottom = "0px";
                tubo.src = "imagens/bala.png";
                tubo.classList.add('aniBala');
                clearInterval(pont)
            }

            },1500)
        }

    function TubPont2(){
        const pont2 = setInterval(()=>{
            if(ponto>=10){
                if(perdeu==0){
                    ponto+=1
                    pontos.innerHTML = `${ponto}`;
                }
                else if(perdeu==1){
                    clearInterval(pont2)
                }
            }},800)
            }

    TubPont()
    setTimeout(TubPont2,1500*10)
}

contPontos()

Verifcperdeu()

function jump(){
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 600);

    if(perdeu == 0){
            mario.src = 'imagens/mario-pulano.gif';
            mario.style.width = `195px`;

        setTimeout(() => {
            if (perdeu == 0){
                mario.src = 'imagens/mario-correndo.gif';
                mario.style.width = `100px`;
            }
        }
        ,650);
    }
}

function reset(){
    tubo.classList.remove('aniBala');
    tubo.style.bottom = "0px";
    tubo.src = "imagens/tubo.png";
    tubo.style.bottom = "-16px";
    tubo.classList.add('aniTubo');

    perdeu = 0;
    button.disabled = true;

    pontos.innerHTML = `0`;
    ponto=0;

    mario.style.removeProperty("animation");
    mario.src = 'imagens/mario-correndo.gif';
    mario.style.width = `100px`;
    mario.style.bottom = '0';
    mario.style.removeProperty("left")

    tubo.style.right = "-900px";
    tubo.style.removeProperty("left")
    tubo.classList.add('aniTubo');

    nuvem.style.removeProperty("animation");
    nuvem.style.removeProperty("left");
    nuvem2.style.removeProperty("animation");
    nuvem2.style.removeProperty("left");

    contPontos()

    gameOver.classList.add('restart');
    setTimeout(()=>{

        gameOver.classList.remove('restart');
        gameOver.style.opacity = "0";

        },1000)

    Verifcperdeu()



}

document.addEventListener('keydown', jump);
