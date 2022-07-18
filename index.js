// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require("fs");
const generateBadge = require("./utils/generateMarkdown");

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
    message: "Enter tests here",
    name: "tests",
  },
  {
    type: "list",
    message: "Select license for your project",
    choices: ["MIT", "BSD 3", "APACHE 2.0", "GPL 3.0", "none"],
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
  {
    type: "list",
    message: "Were there any contributors?",
    name: "contributing",
    choices: [
      { name: "Yes", value: "Yes" },
      { name: "No", value: "No" },
    ],
  },
];

const contributorsNextQuest = [
  {
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
    then: (response) => {
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
      return contQuestions;
    },
  },
];

//   const contributorQuestions = [
//   {
//     type: "input",
//     message: "What were their names?",
//     name: "contributorName",
//   },
//   {
//     type: "input",
//     message: "What were their github usernames?",
//     name: "contributorUsername",
//   },
// ];

init = () => {
  inquirer.prompt(questions).then((response) => {
    response.contributing
      ? inquirer.prompt(contributorsNextQuest).then((contResponse) => {
          fs.writeFile(
            "README.md",
            myContReadme(response, contResponse),
            (err) => (err ? console.log(err) : console.log("You Did It!"))
          );
        })
      : fs.writeFile("README.md", myReadme(response), (err) =>
          err ? console.log(err) : console.log("You Did It!")
        );
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
  - [Tests](#tests)
  ${generateBadge.renderLicenseLink(data.license)}
  - [Questions](#questions)
  ## Installation
  ${data.install}
  ## Contributing
  [${data.contributorName}](${data.contributorUsername})
  ## Tests
  ${data.tests}
  ${generateBadge.renderLicenseSection(data.license)}
  ## Questions
  Email: ${data.email}
  Github: https://www.github.com/${data.username}
        `;
};

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
- [Contributing](#contributing)
- [Tests](#tests)
${generateBadge.renderLicenseLink(data.license)}
- [Questions](#questions)
## Installation
${data.install}
## Tests
${data.tests}
${generateBadge.renderLicenseSection(data.license)}
## Questions
Email: ${data.email}
Github: https://www.github.com/${data.username}
      `;
};

init();
