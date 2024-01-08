import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

class VacancyDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

class TopPageAdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto extends TimeStamps {
	@IsEnum({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsString()
	alias: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => VacancyDataDto)
	vacancy?: VacancyDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
