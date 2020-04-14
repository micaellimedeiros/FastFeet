import { Op } from 'sequelize';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const { docs, pages, total } = await Recipient.paginate({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      paginate: 10,
      page,
      delivery: [['id', 'DESC']],
    });

    return res.json({ docs, page, pages, total });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(7)
        .max(10),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().notRequired(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Field validation fails' });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
      },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({ recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cep: Yup.string()
        .min(8)
        .max(11),
      street: Yup.string(),
      number: Yup.string().when('street', (street, field) =>
        street ? field.required() : field
      ),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string().when('state', (state, field) =>
        state ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Field validation fails' });
    }
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    const {
      name,
      number,
      street,
      complement,
      city,
      cep,
      state,
    } = await recipient.update(req.body);

    return res.json({
      name,
      number,
      street,
      complement,
      city,
      cep,
      state,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found.' });
    }

    await recipient.destroy();

    return res.status(204).send();
  }
}

export default new RecipientController();
