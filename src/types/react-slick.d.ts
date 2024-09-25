declare module "react-slick" {
  import { Component } from "react";

  export interface SlickSettings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    // Add any other settings you plan to use
  }

  export default class Slider extends Component<SlickSettings> {}
}
