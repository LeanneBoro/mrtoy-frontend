import { Link, NavLink } from 'react-router-dom'

export function HomePage() {
    return (
        <section>
            <h1>Home!</h1>
            <NavLink to={'/toy'}>
                <button>Toys</button>
            </NavLink>
        </section>
    )
}