const countIp = {};

exports.ipCounter = async (req, res) => {
  try {
    const{socket:{remoteAddress}} = req
    const IP = remoteAddress.split(':')[3]
    if (!countIp[IP]) {
      countIp[IP] = 1
    }
    else {
      countIp[IP] = countIp[IP] + 1
    }
    if (countIp[IP] === 3) {
      console.log("Anjar")
    }
    res.send({data: countIp})
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "server error",
      error,
    })
  }
}
