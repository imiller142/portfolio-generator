
import inquirer from "inquirer";
import fs from 'fs';
import {generatePage} from './src/page-template.js'

//const pageHTML = generatePage(name, github);

//fs.writeFile('./index.html', pageHTML, err => {
//  if (err) throw err;

//  console.log('Portfolio complete! Check out index.html to see the output!');
//});
const promptUser = () => {
  return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username. (Required)',
        validate: nameInput => {
          if(nameInput) {
            return true;
          } else {
            console.log('Please enter your github name!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
          } else {
            return false;
          }
        }
      }
    ])
};

const promptProject = porfolioData => {
  
  //if there is no projects in the array create one.
  if (!porfolioData.projects){
    porfolioData.projects = [];
  }

  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectNameInput => {
        if(projectNameInput) {
          return true;
        } else {
          console.log('Please enter a name for your project');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescriptionInput => {
        if(projectDescriptionInput) {
          return true;
        } else {
          console.log('Please enter a description for your project');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: projectLinkInput => {
        if(projectLinkInput) {
          return true;
        } else {
          console.log('Please enter a link to your project.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])    
  .then(projectData => {
    porfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(porfolioData);
    } else {
      return porfolioData
    }
  });
  

};

promptUser()
.then(promptProject)
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

     fs.writeFile('./index.html', pageHTML, err => {
       if (err) throw new Error(err);

       console.log('Page created! Check out index.html in this directory to see it!');
     });
})
