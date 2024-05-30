import React from "react";
import "./PromoSection.css";
import bannerImg1 from "../../static/media/banner_img_1.png"
import bannerImg2 from "../../static/media/banner_img_2.png"
import bannerImg3 from "../../static/media/banner_img_3.png"



const Banner = ({ src, alt, title, text, btn_text }) => {
    // для управления стиля кнопки добавлять или удаляьть классы
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

const DesktopPromoSection = (PromoParams) => {
    const promoParams = PromoParams[0];
    return (
        <section className="promo_section">
            <div className="banner__wrapper">
                <img src={promoParams.src} alt={promoParams.alt} />
                <div className={"banner__text_wrapper"}>
                    <h1>{promoParams.title}</h1>
                    <p>{promoParams.text}</p>
                    <button>{promoParams.btn_text}</button>
                </div>
            </div>


            {/*<div className="desktop_promo_section__wrapper">*/}
            {/*    <div className="desktop_promo__left_side">*/}
            {/*        /!*<Banner {...PromoParams[0]} />*!/*/}
            {/*    </div>*/}
            {/*    <div className="desktop_promo__right_side">*/}
            {/*        /!*<Banner {...PromoParams[1]} />*!/*/}
            {/*        /!*<Banner {...PromoParams[2]} />*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
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