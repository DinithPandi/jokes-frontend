import { useState } from 'react';

interface Joke {
  content: string;
}

interface LoginResponse {
  token: string;
}

export default function Moderate() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [joke, setJoke] = useState<Joke | null>(null);
  const [message, setMessage] = useState<string>('');

  const login = async () => {
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResponse = await res.json();
      if (data.token) {
        setToken(data.token);
        setMessage('Login successful!');
      } else {
        setMessage('Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const fetchJoke = async () => {
    try {
      const res = await fetch('http://localhost:3001/joke', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data: Joke = await res.json();
      setJoke(data);
    } catch (error) {
      setJoke({ content: 'An error occurred.' });
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
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
      <p>{message}</p>

      {token && (
        <>
          <button onClick={fetchJoke}>Fetch Joke for Moderation</button>
          {joke && <p>{joke.content}</p>}
        </>
      )}
    </div>
  );
}
