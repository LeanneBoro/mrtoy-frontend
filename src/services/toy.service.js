import { storageService } from '../services/async-storage.service.js'
import { utilService } from '../services/util.service.js'

// const BASE_URL = 'car/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY,toyId)
}
function remove(toyId) {
    return storageService.remove(STORAGE_KEY,toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy = _createToy(toy.name,toy.price)
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: 'all', label: '' }
}

function getEmptyToy() {
    return {name : '', price : 0 , createdAt: Date.now(), inStock : true}
}


const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}

function _createToy(name, price) {
    const note = getEmptyToy()
    note.id = utilService.makeId()
    note.name = name
    note.price = price
    return note
}

// storageService.post(STORAGE_KEY, toy)