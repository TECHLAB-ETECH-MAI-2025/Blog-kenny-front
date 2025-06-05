import { Category } from "./Category";
import { BlogComment } from "./Comment";
import { User } from "./User";
import { z } from "zod";

type Like = {
    id: number,
    articleId: number,
    authorId: number
}

export type Article = {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    author: User,
    categories: Category[],
    comments: BlogComment[],
    likes: Like[],
};

export const ArticleSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    content: z.string().min(1, "Le contenu est requis"),
    categories: z.array(z.number().int().positive("Les IDs de catégories doivent être des nombres positifs")),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
}).strict();

/*
    api response structure:
        "id": 4,
            "title": "Nouveau titre d'article kenny",
            "content": "Voici le contenu de l'article créé via l'API.",
            "createdAt": "2025-06-04T17:50:27+00:00",
            "updatedAt": "2025-06-04T17:53:14+00:00",
            "categories": [],
            "comments": [],
            "likes": [],
            "authorId": null,
            "updatedById": null
*/