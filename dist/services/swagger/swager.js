import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: "API Documentation",
        description: "Automatically generated API docs",
    },
    host: process.env.NODE_ENV === "production"
        ? "your-production-url.com"
        : `localhost:${process.env.PORT || 5000}`,
    schemes: ["http", "https"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/auth/auth.route.js", "./routes/team/team.route.js", "./routes/pokemon/pokemon.route.js"];
// Auto-generate swagger JSON
swaggerAutogen()(outputFile, endpointsFiles, doc);
