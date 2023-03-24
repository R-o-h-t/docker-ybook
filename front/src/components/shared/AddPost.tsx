import { Button } from "@mantine/core";
import { useState } from "react";
import apiBack from "../../utils/axios-api";

import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Highlight } from "@tiptap/extension-highlight";
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX } from "@tabler/icons";
import { useAuthUser } from "../../hooks/useAuthUser";

const DOMPurify = require('dompurify');

interface AddPostProps {
    setOpened: (opened: boolean) => void;
}

const AddPost = (props:AddPostProps) => {
    const [content, setContent] = useState("");
    const authId = useAuthUser();


    const contentCleaner = (content: string) => {
        return DOMPurify.sanitize(content);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Highlight,
            Placeholder.configure({
                placeholder: 'Rédigez votre post ici...',
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        }
    });
    
    const handlePublish = () => {
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Envoi en cours...',
            message: 'Votre post est en cours de publication...',
            autoClose: true,
            disallowClose: false,
        });
        
        apiBack.post('/post', {
                htmlContent: contentCleaner(content),
                userId: authId
            })
            .then((response) => {
                updateNotification({
                    id: 'load-data',
                    color: 'teal',
                    title: 'Post publié !',
                    message: 'Merci pour votre contribution à la communauté ! ❤️',
                    icon: <IconCheck size={16} />,
                    autoClose: 5000,
                });
                props.setOpened(false);
            }
            ).catch((error: Error) => {
                updateNotification({
                    id: 'load-data',
                    color: 'red',
                    title: 'Erreur',
                    message: 'Une erreur est survenue, veuillez réessayer plus tard.',
                    icon: <IconX size={16} />,
                    autoClose: 2000,
                });
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Content />
                <RichTextEditor.Toolbar sticky stickyOffset={0}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                       <RichTextEditor.Blockquote />
                       <RichTextEditor.BulletList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                       <RichTextEditor.Link />
                       <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
            </RichTextEditor>
        </div>
            <Button radius="md" size="md" color='dark' onClick={handlePublish}>
                Publier
            </Button>
        </div>
    )
}

export default AddPost;