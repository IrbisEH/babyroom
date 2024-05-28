import React from "react";
import "./PromoSection.css";
import bannerImg1 from "../../static/media/banner_img_1.png"
import bannerImg2 from "../../static/media/banner_img_2.png"
import bannerImg3 from "../../static/media/banner_img_3.png"



const MaxiBanner = ({ src, alt, title, text, btn_text }) => {
    return (
        <article className="maxi_banner">
            <div className="maxi_banner__wrapper">
                <img src={src} alt={alt}/>
                <div className="maxi_banner__text_wrapper">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    {btn_text ? (
                        <button>{btn_text}</button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

const MiniBanner = ({src, alt, title, text, btn_text}) => {
    return (
        <article className="mini_banner">
            <div className="mini_banner__wrapper">
                <img src={src} alt={alt}/>
                <div className="mini_banner__text_wrapper">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    {btn_text ? (
                        <button>{btn_text}</button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

const DesktopPromoSection = (PromoParams) => {
    return (
        <section className="desktop_promo_section">
            <div className="desktop_promo_section__wrapper">
                <div className="desktop_promo__left_side">
                    <MaxiBanner {...PromoParams[0]} />
                </div>
                <div className="desktop_promo__right_side">
                    <MiniBanner {...PromoParams[1]} />
                    <MiniBanner {...PromoParams[2]} />
                </div>
            </div>
        </section>
    )
}


const PromoSection = ({isMobile}) => {

    const PromoParams = [
        {
            src: bannerImg1, alt: "promo_img_1",
            title: "Все, что нужно для вашего ребенка",
            text: "Гармония стиля и качества. Наши модели не только выглядят потрясающе, но и обеспечивают высочайший уровень комфорта для активной жизни вашего малыша.",
            btn_text: "В каталог"
        },
        {
            src: bannerImg2, alt: "promo_img_2",
            title: "одежда из хлопка",
            text: "Безопасно для здоровья малыша",
            btn_text: null
        },
        {
            src: bannerImg3, alt: "promo_img_3",
            title: "Baby",
            text: "Новый образ",
            btn_text: "В каталог"
        }
    ]

    return (
        <>
            <DesktopPromoSection {...PromoParams} />
        </>
    );
}

export default PromoSection;