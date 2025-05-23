import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    nickname?: string;

    @Field()
    birthDate: Date;

    @Field()
    nationality: string;

    @Field()
    height: number;

    @Field()
    weight: number;

    @Field(() => Int, { nullable: true })
    weightClassId?: number;

    @Field(() => Int, { defaultValue: 0 })
    wins: number;

    @Field(() => Int, { defaultValue: 0 })
    losses: number;

    @Field(() => Int, { defaultValue: 0 })
    knockouts: number;
}