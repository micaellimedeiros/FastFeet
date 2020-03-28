import Mail from "../../lib/Mail";

class DetailMail {
  get key() {
    return "DetailMail";
  }

  async handle({ data }) {
    const { deliverymanExist, recipientExist, delivery } = data;

    await Mail.sendMail({
      to: `${deliverymanExist.name} <${deliverymanExist.email}>`,
      subject: "Nova entrega",
      template: "delivery",
      context: {
        deliveryman: deliverymanExist.name,
        product: delivery.product,
        recipient: recipientExist.name,
        street: recipientExist.street,
        number: recipientExist.number,
        city: recipientExist.city,
        state: recipientExist.state,
      },
    });
  }
}

export default new DetailMail();
