const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const getAllCourse = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { category: { select: { name: true } } },
    });
    res.status(200).json({
      message: "get all courses success",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findFirst({
      where: { id: parseInt(id) },
      include: { category: { select: { name: true } } },
    });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    res.status(200).json({
      message: "get course success",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewCourse = async (req, res) => {
  const { name, categoryId } = req.body;
  const image = req.file.filename;
  const url = `${req.protocol}://${req.get("host")}/images/${image}`;

  try {
    await prisma.course.create({
      data: {
        name,
        image,
        imageUrl: url,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json({
      message: "create new course success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(id) },
  });

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  try {
    if (req.file) {
      const filePath = `./public/images/${course.image}`;
      fs.unlinkSync(filePath);

      const { name, categoryId } = req.body;
      const image = req.file.filename;
      const url = `${req.protocol}://${req.get("host")}/images/${image}`;

      await prisma.course.update({
        where: { id: parseInt(id) },
        data: {
          name,
          image,
          imageUrl: url,
          categoryId: parseInt(categoryId),
        },
      });

      res.status(201).json({ message: "course update success" });
    } else {
      const { name, categoryId } = req.body;

      await prisma.course.update({
        where: { id: parseInt(id) },
        data: { name, categoryId: parseInt(categoryId) },
      });

      res.status(201).json({ message: "course update success" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(id) },
  });

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  try {
    const imagePath = `./public/images/${course.image}`;
    fs.unlinkSync(imagePath);

    await prisma.course.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "course deleted success" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
