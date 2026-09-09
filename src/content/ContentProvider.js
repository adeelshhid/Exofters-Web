import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { defaultPortfolio, defaultProducts, defaultServices, defaultSettings } from "./defaultContent";

const ContentContext = createContext(null);
const collections = { products: defaultProducts, portfolio: defaultPortfolio, services: defaultServices };

export function ContentProvider({ children }) {
  const [content, setContent] = useState({ products: defaultProducts, portfolio: defaultPortfolio, services: defaultServices, settings: defaultSettings });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stops = Object.entries(collections).map(([name, fallback]) => onSnapshot(
      query(collection(db, name), orderBy("order", "asc")),
      snapshot => { setConnected(true); if (!snapshot.empty) setContent(current => ({ ...current, [name]: snapshot.docs.map(item => ({ id: item.id, ...item.data() })) })); },
      () => setConnected(false)
    ));
    const settingsStop = onSnapshot(doc(db, "site", "settings"), snapshot => {
      if (snapshot.exists()) setContent(current => ({ ...current, settings: { ...defaultSettings, ...snapshot.data() } }));
    });
    return () => { stops.forEach(stop => stop()); settingsStop(); };
  }, []);

  const saveItem = async (type, item) => {
    const id = item.id || `${type}-${Date.now()}`;
    const { id: unused, ...data } = item;
    await setDoc(doc(db, type, id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
  };
  const removeItem = (type, id) => deleteDoc(doc(db, type, id));
  const saveSettings = data => setDoc(doc(db, "site", "settings"), { ...data, updatedAt: serverTimestamp() }, { merge: true });

  const value = useMemo(() => ({ ...content, connected, saveItem, removeItem, saveSettings }), [content, connected]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
export const useContent = () => useContext(ContentContext);
