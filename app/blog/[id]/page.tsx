"use client"

import type { Article } from "@/src/types/Article"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { CommentsSection } from "@/components/blog/comments-section"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getArticleById } from "@/src/services/ArticleService"
import { likeArticle } from "@/src/services/LikeService"
import { UserAvatar } from "@/components/ui/user-avatar"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, Clock, Eye, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"

export default function ArticleDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useAuthStore()
    const queryClient = useQueryClient()
    const articleId = params.id as string
    // Get article data
    const { data: article, isLoading } = useQuery<Article, Error>({
        queryKey: ["article", articleId],
        queryFn: () => getArticleById(Number.parseInt(articleId)),
    })

    // Handle like
    const likeMutation = useMutation({
        mutationFn: () => likeArticle(Number.parseInt(articleId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["article", articleId] })
            toast.success("Article liké")
        },
        onError: (error) => {
            toast.error("Une erreur est survenue", {
                description: error instanceof Error ? error.message : "Impossible de liker l'article"
            })
        }
    })


    const handleLikeClick = () => {
        if (!user) {
            router.push("/login")
            return
        }
        likeMutation.mutate()

    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                        <Card className="p-8">
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-40 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-2/3" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    if (!article) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b"
            >
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <Button variant="outline" size="sm" onClick={() => router.back()}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                            <div className="flex flex-wrap gap-2">
                                {article.categories.map((category) => (
                                    <Badge key={category.id} variant="secondary" className="text-sm">
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <UserAvatar user={article.author} className="h-12 w-12 ring-2 ring-background" />
                                    <div>
                                        <p className="font-semibold text-lg">
                                            {article.author.firstname} {article.author.lastname}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <time>{format(new Date(article.createdAt), "d MMMM yyyy", { locale: fr })}</time>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>2.3k vues</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card className="mb-8 overflow-hidden">
                            <div className="p-8 lg:p-12">
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:pl-6 prose-blockquote:italic prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-lg prose-img:shadow-md"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>
                        </Card>

                        {/* Interaction Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Card className="mb-8">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 hover:text-red-500 transition-colors"
                                                onClick={handleLikeClick}
                                            >
                                                <Heart className="w-5 h-5" />
                                                <span className="font-medium">{article.likes.length}</span>
                                                <span className="hidden sm:inline">J&apos;aime</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                                <span className="font-medium">{article.comments.length}</span>
                                                <span className="hidden sm:inline">Commentaires</span>
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center gap-2 hover:text-green-500 transition-colors"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            <span className="hidden sm:inline">Partager</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Comments Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Card>
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h2 className="text-2xl font-bold">Commentaires</h2>
                                        <Badge variant="outline" className="text-sm">
                                            {article.comments.length}
                                        </Badge>
                                    </div>
                                    <Separator className="mb-6" />
                                    <CommentsSection comments={article.comments} />
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
