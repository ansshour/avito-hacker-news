import { Container } from "../Contrainer/Container"
import styles from "./Header.module.css"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className={styles.container}>
            <Container>
                <Link to={"/"}><span>Hacker News</span></Link>
            </Container>
        </header>
    )
}