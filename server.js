const path = require("path");
let params2 = {
  greeting: "Hello Form!",
};
// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});
let params = {
  greeting: "Welcome to MySpot!",
  nav1: "Sign Up!",
  nav2: "Log In!",
  welcome: "Sign Up Or Log In For More!",
};

// Our main GET home page route, pulls from src/pages/index.hbs
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  // request.query.paramName <-- a querystring example
  return reply.view("/src/pages/index.hbs", params);
});
fastify.get("/signup", function (request, reply) {
  return reply.view("/src/pages/signup.hbs", params);
});
fastify.get("/login", function (request, reply) {
  return reply.view("/src/pages/login.hbs", params);
});
// A POST route to handle form submissions
fastify.post("/", function (request, reply) {
  request.body.form;
  let form = Document.getElementById("form");
  let email = Document.getElementById("EMAIL");
  let pass = Document.getElementById("PASS");
  let conpass = Document.getElementById("CONPASS");
  let error = Document.getElementById("ERROR");
  if (window.href == "signup.hbs") {
    if (
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi) &&
      pass.innerText == conpass.innerText
    ) {
      return reply.view("/src/pages/main.hbs", params2);
    } else if (
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi) != true &&
      pass.innerText == conpass.innerText
    ) {
      error.innerHTML = "Invalid Email";
    } else if (
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi) &&
      pass.innerText != conpass.innerText
    ) {
      error.innerHTML = "Passwords Don't Match";
    } else if (
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi) != true &&
      pass.innerText != conpass.innerText
    ) {
      error.innerHTML =
        "Invalid Email and Passwords Don't Match... Were You Born Yesterday??";
    } else {
      error.innerHTML = "Bruh.";
    }
  }
  if(window.href == "login.hbs") {
    if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
      
    }
  }
});
// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
