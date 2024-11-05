import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} 480px:visible invisible absolute right-0 top-[50%] p-[20px] bg-black hover:bg-black opacity-50`}
            style={{ ...style, zIndex: '1', display: 'flex', border: '2px solid white', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}
            onClick={onClick} />
    )
}

export const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} 480px:visible invisible absolute  left-0 top-[50%] p-[20px] bg-black hover:bg-black opacity-50`}
            style={{ ...style, zIndex: '1', display: 'flex', border: '2px solid white', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}
            onClick={onClick} />
    )
}

const Carousel = () => {
    const responsive = [
        {
            breakpoint: 2350,
            settings: {
                dots: false,
                infinite: true,
                speed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />
            }
        },
        {
            breakpoint: 1850,
            settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />
            }
        },
        {
            breakpoint: 640,
            settings: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />
            }
        },
        {
            breakpoint: 400,
            settings: {
                dots: false,
                infinite: true,
                speed: 500,
                useCss: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            }
        }
    ];

    return (
        <div className=" cursor-pointer">
            <Slider adaptiveHeight={true} responsive={responsive} className="">
                <div>
                    <Link to="/product/6532112c35ca026efd058444">
                        <img className="bg-no-repeat carousel-img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/OnePlus/Flagship/115G/19Aug/D66357764_WLD_OnePlus_Salami_NewLaunch_DesktopTallHero_3000x1200._CB598553099_.jpg" alt="img1" />
                    </Link>
                </div>
                <div>
                    <Link to="/product/65433425ff2dd51bb661f308">
                        <img className="bg-no-repeat carousel-img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/wearables/Boat_SIgma/wave_3000x1200-up._CB596878552_.jpg" alt="img4" />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <img className="bg-no-repeat carousel-img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/tiyesum/iQOOZ7Pro/NewKV/14thAug/D92526702_WLD_iQOO-Z7-Pro-5G_New-Launch_Tall_hero_3000x1200._CB598193729_.jpg" alt="img3" />
                    </Link>
                </div>
                <div>
                    <Link to="/product/6532185135ca026efd0584ed">
                        <img className="bg-no-repeat carousel-img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/Q5B5/Sale-is-live/D87778320_INWLD-WLD-Samsung-Q5B5-NewLaunch-July23_tallhero_3000x1200_2._CB598491787_.jpg" alt="img4" />

                    </Link>
                </div>
                <div>
                    <Link target="_black" to="https://www.primevideo.com/detail/Adipurush/0JIHKJ9VD04K1S5CAGG2QB7PBO">
                        <img className="bg-no-repeat carousel-img" src="https://m.media-amazon.com/images/I/71NvQQcaVfL._SX3000_.jpg" alt="img5" />
                    </Link>
                </div>
            </Slider>
        </div>
    )
}

export default Carousel;
