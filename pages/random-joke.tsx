import { useEffect, useState } from 'react';

interface Joke {
    content: string;
}

export default function RandomJoke() {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [type, setType] = useState<string>('');
    const [jokeTypes, setJokeTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchJokeTypes = async () => {
            try {
                const res = await fetch('http://localhost:3003/jokes/types');
                const data: string[] = await res.json();
                setJokeTypes(data);
            } catch (error) {
                console.log("Error fetching joke types:", error);
            }
        };
        fetchJokeTypes();
    }, []);


    const fetchRandomJoke = async () => {
        try {
            const res = await fetch(`http://localhost:3003/jokes/random?type=${type}`);
            const data: Joke = await res.json();
            setJoke(data);
        } catch (error) {
            setJoke({ content: 'An error occurred.' });
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Random Joke</h1>
            <select style={{ width: '20%', fontSize: '20px', margin: '20px', textAlign: 'center' }} value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                {jokeTypes.map((jokeType) => (
                    <option key={jokeType} value={jokeType}>{jokeType}</option>
                ))}
            </select>
            <br />
            <button onClick={fetchRandomJoke}>Get a Random Joke</button>
            {joke && <p>{joke.content}</p>}
        </div>
    );
}
