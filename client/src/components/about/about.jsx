import "./about.scss";
import Image1 from "../../images/about-1.jpeg";

const About = () => {
  return (
    <div id="about">
      <div className="card">
        <h1>About us</h1>
        <p>
          Welcome to Adopt a Dog, your go-to platform for finding your perfect
          furry friend! Our platform is designed to make the adoption process
          easier for both adopters and shelters/rescue organizations. With
          thousands of users visiting our site daily, we are proud to be one of
          the most popular adoption platforms available. Our site is updated
          regularly with new adoption options, so there's always a chance to
          find your new best friend. Whether you're looking to adopt a dog or
          publish an adoption option, our platform is easy to use and navigate.
          We believe that every dog deserves a loving home, and we're here to
          make that happen. Thank you for choosing Adopt a Dog, and we wish you
          the best of luck in finding your new furry companion!
        </p>
        <img src={Image1} alt="about-1" />
      </div>
    </div>
  );
};

export default About;
