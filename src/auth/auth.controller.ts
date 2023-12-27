import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	@Post('signup')
	async register(@Body() dto: AuthDto) {}

	@HttpCode(200)
	@Post('signin')
	async login(@Body() dto: AuthDto) {}
}
