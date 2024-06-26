import { utilService } from '../services/util.service.js'
import {httpService} from '../services/http.service.js'

const BASE_URL = 'toy/'
// const BASE_URL = 'car/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilterBy,
    getLabels,
    getEmptyToy,
    getDefaultSort
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sort) {
    return httpService.get(BASE_URL, filterBy)
}

function getLabels() {
    return [...labels]
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: 'true'
    }
}

function getDefaultFilterBy() {
    return {
        txt: '',
        maxPrice: Infinity,
        labels: [],
        inStock: null
    }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}

// storageService.post(STORAGE_KEY, toy)