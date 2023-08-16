import React, { useState, useEffect } from 'react';
import Card from "./Card";

export default function InfiniteScroll() {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0);

    const fetchData = () => {
        // Simuler un appel API pour récupérer 10 messages à la fois
        setTimeout(() => {
            // TODO : ajouter les nouveaux messages à ceux déjà présents
            const newMessages = Array.from(
                { length: 10 },
                (_, index) => `Message ${messages.length + index + 1}`
            );
        }, 200);
    };

    const onScroll = () => {
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom) {
            setPage(page => page + 1);
        }
    };

    // TODO : Ajouter un gestionnaire à l'événement scroll de la fenêtre 1 seule fois
    useEffect(() => {});

    // TODO : Charger des messages lorsqu'on est à la fin de la page

    return (
        <>
            <h1>Menu infini : Descendre pour voir les nouveaux messages</h1>
            <Card text="TODO : REMPLACES-MOI PAR LA LISTE DES MESSAGES" index={1} />
        </>
    );
}