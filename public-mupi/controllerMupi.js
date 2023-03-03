const NGROK = `${window.location.hostname}`
console.log('Server IP: 127.0.0.1', NGROK)
let socket = io(NGROK, { path: '/real-time' })

const canva = document.getElementById('canva')

//Screens

let inicialScreen = new Image(450, 650)
inicialScreen.src = './assets/inicialScreen.jpg'

let qrScreen = new Image(450, 650)
qrScreen.src = './assets/qrScreen.jpg'

let photoCheckScreen = new Image(450, 650)
photoCheckScreen.src = './assets/photoCheckScreen.jpg'

let fillFormScreen = new Image(450, 650)
fillFormScreen.src = './assets/fillFormScreen.jpg'

let currentMupiScreen = inicialScreen
canva.appendChild(currentMupiScreen)

//Buttones

const clickInStart = document.getElementById('startButton')
const clickInScan = document.getElementById('scanButton')
const clickInContinue = document.getElementById('continueButton')
const clickInRepeat = document.getElementById('repeatButton')
const clickInFilled = document.getElementById('filledButton')
const clickInafterCapture = document.getElementById('afterCapture')

clickInStart.style.display = 'block'
clickInScan.style.display = 'none'
clickInafterCapture.style.display = 'none'
clickInContinue.style.display = 'none'
clickInRepeat.style.display = 'none'
clickInFilled.style.display = 'none'

//Change Screens

function changeScreen() {
    switch (currentMupiScreen) {
      case inicialScreen:
        currentMupiScreen = qrScreen
        clickInStart.style.display = 'none'
        clickInScan.style.display = 'block'
      break
      case qrScreen:
        currentMupiScreen = handleUseCamara()
        clickInScan.style.display = 'none'
        clickInafterCapture.style.display = 'block'
      break
      case handleUseCamara():
        currentMupiScreen = photoCheckScreen
        clickInafterCapture.style.display = 'none'
        clickInContinue.style.display = 'block'
        clickInRepeat.style.display = 'block'
      break
      case photoCheckScreen:
        currentMupiScreen = fillFormScreen
        handleUseCamara().style.display = 'none'
        clickInContinue.style.display = 'none'
        clickInRepeat.style.display = 'none'
        clickInFilled.style.display = 'block'
      break
      case fillFormScreen:
        currentMupiScreen = inicialScreen
        clickInStart.style.display = 'block'
        clickInFilled.style.display = 'none'
      break
    default:
      currentMupiScreen = inicialScreen
  }

  inicialScreen.style.display = 'none'
  qrScreen.style.display = 'none'
  photoCheckScreen.style.display = 'none'
  fillFormScreen.style.display = 'none'
  currentMupiScreen.style.display = 'block'

  canva.appendChild(currentMupiScreen)
}

//events

clickInStart.addEventListener('click', () => {
    console.log('click')
    changeScreen()
})

clickInScan.addEventListener('click', () => {
  console.log('click')
  changeScreen()
})

clickInafterCapture.addEventListener('click', () => {
  console.log('click')
  changeScreen()
})

clickInContinue.addEventListener('click', () => {
  console.log('click')
  changeScreen()
})

clickInFilled.addEventListener('click', () => {
  console.log('click')
  changeScreen()
})

// Todo lo de la cámara

function handleUseCamara() {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvasCamera')
  
  const context = canvas.getContext('2d')

  navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream
    video.play()
  })
  .catch(function(error) {
    console.error('Error al acceder a la cámara', error)
  })

  takeImg()
}

//takke photo

function takeImg() {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvasCamera')
  
  const context = canvas.getContext('2d')

  socket.on('takePhoto', () => {
    const video = document.getElementById('video')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
    const dataUrl = canvas.toDataURL('image/jpeg')
  
    socket.emit('photoData', dataUrl)
  })
}

// Repeat Change Screen

let repeatMupiScreen = photoCheckScreen

function repeatScreen() {
  switch (repeatMupiScreen) {
      case qrScreen:
        repeatMupiScreen = photoCheckScreen
        clickInScan.style.display = 'none'
        clickInContinue.style.display = 'block'
        clickInRepeat.style.display = 'block'
      break
      case photoCheckScreen:
        repeatMupiScreen = qrScreen
        clickInContinue.style.display = 'none'
        clickInRepeat.style.display = 'none'
        clickInScan.style.display = 'block'
      break
    default:

  }

  qrScreen.style.display = 'none'
  photoCheckScreen.style.display = 'none'
  repeatMupiScreen.style.display = 'block'

  canva.appendChild(repeatMupiScreen)
}

clickInRepeat.addEventListener('click', () => {
  console.log('click')
  repeatScreen()
})