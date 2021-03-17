const brain = require("brain.js");
const fs = require("fs");
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 6,
  hiddenLayers: [10],
  outputSize: 6,
});

fs.readFile("amc.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const datalength = data.split("\n").length;
  const mydata = data.split("\n").map((x, index) => {
    // return [datalength - index, ...x.split(",").slice(1, 7)];
    return x.split(",").slice(1, 7);
  });
  var myreversedata = [];
  for (var j = 0; j < mydata.length; j++) {
    myreversedata.push(mydata[mydata.length - j - 1]);
  }
  console.log(myreversedata);
  //   net.train([
  //     [1, 3],
  //     [2, 2],
  //     [3, 1],
  //   ]);

  //   const output = net.run([
  //     [1, 3],
  //     [2, 2],
  //   ]); // [3, 1]
  net.train(myreversedata);
  const output = net.forecast(myreversedata, 3);

  console.log(output);
});
