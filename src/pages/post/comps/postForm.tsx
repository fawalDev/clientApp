import type IPost from "../../../interfaces/post";


import { useStore } from "zustand";
import { useCallback, useEffect, useState } from "react";
import { Form, useActionData } from "react-router";

import Input from "../../../components/UI/Input";
import TextArea from "../../../components/UI/textArea";
import modalStore from "../../../components/modal/store";

import postStore from "../store";
import getDefer from "../../../ultilities/fetcher/getDefer";
import ServerUrl from "../../../ultilities/serverUrl";
import type ErrorRes from "../../../models/errorResponse";
import type IPostError from "../../../interfaces/response/error/postError";
import ErrorMsg from "../../../components/UI/ErrorMsg";


type props = {
    isEdit?: boolean;
}


//* PostForm is used for both creating and editing posts.
export default function PostForm({ isEdit = false }: props) {
    const hideModal = useStore(modalStore, (state) => state.hide);
    const actionData: ErrorRes<IPostError> | undefined = useActionData()


    let title: any = useStore(postStore, state => state.post.title)
    let setTitle: any = useStore(postStore, state => state.setTitle)

    let content: any = useStore(postStore, state => state.post.content)
    let setContent: any = useStore(postStore, state => state.setContent)



    /*
     if `edit`, ignore all state above & fetch post detail to pre-population    */
    if (isEdit) {
        title = undefined; setTitle = () => undefined; content = undefined; setContent = () => undefined;
    }

    const [defTitle, setDefTitle] = useState('')
    const [defContent, setDefContent] = useState('');

    const postId = useStore(postStore, state => state.edit.postId)

    /*
     fetch post detail to pre-population    */
    useEffect(() => {
        getDefer<IPost>(ServerUrl.post + '/' + postId, 'includeToken')
            .then(post => {
                setDefTitle(post?.title || '')
                setDefContent(post?.content || '')
            })
    }, [postId])

    const handleCancel = useCallback(() => {
        hideModal()
    }, [hideModal])

    return (

        <div className="inset-0` flex items-center justify-center">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">
                    {isEdit ? "EDIT POST" : "NEW POST"}
                </h2>

                <Form method={isEdit ? 'put' : 'post'} encType="multipart/form-data" className="space-y-4">
                    {/* Title */}
                    <Input label="TITLE" type="text" name="title" placeholder="New Post Title"
                        value={title} onChange={e => setTitle(e.target.value)}
                        defaultValue={defTitle}
                    >
                        {actionData?.cause?.title && <ErrorMsg msg={actionData?.cause.title} />}
                    </Input>

                    {/* Image */}
                    <Input label="IMAGE" type="file" name="image" accept="image/*" >
                        <p className="text-sm text-gray-500 mt-1">Please choose an image.</p>
                        {actionData?.cause?.image && <ErrorMsg msg={actionData?.cause.image} />}
                    </Input>

                    <div className="h-14"></div>
                    {/* Content */}
                    <TextArea label="CONTENT" name="content" placeholder="Write your post content here..." rows={4}
                        value={content} onChange={e => setContent(e.target.value)}
                        defaultValue={defContent}
                    >
                        {actionData?.cause?.content && <ErrorMsg msg={actionData?.cause.content} />}
                    </TextArea>

                    {isEdit && <input type="hidden" name="id" value={postId} />}

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" className="text-red-600 font-semibold hover:underline"
                            onClick={handleCancel}>
                            CANCEL
                        </button>
                        <button type="submit" className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900"                        >
                            ACCEPT
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

