import { describe, expect, it, vi } from 'vitest';
import supertest from 'supertest';
import server from '../../src/server';
import { SecretModel } from '../../src/infra/repositories/mongo/SecretModel';
import mongoose from 'mongoose';

const request = supertest(server);

describe('シークレット値を取得するための結合テスト', () => {
  it('シークレット値を取得できる', async () => {
    SecretModel.findOne = vi.fn().mockResolvedValueOnce({ secret: 'mySecret' });
    SecretModel.deleteOne = vi.fn();
    mongoose.connection.readyState = 1;

    const response = await request.get('/api/v1/secrets/ksdfhsalkjsdfhsa');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      secret: 'mySecret',
    });
  });

  it('シークレット値がDBに登録されていない場合、エラーが返される', async () => {
    SecretModel.findOne = vi.fn().mockResolvedValueOnce(null);
    mongoose.connection.readyState = 1;

    const response = await request.get('/api/v1/secrets/ksdfhsalkjsdfhsa');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });

  it('指定したUrlIDが無効な場合、エラーが返される', async () => {
    const response = await request.get('/api/v1/secrets/123_short');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'UrlIdValidationError',
      message: 'UrlIDが短すぎます',
    });
  });

  it('想定していないエラーが返ってきた場合、ステータスコード500を返す', async () => {
    SecretModel.findOne = vi.fn().mockImplementationOnce(async () => {
      throw new Error('Connection refused');
    });
    mongoose.connection.readyState = 1;

    const response = await request.get('/api/v1/secrets/ksdfhsalkjsdfhsa');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      name: 'InternalServerError',
      message: 'Something went wrong',
    });
  });
});
