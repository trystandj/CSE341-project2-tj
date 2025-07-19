/* eslint-disable no-undef */
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Project 2 API",
    description: "API documentation for the Project application",
  },

  tags: [
    {
      name: "Home",
      description: "Home page operations",
    },
    {
      name: "Books",
      description: "Operations related to Books",
    },
    {
      name: "Authors",
      description: "Operations related to Authors",
    },
    
  ],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

