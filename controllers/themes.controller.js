const db = require("../models");
const fs = require("fs");
const { theme } = require("../models");
const { isArray } = require("util");

const Theme = db.theme;

const createTheme = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a image for theme.`);
    }

    Theme.create({
      name: req.body.name,
      img: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((theme) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + theme.name,
        theme.data
      );

      return res.status(200).send(`Theme has been created.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
const allThemes = (req,res) => {
  Theme.findAll().then( themesArray => {
  var themes = [];

  themesArray.forEach(theme => { 
    var bufferBase64 = ""
    if(theme.img != null){
     bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
    }
    var newTheme = { id:theme.id, name: theme.name, img: bufferBase64}
    themes.push(newTheme);
 }); 
  
  res.status(200).json({
    themes
  });
  }).catch(err => {
    res.status(500).json({
      "error": err
    });
  })
}
const getThemeById = (req, res) => {
  Theme.findOne({
    where: {id: req.params.themeId}
  }).then(theme => {
    var bufferBase64 = ""
    if(theme.img != null){
     bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
    }
    res.status(200).json({
      "theme": { id: theme.id,name: theme.name, img: bufferBase64 }
    });
  }).catch(err => {
    res.status(500).json({
      "error": err
    });
  })
}
module.exports = {
  createTheme,allThemes,getThemeById
};



