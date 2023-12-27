import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	descriprion: string;
}

export interface TopPageModel extends Base {}
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ unique: true })
	alias: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvantage] })
	advatages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}