import * as Sequelize from 'sequelize';
import {sequelize} from '../db.js';
import {randomBytes} from 'crypto';

export type OfferAttributes = Sequelize.InferAttributes<Offer>;
export type OfferCreationAttributes = Sequelize.InferCreationAttributes<Offer>;

export class Offer extends Sequelize.Model<OfferAttributes, OfferCreationAttributes> {
  declare id?: Sequelize.CreationOptional<string>;
  declare destruct_token?: string;
  declare sdp: string;
}

Offer.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    destruct_token: {
      type: Sequelize.STRING,
      defaultValue: randomBytes(32).toString('hex'),
      allowNull: false,
    },
    sdp: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    schema: 'private',
    modelName: 'offer',
    timestamps: true,
    paranoid: true,
  }
);
