import { useEffect, useState } from 'react';
import axios from 'axios';

const JokeList = ({ endpoint }: { endpoint: string }) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/jokes${endpoint}`);
        setJokes(response.data);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    };

    fetchJokes();
  }, [endpoint]);

  return (
    <div>
      <h2>Jokes List</h2>
      <ul>
        {jokes.map((joke: any) => (
          <li key={joke._id}>
            <strong>{joke.type}:</strong> {joke.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JokeList;
