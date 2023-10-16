const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

export default stripe;