
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        console.log('toyId:', toyId)
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Name : {toy.name}</h1>
            <h3>Price: ${toy.price}</h3>
            <h5>In stock : {toy.inStock ? 'yes' : 'no'}</h5>
            <small>Created At: {toy.createdAt}</small>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            {/* <p>
                <Link to="/toy/lqIQG">Next Car</Link>
            </p> */}
        </section>
    )
}