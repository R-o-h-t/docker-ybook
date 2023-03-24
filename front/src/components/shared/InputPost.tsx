import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap"
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Highlight } from "@tiptap/extension-highlight";

const InputPost = forwardRef((props, ref) => {
    
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
    });
    useImperativeHandle(ref, () => ({
        editor
    }));


    return (
        <div>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Content />
                <RichTextEditor.Toolbar sticky stickyOffset={0}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
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
    )
})

export default InputPost;