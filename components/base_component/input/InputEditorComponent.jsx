import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

import {
  faBold,
  faBorderNone,
  faItalic,
  faLink,
  faList,
  faList12,
  faRedo,
  faTable,
  faUnderline,
  faUndo,
  faUnlink,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import {
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import ButtonComponent from '../ButtonComponent';
import ValidateComponent from '../ValidateComponent';
import InputButtonComponent from './InputButtonComponent';

const readDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // async event handlers
    reader.onload = (e) => resolve(reader.result);
    reader.onerror = (e) => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const UploadImageButton = ({ addImage }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64: null,
    objectUrl: null,
  });

  const handleChangePhotoFileInput = (e) => {
    const target = e.currentTarget;
    const file = target.files.item(0);

    if (file) {
      readDataUrl(file).then((dataUrl) => {
        setSelectedFile({
          ...selectedFile,
          file,
          base64: dataUrl,
          objectUrl: URL.createObjectURL(file),
        });

        addImage({ url: URL.createObjectURL(file) });
      });
    }
  };

  const handleChangePhotoButton = (e) => {
    e.preventDefault();
    addImage({ url: selectedFile.objectUrl });
  };

  return (
    <form className='flex'>
      <input
        hidden
        accept='image/*'
        type='file'
        onChange={handleChangePhotoFileInput}
        ref={fileInputRef}
        id='editorUpload'
      />
      <label
        htmlFor='editorUpload'
        className='block w-max h-max cursor-pointer btnUploadImage bg__light__primary'>
        <FontAwesomeIcon icon={faUpload} className='text-white' />
      </label>
    </form>
  );
};

// const Container = styled.div``;

const MenuBar = ({ editor }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const addImage = useCallback(
    ({ url }) => {
      const newUrl = url ?? window.prompt("URL");
      if (newUrl) {
        editor.chain().focus().setImage({ src: newUrl }).run();
      }
    },
    [editor]
  );

  const setLink = useCallback(() => {
    const url = linkUrl;

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setLinkUrl("");
  }, [editor, linkUrl]);

  if (!editor) {
    return null;
  }

  return (
    <Container>
      <div className='flex gap-3 p-3 items-start'>
        <ButtonComponent
          icon={faUndo}
          border
          color={"gray"}
          onClick={() => editor.commands.undo()}
          square
        />

        <ButtonComponent
          icon={faRedo}
          border
          color={"gray"}
          onClick={() => editor.commands.redo()}
          square
        />

        <ButtonComponent
          icon={faBold}
          bg={editor.isActive("bold") ? "primary" : ""}
          color={editor.isActive("bold") ? "" : "gray"}
          border={editor.isActive("bold") ? false : true}
          onClick={() => editor.chain().focus().toggleBold().run()}
          square
        />

        <ButtonComponent
          icon={faItalic}
          bg={editor.isActive("italic") ? "primary" : ""}
          color={editor.isActive("italic") ? "" : "gray"}
          border={editor.isActive("italic") ? false : true}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          square
        />

        <ButtonComponent
          icon={faUnderline}
          bg={editor.isActive("underline") ? "primary" : ""}
          color={editor.isActive("underline") ? "" : "gray"}
          border={editor.isActive("underline") ? false : true}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          square
        />

        <ButtonComponent
          icon={faList}
          bg={editor.isActive("bulletList") ? "primary" : ""}
          color={editor.isActive("bulletList") ? "" : "gray"}
          border={editor.isActive("bulletList") ? false : true}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          square
        />

        <ButtonComponent
          icon={faList12}
          bg={editor.isActive("orderedList") ? "primary" : ""}
          color={editor.isActive("orderedList") ? "" : "gray"}
          border={editor.isActive("orderedList") ? false : true}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          square
        />

        <InputButtonComponent
          setInputValue={linkUrl}
          bg={editor.isActive("link") ? "primary" : ""}
          color={editor.isActive("link") ? "" : "gray"}
          border={editor.isActive("link") ? false : true}
          icon={faLink}
          placeholder='Enetered your link'
          size={"sm"}
          mb={"0"}
          onChange={(e) => setLinkUrl(e)}
          onSubmit={() => setLink()}
        />

        <ButtonComponent
          icon={faUnlink}
          color={"gray"}
          border
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          square
        />

        <ButtonComponent
          icon={faTable}
          bg={editor.isActive("table") ? "primary" : ""}
          color={editor.isActive("table") ? "" : "gray"}
          border={editor.isActive("table") ? false : true}
          onClick={() => {
            const rows = window.prompt("Enter the rows number:");
            const cols = window.prompt("Enter the columns number:");
            if (rows && cols) {
              editor
                .chain()
                .focus()
                .insertTable({ rows, cols, withHeaderRow: true })
                .run();
            }
          }}
          square
        />

        <ButtonComponent
          icon={faBorderNone}
          color={"gray"}
          border
          onClick={() => {
            editor.chain().deleteTable().run();
          }}
          square
          disabled={!editor.isActive("table")}
        />

        {/* <UploadImageButton addImage={addImage} /> */}
      </div>

      {/* <button onClick={(e) => handleChangePhotoButton(e)}>add Image</button> */}
    </Container>
  );
};

