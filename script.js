function main() {
    /*-----reference for backgroundchanges----
    */

    //querySelectors

    let btn = document.querySelector('#fish-button')
    let fishZone = document.querySelector('#fishing-zone')

    let smallHTML = document.querySelector('#small-fish')
    let mediumHTML = document.querySelector('#medium-fish')
    let largeHTML = document.querySelector('#large-fish')

    let score = document.querySelector('#score')

    let sky = document.querySelector('#sky')
    let topSun = document.querySelector('.top')
    let topMidSun = document.querySelector('.top-mid')
    let midSun = document.querySelector('.mid')
    let midBottomSun = document.querySelector('.mid-bottom')
    let bottomSun = document.querySelector('.bottom')

    //counts, variables, etc.

    let smallCount = 0
    let mediumCount = 0
    let largeCount = 0
    let fishSize = 0

    let clicked = false
    let iteration = 0

    btn.innerHTML = 'Ready Up'

    let splashSound = new Audio('./audio/splash-by-blaukreuz-6261.mp3')
    splashSound.volume = 0.5

    //miscellaneous functions

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function go() {
        if (clicked == false) {
            btn.innerHTML = 'Fish!!!'
            fishZone.style.backgroundColor = 'rgb(0, 90, 92)'
        }
    }

    function updateAndReset() {
        score.innerHTML = (smallCount * 8) + (mediumCount * 12) + (largeCount * 20)
        fishZone.style.backgroundColor = 'darkturquoise'
        btn.innerHTML = 'Caught!'
        clicked = true
    }

    function isTooSoon() {
        clicked = true
        btn.innerHTML = 'Too soon...'
    }

    function addClick(func) {
        btn.addEventListener('click', func)
    }

    function removeClick(func) {
        btn.removeEventListener('click', func)
    }

    function readyUp() {
        updateAndReset()
        btn.innerHTML = 'Ready...'
        clicked = false
        addClick(isTooSoon)
    }

    function timeToFish() {
        go()
        removeClick(isTooSoon)
    }

    function splash() {
        splashSound.play()
    }

    function clickSuccess() {
        splash()
        updateAndReset()
    }
    
    //function for background changes as time passes
    
    function sunset(iteration) {
        switch (iteration) {
            case 0:
                sky.style.backgroundColor = 'lightskyblue';
                topSun.style.backgroundColor = 'lightskyblue'
                topMidSun.style.backgroundColor = 'lightskyblue'
                midSun.style.backgroundColor = 'lightskyblue'
                midBottomSun.style.backgroundColor = 'lightskyblue'
                bottomSun.style.backgroundColor = 'lightskyblue'
                break;
                case 1:
                    topSun.style.backgroundColor = 'yellow'
                    break;
                    case 2:
                        topMidSun.style.backgroundColor = 'yellow'
                        break;
                        case 3:
                            midSun.style.backgroundColor = 'yellow'
                            break;
                            case 4:
                                midBottomSun.style.backgroundColor = 'yellow'
                                break;
                                case 5:
                                    bottomSun.style.backgroundColor = 'yellow'
                                    break;
                                    case 6:
                                        topSun.style.backgroundColor = 'lightskyblue'
                break;
                case 7:
                    topMidSun.style.backgroundColor = 'lightskyblue'
                    break;
                    case 8:
                        midSun.style.backgroundColor = 'lightskyblue'
                        break;
                        case 9:
                            sky.style.backgroundColor = 'mediumblue'
                            topSun.style.backgroundColor = 'mediumblue'
                            topMidSun.style.backgroundColor = 'mediumblue'
                            midSun.style.backgroundColor = 'mediumblue'
                            midBottomSun.style.backgroundColor = 'mediumblue'
                            break;
                            case 10:
                                sky.style.backgroundColor = 'midnightblue'
                                topSun.style.backgroundColor = 'midnightblue'
                                topMidSun.style.backgroundColor = 'midnightblue'
                                midSun.style.backgroundColor = 'midnightblue'
                                midBottomSun.style.backgroundColor = 'midnightblue'
                                bottomSun.style.backgroundColor = 'midnightblue'
                                break;
        }
    }
    
    //function smallFishEncounter
    
    function smallClick() {
        if (clicked == false) {
            smallCount += 1
            smallHTML.innerHTML = smallCount
            clickSuccess()
        }
    }
    
    async function smallFishEncounter() {
        
        await sleep(1000)
        
        timeToFish()
        addClick(smallClick)
        await sleep(2000)
        
        readyUp()
        removeClick(smallClick)
        console.log('small')
    }
    
    //mediumFishEncounter
    
    function mediumClick() {
        if (clicked == false) {
            mediumCount += 1
            mediumHTML.innerHTML = mediumCount
            clickSuccess()
        }
    }
    
    async function mediumFishEncounter() {
        
        await sleep(500)
        
        timeToFish()
        addClick(mediumClick)
        await sleep(1000)
        
        readyUp()
        removeClick(mediumClick)
        console.log('medium')
    }
    
    //largeFishEncounter
    
    function largeClick() {
        if (clicked == false) {
            largeCount += 1
            largeHTML.innerHTML = largeCount
            clickSuccess()
        }
    }
    
    async function largeFishEncounter() {
        
        await sleep(3000)
        
        timeToFish()
        addClick(largeClick)
        await sleep(500)
        
        readyUp()
        removeClick(largeClick)
        console.log('large')
    }
    
    //function buttonpress = pick 1 of 3(eventually 4) of the fishencounters
    
    function fishGenerator() {
        return new Promise(function (resolve) {
            fishSize = Math.floor(Math.random() * 3)
            if (fishSize == 0) {
                smallFishEncounter()
            } else if (fishSize == 1) {
                mediumFishEncounter()
            } else if (fishSize == 2) {
                largeFishEncounter()
            }
            sunset(iteration)
            iteration += 1
            console.log(iteration)
            return setTimeout(resolve, 5000)
        })
    }
    
    //playbuttonpress---sequence of 10-random-fish, then game ends
    
    async function play() {
        await sleep(2000)
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        await fishGenerator()
        sunset(iteration)
        btn.innerHTML = 'Fish Another Day?'
        addClick(startGame)
    }
    
    function startGame() {
        removeClick(startGame)
        iteration = 0
        sunset(iteration)
        smallCount = 0
        mediumCount = 0
        largeCount = 0
        smallHTML.innerHTML = smallCount
        mediumHTML.innerHTML = mediumCount
        largeHTML.innerHTML = largeCount
        readyUp()
        play()
    }
    
    function startLoop() {
        removeClick(startLoop)
        btn.innerHTML = 'Start!'
        let ambience = document.createElement('audio')
        ambience.setAttribute('src', './audio/birds-frogs-nature-8257.mp3')
        ambience.volume = 0.1
        //had to make a click happen before this would start
        ambience.play()
        ambience.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false)
        addClick(startGame)
    }
    addClick(startLoop)
}
main()