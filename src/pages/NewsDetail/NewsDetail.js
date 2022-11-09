import { Button } from "../../components/Button/Button"
import { Container } from "../../components/Contrainer/Container"
import styles from "./NewsDetail.module.css"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNewsById } from "../../store/newsSlice"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { fetchComments } from "../../store/commentsSlice"
import { CommentCard } from "../../components/CommentCard/CommentCard"
import { Loader } from "../../components/Loader/Loader"

export const NewsDetail = () => {

    const { currentNews, status } = useSelector(store => store.news)
    const { statusComments, comments } = useSelector(store => store.comments)

    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNewsById(id))
        dispatch(fetchComments(id))
    }, [])



    return (
        <Container>
            <div className={styles.top}>
                <Button onClick={() => navigate(-1)}>Back to all news</Button>
            </div>
            <div className={styles.content}>
                {status === "loading" && <Loader />}
                {status === "success" && (
                    <>
                        <div>
                            <p className={styles.title}>{currentNews.title}</p>
                            <a className={styles.link} href={currentNews.url} target="_blank">({currentNews.url})</a>
                            <p className={styles.date}>{dayjs(currentNews.time * 1000).format("MMM D, YYYY h:mm A")}</p>
                            <p className={styles.author}>Author: {currentNews.by}</p>
                        </div>
                        <div className={styles.comments}>
                            <p className={styles.commentsTitle}>Comments <span className={styles.commentsCount}>{currentNews.descendants}</span></p>
                            <div className={styles.btn}><Button onClick={() => { dispatch(fetchComments(id)) }}>Update comments</Button></div>
                            <div className={styles.commentsCards}>
                                {comments.length ? (
                                    comments.map(({ by, text, kids, id, deleted }) => !deleted ? <CommentCard key={id} author={by} text={text} kids={kids} id={id} /> : null)
                                ) : (
                                    <p className={styles.noComments}>The list of comments is empty</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
                {status === "error" && <p>Error</p>}
            </div>
        </Container>
    )
}