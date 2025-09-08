import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [experience, setExperience] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);


    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, experience, setExperience, isMobile, setIsMobile }}>
            {children}
        </SearchContext.Provider>
    )
}

// export const useSearch = () => {
//     return useContext(Searchcontext);
// }

export const useSearch = () => useContext(SearchContext);