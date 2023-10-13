import {Offer, OfferAttributes, OfferCreationAttributes} from '../models/offer.js';
import {NotFoundError, DatabaseError} from '../errors.js';
import {EmptyResultError} from 'sequelize';

/**
 * Adds a RTCPeerConnection offer to the db for later retrieval.
 * @throws {DatabaseError} if the offer could not be created.
 * @throws {Error} for any other error.
 */
export async function createOffer(props: OfferCreationAttributes): Promise<OfferAttributes> {
  try {
    const res = await Offer.create(props);
    return res.get();
  } catch (err) {
    if (err instanceof Error) {
      throw new DatabaseError(err);
    }
    throw new Error(err.toString());
  }
}

/**
 * Retrieves a RTCPeerConnection offer from the db.
 * @param id UUID of the offer to retrieve.
 * @throws {NotFoundError} if the offer is not found.
 * @throws {Error} for any other error.
 */
export async function readOffer(id: string): Promise<OfferAttributes> {
  try {
    const res = await Offer.findByPk(id, {rejectOnEmpty: true});
    return res.get();
  } catch (err) {
    if (err instanceof EmptyResultError)
      throw new NotFoundError(`Offer with id ${id} not found`);
    
    if (err instanceof Error) {
      throw new DatabaseError(err);
    }
    throw new Error(err.toString());
  }
}

/**
 * 
 * @param props 
 * @throws {DatabaseError} for any database error.
 * @throws {Error} for any other error.
 */
export async function listOffer(props: OfferAttributes): Promise<OfferAttributes[]> {
  try {
    const res = await Offer.findAll({where: props});
    return res.map((offer) => offer.get());
  } catch (err) {
    if (err instanceof Error) {
      throw new DatabaseError(err);
    }
    throw new Error(err.toString());
  }
}

/**
 * Deletes an RTCPeerConnection offer from the db 
 * @throws {DatabaseError} for any database error.
 * @throws {Error} for any other error.
 */
export async function deleteOffer(props: OfferAttributes): Promise<number> {
  try {
    return await Offer.destroy({where: props});
  } catch (err) {
    if (err instanceof Error) {
      throw new DatabaseError(err);
    }
    throw new Error(err.toString());
  }
}