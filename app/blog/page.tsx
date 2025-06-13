"use client"

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/src/types/Article";
import * as ArticleService from "@/src/services/ArticleService";
import * as CommentService from "@/src/services/CommentService";
import * as LikeService from "@/src/services/LikeService";
import { ArticleCard } from "@/components/blog/article-card";
import { CommentsSection } from "@/components/blog/comments-section";
import { CommentDialog } from "@/components/blog/comment-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
    InfiniteData,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ArticlesResponse {
    articles: Article[];
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export default function BlogPage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    //const router = useRouter();
    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['articles'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            return ArticleService.getArticles(pageParam);
        },
        getNextPageParam: (lastPage: ArticlesResponse) => {
            return lastPage.meta.page < lastPage.meta.pages ? lastPage.meta.page + 1 : undefined;
        },
    });

    const addCommentMutation = useMutation({
        mutationFn: (variables: { articleId: number; content: string }) => {
            return CommentService.createComment(variables.content, variables.articleId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['articles']
            });
            setSelectedArticle(null);
            setIsCommentDialogOpen(false);
            toast.success("Commentaire ajouté avec succès");
        },
        onError: (error: Error) => {
            toast.error("Erreur lors de l'ajout du commentaire", {
                description: error.message
            });
        }
    });

    const likeMutation = useMutation({
        mutationFn: (variables: { articleId: number; isLiked: boolean }) => {
            return LikeService.likeArticle(variables.articleId);
        },
        onMutate: async (variables: { articleId: number; isLiked: boolean }) => {
            await queryClient.cancelQueries({ queryKey: ['articles'] });

            const previousData = queryClient.getQueryData<InfiniteData<ArticlesResponse>>(['articles']);

            queryClient.setQueryData<InfiniteData<ArticlesResponse>>(['articles'], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        articles: page.articles.map(article => {
                            if (article.id === variables.articleId) {
                                const currentUserId = 1; // À remplacer par l'ID de l'utilisateur connecté
                                const newLikes = variables.isLiked
                                    ? article.likes.filter(like => like.authorId !== currentUserId)
                                    : [...article.likes, {
                                        id: Date.now(), // ID temporaire
                                        articleId: variables.articleId,
                                        authorId: currentUserId
                                    }];

                                return {
                                    ...article,
                                    likes: newLikes
                                };
                            }
                            return article;
                        })
                    }))
                };
            });

            return { previousData };
        },
        onError: (error: Error, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData<InfiniteData<ArticlesResponse>>(['articles'], context.previousData);
            }
            toast.error("Erreur lors de l'action sur le like", {
                description: error.message
            });
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.isLiked ? "Like retiré" : "Article liké");
        }
    });

    const handleCommentClick = useCallback((article: Article) => {
        setSelectedArticle(prev => prev?.id === article.id ? null : article);
    }, []);

    const handleCommentSubmit = useCallback((content: string) => {
        if (selectedArticle) {
            addCommentMutation.mutate({
                articleId: selectedArticle.id,
                content
            });
        }
        setIsCommentDialogOpen(false);
    }, [selectedArticle, addCommentMutation]);

    const handleLikeClick = useCallback((article: Article) => {
        const isLiked = article.likes.some(like => like.authorId === 1); // À remplacer par l'ID de l'utilisateur connecté
        likeMutation.mutate({
            articleId: article.id,
            isLiked
        });
    }, [likeMutation]);

    if (isLoading) {
        return (
            <>
                <div className="mx-8 py-8 space-y-8">
                    {[1, 2, 3].map((n) => (
                        <Card key={n} className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-4 w-[150px]" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-[300px]" />
                            <Skeleton className="h-40 w-full rounded-lg" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </Card>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <main className="mx-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <Button asChild size="sm" className="gap-2">
                        <Link href="/blog/create">
                            <Plus className="h-4 w-4" />
                            Nouvel article
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.articles.map((article) => (
                                <div key={article.id} className="flex flex-col gap-4">
                                    <ArticleCard
                                        article={article}
                                        onCommentClick={() => handleCommentClick(article)}
                                        onLikeClick={() => handleLikeClick(article)}
                                    />
                                    {selectedArticle?.id === article.id && (
                                        <Card className="p-4">
                                            <CommentsSection comments={article.comments} />
                                            <Button
                                                onClick={() => setIsCommentDialogOpen(true)}
                                                className="mt-4 w-full"
                                            >
                                                Ajouter un commentaire
                                            </Button>
                                        </Card>
                                    )}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div ref={ref} className="flex justify-center py-8">
                    {isFetchingNextPage && (
                        <Spinner className="w-8 h-8" />
                    )}
                </div>

                {hasNextPage && inView && (
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            onClick={() => fetchNextPage()}
                            className="min-w-[200px]"
                        >
                            Charger plus d&apos;articles
                        </Button>
                    </div>
                )}

                <CommentDialog
                    isOpen={isCommentDialogOpen}
                    onClose={() => setIsCommentDialogOpen(false)}
                    onSubmit={handleCommentSubmit}
                    articleTitle={selectedArticle?.title ?? ""}
                />
            </main>
        </>
    );
}
