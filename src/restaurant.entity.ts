import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RestaurantEntity extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    title: string;

    @Column()
    description: string;

    @Column()
    location : string;

    @Column({ default: 0})
    averageRating : number;

    // toJSON(){
    //     return{
    //         id: this.id,
    //         title: this.title,
    //         description: this.description,
    //         location: this.location,
    //         averageRating: this.averageRating
    //     }
    // }

}