import { describe, expect, it, vi } from 'vitest';
import mongoose from 'mongoose';
import { MongoSecretRepository } from './MongoSecretRepository';
import { UrlId } from '../../domain/models/UrlId';
import { SecretModel } from './SecretModel';
import { Secret } from '../../domain/models/Secret';

describe('MongoSecretRepository Tests', () => {
  it('should connect to the database', () => {
    mongoose.connect = vi.fn();

    new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      'mongodb://localhost:27017/onetimesecretdb'
    );
  });

  it('should not connect to the database when connection is already established', () => {
    mongoose.connect = vi.fn();
    mongoose.connection.readyState = 1;

    new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(0);
  });

  it('should return a null object when the secret is not found', async () => {
    SecretModel.findOne = vi.fn().mockResolvedValueOnce(null);
    mongoose.connect = vi.fn();
    mongoose.connection.readyState = 1;

    const urlId = new UrlId('sdjhfaasjaf');
    const mongoSecretRepository = new MongoSecretRepository();

    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBeNull();
    expect(mongoose.connect).toBeCalledTimes(0);
  });

  it('should return the secret when it is found', async () => {
    SecretModel.findOne = vi.fn().mockResolvedValueOnce({ secret: 'sjdhfas' });
    mongoose.connect = vi.fn();
    mongoose.connection.readyState = 1;

    const urlId = new UrlId('sdjhfaasjaf');
    const mongoSecretRepository = new MongoSecretRepository();

    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toEqual(
      new Secret('sjdhfas')
    );
    expect(mongoose.connect).toBeCalledTimes(0);

    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: 'sdjhfaasjaf' });
  });

  it('should remove a secret from the database', async () => {
    SecretModel.deleteOne = vi.fn();
    mongoose.connect = vi.fn();
    mongoose.connection.readyState = 1;

    const urlId = new UrlId('sdjhfaasjaf');
    const mongoSecretRepository = new MongoSecretRepository();
    await mongoSecretRepository.removeSecretByUrlId(urlId);

    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith({ urlId: 'sdjhfaasjaf' });
  });

  it('should store urlId and Secret into the database', async () => {
    SecretModel.create = vi.fn();
    mongoose.connect = vi.fn();
    mongoose.connection.readyState = 1;

    const urlId = new UrlId('sdjhfaasjaf');
    const secret = new Secret('sajdgfgsadfdsahfs');
    const mongoSecretRepository = new MongoSecretRepository();
    await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);

    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({
      urlId: 'sdjhfaasjaf',
      secret: 'sajdgfgsadfdsahfs',
    });
  });
});
