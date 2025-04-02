import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
    @Field(() => Int)
    eventId: number;

    @Field(() => Int)
    fighter1Id: number;

    @Field(() => Int)
    fighter2Id: number;

    @Field({ nullable: true })
    result?: string;

    @Field({ nullable: true })
    method?: string;

    @Field(() => Int, { nullable: true })
    round?: number;
}