"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BlogCommentSchema } from "@/src/types/Comment"
import { createComment } from "@/src/services/CommentService"
import { getAllArticles } from "@/src/services/ArticleService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormField from "@/components/form/form-field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Article } from "@/src/types/Article"

export default function CreateCommentPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [articles, setArticles] = useState<Article[]>([])
    const [selectedArticleId, setSelectedArticleId] = useState<string>("")

    const form = useForm<z.infer<typeof BlogCommentSchema>>({
        resolver: zodResolver(BlogCommentSchema),
        defaultValues: {
            content: "",
            articleId: 0,
        },
    })

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articlesData = await getAllArticles()
                setArticles(articlesData)
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error)
                toast.error("Erreur lors de la récupération des articles")
            }
        }
        loadArticles()
    }, [])

    const onSubmit = async (values: z.infer<typeof BlogCommentSchema>) => {
        setIsLoading(true)
        try {
            toast.loading('Création en cours...', { id: 'create-comment' })
            await createComment(
                values.content,
                values.articleId
            )
            toast.success('Commentaire créé', {
                id: 'create-comment',
                description: 'Le commentaire a été créé avec succès',
                duration: 3000,
            })
            router.push("/admin/comment")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la création'
            toast.error('Échec de la création', {
                id: 'create-comment',
                description: errorMessage,
                duration: 4000,
            })
        }
        setIsLoading(false)
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Créer un nouveau commentaire</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
                            <div className="w-full flex flex-col items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    label="Contenu"
                                    placeholder="Contenu du commentaire"
                                />

                                <div className="w-full max-w-lg space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Article
                                    </label>
                                    <Select
                                        value={selectedArticleId}
                                        onValueChange={(value: string) => {
                                            setSelectedArticleId(value)
                                            form.setValue('articleId', parseInt(value))
                                        }}
                                    >
                                        <SelectTrigger className="w-full h-20">
                                            <SelectValue placeholder="Sélectionnez un article" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {articles.map((article) => (
                                                <SelectItem
                                                    key={article.id}
                                                    value={article.id.toString()}
                                                    className="py-3 px-4"
                                                >
                                                    {article.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/admin/comment")}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Création..." : "Créer"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