const InputEditorComponent = ({
  placeholder,
  name,
  disabled,
  validate,
  onValidate,
  onChange,
  error,
  setInputValue
}) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState("");
  const [first, setFirst] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Typography,
      Highlight,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link,
    ],
    content: value,
    onUpdate({ editor }) {
      setFirst(false);

      if (onChange) {
        onChange(editor.getHTML());
      }

      setValue(editor.getHTML());
    },
  });
  // console.log(editor.getHTML());

  // console.log(editor.getText());

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    setValue(setInputValue);

    if (editor && setInputValue) {
      editor.commands?.setContent(setInputValue)
    }

    // console.log(setInputValue);
  }, [setInputValue]);

  // useEffect(() => {

  //   if (editor) {
  //     editor.commands.insertContent('')
  //     editor.commands.insertContent(value)
  //   }

  // }, [value]);

  return (
    <>
      <div className='bg-gray-200 rounded-t-md'>
        <MenuBar editor={editor} />
        <div className='relative'>
          <label
            htmlFor={name}
            className={`absolute z-10 pl-5 pt-5 ${value || focus
              ? `font-regular ${!disabled
                ? !invalid
                  ? focus
                    ? "text__primary"
                    : ""
                  : "text__danger"
                : ""
              }`
              : `text-base font-bold ${!invalid ? "text-gray-400" : "text__danger"
              }`
              }`}>
            {placeholder}
          </label>
          <StyledEditorContent
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={() => {
              setFirst(false);
            }}
            editor={editor}
          />
        </div>
        {validate && !first && focus && (
          <ValidateComponent
            {...validate}
            value={value}
            setInvalid={(e) => {
              setInvalid(e);
              if (onValidate) {
                onValidate(e);
              }
            }}
          />
        )}
      </div>

      {invalid && (
        <small className='block px-2 pl-5 mb-3 -mt-1 text-sm text-left text__danger'>
          {invalid}
        </small>
      )}
    </>
  );
};

const Container = styled.div``;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    img {
      max-width: 100%;
      height: auto;

      &.ProseMirror-selectednode {
        outline: 3px solid #68cef8;
      }
    }

    p {
      font-weight: 400;
    }

    strong {
      font-wight: 800;
    }
    strong em {
      font-wight: 900;
    }
    strong u {
      font-wight: 900;
    }

    ul {
      padding-left: 28px;
      list-style: disc;
    }

    ol {
      padding-left: 28px;
      list-style: decimal;
    }

    a {
      color: #4c3f91;
    }

    table {
      display: table;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
      border: 1px solid #666666;
      border-spacing: 5px;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid black;
      }
      p {
        margin: 0;
      }
    }
  }
`;

export default InputEditorComponent;
