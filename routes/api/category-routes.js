const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryProduct = await Category.findAll({
      include: Product,
    });
    res.json(categoryProduct);
  } catch (error) {
    console.error('Error Getting Categories: ', error)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!singleCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(singleCategory);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ error: 'Error getting category' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {

    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Error creating category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;

    const updatedCategory = await Category.update(req.body, {
      where: {
        id: categoryId
      }
    });
      
      if (updatedCategory[0] === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category updated successfully' });
      } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Error updating category' });
      }
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;

    const deletedCount = await Category.destroy({
      where: { id: categoryId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;
