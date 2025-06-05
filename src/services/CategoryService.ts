import { Category } from "../types/Category";
import { ApiResponse, PaginationMeta, } from "../types";
import api from "@/lib/api";



export const getCategories = async (page: number = 1): Promise<{ categories: Category[]; meta: PaginationMeta }> => {
    const response = await api.get<ApiResponse<Category[]>>(`/category?page=${page}`);
    if (response.status !== 200) {
        throw new Error(`Failed to fetch categories: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        categories: response.data.data,
        meta: response.data.meta
    };
};

export const getCategoryById = async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/category/${id}`);
    if (response.status !== 200) {
        throw new Error(`Failed to fetch category with ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return response.data.data;
};


export const createCategory = async (category: Category): Promise<{ category: Category; message: string }> => {
    const response = await api.post<ApiResponse<Category>>(`/category/new`, {
        name: category.name,
        description: category.description
    });
    /*if (response.status) {
        throw new Error(`Failed to create category: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }*/
    return {
        category: response.data.data,
        message: response.data.message
    };

}

export const updateCategory = async (id: number, category: Category): Promise<{ category: Category; message: string }> => {
    const response = await api.put<ApiResponse<Category>>(`/category/${id}`, {
        name: category.name,
        description: category.description
    });
    /*if (response.status !== 200) {
        throw new Error(`Failed to update category with ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }*/
    return {
        category: response.data.data,
        message: response.data.message
    };
};

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<ApiResponse<null>>(`/category/${id}`);
    if (response.status !== 200) {
        throw new Error(`Failed to delete category with ID ${id}: ${response.statusText}\n`
            + `API error: ${response.data.message}`);
    }
    return {
        message: response.data.message
    };
};