// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require("fs");
const generateBadge = require("./utils/generateMarkdown");

const Console = require("console");
const logger = new console.Console({
  stdout: fs.createWriteStream("./output.txt"),
});

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
  },
  {
    type: "input",
    message: "Please fill out the description of your project.",
    name: "description",
  },
  {
    type: "input",
    message: "What must be installed to run your project?:",
    name: "install",
  },
  {
    type: "input",
    message: "Enter any usage instructions",
    name: "usage",
  },
  {
    type: "input",
    message: "Where is your Demo hosted?",
    name: "demoHost",
  },
  {
    type: "input",
    message: "Enter your Demo url here",
    name: "demoLink",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "contributing",
  },
  {
    type: "list",
    message: "Select license for your project",
    choices: ["MIT", "BSD-3", "APACHE-2.0", "GPL-3.0", "none"],
    name: "license",
  },
  {
    type: "input",
    message: "Enter your gitHub username",
    name: "username",
  },
  {
    type: "input",
    message: "Enter your email address",
    name: "email",
  },
  // {
  //   type: "input",
  //   message: "Do you want a To-Do list?",
  //   name: "toDo",
  // },
  // {
  //   when: (answers) => answers.toDo === "yes",
  //   type: "input",
  //   message: "How many To-Do items do you want to add?",
  //   name: "toDoCount",
  // },
  {
    type: "list",
    message: "Were there any contributors?",
    name: "contributors",
    choices: [
      { name: "Yes", value: "Yes" },
      { name: "No", value: "No" },
    ],
  },
  {
    when: (answers) => answers.contributors === "Yes",
    type: "list",
    message: "How many contributors?",
    name: "contributorCount",
    choices: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
  },
];

init = () => {
  inquirer.prompt(questions).then((response) => {
    if (response.contributorCount) {
      // Prompt more
      let contQuestions = [];
      for (let i = 0; i < response.contributorCount; i++) {
        contQuestions.push(
          {
            type: "input",
            message: `What is the name of contributor ${i + 1}?`,
            name: `contributorName${i}`,
          },
          {
            type: "input",
            message: `What is the GitHub username of contributor ${i + 1}?`,
            name: `contributorUsername${i}`,
          }
        );
      }
      inquirer.prompt(contQuestions).then((contResponse) => {
        let contWrite = (contResponse) => {
          let cont = "";
          for (let i = 0; i < contResponse.contributorCount; i++) {
            cont += `
            ## Contributors
            [${contResponse.contributorName.i}](${contResponse.contributorUsername.i})            
            `;
          }
          return cont;
        };
        fs.writeFile(
          "README.md",
          myContReadme(response, contWrite, contResponse),
          (err) => (err ? console.log(err) : console.log("You Did It!"))
        );
      });
    } else {
      // Write it out
      fs.writeFile("README.md", myReadme(response), (err) =>
        err ? console.log(err) : console.log("You Did It!")
      );
    }
  });
};

const myContReadme = (data) => {
  return `
  # ${data.title}
  ${generateBadge.renderLicenseBadge(data.license)} 
  ## Description
  ${data.description}
  ## Table of contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Demo](#Demo)
  - [Contributing](#contributing)
  ${generateBadge.renderLicenseLink(data.license)}
  - [Questions](#questions)
  ## Installation
  ${data.install}  
  ## Usage
  ${data.usage}
  ${data.contResponse}
  ## Demo
  See it in action on ${data.demoHost}!
  ${data.demoLink}
  ## How to Contribute
  [Contributor Covenant](https://www.contributor-covenant.org/)
  ## Questions
  Shoot me an [Email](${data.email})
  Check out my [Github](https://www.github.com/${data.username})!
  ${generateBadge.renderLicenseSection(data.license)}
        `;
};


// add todo list

const myReadme = (data) => {
  return `
  # ${data.title}
${generateBadge.renderLicenseBadge(data.license)} 
## Description
${data.description}
## Table of contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#Demo)
- [Contributing](#contributing)
${generateBadge.renderLicenseLink(data.license)}
- [Questions](#questions)
## Installation
${data.install}
## Usage
${data.usage}
## Demo
See it in action on ${data.demoHost}!
${data.demoLink}
## Questions
Shoot me an [Email](${data.email})
Check out my [Github](https://www.github.com/${data.username})!
${generateBadge.renderLicenseSection(data.license)}
      `;
};

init();
