import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from "./fighter.entity";
import { WeightClass } from "./weight-class.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Ranking {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    rank: number;

    @Column()
    @Field()
    date: Date;

    @ManyToOne(() => Fighter, fighter => fighter.rankings, { onDelete: 'CASCADE' })
    @Field(() => Fighter)
    fighter: Fighter;

    @ManyToOne(() => WeightClass)
    @Field(() => WeightClass)
    weightClass: WeightClass;
}