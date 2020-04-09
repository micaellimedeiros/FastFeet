import { Op } from 'sequelize';
import * as Yup from 'yup';
import { setHours, isWithinInterval, parseISO } from 'date-fns';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryProblems from '../models/DeliveryProblems';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { q } = req.query;
    const where = {};

    if (q) {
      where.product = { [Op.iLike]: `%${q}%` };
    }

    const deliveries = await Delivery.findAll({
      where,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
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
        {
          model: DeliveryProblems,
          as: 'problems',
          attributes: ['id', 'description', 'createdAt'],
        },
      ],
    });
    return res.json(deliveries);
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

    const { recipient_id } = req.body;

    const recipientExist = await Recipient.findByPk(recipient_id);

    if (!recipientExist) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    const { deliveryman_id } = req.body;

    const deliverymanExist = await Deliveryman.findByPk(
      req.body.deliveryman_id
    );

    if (!deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const { id, product } = req.body;

    const delivery = await Delivery.create({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });

    await Queue.add(CancellationMail.key, {
      deliverymanExist,
      recipientExist,
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const deliveryExists = await Delivery.findByPk(req.params.id);

    if (!deliveryExists) {
      return res.status(401).json({ error: 'Delivery not found!' });
    }

    const { start_date } = req.body;

    if (start_date) {
      const formattedDate = parseISO(start_date);
      const start_hour = setHours(new Date(), 8);
      const end_hour = setHours(new Date(), 18);

      if (
        !isWithinInterval(formattedDate, {
          start: start_hour,
          end: end_hour,
        })
      ) {
        return res.json({
          error: 'You can only withdraw an delivery between 08:00 and 18:00!',
        });
      }
    }

    const delivery = await deliveryExists.update(req.body);

    return res.json(delivery);
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
