"use client";

import { Article } from "@/src/types/Article";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Heart, MessageCircle, Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

interface ArticleCardProps {
    article: Article;
    onCommentClick: () => void;
    onLikeClick: () => void;
}

export function ArticleCard({ article, onCommentClick, onLikeClick }: ArticleCardProps) {
    const isLiked = article.likes.some(like => like.authorId === 1);

    const handleShare = async (platform: string) => {
        const url = `${window.location.origin}/blog/${article.id}`;
        const text = `Découvrez "${article.title}"`;

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(url);
                toast.success("Lien copié dans le presse-papier !");
            } catch (err) {
                toast.error("Impossible de copier le lien");
            }
            return;
        }

        const shareUrl = shareUrls[platform as keyof typeof shareUrls];
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="space-y-2">
                <div className="flex items-center space-x-3">
                    <UserAvatar
                        user={article.author}
                        className="h-10 w-10"
                    />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">
                                {`${article.author.firstname} ${article.author.lastname}`}
                            </p>
                            <div className="flex gap-1.5">
                                {article.categories.map(category => (
                                    <Badge
                                        key={category.id}
                                        variant="secondary"
                                        className="text-xs font-normal"
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(article.createdAt), {
                                addSuffix: true,
                                locale: fr
                            })}
                        </p>
                    </div>
                </div>
                <h3 className="text-lg font-semibold tracking-tight pt-1">
                    {article.title}
                </h3>
            </CardHeader>
            <CardContent>
                <p className={cn(
                    "text-sm text-muted-foreground",
                    "leading-relaxed line-clamp-3",
                    "mb-4"
                )}>
                    {article.content}
                </p>
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href={`/blog/${article.id}`}>
                            Lire la suite
                        </Link>
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-3 gap-1 px-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLikeClick}
                    className={cn(
                        "flex-1",
                        isLiked && "text-primary bg-primary/10 hover:bg-primary/20"
                    )}
                >
                    <Heart className={cn(
                        "h-4 w-4 mr-2",
                        isLiked && "fill-primary"
                    )} />
                    J&apos;aime
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onCommentClick}
                    className="flex-1"
                >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Commenter
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Partager
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShare('facebook')}>
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('twitter')}>
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('copy')}>
                            <Link2 className="h-4 w-4 mr-2" />
                            Copier le lien
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
}
