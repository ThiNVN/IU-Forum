// import React, { useState } from 'react';
// import '../styles/gifsearchmodal.css'; // Import your CSS file for styling
// interface GifSearchModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSelectGif: (url: string) => void;
// }

// const GifSearchModal: React.FC<GifSearchModalProps> = ({ isOpen, onClose, onSelectGif }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [gifs, setGifs] = useState<any[]>([]);

//     const fetchGifs = async () => {
//         const API_KEY = 'pFdQhW5AGMvhpOgAf8Gi8EC4j09CAb95';
//         const response = await fetch(
//             `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
//                 searchTerm
//             )}&limit=25`
//         );
//         const { data } = await response.json();
//         setGifs(data);
//     };

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         fetchGifs();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="gif-modal">
//             <form onSubmit={handleSearch}>
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search GIFs"
//                 />
//                 <button type="submit">Search</button>
//             </form>
//             <div className="gif-results">
//                 {gifs.map((gif) => (
//                     <img
//                         key={gif.id}
//                         src={gif.images.fixed_height.url}
//                         alt={gif.title}
//                         onClick={() => {
//                             onSelectGif(gif.images.fixed_height.url);
//                             onClose();
//                         }}
//                     />
//                 ))}
//             </div>
//             <button onClick={onClose}>Close</button>
//         </div>
//     );
// };

// export default GifSearchModal;

// src/frontend/components/GiphyPicker.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GIPHY_API_KEY = 'pFdQhW5AGMvhpOgAf8Gi8EC4j09CAb95';

interface GifSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectGif: (url: string) => void;
}

const GifSearchModal: React.FC<GifSearchModalProps> = ({
    isOpen,
    onClose,
    onSelectGif
}) => {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);

    const fetchGifs = useCallback(
        async (query?: string) => {
            const base = query
                ? 'https://api.giphy.com/v1/gifs/search'
                : 'https://api.giphy.com/v1/gifs/trending';
            const params = new URLSearchParams({
                api_key: GIPHY_API_KEY,
                limit: '10',
                offset: '0',
                rating: 'g'
            });
            if (query) params.set('q', query);
            else params.set('bundle', 'messaging_non_clips');

            const { data } = await axios.get(`${base}?${params.toString()}`);
            setResults(data.data);
        },
        []
    );

    // Fetch trending on open
    useEffect(() => {
        if (isOpen) {
            setSearch('');
            fetchGifs();
        }
    }, [isOpen, fetchGifs]);

    if (!isOpen) return null;

    const handleSearch = () => {
        if (search.trim()) fetchGifs(search.trim());
    };

    return (
        <div style={{ background: '#fff', padding: 16, maxWidth: 600, margin: 'auto' }}>
            <div style={{ display: 'flex', marginBottom: 12 }}>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search GIFs"
                    style={{ flex: 1, marginRight: 8, padding: 8 }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {results.map(gif => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt={gif.title}
                        style={{ cursor: 'pointer', margin: 4, width: 100, height: 100, objectFit: 'cover' }}
                        onClick={() => {
                            onSelectGif(gif.images.original.url);
                            onClose();
                        }}
                    />
                ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: 12 }}>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default GifSearchModal;