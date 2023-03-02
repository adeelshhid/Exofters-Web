import React from "react";
import { Button } from "react-bootstrap";
import "./Portfolio.css";
import Images from "../../ImageExport";

const Portfolio = () => {
  let root = document.getElementById("root");
  root.style.opacity = 0.3;
  setTimeout(() => {
    root.style.opacity = 1;
  }, 500);

  const portfolio = [
    {
      id: 1,
      name: "eTraffic",
      img: Images.etraffic,
      text: `
      <p className="project-text">
      This application is provided in collaboration with Ministry of Interior - General Directorate of Traffic (GDT), United Insurance Company, Ministry of Oil (MOO) and Information and eGovernment Authority (iGA), in the Kingdom of Bahrain, to allow users to benefit from the following services:

<br />
      - My Traffic Record
<br />
      
      - View Driving Licenses, Vehicle and Plate Numbers Ownerships
<br />
      
      - Update Contact Details
<br />
      
      - Quick Services which include:
<br />
      
- Payment of Traffic Contraventions
<br />
      
- Vehicle Registration Renewal
<br />
      
- License Registration Renewal
<br />
- And many more.
      </p>
      `,
    },
    {
      id: 2,
      name: "Feba",
      img: Images.feba,
      text: `<p className="project-text">
      Feba web radio is a Non-denominational Gospel radio with a passion and a mission to broadcast Hope.We are addressing the issues of individuals, youth, women, families and communities and builds trusted relationships with its audiences. We are addressing the different social issues and assisting the communities through social actions such as education, health care, disaster relief, spiritual and economic development. We are sharing God’s love in remotest areas as well as in urban and most advanced audiences in order to bridge the gaps among different communities. Our programs are on air through Short wave, FM and Internet in the heart language of the listeners. We are trying to reach the unreached or least reached areas with the unchanging Word of God through our broadcasts.
      </p>`,
    },
    {
      id: 3,
      name: "Guest",
      img: Images.guest,
      text: `
      <p className="project-text">
      Guest App is the perfect solution for anyone who loves to travel. With this app, users can easily book flights, hotels, and other travel services at the touch of a button. It provides a convenient way to keep up with flight schedules, find the best deals on accommodations and spas as well.
      </p>
      `,
    },
    {
      id: 4,
      name: "Ivory",
      img: Images.ivory,
      text: `
      <p className="project-text">
      Ivory is a unique fashion brand committed to bringing finest quality products with a perfect fit of the latest trends for women. Ivory understands the needs of women, creating products with passion focused in showing the feminine part. Since 1997, Ivory has been addressing women aged between 24 and 50.
      </p>
      `,
    },
    {
      id: 5,
      name: "iWish",
      img: Images.iwish,
      text: `
      
      <p className="project-text">
      This is an app that allows you to leave behind thoughts and words that you want to convey to your loved ones in case something happens to you.

<br />
There are people who carry grief and pain in their hearts from the loss of a loved one.
<br />

Some have lost a loved one due to an accident.
<br />

Others have been separated by misunderstandings or differences.
<br />

And many others have been separated by tragic wars.

<br />

And there are people who are missing from disasters, and who cannot be reached in areas where Wi-Fi and phone lines are disrupted with no connectivity.

<br />

This is an app that allows you to leave words and thoughts you want to convey to people you love when it’s really needed. It allows you to send words and thoughts from where you are right now, so you can leave your love and care, and leave your last words in your voice and in video, as precious memories for your loved ones.
      </p>
      `,
    },
    {
      id: 6,
      name: "Owner's Info",
      img: Images.ownersinfo,
      text: `
      <p className="project-text">
      
The Owner's Info app helps users locate lost or stolen mobile devices, and rewards them for their find. It uses proprietary technology to pinpoint the exact location of a device, making it easier than ever to find what you're looking for. With its simple user interface which shows the actual owner's information on the lock screen even if the mobile is not unlocked.
      </p>
      `,
    },
    {
      id: 7,
      name: "Pent House Chat",
      img: Images.penthouse,
      text: `
      <p className="project-text">
      
Pent House Chat is an easy-to-use, modern messaging solution for internal teams. With Pent House Chat, teams can quickly and efficiently discuss any aspect of their current tasks with one another through chat messages, voice notes, and media messages. It provides a secure platform to communicate and discuss the highly confidential jobs.
      </p>
      `,
    },
    {
      id: 8,
      name: "Quraan Radio",
      img: Images.quranradio,
      text: `
      <p className="project-text">
      Quran Radio is an amazing app that provides an audio stream of the Quran with translation in up to 12 languages 24/7. It is a great way to listen to the Quran and understand it in your own language. The app also provides a variety of audio recitations from renowned reciters, making it a great resource for those who want to learn and understand the Quran. With its easy-to-use interface, Quran Radio is the perfect way to stay connected to the Quran and its teachings.
      </p>
      `,
    },
    {
      id: 9,
      name: "X-Liquidus",
      img: Images.xliquidus,
      text: `
      <p className="project-text">
      XLiquidus is an innovative blockchain application based in the United States that provides a secure and efficient platform for digital asset trading. It enables users to easily and securely trade digital assets such as cryptocurrencies, tokens, and other digital assets. XLiquidus offers a wide range of features, including a user-friendly interface, advanced security protocols, and a powerful matching engine. With XLiquidus, users can quickly and easily access the digital asset market, allowing them to make informed decisions and maximize their profits. XLiquidus also provides users with access to a variety of liquidity sources, allowing them to quickly and easily find the best prices for their digital assets. XLiquidus is the perfect platform for those looking to get involved in the digital asset market.
      </p>
      `,
    },
  ];

  return (
    <>
      {/* Main Section */}
      <div className="port-hero-section">
        <p className="port-main-text2">Our customers are all over the world</p>
        <Button href="/contact" className="port-start-btn">
          Bring Your Project Here!
        </Button>
      </div>

      {/* Portfolio Section */}

      <div className="projects-container">
        <div>
          <h2 className="port-heading">Portfolio</h2>
        </div>
        <div className="row pt-4 projects-row">
          {portfolio.map((item) => {
            if (item.id % 2 === 0) {
              return (
                <>
                  {/* <div className=""> */}
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="project-name">{item.name}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.text,
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 pt-5 prt-img-wrapper">
                    <img src={item.img} alt="" className="port-img" />
                  </div>
                  {/* </div> */}
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.text,
                      }}
                    ></div>
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
                  <img
                    src={item.img}
                    alt=""
                    className="port-img"
                    style={{ marginTop: "18px" }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 pt-5 d-flex flex-column justify-content-center align-items-center">
                  <h3 className="project-name">{item.name}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.text,
                    }}
                  ></div>
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
