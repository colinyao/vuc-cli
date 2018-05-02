#!/usr/bin/env node --harmony
'use strict'
 // 定义脚手架的文件路径
//process.env.NODE_PATH = __dirname + '/../node_modules/'

const commander = require('commander')
// 定义使用方法
commander
   .usage('<command> [options]')
// 定义当前版本

commander
    .version(require('../package').version)



commander
    .command('init')
// 描述通过 vuc-cli --help可以查看到
    .description('Generate a new project')
    .action(() => {
      require('../command/init')()
    })
//放在最后解析commander命令
commander.parse(process.argv)
