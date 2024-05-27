import React from "react";
import "./PromoSection.css";
import bannerImg1 from "../../static/media/banner_img_1.png"
import bannerImg2 from "../../static/media/banner_img_2.png"
import bannerImg3 from "../../static/media/banner_img_3.png"



const MaxiBanner = ({ src, alt, title, text, action_btn }) => {
    return (
        <>
            <img src={src} alt={alt} />
            <div>
                <h2>{title}</h2>
                <p>{text}</p>
                {action_btn ? (
                    <button>action</button>
                ) : null}
            </div>
        </>
    );
}

// const MiniBanner = ({ src, alt, title, text, action_btn }) => {
//     return (
//         <>
//             <img src={src} alt={alt} />
//         <>
//     );
// }

{/*const DesktopPromo = () => {*/}
{/*    return (*/}
{/*        <>*/}
{/*            */}
{/*        </>*/}
{/*    );*/}
{/*}*/}

{/*const MobilePromo = () => {*/}
{/*    return (*/}
{/*        <>*/}
{/*        </>*/}
{/*    );*/}
{/*}*/}

const PromoSection = ({ isMobile }) => {

    const PromoParams = [
        {
            src: bannerImg1, alt: "promo_img_1",
            title: "Все, что нужно для вашего ребенка",
            text: "Гармония стиля и качества. Наши модели не только выглядят потрясающе, но и обеспечивают высочайший уровень комфорта для активной жизни вашего малыша.",
            action_btn: null
        }
    ]

    return (
        <>
            <MaxiBanner {...PromoParams[0]} />
        </>
    );
}

export default PromoSection;