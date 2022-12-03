function main() {
    /*-----reference for backgroundchanges----
        let topSun = document.querySelector('.top');
        topSun.style.backgroundColor = 'yellow'
        let fishZone = document.querySelector('#fishing-zone');
        fishZone.style.backgroundColor = 'rgb(0, 90, 92)'
    */

    //querySelectors

    let btn = document.querySelector('#fish-button')
    let smallHTML = document.querySelector('#small-fish')

    //counts, etc.

    let smallCount = 0

    let clicked = false

    //miscellaneous functions

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function ready() {
        btn.innerHTML = 'Ready...'
    }

    function go() {
        btn.innerHTML = 'Fish!!!'
    }

    function tooSoon() {
        clicked = true
    }

    //function smallFishEncounter
    function smallClick() {
        if (clicked == false) {
            smallCount += 1
            smallHTML.innerHTML = smallCount
            clicked = true
            return
        }
    }
    async function smallFishEncounter() {
        ready()
        clicked = false
        btn.addEventListener('click', tooSoon)
        await sleep(3000)

        go()
        btn.removeEventListener('click', tooSoon)
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