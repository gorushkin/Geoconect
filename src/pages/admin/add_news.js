import Layout from '../../components/Admin/Layout';
import { Container, Row } from 'react-bootstrap';
import { useClient } from '../../hooks';
import { useEffect, useState } from 'react';

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit, { defaultExtensions } from '@tiptap/starter-kit';

const AddNews = () => {
  const [content, setContent] = useState();

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });
  return (
    <Layout>
      <EditorContent editor={editor} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
};

export default AddNews;
