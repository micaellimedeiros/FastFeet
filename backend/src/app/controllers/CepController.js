import axios from 'axios';

class CepController {
  async show(req, res) {
    const { cep } = req.body;

    try {
      const formattedCep = cep.replace('-', '');

      const { data } = await axios.get(
        `http://viacep.com.br/ws/${formattedCep}/json/`
      );

      return res.json({
        street: data.logradouro,
        city: data.localidade,
        state: data.uf,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'This CEP is Invalid. Verify and try again.' });
    }
  }
}

export default new CepController();
