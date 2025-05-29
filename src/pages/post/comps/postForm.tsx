import { useStore } from "zustand";
import Input from "../../../components/UI/Input";
import TextArea from "../../../components/UI/textArea";
import modalStore from "../../../components/modal/store";

import modalStyle from '../../../components/modal/Modal.module.css'
import { useCallback } from "react";
import { Form } from "react-router";

export default function PostForm() {
    const setHidden = useStore(modalStore, (state) => state.setHidden);

    const handleCancel = useCallback(() => {
        setHidden((modalStyle['fading-hidden']))
        setTimeout(() =>
            setHidden(modalStyle['hidden'])
            , 300)
    }, [])

    return (

        <div className="inset-0` flex items-center justify-center">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-800 pb-2">
                    New Post
                </h2>

                <Form method="post" className="space-y-4">
                    {/* Title */}
                    <Input label="TITLE" type="text" placeholder="New Post Title" />

                    {/* Image */}
                    <Input label="IMAGE" type="file" accept="image/*" >
                        <p className="text-sm text-gray-500 mt-1">Please choose an image.</p>
                    </Input>

                    <div className="h-14"></div>
                    {/* Content */}
                    <TextArea label="CONTENT" placeholder="Write your post content here..." rows={4} />

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

