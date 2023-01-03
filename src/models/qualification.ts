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
import { User } from "./user";
@Table({
  tableName: "Qualification",
  timestamps: true,
})
export class Qualification extends Model implements QualificationI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  type!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  totalMarks!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  percentage!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  subjects!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  startDate!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  endDate!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
