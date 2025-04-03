import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWeightClassInput {
    @Field()
    name: string;

    @Field(() => Float)
    maxWeight: number;
}