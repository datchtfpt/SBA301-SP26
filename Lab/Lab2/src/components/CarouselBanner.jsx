import { Carousel, Image } from "react-bootstrap";
import React from "react";

function CarouselBanner({banners}) {
    return (
    <Carousel fade interval={3000} className="mb-5">
        {banners.map((banner) => (
            <Carousel.Item key={banner.id}>
                <Image
                    className="d-block w-100"
                    src={banner.image}
                    alt={banner.title}
                    style={{ objectFit: 'cover', maxHeight: '450px' }}
                />
                <Carousel.Caption style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px' }}>
                    <h3>{banner.title}</h3>
                    <p>{banner.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
    );
}
export default CarouselBanner;