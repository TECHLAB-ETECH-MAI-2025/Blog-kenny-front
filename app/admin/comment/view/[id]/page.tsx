"use client"

import { use, useEffect, useState } from "react"
import { BlogComment } from "@/src/types/Comment"
import { getCommentById } from "@/src/services/CommentService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Eye, Link as LinkIcon, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CommentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [comment, setComment] = useState<BlogComment | null>(null)
    const [loading, setLoading] = useState(true)
    const { id } = use(params)
    const router = useRouter()

    useEffect(() => {
        const loadComment = async () => {
            try {
                const data = await getCommentById(parseInt(id))
                setComment(data)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
                toast.error('Échec du chargement du commentaire', {
                    description: errorMessage,
                    duration: 4000,
                })
                router.push('/admin/comment')
            } finally {
                setLoading(false)
            }
        }

        loadComment()
    }, [id, router])

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Retour
                </Button>
                <Link href={`/admin/comment/edit/${comment.id}`}>
                    <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Éditer
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Détails du commentaire</CardTitle>
                    <CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>
                                {`${comment.author.firstname} ${comment.author.lastname}`}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(comment.createdAt).toLocaleString('fr-FR', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                        <p>{comment.content}</p>
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t">
                        <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Article associé:</span>
                            <Link href={`/admin/article/view/${comment.article.id}`}>
                                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                                    {comment.article.title}
                                </Badge>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Statut:</span>
                            <Badge variant="outline">
                                Publié
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
