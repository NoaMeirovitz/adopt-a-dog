const config = require("config");
const app = require("./http-server");

const PORT = config.get("port");

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
