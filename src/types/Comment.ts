import { User } from "./User"
import { z } from "zod";

export type BlogComment = {
    id: number,
    content: string,
    article: {
        "id": number,
        "title": string
    },
    author: User,
    createdAt: string,
    updatedAt: string
}


// zod schema for form validation

export const BlogCommentSchema = z.object({
    content: z.string().min(1, "Content is required"),
    articleId: z.number().int().positive("Article ID must be a positive integer"),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
}).strict();

// Api result
/*
            "id": 2,
            "content": "Voici le contenu de l'article créé via l'API.",
            "createdAt": "2025-06-04T17:58:41+00:00",
            "updatedAt": "2025-06-04T17:58:41+00:00",
            "author": {
                "id": 1,
                "email": "kennyandriantsirafychan@gmail.com",
                "firstname": "kenny",
                "lastname": "kenny"
            },
            "article": {
                "id": 1,
                "title": "technologia"
            }
*/