export interface FormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface BlogFormData {
    title: string;
    content: string;
    image: File | null;
};

export interface BlogType {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    author: {
        _id: string;
        name: string;
    };
    createdAt?: Date
};