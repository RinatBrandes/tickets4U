export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    toTimestamp,
    toDate,
    debounce
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


function toTimestamp(date){
    if(!date)return
    date += ' 00:00:01'    
    var datum = Date.parse(date)
    return datum/1000;
 }

 function toDate(timestamp){
    
    let date = new Date(timestamp * 1000)
    let month = (date.getMonth()+1)
    // month = month.padStart(2,'0')
    month = (month < 10 ? '0'+month : month) 
    
    let newDate = (date.getFullYear() + "-" + month + "-" + date.getDate())
    return newDate
 }

 

 function debounce(cb, wait) {
    let timeOut
    return function executeFunc(...args) {
        const after = () => {
            cb(...args)
        }
        clearTimeout(timeOut)
        timeOut = setTimeout(after, wait)
    }
}