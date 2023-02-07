import React from "react";
import "../Experties/Experties.css";
// import html5 from "../../Images/html5.jpg";
import Images from "../../ImageExport";

const Experties = () => {
  let experties = [
    {
      icon: Images.html5,
      name: "HTML5",
    },
    {
      icon: Images.css3,
      name: "CSS3",
    },
    {
      icon: Images.js,
      name: "JavaScript",
    },
    {
      icon: Images.ts,
      name: "TypeScript",
    },
    {
      icon: Images.angular,
      name: "Angular",
    },
    {
      icon: Images.react,
      name: "React",
    },
    {
      icon: Images.vue,
      name: "Vue",
    },
    {
      icon: Images.reactNative,
      name: "React Native",
    },
    {
      icon: Images.flutter,
      name: "Flutter",
    },
    {
      icon: Images.ionic,
      name: "Ionic",
    },
    {
      icon: Images.laravel,
      name: "Laravel",
    },
    {
      icon: Images.codeignitor,
      name: "CodeIgnitor",
    },
    {
      icon: Images.iosandroid,
      name: "iOS/Android",
    },
    {
      icon: Images.nodejs,
      name: "NodeJS",
    },
    {
      icon: Images.firebase,
      name: "Firebase",
    },
    {
      icon: Images.mongodb,
      name: "MongoDB",
    },
    {
      icon: Images.cordova,
      name: "Cordova",
    },
    {
      icon: Images.capacitor,
      name: "Capacitor",
    },
    {
      icon: Images.electron,
      name: "Electron",
    },
    {
      icon: Images.jquerry,
      name: "jQuery",
    },
    {
      icon: Images.php,
      name: "PHP",
    },
    {
      icon: Images.aws,
      name: "AWS",
    },
    {
      icon: Images.swagger,
      name: "Swagger",
    },
    {
      icon: Images.postman,
      name: "Postman",
    },
    {
      icon: Images.azure,
      name: "Azure",
    },
    {
      icon: Images.digitalocean,
      name: "DigitalOcean",
    },
    {
      icon: Images.ecommerce,
      name: "E-commerce",
    },
    {
      icon: Images.blockchain,
      name: "Blockchain",
    },
    {
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
          console.clear();
          return (
            <div>
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
