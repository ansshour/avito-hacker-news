import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/Button/Button"
import { Container } from "../../components/Contrainer/Container"
import { NewsCard } from "../../components/NewsCard/NewsCard"
import styles from "./News.module.css"
import { Link } from "react-router-dom"
import { fetchNews, updateNews } from "../../store/newsSlice"
import { Loader } from "../../components/Loader/Loader"
import { NewsSkeleton } from "../../components/Skeletons/NewsSkeleton"

export const News = () => {

    const { news, status } = useSelector(store => {
        return store.news
    })
    const dispatch = useDispatch()

    const updateNewsForTime = () => {
        setInterval(() => { dispatch(updateNews()) }, 60000)
    }

    useEffect(() => {
        dispatch(fetchNews())
        updateNewsForTime()
    }, [])

    return (
        <Container>
            <div className={styles.top}>
                <Button onClick={() => { dispatch(updateNews()) }}>Update news</Button>
            </div>
            <div className={styles.news}>
                {status === "loading" && (
                    [...new Array(20)].map((_, i) => <NewsSkeleton key={i} />)
                )}
                {status === "success" && news.map(({ id, title, score, by, time }) => <Link to={`/news/${id}`} key={id}><NewsCard id={id} name={title} rating={score} authorName={by} date={time} /></Link>)}
                {status === "error" && <p>Error</p>}
            </div>
        </Container>
    )
}