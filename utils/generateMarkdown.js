const licenseSelection = require('./licenseArray.js');

const generateScreenshot = screenshotImg => {
  if (!screenshotImg) {
    return '';
  };
  return `![Alt text]('${screenshotImg}' "Screenshot")`;
};

// function to generate markdown for README
function generateMarkdown(data) {
  const license = licenseSelection(data);
  const licenseImg = license.split("\n")

  return `
# ${data.title}
${licenseImg[0]}
## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation
${data.installation}

## Usage
${data.usage}
${generateScreenshot(data.screenshot)}

## Contributing
${data.contributing}

## Questions
If you have any additional questions, please feel free to contact me at:  
E-mail: ${data.email}  
Github: [${data.github}](https://github.com/${data.github})

## License
${license}
`;
}

module.exports = generateMarkdown;
