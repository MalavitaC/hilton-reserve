import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User, UserSchema, UserDocument } from '../src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (POST)', async () => {
    const res: any = await request(app.getHttpServer()).post('/user').send({
      account: 'test',
      password: 'test',
      role: 0,
    });
    expect(res.body).toMatchObject({ code: 0 });
  });

  afterAll(async () => {
    await app.close();
  });
});
