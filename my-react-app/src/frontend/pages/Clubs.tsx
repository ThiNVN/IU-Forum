import { useEffect, useState } from 'react';
import '../styles/forum.css';

interface Club {
  id: number;
  name: string;
  description: string;
  president_name: string;
  contact_email: string;
  created_at: string;
}

const Clubs: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('https://localhost:8081/api/clubs');
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await response.json();
        setClubs(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">IU Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{club.name}</h2>
            <p className="text-gray-600 mb-4">{club.description}</p>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">President:</span>{' '}
                {club.president_name}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Contact:</span>{' '}
                <a href={`mailto:${club.contact_email}`} className="text-blue-600 hover:underline">
                  {club.contact_email}
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Created:</span>{' '}
                {new Date(club.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs; 