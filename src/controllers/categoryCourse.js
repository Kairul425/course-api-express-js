const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const getAllCategory = async (req, res) => {
  try {
    const categories = await prisma.courseCategory.findMany({
      include: { courses: { select: { nameCourse } } },
    });

    res.status(200).json({
      message: "get all category success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.courseCategory.findFirst({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    res.status(200).json({
      message: "get by id success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file.filename;
  const url = `${req.protocol}://${req.get("host")}/images/${image}`;

  try {
    const category = await prisma.courseCategory.create({
      data: { name, image, imageUrl: url },
    });
    res.status(201).json({
      message: "User Created success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  const category = await prisma.courseCategory.findFirst({
    where: { id: parseInt(id) },
  });

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  try {
    if (req.file) {
      const filePath = `./public/images/${category.image}`;
      fs.unlinkSync(filePath);

      const { name } = req.body;
      const image = req.file.filename;
      const url = `${req.protocol}://${req.get("host")}/images/${image}`;

      await prisma.courseCategory.update({
        where: { id: parseInt(id) },
        data: { name, image, imageUrl: url },
      });

      res.status(201).json({
        message: "updated success",
      });
    } else {
      const { name } = req.body;
      await prisma.courseCategory.update({
        where: { id: parseInt(id) },
        data: { name },
      });

      res.status(201).json({
        message: "updated success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await prisma.courseCategory.findFirst({
    where: { id: parseInt(id) },
  });

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  try {
    // Hapus gambar dari folder
    const filePath = `./public/images/${category.image}`;
    fs.unlinkSync(filePath);

    // Hapus kategori dari database
    await prisma.courseCategory.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Delete category success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllCategory,
  createNewCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
