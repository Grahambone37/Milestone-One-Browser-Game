function main() {
    /*-----reference for backgroundchanges----
        let topSun = document.querySelector('.top');
        topSun.style.backgroundColor = 'yellow'
        */

    //querySelectors

    let fishZone = document.querySelector('#fishing-zone');
    let btn = document.querySelector('#fish-button')
    let smallHTML = document.querySelector('#small-fish')

    let score = document.querySelector('#score')

    //counts, etc.

    let smallCount = 0
    let mediumCount = 0
    let largeCount = 0

    let clicked = false

    let add = 'add'
    let remove = 'remove'
    let size;

    //miscellaneous functions

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function ready() {
        updateAndReset()
        btn.innerHTML = 'Ready...'
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
        ready()
        clicked = false
        tooSoon(add)
    }

    function timeToFish() {
        go()
        tooSoon(remove)
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
        readyUp()
        await sleep(3000)
        
        timeToFish()
        btn.addEventListener('click', smallClick)
        await sleep(2000)

        ready()
        btn.removeEventListener('click', smallClick)
        await sleep(1500)
    }
    smallFishEncounter()

    //mediumFishEncounter



    //largeFishEncounter



    //function buttonpress = pick 1 of 3(eventually 4) of the fishencounters



    //playbuttonpress---sequence of 10-random-fish, then game ends



}
main()