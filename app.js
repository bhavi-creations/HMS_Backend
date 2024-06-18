const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
 


app.use(cors());
app.use(bodyParser.json());
app.use ('/',userRoutes);
  

 




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});