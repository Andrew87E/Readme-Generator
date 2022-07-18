// TODO: Create a function that returns a license badge based on which license is passed in
const renderLicenseBadge = (license) => {
  return license
    ? `![License: ${license}](https://img.shields.io/badge/License-${license}-yellow.svg)`
    : ``;
};

// TODO: Create a function that returns the license link
const renderLicenseLink = (license) => {
  return license ? `- [${license}](#${license})` : ``;
};

// TODO: Create a function that returns the license section of README
const renderLicenseSection = (license) => {
  return license
    ? `## License
  [${license}](https://opensource.org/licenses/${license})`
    : ``;
};

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
