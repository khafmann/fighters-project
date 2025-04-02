import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRankingInput } from './create-ranking.input';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

@InputType()
export class UpdateRankingInput extends PartialType(CreateRankingInput) {
    @Field(() => Int)
    @IsInt({ message: 'ID must be an integer' })
    id: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt({ message: 'Rank must be an integer' })
    @Min(1, { message: 'Rank cannot be lower than 1' })
    rank?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt({ message: 'Fighter ID must be an integer' })
    fighterId?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt({ message: 'Weight class ID must be an integer' })
    weightClassId?: number;
}