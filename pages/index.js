import anime from 'animejs';
import { useEffect } from 'react'
import styles from "../styles/Store.module.css";
import Head from "next/head";




export default function Home() {

    useEffect(() => {
        anime(
            {
                targets: '.title',
                opacity: [0, 100],
                delay: 0,
                easing: 'easeInOutExpo',
                duration: 3000,
            });

        anime({
            targets: '.subtitle',
            opacity: [0, 100],
            delay: 500,
            easing: 'easeInOutExpo',
            duration: 3000,
        })

        anime({
            targets: '.tshirt',
            opacity: [0, 100],
            delay: 1000,
            easing: 'easeInOutExpo',
            duration: 3000,
        })

    }, [])

    return (
        <div className={styles.storeContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet" />
            </Head>
            <h1 className={`${styles.title} title`}>Clothing</h1>
            <h2 className={`${styles.subtitle} subtitle`}>great prices!</h2>
                <a rel="ar" href="/mp3.usdz#applePayButtonType=buy&checkoutTitle=BUY%20NICE%20SHIRT&checkoutSubtitle=SIZE%20SMALL&price=$15">
                    <img
                        src="/tshirt.png"
                        alt="COP THIS LOOK"
                        className={`${styles.tshirt} tshirt`}
                        width={500}
                        height={500}
                    />
                </a>
                <span className={'tshirt'}>NICE TSHIRT</span>

        </div>
    )
}
