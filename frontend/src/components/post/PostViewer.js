import Editor from '@monaco-editor/react';
import { Toolbar } from '@mui/material';

const sampleData = {
  site: 'BOJ',
  language: 'python',
  title: '게시글 제목',
  script: `a = 5
b = 3
print(a+b)
  `,
  like: 3,
  date: '2021-01-01',
};

const PostViewer = () => {
  return (
    <div>
      <Toolbar
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>{sampleData.site}</div>
        <div>{sampleData.language}</div>
        <div>{sampleData.title}</div>
        <div>{sampleData.date}</div>
      </Toolbar>
      <Editor
        height="50vh"
        language={sampleData.language}
        value={sampleData.script}
        theme="vs-dark" // light
        options={{ readOnly: 'true' }}
      />
    </div>
  );
};

export default PostViewer;
