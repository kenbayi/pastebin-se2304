import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pasteServiceApi } from "../services/axios";
import Loader from "../components/loading";
import BackButton from "../components/back";
import { useNavigate } from "react-router";
import Expires from "../components/expires";

interface Paste {
    pasteId: number;
    title: string;
    content: string; 
    author: number;
    createdAt: string;
    expiresAt: string | null; 
    username: string;
    email: string;
}

const PasteDetail = () => {
    const { hash } = useParams<{ hash: string }>();
    const [paste, setPaste] = useState<Paste | null>(null); 
    const [remainingTime, setRemainingTime] = useState<number>(0); 
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const navigate = useNavigate();

    // Function to format time in h:m:s
    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    // Fetch the paste details using the hash when the component mounts
    useEffect(() => {
        const fetchPaste = async () => {
            try {
                const response = await pasteServiceApi.get(`/pastes/get/${hash}`);
                const fetchedPaste = response.data;
                setPaste(fetchedPaste);

                const expiresAt = fetchedPaste.expiresAt ? Date.parse(fetchedPaste.expiresAt) : null;
                const currentTime = Date.now();
                
                if (expiresAt === null || expiresAt > currentTime) {
                    setIsExpired(false);
                    if (expiresAt) {
                        const timeLeft = expiresAt - currentTime;
                        setRemainingTime(timeLeft);
                    }
                } else {
                    setIsExpired(true);
                }
            } catch (error) {
                console.error("Failed to fetch paste:", error);
            }
        };

        fetchPaste();
    }, [hash]);

    // Set up an interval to update remaining time when paste is fetched
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (paste) {
            const expiresAt = paste.expiresAt ? Date.parse(paste.expiresAt) : null;
            interval = setInterval(() => {
                const currentTime = Date.now();
                const timeLeft = expiresAt ? expiresAt - currentTime : null;

                if (timeLeft !== null && timeLeft <= 0) {
                    setIsExpired(true);
                    if (interval) clearInterval(interval); // Stop interval if expired
                } else {
                    setRemainingTime(timeLeft || 0);
                }
            }, 1000);
        }

        // Clear interval on unmount or when paste changes
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [paste]);

    useEffect(() => {
        if (isExpired) {
            const timeout = setTimeout(() => {
                navigate("/");
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [isExpired, navigate]);

    if (isExpired) {
        return <Expires />;
    }

    if (!paste) {
        return <Loader />;
    }

    return (
        <div className="page-container" style={{ margin: "3rem 0 0 5rem" }}>
            <BackButton call={() => navigate("/")}/>
            <div className="paste-form">
                <h1>{paste.title}</h1>
                <p className="text-normal"><strong>Author: {paste.username}</strong></p>
                <textarea readOnly disabled>{paste.content}</textarea>
                {paste.expiresAt ? (
                    <p className="text-normal">
                        <strong>Expires in: {remainingTime > 0 ? formatTime(remainingTime) : "Expired"}</strong>
                    </p>
                ) : (
                    <p className="text-normal"><strong>Non-expirable</strong></p>
                )}
            </div>
        </div>
    );
};

export default PasteDetail;
