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
  ForeignKey,
} from "sequelize-typescript";

export interface QualificationI {
  id?: number | null;
  empId?: number | null;
  type: string;
  totalMarks: string;
  percentage: string;
  subjects: String;
  startDate: String;
  endDate: String;
}
import { User } from "./user.model";
@Table({
  tableName: "Qualification",
  timestamps: true,
})
export class Qualification extends Model implements QualificationI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(true)
  @NotEmpty
  @Column
  type!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  totalMarks!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  percentage!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  subjects!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  startDate!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  endDate!: string;

  @AllowNull(true)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
