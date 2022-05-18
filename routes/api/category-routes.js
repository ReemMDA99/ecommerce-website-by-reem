const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//GET routes
router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      attributes: ['id','category_name'],
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ['id','product_name', 'price', 'stock', 'category_id'],
      }
    },
  ).then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//Test in Insomnia

// GET one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ]
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//Test in Insomnia

// POST 
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(dbCategoryData => 
    res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//Test in Insomnia

//PUT 
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {category_name: req.body.category_name},
  {
    where: {
      id: req.params.id
    }
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message:'No category found with this id'});
      return;
    }
    res.json(dbCategoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//Test in Insomnia

//DELETE
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message:'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//Test in Insomnia
module.exports = router;
