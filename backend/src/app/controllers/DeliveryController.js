import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import DetailMail from '../jobs/DetailMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'zipcode',
            'number',
            'state',
            'city',
            'complement',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object(req.body).shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { deliveryman_id, recipient_id, product } = req.body;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!(checkDeliverymanExists || checkRecipientExists)) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    await Queue.add(DetailMail.key, {
      delivery,
      deliveryman,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object(req.body).shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!(checkDeliverymanExists || checkRecipientExists)) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const { id, product } = await delivery.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not exists' });
    }

    await Delivery.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new DeliveryController();
