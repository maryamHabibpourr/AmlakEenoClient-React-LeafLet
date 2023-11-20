import React from 'react'
import styles from "./MediaSharing.module.scss"

//react share
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookMessengerShareButton,
} from "react-share";


//media icon
import twitter from "../../assets/twitter.png"
import facebook from "../../assets/facebook.png"
import telegram from "../../assets/telegram.png"
import whatsApp from "../../assets/whatsApp.png"
import messenger from "../../assets/messenger.png"
import mail from "../../assets/mail.png"


//card
import Card from '../../components/card/Card';



function MediaSharing({ setShareOpen }) {
    return (
        <section className={styles.mediaSharing}>
            <div className={styles.mediaSharingContainer}>
                <Card cardClass={styles.card}>
                    <div className={styles.titleCloseBtn}>
                        <button
                            onClick={() => {
                                setShareOpen(false);
                            }}
                        >
                            X
                        </button>
                    </div>

                    <div className={styles.mediaIcons}>
                        <FacebookShareButton
                            url={"https://peing.net/ja/"}
                            quote={"フェイスブックはタイトルが付けれるようです"}
                            hashtag={"#hashtag"}
                            description={"aiueo"}
                            className="Demosome-networkshare-button"
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <img src={facebook} alt="faceBook" style={{ width: "40px", height: "40px" }} />
                            <span style={{ fontSize: "13px" }}>Facebook</span>
                        </FacebookShareButton>

                        <TwitterShareButton
                            title={"test"}
                            url={"https://peing.net/ja/"}
                            hashtags={["hashtag1", "hashtag2"]}
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <img src={twitter} alt="twitter" style={{ width: "40px", height: "40px" }} />
                            <span style={{ fontSize: "13px" }}>Twitter</span>
                        </TwitterShareButton>


                        <TelegramShareButton
                            title={"test"}
                            url={"https://peing.net/ja/"}
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <img src={telegram} alt="telegram" style={{ width: "30px", height: "30px" }} />
                            <span style={{ fontSize: "13px" }}>Telegram</span>
                        </TelegramShareButton>

                        <WhatsappShareButton
                            title={"test"}
                            url={"https://peing.net/ja/"}
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <img src={whatsApp} alt="whatsapp" style={{ width: "30px", height: "30px" }} />
                            <span style={{ fontSize: "13px" }}>WhatsApp</span>
                        </WhatsappShareButton>


                        <EmailShareButton
                            subject={"Subject"}
                            body={"Body"}
                            url={"https://peing.net/ja/"}
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <img src={mail} alt="mail" style={{ width: "40px", height: "40px" }} />
                            <span style={{ fontSize: "13px" }}>Email</span>
                        </EmailShareButton>

                        <FacebookMessengerShareButton
                            appId={"YOUR_APP_ID"}
                            url={"https://peing.net/ja/"}
                            style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <img src={messenger} alt="messenger" style={{ width: "40px", height: "40px" }} />
                            <span style={{ fontSize: "13px" }}>Messenger</span>
                        </FacebookMessengerShareButton>

                    </div>
                </Card>
            </div >
        </section >
    )
}

export default MediaSharing