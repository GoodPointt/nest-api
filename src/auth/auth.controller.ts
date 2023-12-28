import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('signup')
	async signup(@Body() dto: AuthDto) {
		const existedUser = await this.authService.findUser(dto.login);
		if (existedUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('signin')
	async signin(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);
		return this.authService.login(email);
	}
}
