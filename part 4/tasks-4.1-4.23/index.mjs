import {Info} from "./utils/logger.mjs";
import {app} from "./app.mjs";
import {port} from "./utils/config.mjs";

app.listen(port, () => {
	Info(`Server running on port ${port}`)
})
