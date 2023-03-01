import React from "react";
import { Button } from "react-bootstrap";
import "./Portfolio.css";
import Images from "../../ImageExport";

const Portfolio = () => {

  let root = document.getElementById("root")
  root.style.opacity = 0.3
  setTimeout(() => {
    root.style.opacity = 1
  }, 500)

  const portfolio = [
    {
      id: 1,
      name: "eTraffic",
      img: Images.etraffic,
    },
    {
      id: 2,
      name: "Feba",
      img: Images.feba,
    },
    {
      id: 3,
      name: "Guest",
      img: Images.guest,
    },
    {
      id: 4,
      name: "Ivory",
      img: Images.ivory,
    },
    {
      id: 5,
      name: "iWish",
      img: Images.iwish,
    },
    {
      id: 6,
      name: "Owner's Info",
      img: Images.ownersinfo,
    },
    {
      id: 7,
      name: "Pent House",
      img: Images.penthouse,
    },
    {
      id: 8,
      name: "Quraan Radio",
      img: Images.quranradio,
    },
    {
      id: 9,
      name: "X-Liquidus",
      img: Images.xliquidus,
    },
  ];

  return (
    <>
      {/* Main Section */}
      <div className="port-hero-section">
        <p className="port-main-text2">Our customers are all over the world</p>
        <Button className="port-start-btn">Bring Your Project Here!</Button>
      </div>

      {/* Portfolio Section */}

      <div className="projects-container">
        <div>
          <h2 className="port-heading">Portfolios</h2>
        </div>
        <div className="row pt-4 projects-row">
          {portfolio.map((item) => {
            if (item.id % 2 === 0) {
              return (
                <>
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="project-name">{item.name}</h3>
                    <p className="project-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis sit dicta explicabo, porro culpa esse ex,
                      distinctio quas magni harum corporis est, impedit dolores
                      labore. Praesentium velit animi culpa dignissimos?
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5">
                    <img src={item.img} alt="" className="port-img" />
                  </div>
                </>
              );
            } else
              return (
                <>
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5">
                    <img src={item.img} alt="" className="port-img" />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="project-name">{item.name}</h3>
                    <p className="project-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis sit dicta explicabo, porro culpa esse ex,
                      distinctio quas magni harum corporis est, impedit dolores
                      labore. Praesentium velit animi culpa dignissimos?
                    </p>
                  </div>
                </>
              );
          })}
        </div>
        <div className="row projects-row2 pt-5">
          {portfolio.map((item) => {
            return (
              <>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <img src={item.img} alt="" className="port-img" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 pt-5 d-flex flex-column justify-content-center align-items-center">
                  <h3 className="project-name">{item.name}</h3>
                  <p className="project-text pb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis sit dicta explicabo, porro culpa esse ex,
                    distinctio quas magni harum corporis est, impedit dolores
                    labore. Praesentium velit animi culpa dignissimos?
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
