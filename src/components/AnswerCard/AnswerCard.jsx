import styles from "./AnswerCard.module.css"

export const AnswerCard = ({ authorName, text, order }) => {
    return (
        <div className={styles.answer}>
            <span className={styles.order}>{order + 1}.</span>
            <p className={styles.author}>Author: {authorName}</p>
            <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}