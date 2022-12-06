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

    //counts, etc.

    let smallCount = 0
    let mediumCount = 0
    let largeCount = 0
    let fishSize = 0

    let clicked = false
    let iteration = 0

    let add = 'add'
    let remove = 'remove'

    btn.innerHTML = 'Start'

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

    function tooSoon(addOrRemove) {
        if (addOrRemove == 'add') {
            btn.addEventListener('click', isTooSoon)
        } else if (addOrRemove == 'remove') {
            btn.removeEventListener('click', isTooSoon)
        }
    }

    function readyUp() {
        updateAndReset()
        btn.innerHTML = 'Ready...'
        clicked = false
        tooSoon(add)
    }

    function timeToFish() {
        go()
        tooSoon(remove)
    }

    function sunset(iteration) {
        switch (iteration) {
            case 0:
                sky.style.backgroundColor = 'lightskyblue';
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
            updateAndReset()
        }
    }

    async function smallFishEncounter() {

        await sleep(1000)

        timeToFish()
        btn.addEventListener('click', smallClick)
        await sleep(2000)

        readyUp()
        btn.removeEventListener('click', smallClick)
        console.log('small')
    }

    //mediumFishEncounter

    function mediumClick() {
        if (clicked == false) {
            mediumCount += 1
            mediumHTML.innerHTML = mediumCount
            updateAndReset()
        }
    }

    async function mediumFishEncounter() {

        await sleep(500)

        timeToFish()
        btn.addEventListener('click', mediumClick)
        await sleep(1000)

        readyUp()
        btn.removeEventListener('click', mediumClick)
        console.log('medium')
    }

    //largeFishEncounter

    function largeClick() {
        if (clicked == false) {
            largeCount += 1
            largeHTML.innerHTML = largeCount
            updateAndReset()
        }
    }

    async function largeFishEncounter() {

        await sleep(3000)

        timeToFish()
        btn.addEventListener('click', largeClick)
        await sleep(500)

        readyUp()
        btn.removeEventListener('click', largeClick)
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
    }

    function startGame() {
        iteration = 0
        readyUp()
        play()
    }
    startGame()
}
main()