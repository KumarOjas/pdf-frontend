// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('http://localhost:8000/upload/', formData);
        alert('File uploaded successfully!');
    };

    const askQuestion = async () => {
        const response = await axios.post('http://localhost:8000/ask/', { question });
        setAnswer(response.data.answer);
    };

    return (
        <div>
            <h1>PDF Question Answering</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload PDF</button>
            <hr />
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question" />
            <button onClick={askQuestion}>Ask</button>
            {answer && <div><strong>Answer:</strong> {answer}</div>}
        </div>
    );
}

export default App;
