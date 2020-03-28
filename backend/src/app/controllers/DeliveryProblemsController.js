import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblems from '../models/DeliveryProblems';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const problems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!problems) {
      return res.status(400).json({ error: 'No one delivery problems found' });
    }

    return res.json(problems);
  }

  async show(req, res) {
    const deliveryProblem = await DeliveryProblems.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'description'],
    });

    if (!deliveryProblem) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    const { id, delivery_id } = await DeliveryProblems.create({
      delivery_id: req.params.id,
      description,
    });

    return res.json({
      id,
      delivery_id,
      description,
    });
  }

  async delete(req, res) {
    const delivery_problem = await DeliveryProblems.findByPk(req.params.id);

    if (!delivery_problem) {
      return res.status(401).json({ error: 'Delivery problem not found' });
    }

    const { delivery_id } = delivery_problem;

    const delivery = await Delivery.findOne({
      where: { id: delivery_id, canceled_at: null },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return res
        .status(401)
        .json({ error: 'Delivery does not exists or is already canceled' });
    }

    delivery.canceled_at = new Date();

    await Queue.add(CancellationMail.key, {
      delivery,
      delivery_problem,
    });

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryProblemsController();
