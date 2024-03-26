import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyList } from "../cmps/ToyList.jsx"


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
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

    return (
        <div>
            <h3>Toy App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                {!isLoading
                    ? <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy}
                    /> : <div>Loading...</div>}
                <hr />
            </main>
        </div>
    )               
}