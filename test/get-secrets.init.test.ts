import { describe, expect, it } from 'vitest';

describe('シークレット値を取得するための結合テスト', () => {
  it.todo('シークレット値を取得できる');

  it.todo('シークレット値がDBに登録されていない場合、エラーが返される');

  it('指定したUrlIDが無効な場合、エラーが返される', async () => {
    const response = await request.get('/api/v1/secrets/123_short');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'UrlIdValidationError',
      message: 'UrlIDが短すぎます',
    });
  });
});
