import Button from "../../components/UI/Button"
import PostForm from "./comps/postForm"

export default function PostPage() {
    return (
        <div className="flex flex-col items-center justify-center my-2">

            <PostForm />
            <Button>NEW POST</Button>

        </div>
    )

}