import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Jokes Microservices</h1>
      <ul>
        <li><Link href="/submit">Submit a Joke</Link></li>
        <li><Link href="/random-joke">Get a Random Joke</Link></li>
        <li><Link href="/moderate">Moderator Login</Link></li>
      </ul>
    </div>
  );
}
