const router = require('express').Router({ mergeParams: true });
const Note = require('../models/note');

router.post('/:id/todo/create', async (req, res) => {
  try {
    const { description } = req.body;
    const { title } = req.body;
    const userId = req.params.id;
    const newTodo = await Note.create({
      user_id: userId,
      title: title,
      description: description,
    });
    res.status(200).send(newTodo);
    if (!newTodo) {
      res.status(400).send('Bad request');
    }
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/alltodos', async (req, res) => {
  // try {
  //   const allTodo = await Notes.findAll({
  //     limit: 5,
  //     offset: 10,
  //   });
  //   res.status(200).send(allTodo);
  // } catch (error) {
  //   console.error(error);
  // }

  // const pageAsNumber = Number.parseInt(req.query.page);
  // const sizeAsNumber = Number.parseInt(req.query.size);

  // let page = 0;
  // if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
  //   page = pageAsNumber;
  // }

  // let size = 10;
  // if (
  //   !Number.isNaN(sizeAsNumber) &&
  //   !(sizeAsNumber > 10) &&
  //   !(sizeAsNumber < 1)
  // ) {
  //   size = sizeAsNumber;
  // }
  const userId = req.params.id;
  const size = req.query.size;

  const allTodo = await Note.findAndCountAll({
    where: {
      user_id: userId,
    },
    limit: size,
    // offset: page * size,
    order: [['updatedAt', 'DESC']],
  });
  res.send({
    content: allTodo.rows,
    totalPages: Math.ceil(allTodo.count / Number.parseInt(size)),
  });
});

router.get('/todos/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const todo = await Note.findOne({
      where: {
        id: noteId,
      },
    });
    res.status(200).send(todo);
  } catch (error) {
    console.error(error);
  }
});

router.put('/todos/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    const { title } = req.body;
    const updateTodo = await Note.findOne({
      where: {
        id: id,
      },
    });
    updateTodo.description = description;
    updateTodo.title = title;
    updateTodo.save();
    res.status(200).send(updateTodo);
    res.status(400).send('Bad request');
  } catch (error) {
    console.error(error);
  }
});

router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Note.destroy({
      where: {
        id: id,
      },
    });
    if (!deleteTodo) {
      res.status(404).send('Not Found');
    }
    res.status(200).send('deleted');
  } catch (error) {
    console.error(error);
  }
});

router.delete('/todos/', async (req, res) => {
  try {
    const deleteTodo = await Note.destroy({
      where: {},
      truncate: true,
    });
    res.status(200).send('deleted all');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
