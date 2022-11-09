import styles from "./NewsCard.module.css"
import dayjs from "dayjs"

export const NewsCard = ({ name, date, rating, authorName }) => {
    
    return (
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <p className={styles.date}>{dayjs(date * 1000).format("MMM D, YYYY h:mm A")}</p>
            <p className={styles.rating}>score: {rating}</p>
            <span>, </span>
            <p className={styles.authorName}>author: {authorName}</p>
        </div >
    )
}