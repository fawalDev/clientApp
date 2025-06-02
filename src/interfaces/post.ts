type Creator = {
    _id?: string
    name?: string
    email?: string
}

export default interface IPost {
    _id?: string;
    title?: string;
    content?: string;
    imgUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    creator?: Creator
}