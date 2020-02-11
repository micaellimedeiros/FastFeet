import Mail from '../../lib/Mail';

class DetailMail {
  get key() {
    return 'DetailMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Detalhes da entrega`,
      template: 'Detail',
      context: {
        product: delivery.product,
        deliveryman: deliveryman.name,
        recipientName: recipient.name,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientZipCode: recipient.zipcode,
        recipientCity: recipient.city,
        recipientState: recipient.state,
        recipientComplement: recipient.complement || 'Não informado',
      },
    });
  }
}

export default new DetailMail();
