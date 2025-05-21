import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

	@Column()
	age:number

	@OneToOne(() => Address , (address) => address.employee , {
		cascade:true,
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	address : Address

    @ManyToOne(()=> Department , (address) => address.employees)
    @JoinColumn()
    department : Department

}

export default Employee;
