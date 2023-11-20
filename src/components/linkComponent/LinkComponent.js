import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styles from "./LinkComponent.module.scss"


const LinkComponent = ({ link }) => {
    const [copied, setCopied] = useState(false);
 


    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    return (
        <div>
            <CopyToClipboard text={link} >
                <AttachFileIcon
                    onClick={handleCopy}
                    className={copied ? `${styles.AttachFileActive}` : `${styles.AttachFileDisactive}`}
                    size={26}
                />
            </CopyToClipboard>
        </div>
    );
};

export default LinkComponent







