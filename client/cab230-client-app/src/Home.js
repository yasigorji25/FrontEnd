import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Col,
  Jumbotron,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Header />
      <PictureAnimation />
      <Welcome />
    </main>
  );
}
// pictures for the home page.
const items = [
  {
    src: "https://gardner.utah.edu/wp-content/uploads/184.jpg"
  },
  {
    src:
      "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/videoblocks-stock-exchange-market-growth-trend-animation-background_b08gd4rvf_thumbnail-full14.png"
  },
  {
    src:
      "https://pixelz.cc/wp-content/uploads/2018/08/stock-market-electronic-chart-bullish-uhd-4k-wallpaper.jpg"
  }
];
// animation for 3 images in the homepage.
const PictureAnimation = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width="900px" height="400px" />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

// Navbar at the top of the home page.
const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/stocks/symbols">Stock List</NavLink>
            </NavItem>
          </Nav>
          <Link to="/user/login">
            <Button
              color="info"
              type="loginButton"
              class="btn btn-outline-info btn-margin-left"
              width="200p"
            >
              login
            </Button>
          </Link>
          <Col sm={{ size: "auto", offset: 0.1 }}></Col>
          <Link to="/user/register">
            <Button
              color="info"
              type="registerButton"
              class="button"
              width="200p"
            >
              Register
            </Button>
          </Link>
        </Collapse>
      </Navbar>
    </div>
  );
};
// welcome message in the home page
const Welcome = props => {
  return (
    <div>
      <Container>
        <h3 className="display-6" className="text-info">
          Welcome to the Stock Analyst.
        </h3>
        <p className="lead" color="info">
          {" "}
          Click on Stocks to see the available companies, Quote to get the
          latest price information by stock symbol, or choose Price History to
          sample from the most recent one hundred days of information for a
          particular stock.{" "}
        </p>
      </Container>
    </div>
  );
};
