"use client"

import { use, useEffect, useState } from "react"
import { Article } from "@/src/types/Article"
import { getArticleById } from "@/src/services/ArticleService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Eye, MessageCircle, Tags, User, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/authStore"
import { likeArticle } from "@/src/services/LikeService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = use(params);
    const router = useRouter();
    const { user } = useAuthStore();
    //const queryClient = useQueryClient();
    //const [newComment, setNewComment] = useState("");

    // Mutations pour les likes
    const likeMutation = useMutation({
        mutationFn: async () => {
            const result = await likeArticle(Number.parseInt(id));
            return result.article;
        },
        onSuccess: (updatedArticle: Article) => {
            setArticle(updatedArticle); // Met à jour l'état local avec l'article retourné par l'API
            toast.success("Article liké");
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Une erreur est survenue";
            toast.error("Erreur lors du like", {
                description: message
            });
        }
    });


    const handleLikeClick = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        likeMutation.mutate();
    };

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const data = await getArticleById(parseInt(id))
                setArticle(data)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
                toast.error('Échec du chargement de l\'article', {
                    description: errorMessage,
                    duration: 4000,
                })
                router.push('/admin/article')
            } finally {
                setLoading(false)
            }
        }

        loadArticle()
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
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
        )
    }

    if (!article) {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Retour
                </Button>
                <Link href={`/admin/article/edit/${article.id}`}>
                    <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Éditer
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
                    <CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>
                                {`${article.author.firstname} ${article.author.lastname}`}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(article.createdAt).toLocaleString('fr-FR', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                        {article.content}
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t">
                        <div className="flex items-center gap-2">
                            <Tags className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Catégories:</span>
                            <div className="flex flex-wrap gap-1">
                                {article.categories.length > 0 ? (
                                    article.categories.map(cat => (
                                        <Badge key={cat.id} variant="secondary">
                                            {cat.name}
                                        </Badge>
                                    ))
                                ) : (
                                    <Badge variant="outline">Sans catégorie</Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Commentaires:</span>
                            <Badge variant="secondary" className="rounded-full">
                                {article.comments?.length || 0}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant={article.likes.some(like => like.authorId === user?.id) ? "secondary" : "outline"}
                                size="sm"
                                onClick={handleLikeClick}
                            >
                                <Heart className="mr-2 h-4 w-4" />
                                {article.likes.some(like => like.authorId === user?.id) ? "Je n'aime plus" : "J'aime"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {article.comments && article.comments.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Commentaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {article.comments.map(comment => (
                                <div key={comment.id} className="p-4 rounded-lg border">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                                {`${comment.author.firstname} ${comment.author.lastname}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(comment.createdAt).toLocaleString('fr-FR', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </div>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
