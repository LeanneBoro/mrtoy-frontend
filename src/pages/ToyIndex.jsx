import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'

import { ToyList } from "../cmps/ToyList.jsx"
import {ToyFilter} from "../cmps/ToyFilter.jsx"
import { ToySort } from '../cmps/ToySort.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'

export function ToyIndex() {

    // const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys!')
                console.log(toys)
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        console.log(filterBy)
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                console.log('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                console.log(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy')
            })
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    return (
        <div>
            <h3>Toy App</h3>
            <LoginSignup/>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                { <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} /> }
                {<ToySort sortBy={sortBy} onSetSort={onSetSort} />}
                {!isLoading
                    ? <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy}
                    /> : <div>Loading...</div>}
                <hr />
            </main>
        </div>
    )               
}