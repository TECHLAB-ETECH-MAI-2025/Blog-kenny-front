import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";

interface CommentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => void;
    articleTitle: string;
}

export function CommentDialog({ isOpen, onClose, onSubmit, articleTitle }: CommentDialogProps) {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment("");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un commentaire</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    <p className="text-sm text-gray-500">
                        Commenter l&apos;article : {articleTitle}
                    </p>
                    <Textarea
                        placeholder="Écrivez votre commentaire..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button onClick={handleSubmit}>
                            Publier
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
