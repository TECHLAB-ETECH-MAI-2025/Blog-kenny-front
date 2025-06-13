import { BlogComment } from "@/src/types/Comment";
import { UserAvatar } from "../ui/user-avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface CommentsSectionProps {
    comments: BlogComment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                Aucun commentaire pour le moment. Soyez le premier à commenter !
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="group flex gap-3">
                    <UserAvatar
                        user={comment.author}
                        className="h-8 w-8 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                        <div className={cn(
                            "relative rounded-2xl px-4 py-2.5",
                            "bg-muted/50 dark:bg-muted/20",
                            "group-hover:bg-muted/80 dark:group-hover:bg-muted/30",
                            "transition-colors duration-200"
                        )}>
                            <h4 className="font-semibold text-sm leading-none mb-1">
                                {comment.author.firstname} {comment.author.lastname}
                            </h4>
                            <p className="text-sm leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 px-4">
                            <button className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                                J&apos;aime
                            </button>
                            <button className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                                Répondre
                            </button>
                            <span className="text-xs text-muted-foreground/60">
                                {format(new Date(comment.createdAt), "d MMMM 'à' HH:mm", { locale: fr })}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
