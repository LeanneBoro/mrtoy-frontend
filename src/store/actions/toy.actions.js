import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY ,SET_SORTBY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const filterBy = store.getState().toyModule.filterBy
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (error) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toyToSave) {
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}
export function setFilterBy(filterBy) {
    console.log(filterBy)
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORTBY, sortBy })
}
