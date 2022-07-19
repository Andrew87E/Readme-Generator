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
    message: "Where is your Demo hosted?",
    name: "demoHost",
  },
  {
    type: "input",
    message: "Enter your Demo url here",
    name: "demoLink",
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
      // { name: "Yes", value: "Yes" },
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
  ${generateBadge.renderLicenseBadge(data.license)}<br>
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

  ## Description
  ${data.description}
  ## Table of contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Demo](#Demo)
  ${generateBadge.renderLicenseLink(data.license)}
  - [Questions](#questions)
  ## Installation
  ${data.install}  
  ## Usage
  ${data.usage}
  ${data.contResponse}
  ## Demo
  See it in action on [${data.demoHost}](${data.demoLink})!
  ## Contributing
  <details> 
  <summary>Contributor Covenant</summary>
  ${contCovenant}
  </details><br>

  ## Questions
  Shoot me an [Email](${data.email})<br>
  Check out my [Github](https://www.github.com/${data.username})!
  ${generateBadge.renderLicenseSection(data.license)}
        `;
};


// add todo list

const myReadme = (data) => {
  return `
  # ${data.title}
${generateBadge.renderLicenseBadge(data.license)}<br>
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

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
See it in action on [${data.demoHost}](${data.demoLink})!
## Contributing
<details> 
<summary>Contributor Covenant</summary>
${contCovenant}
</details><br>

## Questions
Shoot me an [Email](${data.email})<br>
Check out my [Github](https://www.github.com/${data.username})!
${generateBadge.renderLicenseSection(data.license)}
      `;
};

init();









const contCovenant = `
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual
identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the overall
  community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or advances of
  any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email address,
  without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT METHOD].
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of
actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or permanent
ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior, harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the
community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

Community Impact Guidelines were inspired by
[Mozilla's code of conduct enforcement ladder][Mozilla CoC].

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][FAQ]. Translations are available at
[https://www.contributor-covenant.org/translations][translations].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
[Mozilla CoC]: https://github.com/mozilla/diversity
[FAQ]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
`;
