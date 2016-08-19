import { Mongo } from 'meteor/mongo'

export const Employees = new Mongo.Collection("Employees");
export const EmployeeCount = new Mongo.Collection("EmployeeCount");
