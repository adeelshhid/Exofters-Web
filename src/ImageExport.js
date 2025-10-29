const BASE_URL = "https://exofters.io/images/";

const createImageUrl = (filename) => {
  const url = `${BASE_URL}${filename}`;
  // console.log('Loading image:', url);
  return url;
};

const Images = {
  aboutBg: createImageUrl("about-bg.png"),
  angular: createImageUrl("angular.png"),
  aws: createImageUrl("aws.png"),
  ceo1: createImageUrl("ceo1.jpg"),
  companylogo: createImageUrl("companylogo.png"),
  etraffic: createImageUrl("etraffic.jpg"),
  feba: createImageUrl("feba.jpg"),
  firebase: createImageUrl("firebase.png"),
  flutter: createImageUrl("flutter.png"),
  guest: createImageUrl("guest.jpg"),
  ivory: createImageUrl("ivory.jpg"),
  iwish: createImageUrl("iwish.jpg"),
  mainImg: createImageUrl("main-img.jpg"),
  mongodb: createImageUrl("mongodb.png"),
  nodejs: createImageUrl("nodejs.png"),
  ownersinfo: createImageUrl("ownersinfo.jpg"),
  penthouse: createImageUrl("penthouse.jpg"),
  php: createImageUrl("php.png"),
  python: createImageUrl("python.png"),
  quraanradio: createImageUrl("quraanradio.jpg"),
  react: createImageUrl("react.png"),
  tensorflow: createImageUrl("tensorflow.png"),
  xliquidus: createImageUrl("xliquidus.jpg"),
};

export default Images;
