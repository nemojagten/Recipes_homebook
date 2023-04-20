import { useEffect, useState } from 'react';
import {IoWarning, IoCheckmarkSharp} from 'react-icons/io5';
import styles from './GlobalMessage.module.css';
import clsx from 'clsx';


export function GlobalMessage({ children, type = "success", onMessageClosed }) {
    const [isShown, setIsShown]=useState(false);
    useEffect (() => {
        if (children) {
            setIsShown(true);
            setTimeout(() => {
                setIsShown(false);
                onMessageClosed();
            }, 5000);
        }        
    }, [children]);



    if (!children || !isShown){
        return null;
    }

    return(
        <div className={styles['message-container']}>
            <div className={clsx(styles.dialog, styles[type])}>
                {type === 'error' && <IoWarning/>}
                {type === 'success' && <IoCheckmarkSharp/>}
                {children}</div>
        </div>
        
    ) ;
    

}