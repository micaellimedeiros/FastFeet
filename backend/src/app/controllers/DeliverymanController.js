import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const { docs, pages, total } = await Deliveryman.paginate({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'email'],
      paginate: 10,
      page,
      delivery: [['id', 'DESC']],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({ docs, page, pages, total });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: {
        exclude: ['avatar_id'],
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman already exist' });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      where: { status: true },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { email } = req.body;

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res
          .status(401)
          .json({ error: 'This e-mail is already in use!' });
      }
    }

    const { id, avatar_id, name } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      where: { status: true },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy(deliveryman);

    return res.status(200).json({
      message: `${deliveryman.name} deleted with success`,
    });
  }
}

export default new DeliverymanController();
