import {error, info} from "./utils/logger.mjs";
import {app} from "./app.mjs";
import {dbUrl, port} from "./utils/config.mjs";
import mongoose from "mongoose";

app.listen(port, () => {
	info(`Server running on port ${port}`)

	info('connecting to the database')
	mongoose.connect(dbUrl, { family: 4 })
		.then(() => info('Connected to the database'))
		.catch((err) => error(err.message));
})
