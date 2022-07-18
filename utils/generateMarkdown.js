// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license !== "none") {
    return `![License: ${license}](https://img.shields.io/badge/License-${license}-yellow.svg)`;
  } else {
    return ``;
  }
}

// TODO: Create a function that returns the license link
function renderLicenseLink(license) {
  if (license !== "none") {
    return `- [${license}](#${license})`;
  } else {
    return ``;
  }
}

// TODO: Create a function that returns the license section of README
function renderLicenseSection(license) {
  if (license !== "none") {
    return `## License
    
    [${license}](https://opensource.org/licenses/${license})`;
  } else {
    return ``;
  }
}

// TODO: Create a function to generate markdown for README
// function generateMarkdown(data) {
//   return `# ${data.title} ${renderLicenseBadge(data.license)} 
//   ${data.description} ${data.installation} ${data.usage} ${data.contributing} ${data.tests} ${data.email} ${data.github} ${data.username} ${data.name} ${data.image} ${data.license}
//   ${renderLicenseLink(data.license)}
//   ${renderLicenseSection(data.license)}
//   ${data.questions}`;
// }


module.exports = {
  // generateMarkdown,
  renderLicenseBadge,
  renderLicenseLink,
  renderLicenseSection,
};
