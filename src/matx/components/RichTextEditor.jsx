import 'react-quill/dist/quill.snow.css';

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactQuill from 'react-quill';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    editor: {
        '& .ql-container': {
            minHeight: 250,
        }
    }
}));

const RichTextEditor = ({ content, placeholder, handleContentChange }) => {
    const classes = useStyles();

    const modules = {
        toolbar: [
            // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            ['link'],
            ['image']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: true
        }
    };

    return (
        <ReactQuill
            theme="snow"
            onChange={handleContentChange}
            value={content}
            modules={modules}
            formats={RichTextEditor.formats}
            placeholder={placeholder}
            className={classes.editor}
        />
    );
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
    'align',
    'background',
    'bold',
    'blockquote',
    'bullet',
    'color',
    'code',
    'code-block',
    'clean',
    'direction',
    'font',
    'header',
    'italic',
    'indent',
    'image',
    'list',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'video'
];

export default RichTextEditor;
