import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString, IsString, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateEventInput {
    @Field()
    @IsNotEmpty({ message: 'Event name is required' })
    @IsString({ message: 'Event name must be a string' })
    @MaxLength(100, { message: 'Event name must be shorter than 100 characters' })
    name: string;

    @Field()
    @IsNotEmpty({ message: 'Location is required' })
    @IsString({ message: 'Location must be a string' })
    @MaxLength(100, { message: 'Location must be shorter than 100 characters' })
    location: string;

    @Field()
    @IsNotEmpty({ message: 'Date is required' })
    @IsDateString({}, { message: 'Invalid date format' })
    date: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @MaxLength(500, { message: 'Description must be shorter than 500 characters' })
    description?: string;
}