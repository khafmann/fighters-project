import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class FightStats {
    @Field(() => Float)
    winRate: number;

    @Field(() => Float)
    knockoutRate: number;
}