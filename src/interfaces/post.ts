export default interface IPost {
    _id: string;
    title: string;
    content: string;
    imgUrl: string;
    createdAt?: string;
    updatedAt?: string;
}