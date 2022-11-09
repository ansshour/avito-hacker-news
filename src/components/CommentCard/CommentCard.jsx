import { useDispatch, useSelector } from "react-redux"
import { fetchCommentAnswers } from "../../store/commentsSlice"
import { AnswerCard } from "../AnswerCard/AnswerCard"
import { Loader } from "../Loader/Loader"
import styles from "./CommentCard.module.css"

export const CommentCard = ({ author, text, kids, id }) => {

    const dispatch = useDispatch()
    const { childComments, statusChildComments } = useSelector(store => store.comments)

    return (
        <div className={styles.commentCard}>
            {statusChildComments === "loading" && <Loader />}
            <p className={styles.author}>Author: {author}</p>
            <p dangerouslySetInnerHTML={{ __html: text }} />
            {kids && (
                <div className={styles.openButton} onClick={() => { dispatch(fetchCommentAnswers({ id, kids })) }}>
                    <div className={styles.arrow} />
                    <p>Press for open comments tree</p>
                </div>
            )}
            <div className={styles.answers}>
                {childComments[id] && (
                    childComments[id].map(({ by, text, deleted, id }, i) => !deleted ? <AnswerCard order={i} key={id} authorName={by} text={text} /> : null)
                )}
            </div>
        </div>
    )
}