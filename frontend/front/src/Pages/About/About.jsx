import React from "react";

const About = () => {

  //about projects
  
  return (
    <div className="container" style={{ marginTop: "51px" }}>
      <h4>About Page</h4>
      <p>
        The goal of this project is to create a simplified interface for an ERP
        (Enterprise Resource Planning) system, designed to manage basic business
        operations efficiently.
      </p>
      <p>
        <strong>
          1.Dashboard - Provides an overview of the system's features. <br />
          2.Products Management - Allows for the management of product listings.{" "}
          <br />
          3.Orders Management - Facilitates viewing and handling orders. <br />
          4.Orders Calendar View - A calendar interface displaying orders based
          on their expected delivery dates. <br />
        </strong>
      </p>
      <strong>Project demonstration video</strong>
      <video width="100%" height="500" controls autoPlay >
      <source src="../../assets/video1.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
     </video>

     <br /> 
     <br /> 
     <br />
     <br />
     
     <strong>Responsiveness checking video</strong>
     <video width="100%" height="500" controls autoPlay > 
      <source src="../../assets/video2.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
     </video>
    </div>
  );
};

export default About;
