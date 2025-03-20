const themeBtn = document.getElementById('themeBtn')
const quoteDisplay = document.getElementById('quoteDisplay')
const nextBtn = document.getElementById('nextBtn')
const XBtn = document.getElementById('XBtn')
const copyBtn = document.getElementById('copyBtn')
const downloadBtn = document.getElementById('downloadBtn')

const images = [
  "image/1.jpeg",
  "image/3.jpeg",
  "image/4.jpeg",
  "image/5.jpeg",
  "image/6.jpeg",
  "image/7.jpeg",
  "image/8.jpeg",
  "image/9.jpeg",
  "image/11.jpeg",
  "image/12.jpeg",
  "image/13.jpeg",
]

let currentImage = images[0] 

quoteGenerator() // to generate first quote as soon as page load
nextBtn.addEventListener('click', quoteGenerator)
XBtn.addEventListener('click', tweetQuote)
copyBtn.addEventListener('click',copyQuote)
downloadBtn.addEventListener('click',downloadImage)

async function quoteGenerator(){
    const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    const json = await response.json()
    quoteDisplay.innerText= 
    `${json.data.content}
    
     -${json.data.author}
    `
    } catch (error) {
        console.error(error.message);
        quoteDisplay.innerText= `Man is made by his belief. As he believes, so he is
        -Krishna
        `
    }
    backgroundImageChanger()
}

async function copyQuote() {
    const quote = quoteDisplay.innerText
    navigator.clipboard.writeText(quote)
}

function tweetQuote(){
    let shareText = encodeURIComponent(quoteDisplay.innerText)
    window.open("https://twitter.com/intent/tweet?text=" + shareText)

}

function backgroundImageChanger() {
  const imgIndex = Math.floor(Math.random()*images.length)
  currentImage = images[imgIndex]
  
  document.body.style.backgroundImage = `url(${images[imgIndex]})`
  
}


function downloadImage(){
  const a = document.createElement("a");
    a.href = currentImage;
    a.download = "background_image.jpg";  
    document.body.appendChild(a);  
    a.click(); 
    document.body.removeChild(a);  
}


