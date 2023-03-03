const NGROK = `${window.location.hostname}`
console.log('Server IP: 127.0.0.1', NGROK)
let socket = io(NGROK, { path: '/real-time' })

const canva = document.getElementById('canva')

//Screens

let controllerScreen = new Image(310, 650)
controllerScreen.src = './assets/controllerScreen.jpg'

let formScreen = new Image(310, 650)
formScreen.src = './assets/formScreen.jpg'

let currentUserScreen = controllerScreen
canva.appendChild(currentUserScreen)

//Portadas Canciones

const portadaFeid1 = document.getElementById('Image1')
const portadaFeid2 = document.getElementById('Image2')
const portadaBadBunny = document.getElementById('Image3')
const portadaRebelde1 = document.getElementById('Image4')
const portadaRebelde2 = document.getElementById('Image4')

let currentPortadaSong = portadaFeid1
canva.appendChild(currentPortadaSong)

portadaFeid1.style.display = 'none'
portadaFeid2.style.display = 'none'
portadaBadBunny.style.display = 'none'
portadaRebelde1.style.display = 'none'
portadaRebelde2.style.display = 'none'
currentPortadaSong.style.display = 'block'

//Buttones

const clickNextSong = document.getElementById('nextSong')
clickNextSong.addEventListener('click', () => {
    console.log('click')
    changeNextPortada()
})

function changeNextPortada() {
    switch (currentPortadaSong) {
        case portadaFeid1:
            currentPortadaSong = portadaFeid2
        break
        case portadaFeid2:
            currentPortadaSong = portadaBadBunny
        break
        case portadaBadBunny:
            currentPortadaSong = portadaRebelde1
        break
        case portadaRebelde1:
            currentPortadaSong = portadaRebelde2
        break
        case portadaRebelde2:
            currentPortadaSong = portadaFeid1
        break
        default:
        currentPortadaSong = portadaFeid1
    }

    portadaFeid1.style.display = 'none'
    portadaFeid2.style.display = 'none'
    portadaBadBunny.style.display = 'none'
    portadaRebelde1.style.display = 'none'
    portadaRebelde2.style.display = 'none'
    currentPortadaSong.style.display = 'block'

    canva.appendChild(currentPortadaSong)
}

const clickPreviousSong = document.getElementById('previousSong')
clickPreviousSong.addEventListener('click', () => {
    console.log('click')
    changePreviousPortada()
})

portadaFeid1.style.display = 'none'
portadaFeid2.style.display = 'none'
portadaBadBunny.style.display = 'none'
portadaRebelde1.style.display = 'none'
portadaRebelde2.style.display = 'none'
currentPortadaSong.style.display = 'block'

function changePreviousPortada() {
    switch (currentPortadaSong) {
        case portadaRebelde2:
            currentPortadaSong = portadaRebelde1
        break
        case portadaRebelde1:
            currentPortadaSong = portadaBadBunny
        break
        case portadaBadBunny:
            currentPortadaSong = portadaFeid2
        break
        case portadaFeid2:
            currentPortadaSong = portadaFeid1
        break
        case portadaFeid1:
            currentPortadaSong = portadaRebelde2
        break
        default:
        currentPortadaSong = portadaRebelde2
    }

    portadaFeid1.style.display = 'none'
    portadaFeid2.style.display = 'none'
    portadaBadBunny.style.display = 'none'
    portadaRebelde1.style.display = 'none'
    portadaRebelde2.style.display = 'none'
    currentPortadaSong.style.display = 'block'

    canva.appendChild(currentPortadaSong)
}

// El botón de tomar foto

const captureButton = document.getElementById('captureButton')
captureButton.addEventListener('click', function() {
    socket.emit('clickCapture')
})

const clickInafterCapture = document.getElementById('afterCapture')