import { ApiResponse } from "../types";
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