import { Op } from 'sequelize';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryProblems from '../models/DeliveryProblems';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { q, page = 1, limit = 5 } = req.query;
    const where = {};

    if (q) {
      where.product = { [Op.iLike]: `%${q}%` };
    }

    const total = await Delivery.count({ where });
    const deliveries = await Delivery.findAll({
      where,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      delivery: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json({
      limit,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
      items: deliveries,
    });
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: DeliveryProblems,
          as: 'problems',
          attributes: ['id', 'description', 'createdAt'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Field validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const { id } = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    await Queue.add(CancellationMail.key, {
      deliveryman,
      product,
      recipient,
    });

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    if (recipient_id && !(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (deliveryman_id && !(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const deliveryUpdated = await delivery.update(req.body);

    return res.json(deliveryUpdated);
  }

  async delete(req, res) {
    const delivery = await Delivery.findOne({
      where: { id: req.params.id, canceled_at: null },
    });

    if (!delivery) {
      return res
        .status(401)
        .json({ error: 'Delivery does not exists or is already canceled' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();
