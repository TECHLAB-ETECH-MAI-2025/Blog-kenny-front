"use client"

import { useEffect, useState } from "react"
import { BlogComment } from "@/src/types/Comment"
import { PaginationMeta } from "@/src/types"
import { getComments, deleteComment } from "@/src/services/CommentService"
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
import { BookText, Calendar, Hash, MessageCircle, Pencil, Trash, User } from "lucide-react"

export const CommentTable = () => {
    const [comments, setComments] = useState<BlogComment[]>([])
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 1
    })

    const loadComments = async (page: number = 1) => {
        try {
            const response = await getComments(page);
            setComments(response.comments)
            setMeta(response.meta)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Veuillez vérifier votre connexion et réessayer'
            toast.error('Échec du chargement des commentaires', {
                description: errorMessage,
                duration: 4000,
            })
        }
    }

    useEffect(() => {
        loadComments()
    }, [])

    const handlePageChange = (page: number) => {
        loadComments(page)
    }

    const handleDelete = async (id: number) => {
        try {
            toast.loading('Suppression en cours...', { id: `delete-${id}` })
            await deleteComment(id)
            toast.success('Commentaire supprimé', {
                id: `delete-${id}`,
                description: 'Le commentaire a été supprimé avec succès',
                duration: 3000,
            })
            loadComments()
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
                                    <MessageCircle className="h-4 w-4" />
                                    <span>Contenu</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <BookText className="h-4 w-4" />
                                    <span>Article titre</span>
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
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Date de modification</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow key={comment.id}>
                                <TableCell className="font-medium">{comment.id}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {comment.content.length > 50
                                            ? `${comment.content.substring(0, 50)}...`
                                            : comment.content}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {comment.article.title}
                                    </Badge>
                                </TableCell>
                                <TableCell>{`${comment.author.firstname} ${comment.author.lastname}`}</TableCell>
                                <TableCell>{new Date(comment.createdAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                                <TableCell>{new Date(comment.updatedAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/admin/comment/edit/${comment.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {comments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Aucun commentaire trouvé
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
