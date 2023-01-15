import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  HasMany,
  HasOne,
  BelongsTo,
  DataType,
} from "sequelize-typescript";

export interface UserI {
  empId?: number | null;
  email: string;
  password: string;
  status: any;
  designation: string;
  name: String;
  phone: String;
  address: String;
  joiningDate: String;
  department: String;
}
import { Teaching } from "./teaching.model";
import { Research } from "./research.model";
import { Qualification } from "./qualification.model";
import { Marks } from "./marks.model";
import { Administration } from "./administration.model";
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  empId?: number;

  @AllowNull(true)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  password!: string;

  @AllowNull(true)
  @NotEmpty
  @Default("NOTFILLED")
  @Column(DataType.ENUM("NOTFILLED", "PENDING", "SUBMIT", "DONE"))
  status: any;

  @AllowNull(true)
  @NotEmpty
  @Column
  designation!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  phone!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  address!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  joiningDate!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  department!: string;

  @HasMany(() => Teaching, "empId")
  Teachings!: Teaching;

  @HasMany(() => Research, "empId")
  Researchs!: Research;

  @HasMany(() => Qualification, "empId")
  Qualifications!: Qualification;

  @HasMany(() => Marks, "empId")
  Marks!: Marks;

  @HasMany(() => Administration, "empId")
  Administration!: Administration;
}
