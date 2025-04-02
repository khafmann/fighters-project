import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
    @Field(() => ID)
    id: number;
}