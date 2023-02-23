import React from "react";
import "../Experties/Experties.css";
// import html5 from "../../Images/html5.jpg";
import Images from "../../ImageExport";

const Experties = () => {
  let experties = [
    {
      id: 1,
      icon: Images.html5,
      name: "HTML5",
    },
    {
      id: 2,
      icon: Images.css3,
      name: "CSS3",
    },
    {
      id: 3,
      icon: Images.js,
      name: "JavaScript",
    },
    {
      id: 4,
      icon: Images.ts,
      name: "TypeScript",
    },
    {
      id: 5,
      icon: Images.angular,
      name: "Angular",
    },
    {
      id: 6,
      icon: Images.react,
      name: "React",
    },
    {
      id: 7,
      icon: Images.vue,
      name: "Vue",
    },
    {
      id: 8,
      icon: Images.reactNative,
      name: "React Native",
    },
    {
      id: 9,
      icon: Images.flutter,
      name: "Flutter",
    },
    {
      id: 10,
      icon: Images.ionic,
      name: "Ionic",
    },
    {
      id: 11,
      icon: Images.laravel,
      name: "Laravel",
    },
    {
      id: 12,
      icon: Images.codeignitor,
      name: "CodeIgnitor",
    },
    {
      id: 13,
      icon: Images.iosandroid,
      name: "iOS/Android",
    },
    {
      id: 14,
      icon: Images.nodejs,
      name: "NodeJS",
    },
    {
      id: 15,
      icon: Images.firebase,
      name: "Firebase",
    },
    {
      id: 16,
      icon: Images.mongodb,
      name: "MongoDB",
    },
    {
      id: 17,
      icon: Images.cordova,
      name: "Cordova",
    },
    {
      id: 18,
      icon: Images.capacitor,
      name: "Capacitor",
    },
    {
      id: 19,
      icon: Images.electron,
      name: "Electron",
    },
    {
      id: 20,
      icon: Images.jquerry,
      name: "jQuery",
    },
    {
      id: 21,
      icon: Images.php,
      name: "PHP",
    },
    {
      id: 23,
      icon: Images.aws,
      name: "AWS",
    },
    {
      id: 24,
      icon: Images.swagger,
      name: "Swagger",
    },
    {
      id: 25,
      icon: Images.postman,
      name: "Postman",
    },
    {
      id: 26,
      icon: Images.azure,
      name: "Azure",
    },
    {
      id: 27,
      icon: Images.digitalocean,
      name: "DigitalOcean",
    },
    {
      id: 28,
      icon: Images.ecommerce,
      name: "E-commerce",
    },
    {
      id: 29,
      icon: Images.blockchain,
      name: "Blockchain",
    },
    {
      id: 30,
      icon: Images.api,
      name: "API",
    },
  ];

  return (
    <div className="experties-section py-5">
      <div className="container">
        <h2 className="experties-heading">Experties</h2>
      </div>
      <div className="text-center container experties-container p-5">
        {experties.map((item) => {
          return (
            <div key={item.id}>
              <div className="experties-item">
                <img className="experties-icon" src={item.icon} alt="" />
              </div>
              <div>
                <h6 className="experties-name"> {item.name} </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experties;
