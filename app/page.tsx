"use client";
import Image from 'next/image'
import {useEffect, useState, useRef} from 'react';
import {CSVLink, CSVDownload} from "react-csv";

export default function Home() {
    useEffect(() => {
        if(youtubeJsonData?.length > 0) {
            return;
        };
        fetchYoutubeData();
    }, []);
    const [youtubeJsonData,
        setyoutubeJsonData] = useState < any > ([]);
    const youtubeJsonDataRef = useRef(youtubeJsonData);

    const [csvData,
        setcsvData] = useState < any > ([])
    const [download,
        setDownload] = useState(false);

    const [youtube_video_url,
        setyoutube_video_url] = useState < any > ("");
    const change_youtube_video_url = (e : any) => {
        e.preventDefault();
        setyoutube_video_url(e.target.value);
    };

    const fetchYoutubeData = async() => {
        try {
            const response = await fetch('api/fetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const staticData = await response.json();
            setyoutubeJsonData(staticData.message);
            youtubeJsonDataRef.current = staticData.message;
        } catch (error) {
            console.error('An error occurred while fetching the YouTube data:', error);
        }
    };



    const handleUpdate = async(jsondata : any, category : any) => {
        if (category === "skip") {
            setyoutubeJsonData(youtubeJsonData
                ?.slice(1) || []);
        } else {
            const response = await fetch(`/api/${category}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsondata)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.message); // "Item updated successfully"

            setyoutubeJsonData(youtubeJsonData
                ?.slice(1) || []);
        };
    };

    const handleBad = (jsondata : any) => {
        handleUpdate(jsondata, "bad");
    };

    const handleGood = (jsondata : any) => {
        handleUpdate(jsondata, "good");
    };

    const handleSkip = (jsondata : any) => {
        handleUpdate(jsondata, "skip");
    };

    async function handleKeyDown(e : any) {
        if (!(youtubeJsonDataRef.current.length > 0)) {
            return;
        }
        switch (e.key) {
            case "ArrowLeft":
                handleBad(youtubeJsonDataRef.current[0]);
                break;
            case "ArrowRight":
                handleGood(youtubeJsonDataRef.current[0]);
                break;
        }
    };

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };

        return () => cleanup();
    }, []);

    const handleDownload = async(e : any) => {
        e.preventDefault();
        fetch('http://localhost:8080/get_reviewed_results', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        }).then(async(e) => {
            const staticData = await e
                ?.json();
            console.log(staticData);
            setcsvData(staticData);
            setDownload(true);
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            {youtubeJsonData
                ?.length && <div> {
                    youtubeJsonData
                        ?.length + " "
                }
                total </div>}

            <br/>

            <div className="card w-150 bg-base-100 shadow-xl">

            {youtubeJsonData[0]
                ?.video_id && <iframe
                    height="315"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeJsonData[0]?.video_id}?autoplay=0&mute=0`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}
                <div className="card-body">
                    <h2 className="card-title">{youtubeJsonData[0]
                            ?.title}

                    </h2>
                    <span>
                        <a
                            target='_blank'
                            href={`https://www.youtube.com/watch?v=${youtubeJsonData[0]
                            ?.video_id}`}>
                            {`https://www.youtube.com/watch?v=${youtubeJsonData[0]
                            ?.video_id}`}
                        </a>
                    </span>
                    <div className="card-actions justify-center">
                        <button
                            onClick={(e) => handleSkip(youtubeJsonData[0])}
                            className="btn btn-primary">Skip</button>
                        <button
                            onClick={(e) => handleGood(youtubeJsonData[0])}
                            className="btn btn-secondary">Good</button>
                        <button
                            onClick={(e) => handleBad(youtubeJsonData[0])}
                            className="btn btn-accent">Bad</button>
                    </div>
                    <div className="d-flex justify-center flex-col">
                        <div className="badge ">Left arrow (Bad)</div>
                        <div className="badge ">Right arrow (Good)</div>
                    </div>
                </div>
            </div>
            <br/>
        </main>
    )
}
