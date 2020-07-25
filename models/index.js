const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = Promise;
const url = process.env.DATABASE_URI || "mongodb://localhost/warbler";
mongoose.connect(url, {
	keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
