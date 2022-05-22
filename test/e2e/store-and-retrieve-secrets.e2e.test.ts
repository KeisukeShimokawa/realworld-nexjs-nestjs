import { beforeAll, describe, it } from 'vitest';
import { SecretModel } from '../../src/infra/repositories/mongo/SecretModel';

describe('Store and Retrieve Secrets E2E Tests', () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({});
  });

  it.todo('should return an error if the secret does not exist', () => {});

  it.todo('should return an error when the secret is too short', () => {});

  it.todo('should store a secret in the system', () => {});

  it.todo('should retrieve that secret from the system', () => {});

  it.todo(
    'should return a not found error trying to retrieve the same urlID',
    () => {}
  );
});
