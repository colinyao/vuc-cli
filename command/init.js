'use strict'
const exec = require('child_process').exec
//交互
const inquirer = require('inquirer')
const chalk = require('chalk')
const commander=require('commander')


const fs=require('fs')
//删除文件
const rm = require('rimraf').sync
const path = require('path')
//判断文件是否已存在
const exists = require('fs').existsSync
let projectName,
    to,
    gitUrl='https://github.com/colinyao/vuc.git',
    branch='master';
const run=()=>{
  // git命令，远程拉取项目并自定义项目名
  let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

  console.log(chalk.white('\n Start generating...'))

  exec(cmdStr, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      process.exit()
    }
    console.log(chalk.green('\n √ Generation completed!'))
    console.log(`\n cd ${projectName} && npm install \n`)
    process.exit()
  })
}

module.exports = () => {

    // 处理用户输入
      if(typeof commander.args[0]==='string'){
          projectName=commander.args[0];
          to=path.resolve(projectName || '.');
          next();
      }else{
          inquirer.prompt([{
             type:'input',
             message:'Project name:',
             name: 'yes',
             default:'vuc-project'
          }]).then(answers=>{
              projectName=answers.yes;
              to=path.resolve(projectName || '.');
              next()
          })
      }
      function next(){
        //检查目录是否已存在
        let exist = exists(to);
        //询问选择
          inquirer.prompt([{
            type: 'confirm',
            message: !exist
              ? 'Generate project in current directory?'
              : 'Target directory exists. Continue?',
            name: 'yes'
          }]).then(answers=>{
              if (answers.yes) {
                if(exist){ //ruguo
                  rm(to)
                }
                run()
              }
          })
      }

}
