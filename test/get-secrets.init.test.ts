import { describe, expect, it } from 'vitest';
import supertest from 'supertest';
import server from '../src/server';

const request = supertest(server);

describe('シークレット値を取得するための結合テスト', () => {
  it.todo('シークレット値を取得できる');

  it('シークレット値がDBに登録されていない場合、エラーが返される', async () => {
    const response = await request.get('/api/v1/secrets/ksdfhsalkjsdfhsa');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: 'SecretNotFoundError',
      message: 'Secret was not found',
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

  it.todo('想定していないエラーが返ってきた場合、ステータスコード500を返す');
});
