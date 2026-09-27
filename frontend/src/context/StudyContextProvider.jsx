import { createContext, useContext, useEffect, useState } from "react";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [studyMaterial, setStudyMaterial] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <StudyContext.Provider
      value={{
        studyMaterial,
        setStudyMaterial,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}