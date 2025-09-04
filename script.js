function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh();
window.addEventListener('resize', setVh);


const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const frase = document.getElementById("frase");
const title = document.getElementById("title");
const langSelect = document.getElementById("lang");
const restartBtn = document.getElementById("restart"); 

const textos = {  
  pt: {
    title: "Jesus",
    btn1: "Quem é Jesus?",
    btn2: "Prosseguir",
    frases: [
      "Para o cego, Jesus é a Luz.",
      "Para o faminto, Jesus é o pão.",
      "Para o sedento, Jesus é a água da vida.",
      "Para o enfermo, Jesus é a cura.",
      "Para o morto, Jesus é a vida.",
      "Para o prisioneiro, Jesus é a liberdade.",
      "Para o solitário, Jesus é o amigo.",
      "Para o viajante, Jesus é o caminho.",
      "Para o sábio, Jesus é sabedoria.",
      "Para a medicina, Jesus é o médico dos médicos.",
      "Para o réu, Jesus é o advogado.",
      "Para o advogado, Jesus é o juiz.",
      "Para o juiz, Jesus é a justiça.",
      "Para o cansado, Jesus é o alívio.",
      "Para o mentiroso, Jesus é a verdade.",
      "Para o perdido, Jesus é o salvador.",
      "Jesus é o caminho",
      "a verdade",
      "e a vida",
      "E para mim...",
      "Jesus é tudo."
    ]
  },
  en: {
    title: "Jesus",
    btn1: "Who is Jesus?",
    btn2: "Next",
    frases: [
      "For the blind, Jesus is the Light.",
      "For the hungry, Jesus is the bread.",
      "For the thirsty, Jesus is the living water.",
      "For the sick, Jesus is the cure.",
      "For the dead, Jesus is life.",
      "For the prisoner, Jesus is freedom.",
      "For the lonely, Jesus is the friend.",
      "For the traveler, Jesus is the way.",
      "For the wise, Jesus is wisdom.",
      "For medicine, Jesus is the physician of physicians.",
      "For the accused, Jesus is the lawyer.",
      "For the lawyer, Jesus is the judge.",
      "For the judge, Jesus is justice.",
      "For the weary, Jesus is relief.",
      "For the liar, Jesus is the truth.",
      "For the lost, Jesus is the savior.",
      "Jesus is the way",
      "the truth",
      "and the life",
      "And for me...",
      "Jesus is everything."
    ]
  },
  es: {
    title: "Jesús",
    btn1: "¿Quién es Jesús?",
    btn2: "Siguiente",
    frases: [
      "Para el ciego, Jesús es la Luz.",
      "Para el hambriento, Jesús es el pan.",
      "Para el sediento, Jesús es el agua de vida.",
      "Para el enfermo, Jesús es la cura.",
      "Para el muerto, Jesús es la vida.",
      "Para el prisionero, Jesús es la libertad.",
      "Para el solitario, Jesús es el amigo.",
      "Para el viajero, Jesús es el camino.",
      "Para el sabio, Jesús es la sabiduría.",
      "Para la medicina, Jesús es el médico de los médicos.",
      "Para el reo, Jesús es el abogado.",
      "Para el abogado, Jesús es el juez.",
      "Para el juez, Jesús es la justicia.",
      "Para el cansado, Jesús es el alivio.",
      "Para el mentiroso, Jesús es la verdad.",
      "Para el perdido, Jesús es el salvador.",
      "Jesús es el camino",
      "la verdad",
      "y la vida",
      "Y para mí...",
      "Jesús lo es todo."
    ]
  }
};

let lang = "pt";
let index = 0;
let typingTimeout;

function typeWriter(text, element, callback) {
  clearTimeout(typingTimeout);
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      typingTimeout = setTimeout(typing, 40);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

function atualizarIdioma() {
  const t = textos[lang];
  title.textContent = t.title;
  btn1.textContent = t.btn1;
  btn2.textContent = t.btn2;
  frase.textContent = "";

  title.style.display = "";
  btn1.style.display = "";
  btn2.style.display = "";
  frase.classList.remove("final-message");

  btn1.disabled = false;
  btn2.disabled = false;
  btn2.classList.add("hidden");
  restartBtn.classList.add("hidden"); 

  index = 0;
}

btn1.addEventListener("click", () => {
  typeWriter(textos[lang].frases[index], frase);
  btn2.classList.remove("hidden");
  btn1.disabled = true;
});

btn2.addEventListener("click", () => {
  index++;
  const frases = textos[lang].frases;
  if (index < frases.length) {
    const currentFrase = frases[index];
    if (/E para mim|And for me|Y para mí/.test(currentFrase)) {
      typeWriter(currentFrase, frase);
    } else if (/Jesus é tudo|Jesus is everything|Jesús lo es todo/.test(currentFrase)) {
      title.style.display = "none";
      btn1.style.display = "none";
      btn2.style.display = "none";
      frase.classList.add("final-message");
      typeWriter(currentFrase, frase, () => {
        restartBtn.classList.remove("hidden"); 
      });
    } else {
      typeWriter(currentFrase, frase);
    }
  }
  if (index === frases.length - 1) {
    btn2.disabled = true;
  }
});

restartBtn.addEventListener("click", () => {
  title.style.display = "";
  btn1.style.display = "";
  btn2.style.display = "";
  frase.classList.remove("final-message");
  restartBtn.classList.add("hidden");
  index = 0;
  atualizarIdioma();
});

langSelect.addEventListener("change", (e) => {
  lang = e.target.value;
  atualizarIdioma();
});

const userLang = navigator.language.slice(0,2);
if (textos[userLang]) {
  lang = userLang;
  langSelect.value = userLang;
}
atualizarIdioma();
