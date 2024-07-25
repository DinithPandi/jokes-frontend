import { useState } from 'react';

interface JokeSubmissionResponse {
    success: boolean;
}

export default function SubmitJoke() {
    const [type, setType] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const submitJoke = async () => {
        try {
            const res = await fetch('http://localhost:3002/jokes/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, content, approved: false }),
            });
            const data: JokeSubmissionResponse = await res.json();
            if (data.success) {
                setMessage('Joke submitted successfully!');
                setType('');
                setContent('');
            } else {
                setMessage('Failed to submit joke.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Submit a Joke</h1>
            <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <button onClick={submitJoke}>Submit</button>
            <p>{message}</p>
        </div>
    );
}
