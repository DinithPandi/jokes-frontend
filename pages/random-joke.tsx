import { useState } from 'react';

interface Joke {
    content: string;
}

export default function RandomJoke() {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [type, setType] = useState<string>('');

    const fetchRandomJoke = async () => {
        try {
            const res = await fetch(`http://localhost:3000/jokes/random?type=${type}`);
            const data: Joke = await res.json();
            setJoke(data);
        } catch (error) {
            setJoke({ content: 'An error occurred.' });
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Random Joke</h1>
            <input
                type="text"
                placeholder="Type (optional)"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <br />
            <button onClick={fetchRandomJoke}>Get a Random Joke</button>
            {joke && <p>{joke.content}</p>}
        </div>
    );
}
