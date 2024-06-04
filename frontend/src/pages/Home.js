import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PromoSection from "../components/Promosection/PromoSection";
import ActualProducts from "../components/ActualProducts/ActualProducts";
import {useMediaQuery} from "react-responsive";

const Home = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    const actualProductsTitleData = [
        {title: "Новые поступления", subtitle: "Откройте для себя предметы, которые вдохновляют. Посмотрите наши новые поступления."},
        {title: "Популярное", subtitle: "Лучшие товары для покупок на этой неделе"},
    ]

    return (
        <>
            <Navbar isMobile={isMobile} />
            <PromoSection isMobile={isMobile} />
            <ActualProducts titleData={actualProductsTitleData[0]}/>

        </>
    );
}

export default Home;