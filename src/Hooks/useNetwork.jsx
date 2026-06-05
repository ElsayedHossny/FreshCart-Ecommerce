import React, { useEffect, useState } from 'react'

export default function useNetwork() {

    const [IsOnline, setIsOnline] = useState(true);

    function detectNetwork() {
        window.addEventListener("online", () => {
            setIsOnline(true);
        })
        window.addEventListener("offline", () => {
            setIsOnline(false);
        })
    }

    useEffect(() => {
        detectNetwork();
    }, [])

    return (
        <>
            {!IsOnline ? <div className=" network position-fixed p-3 bg-white shadow-lg z-2 text-danger fw-bold">
                <i className="fa-solid fa-wifi"></i> Network Not Connect
            </div> : ""}
        </>
    )
}
