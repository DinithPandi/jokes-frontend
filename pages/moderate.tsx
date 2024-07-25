import React, { useState } from 'react';
import axios from 'axios';

interface Joke {
    _id: string;
    content: string;
    type: string;
}

interface LoginResponse {
    token: string;
}

const Moderate: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [joke, setJoke] = useState<Joke | null>(null);
    const [message, setMessage] = useState<string>('');
    const [editContent, setEditContent] = useState<string>('');
    const [editType, setEditType] = useState<string>('');

    const login = async () => {
        try {
            const response = await axios.post<LoginResponse>('http://localhost:3001/login', { email, password });
            setToken(response.data.token);
            setMessage('Login successful!');
        } catch (error) {
            setMessage('Login failed.');
        }
    };

    const fetchJoke = async () => {
        try {
            const response = await axios.get<Joke>('http://localhost:3001/joke', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJoke(response.data);
        } catch (error) {
            setJoke(null);
            setMessage('Failed to fetch joke.');
        }
    };

    const editJoke = async () => {
        if (joke) {
            try {
                await axios.put(`http://localhost:3001/joke/${joke._id}`, { content: editContent, type: editType }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMessage('Joke edited successfully.');
            } catch (error) {
                setMessage('Failed to edit joke.');
            }
        }
    };

    const approveJoke = async (approve: boolean) => {
        if (joke) {
            try {
                await axios.post(`http://localhost:3001/joke/${joke._id}/approve`, { approve }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMessage('Joke processed successfully.');
                setJoke(null);
            } catch (error) {
                setMessage('Failed to process joke.');
            }
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {!token ? (
                <div>
                    <h1>Moderator Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={login}>Login</button>
                </div>
            ) : (
                <div>
                    <button onClick={fetchJoke}>Fetch Joke for Moderation</button>
                    {joke && (
                        <div>
                            <h2>Joke for Moderation</h2>
                            <p>{joke.content}</p>
                            <input
                                type="text"
                                placeholder="Edit content"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Edit type"
                                value={editType}
                                onChange={(e) => setEditType(e.target.value)}
                            />
                            <button onClick={editJoke}>Edit Joke</button>
                            <button onClick={() => approveJoke(true)}>Approve</button>
                            <button onClick={() => approveJoke(false)}>Reject</button>
                        </div>
                    )}
                </div>
            )}
            <p>{message}</p>
        </div>
    );
};

export default Moderate;
