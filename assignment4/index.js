const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

const productRoute = require("./routes/product");
const sellerRoute = require("./routes/seller");
const companyRoute = require("./routes/company");



app.get('/', (req, res) => res.send('Welcome to Product Management APIs (EXPRESS)'));

app.use("/product", productRoute);
app.use("/seller", sellerRoute);
app.use("/company", companyRoute);



app.listen(port, () => console.log(`Product Management app listening on port `+ port +`!`));