import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_CREDENTIALS_ERROR,
} from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	login: 'test@test.com',
	password: 'test@test.com',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/signin (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/signin')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				const { access_token } = body;
				expect(access_token).toBeDefined();
			});
	});

	it('/auth/signin (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/signin')
			.send({ ...loginDto, password: '1' })
			.expect(401)
			.then(({ body }: request.Response) => {
				const { message, error, statusCode } = body;
				expect(message).toBe(WRONG_CREDENTIALS_ERROR);
				expect(error).toBe('Unauthorized');
				expect(statusCode).toBe(401);
			});
	});

	it('/auth/signin (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/signin')
			.send({ ...loginDto, login: '1' })
			.expect(401)
			.then(({ body }: request.Response) => {
				const { message, error, statusCode } = body;
				expect(message).toBe(USER_NOT_FOUND_ERROR);
				expect(error).toBe('Unauthorized');
				expect(statusCode).toBe(401);
			});
	});

	afterAll(() => {
		disconnect();
	});
});
