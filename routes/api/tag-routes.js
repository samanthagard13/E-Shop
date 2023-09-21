const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(allTags);
  } catch (error) {
    console.error('Error getting all tags: ', error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    const singleTag = await Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(singleTag);
  } catch (error) {
    console.error('Error finding tag: ', error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      include: [
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
      ],
    });
    res.json(newTag);
  } catch (error) {
    console.error('Error creating new tag: ', error);
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const updateTag = await Tag.update(tagId, {

    });

    res.json(updateTag);
  } catch (error) {
    console.error('Error updating tag: ', error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;
    const deleteId = await Tag.destroy({
      where: { id: tagId },
    });

    res.json({message: 'Tag deleted.'}, deleteId);
  } catch (error) {
    console.error('Error deleting tag: ', error);
  }
});

module.exports = router;
