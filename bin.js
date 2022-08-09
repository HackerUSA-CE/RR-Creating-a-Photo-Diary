#!/usr/bin/env node
const open = require('open')
const { exec, spawn } = require('child_process')
exec('npx webpack --mode="development"', () => {
    spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', [ 'webpack', '--watch', '--mode="development"' ], { stdio: 'inherit' });
    open('./public/index.html')
    console.log('Watching for changes in "./src"')
})

spawn('node', ['script.js'], {
    env: {
        NODE_ENV: 'production',
        PATH: process.env.PATH
    }
})
