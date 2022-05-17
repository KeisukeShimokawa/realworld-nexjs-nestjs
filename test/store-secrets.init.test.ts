import { describe, it } from 'vitest';
import supertest from 'supertest';
import server from '../src/server';

const request = supertest(server);

describe('シークレット値を保存するための結合テスト', () => {
  it.todo('should return an error if the body is not present in the request');

  it.todo('should return an error if the body does not have a secret');

  it.todo('should return an error if the secret is not a string');

  it.todo('should return an error if the secret is too short');

  it.todo('should store a secret and return the UrlId');

  it.todo('should return an unhandled expection error');
});
