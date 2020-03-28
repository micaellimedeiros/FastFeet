import Mail from "../../lib/Mail";

class CancellationMail {
  get key() {
    return "CancellationMail";
  }

  async handle({ data }) {
    const { delivery, delivery_problem } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: "Novo cancelamente de encomenda",
      template: "cancel",
      context: {
        deliveryman: delivery.deliveryman.name,
        delivery_id: delivery.id,
        product: delivery.product,
        problem_description: delivery_problem.description,
      },
    });
  }
}

export default new CancellationMail();
