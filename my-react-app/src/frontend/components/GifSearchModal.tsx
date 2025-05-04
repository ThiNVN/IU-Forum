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
import React, { useState } from 'react';
import axios from 'axios';

const GIPHY_API_KEY = 'pFdQhW5AGMvhpOgAf8Gi8EC4j09CAb95';

interface GifSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectGif: (url: string) => void;
}

const GifSearchModal: React.FC<GifSearchModalProps> = ({ isOpen, onClose, onSelectGif }) => {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);

    const searchGiphy = async () => {
        const res = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${search}&limit=10&offset=0`
        );
        setResults(res.data.data);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={{ background: '#fff', padding: 10 }}>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search GIFs"
            />
            <button onClick={searchGiphy}>Search</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {results.map(gif => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt={gif.title}
                        style={{ cursor: 'pointer', margin: 5 }}
                        onClick={() => onSelectGif(gif.images.original.url)}
                    />
                ))}
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default GifSearchModal;