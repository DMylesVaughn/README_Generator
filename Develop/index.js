const fs = require("fs");
const inquirer = require("inquirer");

// Markdown file
const generateMarkdown = require("./utils/generateMarkdown");

// License options 
function getLicense(value) {
    if (value === "AFL 3.0") {
        return "[![License: AFL 3.0](https://img.shields.io/badge/AFL%203.0-purple)]";
    } else if (value === "Apache 2.0") {
        return "[![License: Apache 2.0](https://img.shields.io/badge/Apache%202.0-orange)]";
    } else if (value === "BSD Zero-Clause") {
        return "[![License: 0BSD](https://img.shields.io/badge/BSD%20Zero-Clause-red)]";
    } else if (value === "Do WTF You Want To PL") {
        return "[![License: WTFPL](https://img.shields.io/badge/WTF%20PL-gold)]";
    } else if (value === "GNU GPL v3.0") {
        return "[![License: GPL v3.0](https://img.shields.io/badge/GNU%20GPL%20v3.0-silver)]";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/MIT-maroon)]";
    }
}

function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Invalid input! Please enter a value.";
    }
}

const questions = [
    // Title
    {
        type: "input",
        name: "title",
        message: "Please enter the title of your project?",
        validate: validateInput,
    },
    // Description
    {
        type: "input",
        name: "description",
        message: "Please enter a description for your project.",
        validate: validateInput,
    },

    // Table of Contents - Markdown.js

    // Installation
    {
        type: "input",
        name: "installation",
        message: "Please enter how to install the software.",
        validate: validateInput,
    },

    // Question for Usage
    {
        type: "input",
        name: "usage",
        message: "Please describe how users can use your project.",
        validate: validateInput,
    },

    // License 
    {
        type: "list",
        name: "license",
        message: "Please select a license for this project.",
        choices: [
            "AFL 3.0",
            "Apache 2.0",
            "BSD Zero-Clause",
            "Do WTF You Want To PL",
            "GNU GPL v3.0",
            "MIT",
        ],
        validate: validateInput,
    },

    // Contributing 
    {
        type: "input",
        name: "contributing",
        message: "How can users contribute to your project.",
        validate: validateInput,
    },

    // Tests
    {
        type: "input",
        name: "tests",
        message: "Please enter test instructions for your project.",
        validate: validateInput,
    },

    // Github username 
    {
        type: "input",
        name: "userName",
        message: "Please enter your GitHub username.",
        validate: validateInput,
    },

    // Email address
    {
        type: "input",
        name: "userEmail",
        message: "Please enter your GitHub email address.",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Invalid input! Please enter a valid email address.";
            }
        },
    },
];

// function to create the README
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


// function to start questions 
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/README.md", data);
    });
}
init();