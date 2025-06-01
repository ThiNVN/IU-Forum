import { useEffect, useState } from 'react';
import '../styles/forum.css';

interface Club {
  id: number;
  name: string;
  description: string;
  president_name: string;
  link: string;
  logo: string;
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
  console.log(clubs)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">IU Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} style={{ padding: '8px' }}>
            <div
              style={{
                display: 'flex',
                border: '2px solid #ccc',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s',
                padding: '16px',
                alignItems: 'flex-start',
              }}
            >
              {/* Logo on the left */}
              <div style={{ marginRight: '16px', flexShrink: 0 }}>
                <img
                  src={club.logo}
                  alt={`${club.name} logo`}
                  style={{
                    maxHeight: '200px',
                    maxWidth: '200px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                  }}
                />
              </div>

              {/* Content on the right */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', marginBottom: '8px' }}>
                    {club.name}
                  </h2>
                  <p style={{ color: '#4a5568', marginBottom: '16px' }}>{club.description}</p>
                </div>

                <div style={{ borderTop: '1px solid #ccc', paddingTop: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#4a5568', marginTop: '8px' }}>
                    <strong>Facebook Link:</strong>{' '}
                    <a
                      href={club.link}
                      style={{ color: '#3182ce', textDecoration: 'underline', wordBreak: 'break-word' }}
                    >
                      {club.link}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs; 