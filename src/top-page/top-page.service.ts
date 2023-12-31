import { Injectable } from '@nestjs/common';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { Types } from 'mongoose';
import { addDays } from 'date-fns';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel)
		private readonly topPageModel: ModelType<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		// return this.topPageModel
		// 	.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
		// 	.exec();
		// return this.topPageModel
		// 	.aggregate()
		// 	.match({
		// 		firstCategory,
		// 	})
		// 	.group({
		// 		_id: { secondCategory: '$secondCategory' },
		// 		pages: {
		// 			$push: {
		// 				alias: '$alias',
		// 				title: '$title',
		// 				_id: '$_id',
		// 				category: '$category',
		// 			},
		// 		},
		// 	})
		// 	.exec();
		return this.topPageModel
			.aggregate([
				{
					$match: {
						firstCategory,
					},
				},
				{
					$group: {
						_id: { secondCategory: '$secondCategory' },
						pages: {
							$push: {
								alias: '$alias',
								title: '$title',
								_id: '$_id',
								category: '$category',
							},
						},
					},
				},
			])
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel
			.find({ $text: { $search: text, $caseSensitive: false } })
			.exec();
	}

	async findByVacancyUpdate(date: Date) {
		return this.topPageModel
			.find({
				firstCategory: 0,
				$or: [
					{ vacancy: { $lt: addDays(date, -1) } },
					{ vacancy: { $exists: false } },
				],
			})
			.exec();
	}
}
