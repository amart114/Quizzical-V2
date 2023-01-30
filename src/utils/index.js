

function shuffleArray(arr) {
    return arr.sort(() => (Math.random() > .5) ? 1 : -1)
}

function decodeHtml(html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
} 



export {shuffleArray, decodeHtml,}