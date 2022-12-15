#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import animation from "chalk-animation"

const sleep = ()=>{
    return new Promise((res)=>{
        setTimeout(res,2000)
    })
}

async function welcome() {
    const title = animation.rainbow(`Welcome to the guessing game`);
    await sleep()
    title.stop()
}
var wins: number = 0
let lives: number = 5
async function Questions() {
    await welcome()
    let random:number = Math.floor(Math.random()*10 + 1)
    
    while(lives>0){
        let question = await inquirer
    .prompt([{
        "type": "number",
        "name": "num",
        "message": "Select any number between 1 - 10 : ",
        validate: (answers: number) => {
            if(isNaN(answers)){
                return chalk.red(`please enter a valid number! `)
                
            }
            else{
                return true
            }
        }
    }]);
    if(question.num === random){
        console.log(chalk.greenBright(`yaay, you guessed the right number! `))
        console.log(chalk.yellowBright(`Lives remaining ${lives}`))
        wins++  
        break
    }
    else if(question.num > random){
        lives=lives -1
        console.log(chalk.redBright(`you have guessed a bit high! `))
        console.log(chalk.yellowBright(`Lives remaining ${lives}`))
    }
    else if(question.num < random){
        lives=lives -1
        console.log(chalk.redBright(`you have guessed a bit below! `))
        console.log(chalk.yellowBright(`Lives remaining ${lives}`))
    }
}
    if(lives===0){
        console.log(chalk.redBright(`You have lost ! Wins ${wins}`))
    }
    else{
        console.log(chalk.greenBright(`You Won with ${lives} still remaining ! `))
        
    }
    
}
async function restart() {
    do{
        await Questions()
        if(lives === 0){
            break
        }
        var again = await inquirer .prompt([{
        "type": "input",
        "name": "re",
        "message": "do you want to play again with the remain lives? [y/n] "
    }])
    }
    while(again.re === 'y' || again.re === 'Y' || again.re === 'Yes' || again.re === 'yes')
    console.log(chalk.greenBright(`Total Victories ${wins}`))
    
}
restart()