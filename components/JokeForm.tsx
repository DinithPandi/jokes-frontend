import { useState } from 'react';
import axios from 'axios';

const JokeForm = () => {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/jokes', { type, content });
      alert('Joke submitted successfully!');
      setType('');
      setContent('');
    } catch (error) {
      console.error('Error submitting joke:', error);
      alert('Failed to submit joke.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Joke</button>
    </form>
  );
};

export default JokeForm;
