const { story } = require("../models");
const db = require("../models");
const Story = db.story;


exports.createStory = (req, res) => {
  // Save Story to Database
  Story.create({
    title: req.body.title,
    average_rate: req.body.average_rate,
    category: req.body.category,
    tags: req.body.tags,
    userId: req.body.userId,
    theme_id: req.body.theme_id
  })
  .then(story => {
    story.getUser().then(user => {
      story.getTheme().then(theme => {

        var newTheme=  {id: theme.id, name: theme.name  }
        res.status(200).send({
          id: story.id,
          title: story.title,
          category: story.category,
          average_rate: story.average_rate,
          tags: story.tags,
          updatedAt:story.updatedAt,
          createdAt:story.createdAt,
          user : user,
          theme : newTheme,
        
        });
      });
    });
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};

exports.updateStory = (req, res) => {
  const id = req.params.id;
  Story.update(req.body, {
    where: { id: id },
    title: req.body.title,
    average_rate: req.body.average_rate,
    category: req.body.category,
    tags: req.body.tags,
    userId: req.body.userId,
    theme_id: req.body.theme_id
  }).then(story => {
    Story.findOne({
      where: {id: id}
    }).then(story => {
      story.getUser().then(user => {
        story.getTheme().then(theme => {
          var bufferBase64 = ""
          if(theme.img != null){
           bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          }
          var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          res.status(200).send({
            id: story.id,
            title: story.title,
            category: story.category,
            average_rate: story.average_rate,
            tags: story.tags,
            updatedAt:story.updatedAt,
            createdAt:story.createdAt,
            user : user,
            theme : newTheme
          });
        });
      });
    })
  }).catch(err => {
      res.status(500).send({
        message: "Error updating Story with id=" + id + err
      });
    });
};

exports.allStories = (req,res) => {
  Story.findAll().then( storiesArray => {
    var stories = [];
    for (let i = 0; i < storiesArray.length; i++) {
      storiesArray[i].getUser().then(user => {
        storiesArray[i].getTheme().then(theme => {
          //var bufferBase64 = ""
          //if(theme.img != null){
          // bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          //}
          //var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          var newTheme=  {id: theme.id, name: theme.name}
          var finalStory = {
            id: storiesArray[i].id,
            title: storiesArray[i].title,
            category: storiesArray[i].category,
            average_rate: storiesArray[i].average_rate,
            tags: storiesArray[i].tags,
            updatedAt: storiesArray[i].updatedAt,
            createdAt: storiesArray[i].createdAt,
            user : user,
            theme : newTheme
          }
          stories.push(finalStory)
          if(i === storiesArray.length-1){
            res.status(200).json({
              stories
            });
          }
        });
      });
    }
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access all stories",
      "error": err
    });
  })
}
exports.get3LastPostedStories = (req,res) => {
  Story.findAll({ order: [
    ['id', 'DESC'],
],limit: 3}).then( storiesArray => {
    var stories = [];
    for (let i = 0; i < storiesArray.length; i++) {
      storiesArray[i].getUser().then(user => {
        storiesArray[i].getTheme().then(theme => {
          var bufferBase64 = ""
          if(theme.img != null){
           bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          }
          var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          var finalStory = {
            id: storiesArray[i].id,
            title: storiesArray[i].title,
            category: storiesArray[i].category,
            average_rate: storiesArray[i].average_rate,
            tags: storiesArray[i].tags,
            updatedAt:storiesArray[i].updatedAt,
            createdAt:storiesArray[i].createdAt,
            user : user,
            theme : newTheme
          }
          stories.push(finalStory)
          if(i == storiesArray.length-1){
            res.status(200).json({
              stories
            });
          }
        });
      });
    }
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access all stories",
      "error": err
    });
  })
}
exports.getStoryById = (req, res) => {
  Story.findOne({
    where: {id: req.params.storyId}
  }).then(story => {
    story.getUser().then(user => {
      story.getTheme().then(theme => {
        var bufferBase64 = ""
        if(theme.img != null){
         bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
        }
        var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
        res.status(200).send({
          id: story.id,
          title: story.title,
          category: story.category,
          average_rate: story.average_rate,
          tags: story.tags,
          updatedAt:story.updatedAt,
          createdAt:story.createdAt,
          user : user,
          theme : newTheme
        });
      });
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Story Page",
      "error": err
    });
  })
}

exports.getStoriesByCategory = (req, res) => {
  Story.findAll({
    where: {category: req.params.category}
  }).then(storiesArray => {
    var stories = [];
    for (let i = 0; i < storiesArray.length; i++) {
      storiesArray[i].getUser().then(user => {
        storiesArray[i].getTheme().then(theme => {
          var bufferBase64 = ""
          if(theme.img != null){
           bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          }
          var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          var finalStory = {
            id: storiesArray[i].id,
            title: storiesArray[i].title,
            category: storiesArray[i].category,
            average_rate: storiesArray[i].average_rate,
            tags: storiesArray[i].tags,
            updatedAt:storiesArray[i].updatedAt,
            createdAt:storiesArray[i].createdAt,
            user : user,
            theme : newTheme
          }
          stories.push(finalStory)
          if(i == storiesArray.length-1){
            res.status(200).json({
              stories
            });
          }
        });
      });
    }
   
  }).catch(err => {
    res.status(500).json({
      "error": err
    });
  })
}

exports.getStoriesByAuthorid = (req, res) => {
  Story.findAll({
    where: {userId: req.params.authorId}
  }).then(storiesArray => {
    var stories = [];
    for (let i = 0; i < storiesArray.length; i++) {
      storiesArray[i].getUser().then(user => {
        storiesArray[i].getTheme().then(theme => {
          var bufferBase64 = ""
          if(theme.img != null){
           bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          }
          var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          var finalStory = {
            id: storiesArray[i].id,
            title: storiesArray[i].title,
            category: storiesArray[i].category,
            average_rate: storiesArray[i].average_rate,
            tags: storiesArray[i].tags,
            updatedAt:storiesArray[i].updatedAt,
            createdAt:storiesArray[i].createdAt,
            user : user,
            theme : newTheme
          }
          stories.push(finalStory)
          if(i == storiesArray.length-1){
            res.status(200).json({
              stories
            });
          }
        });
      });
    }
   
    
  }).catch(err => {
    res.status(500).json({
      "error": err
    });
  })
}

exports.getLastUpdatedStory = (req, res) => {
  Story.findAll(
    {    where: {userId: req.params.authorId},
    order: [ ['updatedAt', 'DESC'],],limit: 3}).then(storiesArray => {
    var stories = [];
    for (let i = 0; i < storiesArray.length; i++) {
      storiesArray[i].getUser().then(user => {
        storiesArray[i].getTheme().then(theme => {
          var bufferBase64 = ""
          if(theme.img != null){
           bufferBase64 = new Buffer( theme.img, "binary" ).toString("base64");
          }
          var newTheme=  {id: theme.id, name: theme.name, img: bufferBase64 }
          var finalStory = {
            id: storiesArray[i].id,
            title: storiesArray[i].title,
            category: storiesArray[i].category,
            average_rate: storiesArray[i].average_rate,
            tags: storiesArray[i].tags,
            updatedAt:storiesArray[i].updatedAt,
            createdAt:storiesArray[i].createdAt,
            user : user,
            theme : newTheme
          }
          stories.push(finalStory)
          if(i == storiesArray.length-1){
            res.status(200).json({
              stories
            });
          }
        });
      });
    }
   
    
  }).catch(err => {
    res.status(500).json({
      "error": err
    });
  })
}
