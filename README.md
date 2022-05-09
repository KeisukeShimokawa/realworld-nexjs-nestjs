# Outside-in TDD

書籍[「実践テスト駆動開発」](https://www.amazon.co.jp/%E5%AE%9F%E8%B7%B5%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA-Object-Oriented-SELECTION-Freeman/dp/4798124583/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1YXVQ95Q37X6U&keywords=%E5%AE%9F%E8%B7%B5%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA&qid=1652128682&sprefix=%E5%AE%9F%E8%B7%B5%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA%2Caps%2C322&sr=8-1) で紹介された TDD は、モックを多用した設計手法を使用して外側からソフトウェアを構築していく「アウトサイドイン」な TDD である。

これはケントベックの「テスト駆動開発」で紹介された、ドメイン周りのロジックから設計を行なっていく「インサイドアウト」な TDD とは異なる手法である。

このリポジトリでは、ロンドン派の TDD を検証する。

ベースとして下記の講座を活用する。

- [Building APIs doing Outside-in TDD in Node and TypeScript](https://www.udemy.com/course/building-apis-doing-outside-in-tdd-in-node-and-typescript/learn/lecture/29854486#overview)

実現する機能は以下になる。

- `POST /api/v1/secrets`
  - 入力されたシークレット値を保存する
  - シークレット値は後から URL ベースで取得できる
  - 最低でも 3 文字
- `GET /api/v1/secrets/<secret value>`
  - 入力されたシークレット値を取得する
  - 一度だけ取り出すことができる
  - 取り出した後は削除される
  - アクセスする URL には最低でも 10 文字の値が必要
  - 存在しない場合エラーを返す
  - 期限が失効していた場合は、エラーを返す

## 環境構築

```bash
npm init -y

npm install --save-dev typescript @types/node vitest c8

npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  prettier \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-unused-imports
```
