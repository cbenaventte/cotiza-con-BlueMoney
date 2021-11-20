const child_process = require('child_process');

child_process.exec('node index.js resultado txt euro 250000', function (err, result) {
  console.log(result)
})