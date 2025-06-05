import { z } from "zod";
export type Category = {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
};

// zod schema for form validation

export const CategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
}).strict();

/*
    Api result 
            "id": 1,
            "name": "technologie",
            "description": "technologia"
            "createdAt": "2025-06-04T20:47:32+00:00",
            "updatedAt": null,

*/ 