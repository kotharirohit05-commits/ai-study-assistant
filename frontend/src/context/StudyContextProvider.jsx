import { createContext, useContext, useState } from "react";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [studyMaterial, setStudyMaterial] = useState(null);

  return (
    <StudyContext.Provider
      value={{
        studyMaterial,
        setStudyMaterial,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}