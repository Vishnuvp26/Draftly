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

export interface CreateBlogPayload {
    title: string;
    content: string;
    image: File;
    userId: string;
};

export interface UpdateBlogPayload {
    id: string;
    title: string;
    content: string;
    image?: File;
    userId: string;
};

export   interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export   interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
};