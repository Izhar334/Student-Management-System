#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  static counter = 10000;
  name: string;
  id: number;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.name = name;
    this.id = Student.counter++;
    this.courses = []; //initialise an empty arry for cource
    this.balance = 100;
  }
  //mathod to enroll a student in a cource
  enrollCourse(course: string) {
    this.courses.push(course);
  }
  //mathod to view a student balance
  viewBalance() {
    console.log(chalk.blue(`Balance for ${this.name} : $${this.balance}`));
  }
  // mathod to pay student fees
  payFees(amount: number) {
    this.balance -= amount;
    console.log(
      chalk.green(`$ ${amount}Fees paid successfully for ${this.name}`)
    );
    console.log(chalk.blue(`Remaining Balance : $ ${this.balance}`));
  }
  //method to display student balance
  showStatus() {
    console.log(chalk.gray(`Name: ${this.name}`));
    console.log(chalk.yellow(`ID: ${this.id}`));
    console.log(chalk.blue(`Courses: ${this.courses}`));
    console.log(chalk.green(`Balance: ${this.balance}`));
  }
}
//Defining a studentManager class to manage syudents
class StudentManager {
  students: Student[];
  constructor() {
    this.students = [];
  }
  //method to add a new student
  addStudent(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      chalk.green(
        `student: ${name} added successfully. student ID ${student.id}`
      )
    );
  }
  //method to enroll a student in a course
  enrollStudent(studentId: number, course: string) {
    let student = this.findStudent(studentId);
    if (student) {
      student.enrollCourse(course);
      console.log(chalk.blue(`${student.name} enrolled in ${course} successfully`));
    }
  }
  viewStudentBalance(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log(
        chalk.red.italic("student not found. please enter a correct student ID")
      );
    }
  }
  // method to pay student fees
  payStudentFees(studentId: number, amount: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.payFees(amount);
    } else {
      console.log(
        chalk.red.italic("student not found. please enter a correct student ID")
      );
    }
  }
  // method to display student status
  showStudentStatus(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.showStatus();
    }
  }
  //  method to find a student by student id
  findStudent(studentId: number) {
    let currentStudent = this.students.find((std) => std.id === studentId);
    return currentStudent;
  }
}
// Main function to run the program
async function main() {
  console.log(
    chalk.gray.bold("\t\tWell come to Izhar's Student Managment System\t")
  );
  console.log(chalk.green("\t<<<", "=".repeat(53), ">>>\t"));

  let studentManager = new StudentManager();
  // While loop to keep programe runing
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.cyan("Select an option"),
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);
    // using switch case to handle user choice
    switch (choice.choice) {
      case "Add Student":
        let nameInput = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: chalk.grey.bold("Enter a student name"),
          },
        ]);
        studentManager.addStudent(nameInput.name);
        break;
      case "Enroll Student":
        let courseInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: chalk.grey.bold("Enter a student ID"),
          },
          {
            name: "course",
            type: "input",
            message: chalk.grey.bold("Enter a Course Name"),
          },
        ]);
        studentManager.enrollStudent(courseInput.studentId, courseInput.course);
        break;
      case "View Student Balance":
        let balanceInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: chalk.grey.bold("Enter a Student ID"),
          },
        ]);
        studentManager.viewStudentBalance(balanceInput.studentId);
        break;
      case "Pay Fees":
        let feesInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: chalk.grey.bold("Enter a Student ID"),
          },
          {
            name: "amount",
            type: "number",
            message: chalk.grey.bold("Enter the amount to pay"),
          },
        ]);
        studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
        break;
      case "Show Status":
        let statusInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: chalk.grey.bold("Enter a Student ID"),
          },
        ]);
        studentManager.showStudentStatus(statusInput.studentId);
        break;
      case "Exit":
        console.log(chalk.yellow("Exiting..."));
        process.exit();
    }
  }
}
// Calling a main function
main();
