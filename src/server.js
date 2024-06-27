const app = require('.');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB();
  `Server is listening on PORT ${PORT}`;
});
