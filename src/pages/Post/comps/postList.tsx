type props = {
    postList: []
}

export default function PostList({ postList }: props) {
    return (
        <div className="flex flex-col gap-3  mt-8">
            {postList.map((post: any) => (
                <span key={post.id}>
                    { post.content}
                </span>
            ))}
        </div>
    )

}