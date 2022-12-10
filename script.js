function main() {
    /*-----reference for backgroundchanges----
    */

    //querySelectors

    let btn = document.querySelector('#fish-button')
    let fishZone = document.querySelector('#five-of-nine')

    let smallHTML = document.querySelector('#small-fish')
    let mediumHTML = document.querySelector('#medium-fish')
    let largeHTML = document.querySelector('#large-fish')

    let score = document.querySelector('#score')
    let tally = document.querySelector('#fish-caught-count')

    let sky = document.querySelector('#sky')
    let topSun = document.querySelector('.top')
    let topMidSun = document.querySelector('.top-mid')
    let midSun = document.querySelector('.mid')
    let midBottomSun = document.querySelector('.mid-bottom')
    let bottomSun = document.querySelector('.bottom')

    let muteAllBtn = document.querySelector('#mute-all')
    let muteSoundBtn = document.querySelector('#mute-sound')
    let muteAmbienceBtn = document.querySelector('#mute-ambience')
    let muteMusicBtn = document.querySelector('#mute-music')

    //counts, variables, etc.

    let smallCount = 0
    let mediumCount = 0
    let largeCount = 0
    let fishSize = 0
    let pondSpot = 4
    let totalCaught = 0

    let clicked = false
    let iteration = 0

    btn.innerHTML = 'Ready Up'

    let splashSound = new Audio('./audio/splash-by-blaukreuz-6261.mp3')
    splashSound.volume = 0.5
    let ambience = new Audio('./audio/birds-frogs-nature-8257.mp3')
    ambience.volume = 0.1
    let music = new Audio('./audio/powerful-beat-121791.mp3')
    music.volume = 0.3
    let soundMuted = false
    let ambienceMuted = false
    let musicMuted = false

    //miscellaneous functions

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function go() {
        if (clicked == false) {
            makeButton()
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
        btn.remove()
        console.log('missed')
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
    
    function clickSuccess() {
        splashSound.play()
        updateAndReset()
        totalCaught += 1;
        tally.innerHTML = totalCaught
        btn.remove()
    }

    function makeButton() {
        btn = document.createElement('button')
        if (fishSize == 0) {
            btn.style.padding = '1em'
        } else if (fishSize == 1) {
            btn.style.padding = '2em'
        } else {
            btn.style.padding = '3em'
        }
        fishZone.append(btn)
    }
    
    //audio shenanigans(mute buttons)
    
    function muteSound() {
        if (soundMuted == false) {
            soundMuted = true;
            splashSound.volume = 0;
            muteSoundBtn.innerHTML = '<del>Sound</del>'
        } else {
            soundMuted = false;
            splashSound.volume = 0.5;
            muteSoundBtn.innerHTML = 'Sound'
        }
        isAllMuted()
    }
    muteSoundBtn.addEventListener('click', muteSound)

    function muteAmbience() {
        if (ambienceMuted == false) {
            ambienceMuted = true;
            ambience.volume = 0;
            muteAmbienceBtn.innerHTML = '<del>Ambience</del>'
        } else {
            ambienceMuted = false;
            ambience.volume = 0.1;
            muteAmbienceBtn.innerHTML = 'Ambience'
        }
        isAllMuted()
    }
    muteAmbienceBtn.addEventListener('click', muteAmbience)

    function muteMusic() {
        if (musicMuted == false) {
            musicMuted = true;
            music.volume = 0;
            muteMusicBtn.innerHTML = '<del>Music</del>'
        } else {
            musicMuted = false;
            music.volume = 0.3;
            muteMusicBtn.innerHTML = 'Music'
        }
        isAllMuted()
    }
    muteMusicBtn.addEventListener('click', muteMusic)

    function muteAll() {
        if (soundMuted == false || ambienceMuted == false || musicMuted == false) {
            soundMuted = false;
            ambienceMuted = false;
            musicMuted = false;
        }
        muteSound();
        muteAmbience();
        muteMusic();
        isAllMuted()
    }
    muteAllBtn.addEventListener('click', muteAll)
    
    function isAllMuted() {
        if (soundMuted == true && ambienceMuted == true && musicMuted == true) {
            muteAllBtn.innerHTML = 'Unmute All'
        } else {
            muteAllBtn.innerHTML = 'Mute All'
        }
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
            default:
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

        btn.remove()
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

        btn.remove()
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

        btn.remove()
        readyUp()
        removeClick(largeClick)
        console.log('large')
    }

    //spot of pond generator

    function fishLocation() {
        pondSpot = Math.floor(Math.random() * 9);
        if (pondSpot == 0) {
            fishZone = document.querySelector('#one-of-nine')
        } else if (pondSpot == 1) {
            fishZone = document.querySelector('#two-of-nine')
        } else if (pondSpot == 2) {
            fishZone = document.querySelector('#three-of-nine')
        } else if (pondSpot == 3) {
            fishZone = document.querySelector('#four-of-nine')
        } else if (pondSpot == 4) {
            fishZone = document.querySelector('#five-of-nine')
        } else if (pondSpot == 5) {
            fishZone = document.querySelector('#six-of-nine')
        } else if (pondSpot == 6) {
            fishZone = document.querySelector('#seven-of-nine')
        } else if (pondSpot == 7) {
            fishZone = document.querySelector('#eight-of-nine')
        } else if (pondSpot == 8) {
            fishZone = document.querySelector('#nine-of-nine')
        }
    }

    //function buttonpress = pick 1 of 3(eventually 4) of the fishencounters

    function fishGenerator() {
        return new Promise(function (resolve) {
            fishLocation();
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
        if (music.paused) {
            music.play()
        } else {
            music.currentTime = 0
        }
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
        fishZone = document.querySelector('#five-of-nine')
        makeButton()
        btn.style.padding = '3px'
        sunset(iteration)
        btn.innerHTML = 'Fish Another Day?'
        addClick(startGame)
    }

    function startGame() {
        removeClick(startGame)
        //setting up create button func
        btn.remove()
        iteration = 0
        sunset(iteration)
        smallCount = 0
        mediumCount = 0
        largeCount = 0
        totalCaught = 0
        smallHTML.innerHTML = smallCount
        mediumHTML.innerHTML = mediumCount
        largeHTML.innerHTML = largeCount
        tally.innerHTML = totalCaught
        readyUp()
        play()
    }

    function startLoop() {
        removeClick(startLoop)
        btn.innerHTML = 'Start!'
        //had to make a click happen before audio could start
        ambience.play()
        ambience.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false)
        addClick(startGame)
    }

    addClick(startLoop)
}
main()