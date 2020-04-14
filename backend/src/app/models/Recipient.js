import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    sequelizePaginate.paginate(Recipient);
    return this;
  }

  static associate(models) {
    this.hasMany(models.Delivery, {
      foreignKey: 'recipient_id',
      as: 'deliveries',
    });
  }
}

export default Recipient;
