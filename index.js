const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// function to write README file
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            //if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if(err) {
                reject(err);
                //return out of the function here to make sure the Promise doesn't execute the resolve() function as well
            return;
            }
            
            // if everything went well, resole the Promise and send the successfull data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            
            })
            console.log("README file created successfully!");
        });
    });
};

// function to initialize program
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your Github username: (Required) ',
            validate: githubInput  => {
                if (githubInput) {
                  return true;
                } else {
                  console.log("Please enter your Github username!");
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your e-mail address: (Required) ',
            validate: emailInput  => {
                if (emailInput) {
                  return true;
                } else {
                  console.log("Please enter your e-mail address!");
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
            validate: titleInput  => {
              if (titleInput) {
                return true;
              } else {
                console.log("Please enter the title of your project!");
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the link to your project: (Required) ',
            validate: linkInput  => {
              if (linkInput) {
                return true;
              } else {
                console.log("Please enter the link to your project!");
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project: (Required) ',
            validate: descriptionInput => {
              if(descriptionInput) {
                return true;
              } else {
                console.log('Please enter a project description!');
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Give a brief explanation on how to install your project: (Required) ',
            validate: installationInput => {
              if(installationInput) {
                return true;
              } else {
                console.log('Please describe the installation process!');
                return false;
              }
            }
        },
        {
            type: 'confirm',
            name: 'confirmScreenshot',
            message: 'Would you like to add some screenshots to your README file?',
            default: false
        },
        {
            type: 'input',
            name: 'screenshot',
            message: "Enter screenshot's relative path without single quotes: (ex. '/assets/img/screenshot1.png')",
            when: ({ confirmScreenshot }) => {
              if (confirmScreenshot) {
                return true;
              } else {
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide contributing guidelines: ',
            validate: contributingInput => {
                if(contributingInput) {
                  return true;
                } else {
                  console.log('Please provide contributing guidelines!');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions for use: ',
            validate: usageInput => {
                if(usageInput) {
                  return true;
                } else {
                  console.log('Please provide instructions for use!');
                  return false;
                }
              }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please select a license for your work(if any)',
            choices: ['MIT', 'lgpl-3.0', 'mpl-2.0', 'agpl-3.0', 'unlicense', 'apache-2.0', 'gpl-3.0', 'none']
          }
    ]).then(mdContent => {
        return mdContent;
    });
};


// function call to initialize program
promptUser()
.then(mdContent => {
    return generateMarkdown(mdContent)
})
.then(writeToFile);
