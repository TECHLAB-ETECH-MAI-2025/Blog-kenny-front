import { ApiResponse, PaginationMeta } from "../types";
import { Article } from "../types/Article"
import api from "@/lib/api"

export const getAllArticles = async (): Promise<Article[]> => {
    const response = await api.get<ApiResponse<Article[]>>(`/article?all=true`);
    if (response.status !== 200) {
        throw new Error(`Échec du chargement des articles: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return response.data.data;
};

export const getArticles = async (page: number = 1): Promise<{ articles: Article[]; meta: PaginationMeta }> => {
    const response = await api.get<ApiResponse<Article[]>>(`/article?page=${page}`);
    if (response.status !== 200) {
        throw new Error(`Échec du chargement des articles: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        articles: response.data.data,
        meta: response.data.meta
    };
};

export const getArticleById = async (id: number): Promise<Article> => {
    const response = await api.get<ApiResponse<Article>>(`/article/${id}`);
    if (response.status !== 200) {
        throw new Error(`Échec du chargement de l'article avec l'ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return response.data.data;
};

export const createArticle = async (data: { title: string; content: string; categories: number[] }): Promise<{ article: Article; message: string }> => {
    const response = await api.post<ApiResponse<Article>>(`/article/new`, data);
    if (response.status !== 200) {
        throw new Error(`Échec de la création de l'article: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        article: response.data.data,
        message: response.data.message
    };
};

export const updateArticle = async (id: number, data: { title: string; content: string; categories: number[] }): Promise<{ article: Article; message: string }> => {
    const response = await api.put<ApiResponse<Article>>(`/article/${id}`, data);
    return {
        article: response.data.data,
        message: response.data.message
    };
};

export const deleteArticle = async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<ApiResponse<null>>(`/article/${id}`);
    if (response.status !== 200) {
        throw new Error(`Échec de la suppression de l'article avec l'ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        message: response.data.message
    };
};