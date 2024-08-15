#!/usr/bin/env node

import inquirer from "inquirer";

class student {
  static counter = 10000;
  Id: number;
  name: string;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.Id = student.counter++;
    this.name = name;
    this.courses = []; // initialite an empty for course
    this.balance = 100;
  }
  // method to enroll a student in a course
  enroll_course(course: string) {
    this.courses.push(course);
  }
  // method to view a student balance
  view_balance() {
    console.log(`balance for ${this.name}: ${this.balance}`);
    console.log(`remaining balance:$${this.balance}`);
  }
  // method to pay student fees
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`${amount}fees paid successfully for ${this.name}`);
  }
  // method to display student status
  show_status() {
    console.log(`Id:${this.Id}`);
    console.log(`name:${this.name}`);
    console.log(`courses:${this.courses}`);
    console.log(`balance:${this.balance}`);
  }
}
// define a student_manager class to manage student
class student_manager {
  student: student[];
  constructor() {
    this.student = [];
  }
  // method to add anew student
  add_student(name: string) {
    let students = new student(name);
    this.student.push(students);
    console.log(`student:${name}added successfully ,student ID:${students.Id}`);
  }
  // method to enroll a course
  enroll_student(studentId: number, course: string) {
    let student = this.find_student(studentId);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.name}enroll in ${course}successfully`);
    }
  }
  // method to view a student balance
  view_student_balance(studentId: number) {
    let student = this.find_student(studentId);
    if (student) {
      student.view_balance();
    } else {
      console.log("student not found,please enter a correct studentId");
    }
  }

  // method to pay student fees
  pay_student_fees(studentId: number, amount: number) {
    let student = this.find_student(studentId);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log("student not found,please enter a correct studentId");
    }
  }
  // show student status
  show_student_status(studentId: number) {
    let student = this.find_student(studentId);
    if (student) {
      student.show_status();
    }
  }

  // method to find student by id
  find_student(studentId: number) {
    return this.student.find((std) => std.Id === studentId);
  }
}
// main function to run the programme
async function main() {
  console.log("wellcome to student management system by sam");
  console.log("-".repeat(50));
  let studentmanager = new student_manager();
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        choices: [
          "add student",
          "enroll student",
          "view student balance",
          "pay fees",
          "show status",
          "exit",
        ],
      },
    ]);
    // using switch cace to handle user choice
    switch (choice.choice) {
      case "add student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "enter a student name",
          },
        ]);
        studentmanager.add_student(name_input.name);
        break;
      case "enroll student":
        let course_input = await inquirer.prompt([
          {
            name: "student_Id",
            type: "number",
            message: "enter a course name",
          },
        ]);
        studentmanager.enroll_student(course_input.student_Id, course_input.cources);
        break;
      case "view student balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_Id",
            type: "number",
            message: "enter a studentId",
          },
        ]);
        studentmanager.view_student_balance(balance_input.student_Id);
        break;
      case "pay fees":
        let fees_input = await inquirer.prompt([
          {
            name: "student_Id",
            type: "number",
            message: "enter a student_Id",
          },
          {
            name: "amount",
            type: "number",
            message: "enter the amount to pay",
          },
        ]);
        studentmanager.pay_student_fees(
          fees_input.student_Id,
          fees_input.amount
        );
        break;
      case "show status":
        let status_input = await inquirer.prompt([
          {
            name: "student_Id",
            type: "number",
            message: "enter a studentId",
          },
        ]);
        studentmanager.show_student_status(status_input.student_Id);
        break;
      case "exit":
        console.log("exiting...");
        process.exit();
    }
  }
}
// calling a main fuction
main();
