import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


// 商品详情的富文本组件
const RichTextEditor = forwardRef((props ,ref) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };

    const html = props.detail;
    useEffect(() => {
        if (html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        } else {
            setEditorState(EditorState.createEmpty())
        }
    },[html])

    // 返回输入的html格式的商品详情
    useImperativeHandle(ref, () => ({
        // getDetail 是暴露给父组件的方法
        getDetail:  () => {
            return draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
    }))

    return (
        <div>
            <Editor
                editorState={editorState}
                editorStyle={{border: '2px solid #D9D9D9', height: 200, paddingLeft: 10}}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
})

export default RichTextEditor;