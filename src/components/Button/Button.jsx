import styles from "./Button.module.css"

export const Button = ({ children, className, ...attr }) => {
    return (
        <button className={[styles.button, className].join(" ")} {...attr}>
            {children}
        </button>
    )
}