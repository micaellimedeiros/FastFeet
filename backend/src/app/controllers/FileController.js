import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, key: path, size } = req.file;

    const file = await File.create({
      name,
      path,
      size,
    });

    return res.json(file);
  }
}
export default new FileController();
