import { newObjecToastState, toastState } from "@/States/Common"
import { useEffect } from "react";
import { useRecoilState } from "recoil"

export default function Toast({ onClose }) {
    const [notification, setNotification] = useRecoilState(toastState)

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(newObjecToastState);
          }, 5000);
          return () => clearTimeout(timer);
    });

    return <>
        {notification.message != null ? <div
            className={`fixed bottom-0 left-0 right-0  text-white p-4 text-center opacity-100 z-50"
                } transition-opacity duration-300`}
        >
            <div className={`${notification.color} inline-block p-4 rounded-full`}>
                {notification.message}
            </div>
        </div> : null}
    </>;
};