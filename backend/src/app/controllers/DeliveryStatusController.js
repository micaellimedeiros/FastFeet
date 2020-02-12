import { Op } from 'sequelize';
import * as Yup from 'yup';

import {
  isAfter,
  isBefore,
  parseISO,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryStatusController {
  async index(req, res) {
    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id: req.body.id },
    });

    if (!checkDeliverymanExists) {
      res.status(400).json({ error: 'This Deliveryman does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.body.id,
        end_date: null,
        canceled_at: null,
      },
    });
    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id },
    });

    if (!checkDeliverymanExists) {
      res.status(400).json({ error: 'This Deliveryman does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        end_date: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object(req.body).shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const startDate = parseISO(req.body.start_date);
    const endDate = parseISO(req.body.end_date);

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    if (isBefore(endDate, startDate)) {
      return res
        .status(400)
        .json({ error: 'Delivery date must be after the withdrawal date' });
    }

    const startInterval = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
    const endInterval = setSeconds(setMinutes(setHours(startDate, 18), 0), 0);

    if (isAfter(startDate, endInterval) || isBefore(startDate, startInterval)) {
      return res.status(400).json({
        error: 'The access is permitted only between 08:00 and 18:00h',
      });
    }

    const { deliveryman_id, delivery_id } = req.params;

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    const deliveryExists = await Delivery.findOne({
      where: { id: delivery_id },
    });

    if (!deliverymanExists && !deliveryExists) {
      return res
        .status(400)
        .json({ error: 'Delivery and Deliveryman does not exists' });
    }

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryBelongsToDeliveryman = await Delivery.findOne({
      where: { id: delivery_id, deliveryman_id },
    });

    if (!deliveryBelongsToDeliveryman) {
      return res.status(401).json({
        error: 'This Delivery does not belogs to Deliveryman',
      });
    }

    const ordersPickupInDay = await Delivery.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    const arrayOfIds = ordersPickupInDay.map(order => order.id);

    if (
      ordersPickupInDay.length < 5 ||
      arrayOfIds.includes(Number(delivery_id))
    ) {
      const data = await deliveryBelongsToDeliveryman.update(req.body, {
        attributes: [
          'id',
          'product',
          'recipient_id',
          'canceled_at',
          'start_date',
          'end_date',
          'signature_id',
        ],
      });

      return res.json(data);
    }

    return res
      .status(401)
      .json({ error: 'The limit is 5 per day, can back tomorrow!' });
  }
}

export default new DeliveryStatusController();
