// //PM2 Config

module.exports = {
  apps : [{
    script    : "./server/index.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}