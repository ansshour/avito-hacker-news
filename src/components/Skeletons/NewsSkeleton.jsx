import ContentLoader from "react-content-loader"

export const NewsSkeleton = (props) => (
    <ContentLoader
        style={{ width: "100%", height: "100%" }}
        speed={2}
        width={400}
        height={200}
        viewBox="0 0 400 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="7" ry="7" width="100%" height="100%" />
    </ContentLoader>
);