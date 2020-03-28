import { Op } from 'sequelize';
import * as Yup from 'yup';
import { setHours, isWithinInterval, parseISO } from 'date-fns';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const { docs, pages, total } = await Delivery.paginate({
      where: {
        product: {
          [Op.iLike]: `%${name}%`,
        },
      },
      paginate: 10,
      page,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      delivery: [['id', 'DESC']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      docs,
      page,
      pages,
      total,
    });
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          where: {
            status: true,
          },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found!' });
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
