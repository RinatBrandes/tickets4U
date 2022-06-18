const PAGE_SIZE = 4
const fs = require('fs')
const utilService = require('./util.service')

module.exports = {
    query,
    getById,
    save,
    remove,
    getEmptyTicket,
    getNumOfPages,
    getLabels
}

//filter
function query({ txt = '', pageIdx = 0, title = '', sortBy = 'name', importance = 1, status = 'Running', tries_count = 0 }) {
    let tickets = gTickets
    if (txt) {
        const regex = new RegExp(txt, 'i')
        tickets = tickets.filter(ticket => regex.test(ticket.name) || regex.test(ticket.ctg))
    }

    if (labels?.length > 0) {
        tickets = tickets.filter(ticket => {
            return labels.every(label => {
                return ticket.labels.includes(label);
            });
        })
    }


    if (inStock) {
        tickets = tickets.filter(ticket => {
            return JSON.parse(inStock) === ticket.inStock
        })
    }

    if (sortBy === 'name') {
        tickets = tickets.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })

    } else if (sortBy === 'price') {
        tickets = tickets.sort((a, b) => a.price - b.price)
    } else {
        tickets = tickets.sort((a, b) => b.createdAt - a.createdAt)
    }

    // if (pageIdx !== undefined) {
    //     const startIdx = +pageIdx * PAGE_SIZE
    //     if (startIdx > tickets.length - 1) return Promise.reject()
    //     tickets = tickets.slice(startIdx, startIdx + PAGE_SIZE)
    // }

    return Promise.resolve(tickets)
}

function getLabels() {
    return gLabels
}

function getById(ticketId) {
    const ticket = gTickets.find(ticket => ticket._id === ticketId)
    return Promise.resolve(ticket)
}

function save(ticket) {
    if (ticket._id) {
        const idx = gTickets.findIndex(currTicket => currTicket._id === ticket._id)
        gTickets[idx].name = ticket.name
        gTikets[idx].price = ticket.price
        gTikets[idx].img = ticket.img
        gTikets[idx].inStock = ticket.inStock
        gTikets[idx].labels = ticket.labels
        gTikets[idx].rating = ticket.rating
    } else {
        ticket._id = utilService.makeId()
        gTikets.unshift(ticket)
    }
    return _saveTicketsToFile().then(() => ticket)
}

function remove(ticketId) {
    
    const idx = gTickets.findIndex(currTicket => currTicket._id === ticketId)
    gTickets.splice(idx, 1)
    return _saveTicketsToFile()
}


function getEmptyTicket() {
    return {
        title: '',
        importance: 4,
        status: 'Running',
        tries_count: 0        
    }
}

function getNumOfPages() {
    return gTickets.length / PAGE_SIZE
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function _saveTicketsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/ticket.json', JSON.stringify(gTickets, null, 2), (err) => {
            if (err) {
                console.log(err)
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}
