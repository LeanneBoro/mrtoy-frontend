import { Link, NavLink } from 'react-router-dom'



export function HomePage() {
    return (
        <section>
            <h1>Home page</h1>
            <img src='../assets/img/Realistic-colorful-confetti-on-transparent-background-PNG.png'></img>
            <NavLink to={'/toy'}>
                <button>Toys</button>
            </NavLink>
        </section>
    )
}