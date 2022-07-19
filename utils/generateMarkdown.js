// TODO: Create a function that returns a license badge based on which license is passed in
const renderLicenseBadge = (license) => {
  return license
    ? `![License: ${license}](https://img.shields.io/static/v1?label=License&message=${license}&color=yellow&style=for-the-badge)`
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


module.exports = {
  renderLicenseBadge,
  renderLicenseLink,
  renderLicenseSection,
};


