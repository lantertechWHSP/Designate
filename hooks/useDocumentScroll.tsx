import { useEffect, useState } from "react";
import { throttle } from 'lodash';

function useDocumentScrollThrottled(callback) : any {
    const [, setScrollPosition] = useState(0);
    let previousScrollTop:number = 0;

    function handleDocumentScroll() : any {
        const { scrollTop: currentScrollTop } =
      document.documentElement || document.body;

        setScrollPosition((previousPosition) => {
            previousScrollTop = previousPosition;
            return currentScrollTop;
        });

        callback({ previousScrollTop, currentScrollTop });
    }

    const handleDocumentScrollThrottled:any = throttle(handleDocumentScroll, 250);

    useEffect(() => {
        window.addEventListener("scroll", handleDocumentScrollThrottled);

        return () => {
            window.removeEventListener("scroll", handleDocumentScrollThrottled);
        }
    }, []);
}

export default useDocumentScrollThrottled;
