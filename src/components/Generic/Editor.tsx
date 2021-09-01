import { Editor, EditorContent, useEditor } from "@tiptap/react";
import React from "react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  BulletListIcon,
  ItalicIcon,
  OrderedListIcon,
  RedoIcon,
  UndoIcon,
} from "../../assets/svg/EditorIcons";
import { FC } from "react";

export const SetEditor = (text: string) => {
  return useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      History,
      BulletList,
      OrderedList,
      ListItem,
      Placeholder,
    ],
    content: text,
  });
};

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="wysiwyg__menu">
      <div className="wysiwyg__menu-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            (editor.isActive("bold") ? "button-primary " : "button-secondary") +
            " button wysiwyg__menu-item"
          }
        >
          {BoldIcon}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            (editor.isActive("italic")
              ? "button-primary"
              : "button-secondary") + " button wysiwyg__menu-item"
          }
        >
          {ItalicIcon}
        </button>
      </div>

      <div className="wysiwyg__menu-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            (editor.isActive("bulletList")
              ? "button-primary"
              : "button-secondary") + " button wysiwyg__menu-item"
          }
        >
          {BulletListIcon}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            (editor.isActive("orderedList")
              ? "button-primary"
              : "button-secondary") + " button wysiwyg__menu-item"
          }
        >
          {OrderedListIcon}
        </button>
      </div>

      <div className="wysiwyg__menu-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="button-secondary button wysiwyg__menu-item"
        >
          {UndoIcon}
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="button-secondary button wysiwyg__menu-item"
        >
          {RedoIcon}
        </button>
      </div>
    </div>
  );
};

export const EditorPanel: FC<{ editor: Editor | null }> = ({ editor }) => {
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="wysiwyg__editor" />
    </>
  );
};
