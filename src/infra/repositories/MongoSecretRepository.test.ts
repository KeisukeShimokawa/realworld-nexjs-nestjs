import { describe, expect, it } from 'vitest';
import mongoose from 'mongoose';
import { MongoSecretRepository } from './MongoSecretRepository';

describe('MongoSecretRepository Tests', () => {
  it('should connect to the database', () => {
    new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      'mongodb://localhost:27017/onetimesecretdb'
    );
  });
});
