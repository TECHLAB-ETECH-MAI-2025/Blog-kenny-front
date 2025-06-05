import { BlogComment } from "../types/Comment";
import { ApiResponse, PaginationMeta } from "../types";
import api from "@/lib/api";

export const getComments = async (page: number = 1): Promise<{ comments: BlogComment[]; meta: PaginationMeta }> => {
    const response = await api.get<ApiResponse<BlogComment[]>>(`/comment?page=${page}`);
    if (response.status !== 200) {
        throw new Error(`Échec du chargement des commentaires: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        comments: response.data.data,
        meta: response.data.meta
    };
};

export const getCommentById = async (id: number): Promise<BlogComment> => {
    const response = await api.get<ApiResponse<BlogComment>>(`/comment/${id}`);
    if (response.status !== 200) {
        throw new Error(`Échec du chargement du commentaire avec l'ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return response.data.data;
};

export const createComment = async (content: string, articleId: number): Promise<{ comment: BlogComment; message: string }> => {
    const response = await api.post<ApiResponse<BlogComment>>(`/comment/new`, {
        content,
        articleId
    });
    return {
        comment: response.data.data,
        message: response.data.message
    };
};

export const updateComment = async (id: number, content: string, articleId: number): Promise<{ comment: BlogComment; message: string }> => {
    const response = await api.put<ApiResponse<BlogComment>>(`/comment/${id}`, {
        content,
        articleId
    });
    return {
        comment: response.data.data,
        message: response.data.message
    };
};

export const deleteComment = async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<ApiResponse<null>>(`/comment/${id}`);
    if (response.status !== 200) {
        throw new Error(`Échec de la suppression du commentaire avec l'ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        message: response.data.message
    };
};
