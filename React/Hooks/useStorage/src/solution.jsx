import { useState, useEffect } from "react";

export default function useStorage(key, defaultData, isSession = false) {
    const storage = isSession ? sessionStorage : localStorage;
    const [data, setData] = useState(
        JSON.parse(storage.getItem(key)) || String(defaultData)
    );

    useEffect(() => {
        storage.setItem(key, JSON.stringify(data));
    }, [data, key]);

    useEffect(() => {
        window.addEventListener('storage', (e) => {
            if (e.key === null) {
                setData(String(defaultData));
            }
        });
    }, []);

    return [data, setData];
};