import { InputType, Field, Int } from '@nestjs/graphql';
import {IsInt, Min, Max, IsNotEmpty, IsOptional, IsDateString} from 'class-validator';

@InputType()
export class CreateRankingInput {
  @Field(() => Int)
  @IsInt({ message: 'Rank must be an integer' })
  @Min(1, { message: 'Rank cannot be less than 1' })
  @Max(100, { message: 'Rank cannot exceed 100' })
  rank: number;

  @Field(() => Int)
  @IsInt({ message: 'Fighter ID must be an integer' })
  @IsNotEmpty({ message: 'Fighter ID is required' })
  fighterId: number;

  @Field(() => Int)
  @IsInt({ message: 'Weight class ID must be an integer' })
  @IsNotEmpty({ message: 'Weight class ID is required' })
  weightClassId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  date?: Date;
}