"use client"

import { useEffect, useState } from "react"
import { Article } from "@/src/types/Article"
import { PaginationMeta } from "@/src/types"
import { getArticles, deleteArticle } from "@/src/services/ArticleService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pagination } from "@/components/admin/pagination"
import Link from "next/link"
import { BookText, Calendar, Hash, Pencil, Tags, Trash, User } from "lucide-react"

export const ArticleTable = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 1
    })

    const loadArticles = async (page: number = 1) => {
        try {
            const response = await getArticles(page);
            setArticles(response.articles)
            setMeta(response.meta)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Veuillez vérifier votre connexion et réessayer'
            toast.error('Échec du chargement des articles', {
                description: errorMessage,
                duration: 4000,
            })
        }
    }

    useEffect(() => {
        loadArticles()
    }, [])

    const handlePageChange = (page: number) => {
        loadArticles(page)
    }

    const handleDelete = async (id: number) => {
        try {
            toast.loading('Suppression en cours...', { id: `delete-${id}` })
            await deleteArticle(id)
            toast.success('Article supprimé', {
                id: `delete-${id}`,
                description: "L'article a été supprimé avec succès",
                duration: 3000,
            })
            loadArticles()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression'
            toast.error('Échec de la suppression', {
                id: `delete-${id}`,
                description: errorMessage,
                duration: 4000,
            })
        }
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Hash className="h-4 w-4" />
                                    <span>Id</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <BookText className="h-4 w-4" />
                                    <span>Titre</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Tags className="h-4 w-4" />
                                    <span>Catégorie</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Auteur</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Date de création</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="font-medium">{article.id}</TableCell>
                                <TableCell className="font-medium">{article.title}</TableCell>
                                <TableCell>
                                    {article.categories.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {article.categories.map(cat => (
                                                <Badge key={cat.id} variant="secondary">
                                                    {cat.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <Badge variant="outline">Sans catégorie</Badge>
                                    )}
                                </TableCell>
                                <TableCell>{`${article.author.firstname} ${article.author.lastname}`}</TableCell>
                                <TableCell>{new Date(article.createdAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/admin/article/edit/${article.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(article.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {articles.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Aucun article trouvé
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {meta.pages > 1 && (
                <Pagination
                    currentPage={meta.page}
                    totalPages={meta.pages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    )
}
