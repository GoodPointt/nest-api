import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: ModelType<ReviewModel>,
	) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		const deletedReview = (await this.reviewModel
			.findByIdAndDelete(id)
			.lean()
			.exec()) as DocumentType<ReviewModel> | null;

		return deletedReview;
	}

	async findByProductId(
		productId: string,
	): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) })
			.exec();
	}

	async deleteByProductId(
		productId: string,
	): Promise<{ acknowledged: boolean; deletedCount: number }> {
		return this.reviewModel
			.deleteMany({ productId: new Types.ObjectId(productId) })
			.exec();
	}
}
