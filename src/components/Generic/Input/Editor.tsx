import { Editor, EditorContent, useEditor } from "@tiptap/react";
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
import { FC } from "react";
import {
  BoldIcon,
  ItalicIcon,
  OrderedListIcon,
  RedoIcon,
  UndoIcon,
  UnorderedListIcon,
} from "../../../assets/svg-icons";
import "./Editor.scss";
import Button from "../Button";
import store from "../../../store";

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

const MenuBarGroup: FC = ({ children }) => {
  return <div className="wysiwyg__menu-group">{children}</div>;
};

const MenuBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const checkOptionEnabled = (option: string) => {
    return editor.isActive(option) ? "primary" : "secondary";
  };

  return (
    <div className="wysiwyg__menu">
      <MenuBarGroup>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={checkOptionEnabled("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon />
        </Button>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={checkOptionEnabled("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </Button>
      </MenuBarGroup>

      <MenuBarGroup>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={checkOptionEnabled("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <UnorderedListIcon />
        </Button>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={checkOptionEnabled("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <OrderedListIcon />
        </Button>
      </MenuBarGroup>

      <MenuBarGroup>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={"secondary"}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </Button>
        <Button
          className="wysiwyg__menu-group-item"
          colorTheme={"secondary"}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </Button>
      </MenuBarGroup>
    </div>
  );
};

export const EditorPanel: FC<{ editor: Editor | null }> = ({ editor }) => {
  return (
    <>
      {store.settingStore.editor.isMenubarDisplayed && (
        <MenuBar editor={editor} />
      )}
      <EditorContent editor={editor} className="wysiwyg__editor" />
    </>
  );
};
