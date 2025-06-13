import { ApiResponse } from "../types";
import api from "@/lib/api";
import { Article } from "../types/Article";

export const likeArticle = async (articleId: number): Promise<{ article: Article, message: string }> => {
    const response = await api.post<ApiResponse<Article>>(`/article/${articleId}/like`);
    if (response.status !== 200) {
        throw new Error(`Échec du like de l'article: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        article: response.data.data,
        message: response.data.message
    };
};

