import React from "react";
import { NavLink } from "react-router-dom";
import "./PromoSection.css";
import bannerImg1 from "../../static/media/banner_img_1.png"
import bannerImg2 from "../../static/media/banner_img_2.png"
import bannerImg3 from "../../static/media/banner_img_3.png"

const Banner = ({ src, alt, title, text, btn_text, banner_type, path_to }) => {
    return (
        <>
            <img src={src} alt={alt}/>
            <div className={banner_type ? "banner__text_wrapper mini" : "banner__text_wrapper"}>
                <h1>{title}</h1>
                <p>{text}</p>
                {btn_text && path_to ? (
                    <NavLink className="link" to={path_to}>
                        {banner_type ? (
                            <p>{btn_text + " >"}</p>
                        ) : (
                            <button>{btn_text}</button>
                        )}
                    </NavLink>
                ) : null}
            </div>
        </>
    );
}

const DesktopPromoSection = (PromoParams) => {
    return (
        <section className="promo_section">
            <div className="banner__left_side">
                <Banner {...PromoParams[0]} />
            </div>
            <div className="banner__right_side">
                <div className="banner_right_top_side">
                    <Banner {...PromoParams[1]} />
                </div>
                <div className="banner_right_bottom_side">
                    <Banner {...PromoParams[2]} />
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
            btn_text: "В каталог",
            path_to: "/catalog"
        },
        {
            src: bannerImg2, alt: "promo_img_2",
            title: "одежда из хлопка",
            text: "Безопасно для здоровья малыша",
            btn_text: null,
            // btn_text: "В каталог",
            banner_type: "mini"
        },
        {
            src: bannerImg3, alt: "promo_img_3",
            title: "Baby",
            text: "Новый образ",
            btn_text: "В каталог",
            banner_type: "mini",
            path_to: "/catalog"
        }
    ]

    return (
        <>
            <DesktopPromoSection {...PromoParams} />
        </>
    );
}

export default PromoSection;