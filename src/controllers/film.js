const { Film, Category } = require("../../models")
const { literal } = require("sequelize")
const path = process.env.FILE_PATH
var getIP = require('ipware')().get_ip;
exports.createFilm = async (req, res) => {
  try {
    const id = JSON.parse(req.userId)
    const thumbnail = req.files.imageFile1[0].filename
    const backdrop = req.files.imageFile2[0].filename

    const film = await Film.create({
      ...req.body,
      thumbnail,
      backdrop,
      UserId: id,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })
    res.status(200).send({
      status: "success",
      data: {
        book: film,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.readMyFilms = async (req, res) => {
  try {
    const id = JSON.parse(req.userId)

    const film = await Film.findAll({
      where: { id },
    })
    res.status(200).send({
      status: "success",
      data: {
        book: film,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.readFilms = async (req, res) => {
  try {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    res.send({})
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
      pesankesalahan: res,
    })
  }
}

exports.readDetailFilm = async (req, res) => {
  try {
    const { id } = req.params
    let book = await Film.findOne({
      where: { id },
      include: [
        {
          model: Category,

          attributes: [
            literal(`(
              SELECT name FROM "Categories"
              WHERE "CategoryId" = id
            )`),
            "name",
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "CategoryId"],
      },
    })

    const parseJSON = JSON.parse(JSON.stringify(book))

    data = [parseJSON].map((item) => {
      return {
        ...item,

        thumbnail: path + item.thumbnail,
      }
    })

    res.send({
      status: "success",
      data: {
        book: data,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}
