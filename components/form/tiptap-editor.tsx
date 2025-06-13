"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, Code, ListOrdered, List, Quote } from "lucide-react"

interface TiptapEditorProps {
    content: string
    onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Link.configure({
                openOnClick: false
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full"
                }
            }),
            Placeholder.configure({
                placeholder: "Commencez à écrire votre article..."
            })
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })

    if (!editor) return null

    return (
        <div className="border rounded-lg overflow-hidden bg-card">
            <div className="flex items-center gap-1 p-2 border-b">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-active={editor.isActive("bold")}
                    className="data-[active=true]:bg-muted"
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-active={editor.isActive("italic")}
                    className="data-[active=true]:bg-muted"
                >
                    <Italic className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt("URL:")
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                    data-active={editor.isActive("link")}
                    className="data-[active=true]:bg-muted"
                >
                    <LinkIcon className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt("URL de l'image:")
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                >
                    <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    data-active={editor.isActive("codeBlock")}
                    className="data-[active=true]:bg-muted"
                >
                    <Code className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    data-active={editor.isActive("orderedList")}
                    className="data-[active=true]:bg-muted"
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    data-active={editor.isActive("bulletList")}
                    className="data-[active=true]:bg-muted"
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    data-active={editor.isActive("blockquote")}
                    className="data-[active=true]:bg-muted"
                >
                    <Quote className="w-4 h-4" />
                </Button>
            </div>
            <EditorContent
                editor={editor}
                className="prose dark:prose-invert max-w-none p-4"
            />
        </div>
    )
}
