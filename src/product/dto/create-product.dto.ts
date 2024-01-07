import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import {
	IsNumber,
	IsString,
	IsOptional,
	IsArray,
	ValidateNested,
} from 'class-validator';

class ProductCharecteristicDto {
	@IsString()
	name: string;

	@IsString()
	value: string;
}
export class CreateProductDto extends TimeStamps {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharecteristicDto)
	characteristics: ProductCharecteristicDto[];
}
