const Engineer = require("./lib/Engineer")
const Employee = require("./lib/Employee")
const Intern = require("./lib/Intern")
const Manager = require("./lib/Manager")
const render = require("./src/page-template")
const inquirer = require("inquirer");
const fs = require("fs")


const teamMembers = {
    manager: null,
    engineers: [],
    interns: [],
}; 

const idArray = [];

function createManager() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'managerName',
        message: "Manager name?",
        validate: (a) =>
        {
        if (a !== '') {
            return true
        }
        return "Your name, please";
        }
    },
    {
        type: 'input',
        name: 'managerID',
        message: "Manager ID?",
        validate: (a) => 
        {
        const pass = a.match(/^[1-9]\d*$/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Manager Email?",
        validate: (a) => 
        {
        const pass = a.match(/\S+@\S+\.\S+/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'managerNumber',
        message: "Manager Office Number?",
        validate: (a) => 
        {
        const pass = a.match(/^[1-9]\d*$/)
        if (pass) {
            return true
        }
        return "Not a valid phone number"
        }
    }
 
    ]).then((a) => {
        const manager = new Manager(
            a.managerName,
            a.managerID,
            a.managerEmail,
            a.managerNumber
        );
        teamMembers.manager = manager
        idArray.push(a.managerID)
        createTeam();
    })
};


function addEngineer() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'engineerName',
        message: "Engineer's name?",
        validate: (a) =>
        {
        if (a !== '') {
            return true
        }
        return "Your name, please";
        }
    },
    {
        type: 'input',
        name: 'engineerID',
        message: "Enginee's ID?",
        validate: (a) => 
        {
        const pass = a.match(/^[1-9]\d*$/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Engineer's Email?",
        validate: (a) => 
        {
        const pass = a.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "Engineer's github username?",
        validate: (a) =>
        {
        if (a !== '') {
            return true
        }
        return "Your github, please";
        }
    },

    ]).then((a) => {
        const engineer = new Engineer(
            a.engineerName,
            a.engineerID,
            a.engineerEmail,
            a.engineerGithub
        );
        teamMembers.engineer = engineer
        idArray.push(a.engineerID)
        createTeam();
    })
};


function addIntern() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'internName',
        message: "Intern name?",
        validate: (a) =>
        {
        if (a !== '') {
            return true
        }
        return "Your name, please";
        }
    },
    {
        type: 'input',
        name: 'internID',
        message: "Intern's ID?",
        validate: (a) => 
        {
        const pass = a.match(/^[1-9]\d*$/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Intern's Email?",
        validate: (a) => 
        {
        const pass = a.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (pass) {
            return true
        }
        return "Positive numbers only please"
        }
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Intern's school?",
        validate: (a) =>
        {
        if (a !== '') {
            return true
        }
        return "Your school, please";
        }
    }
 
    ]).then((a) => {
        const intern = new Intern(
            a.internName,
            a.internID,
            a.internEmail,
            a.internSchool
        );
        teamMembers.intern = intern
        idArray.push(a.internID)
        createTeam();
    })
};


function createTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'continue',
            message: 'Which kind of team member are you adding?',
            choices: ['Engineer', 'Intern', "I'm done building my team"]
        }
    ]).then((a) => {
        switch (a.continue) {
            case 'Engineer':
                addEngineer()
                break;
            case 'Intern':
                addIntern()
                break;
            default:
                buildTeam()
                  
        }
    })
}

function buildTeam() {
    fs.writeFile("./dist/yourteam.html", render(teamMembers), (err) => {
        if (err) {
            console.log(err);

        }
        return console.log("Your Team Profile is ready!")
    })
}

createManager();