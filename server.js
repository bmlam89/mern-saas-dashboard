const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const helmet = require('helmet');
const morgan = require('morgan');
const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes/sales.js");

//data imports
//const User = require("./models/User.js");
//const Product = require("./models/Product.js");
//const ProductStat = require("./models/ProductStat.js");
const Transaction = require("./models/Transaction");
const OverallStat = require("./models/OverallStat");
const AffiliateStat = require("./models/AffiliateStat");

/*const { 
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
 } = require("./data/index.js");*/

/* CONFIGURATION */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'hient/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
    res.send('Api running')
  })
}
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));