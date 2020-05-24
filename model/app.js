var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var Rooms = require("./rooms");
var Users = require("./users");
var uuidv1 = require("uuid/v1");
var app = express();

// view engine setup
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.post("/api/generate", async (req, res) => {
  const newRoomId = uuidv1();
  const usersData = req.body;

  await Rooms.createNew(newRoomId);

  await Promise.all(usersData.map(async user => await Users.createNew(user, newRoomId)));

  res.status(200).json({ roomid: newRoomId, users: usersData });
});

app.get("/api/users", async (req, res) => {
  const users = await Users.readAll(req.query.roomid);
  res.status(200).json({ users });
});

app.post("/api/become_santa", async (req, res) => {
  const { roomid, username } = req.body;
  if (!roomid || !username) {
    res.status(403)
  }

  const response = await Users.changeIsSantaAndFindWisher({ roomid, username });

  res.status(200).json({
    response
  });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const port = process.env.PORT || 5000;
app.listen(port);
