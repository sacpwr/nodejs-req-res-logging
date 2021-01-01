let moment = require("moment");

exports.logReqResBody = (req, res, next) => {
  let enterDateTime = moment();
  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);

    let exitDateTime = moment();
    var body = Buffer.concat(chunks).toString("utf8");
    // console.log(req.path);
    // console.log(res.getHeaders());
    // console.log(body);

    // console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    let incomming =
      exitDateTime.format("YYYY-MM-DD HH:mm:ss.SSS") +
      " outgoing request uri(method : " +
      req.method +
      ") :" +
      req.ip.split(":")[3] +
      ":" +
      req.socket.localPort +
      req.originalUrl;

    console.log("************** API Response Details ***************");
    console.log("API : ", incomming);
    console.log("Headers : ", res.getHeaders());
    console.log("Body : ", body);
    console.log("Query : ", req.query);
    console.log("Params : ", req.params);
    console.log(
      "ElapsedTime : ",
      exitDateTime.diff(enterDateTime, "milliseconds"),
      "milliseconds"
    );
    console.log("**************************************************");

    oldEnd.apply(res, arguments);
  };

  // console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  let incomming =
    enterDateTime.format("YYYY-MM-DD HH:mm:ss.SSS") +
    " incoming request uri(method : " +
    req.method +
    ") :" +
    req.ip.split(":")[3] +
    ":" +
    req.socket.localPort +
    req.originalUrl;

  console.log("************** API Request Details ***************");
  console.log("API : ", incomming);
  console.log("Headers : ", req.headers);
  console.log("Body : ", req.body);
  console.log("Query : ", req.query);
  console.log("Params : ", req.params);
  console.log("**************************************************");

  next();
};
