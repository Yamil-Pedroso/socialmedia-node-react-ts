import linkedin from './svg/linkedin.svg';
import twitter from './svg/twitter.svg';
import carla from './jpg/carla.jpg';
import jane from './jpg/jane.jpg';
import emily from './jpg/emily.jpg';
import maggie from './jpg/maggie.jpg';

interface IImage {
    [key: string]: string;
    }

const images: IImage = {
    linkedin,
    twitter,
    carla,
    jane,
    emily,
    maggie,
};

export default images;
