import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { WeightClass } from './weight-class.entity';
import { Ranking } from "./ranking.entity";
import {Field} from "@nestjs/graphql";

@Entity()
export class Fighter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    nickname: string;

    @Column()
    @Field()
    nationality: string;

    @Column()
    @Field()
    weight: number;

    @Column({ default: 0 })
    @Field()
    wins: number;

    @Column({ default: 0 })
    @Field()
    losses: number;

    @Column({ default: 0 })
    @Field()
    knockouts: number;

    @ManyToOne(() => WeightClass, weightClass => weightClass.fighters)
    @Field(() => WeightClass)
    weightClass: WeightClass;

    @OneToMany(() => Ranking, ranking => ranking.fighter)
    @Field(() => [Ranking])
    rankings: Ranking[];
}