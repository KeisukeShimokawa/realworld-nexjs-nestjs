import { describe, expect, it, vi } from 'vitest';
import supertest from 'supertest';
import server from '../src/server';
import { SecretModel } from '../src/infra/repositories/SecretModel';

const request = supertest(server);

describe('シークレット値を保存するための結合テスト', () => {
  it('should return an error if the body is not present in the request', async () => {
    const response = await request.post('/api/v1/secrets');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body format is not valid',
    });
  });

  it('should return an error if the body does not have a secret', async () => {
    const response = await request.post('/api/v1/secrets').send({
      hello: 'hi!',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body format is not valid',
    });
  });

  it('should return an error if the secret is not a string', async () => {
    const response = await request.post('/api/v1/secrets').send({
      secret: 1234567890,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Secret is not a string',
    });
  });

  it('should return an error if the secret is too short', async () => {
    const response = await request.post('/api/v1/secrets').send({
      secret: '22',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'SecretValidationError',
      message: 'Secretが短すぎます',
    });
  });

  it('should store a secret and return the UrlId', async () => {
    // mock db
    SecretModel.create = vi.fn();
    const response = await request.post('/api/v1/secrets').send({
      secret: 'myValidSecret22',
    });

    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
  });

  it.todo('should return an unhandled expection error');
});
