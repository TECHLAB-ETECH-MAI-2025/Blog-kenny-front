export type User = {
    firstName: string,
    lastName: string,
    email: string,
    roles: JSON,
    createdAt: string
};

export type Category = {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
};

export type BlogComment = {
    id: number,
    content: string,
    articleId: number,
    author: User,
    createdAt: string,
    updatedAt: string
}

export type Article = {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    author: User,
    categories: Category[],
    comments: BlogComment[]
};

export type Like = {
    id: number,
    articleId: number,
    authorId: number
}

//// global


export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    code: number;
    data: T;
    meta: PaginationMeta;
}