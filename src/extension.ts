// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as Path from 'path';
import { AppModel } from './appModel';

let appModel: AppModel;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	appModel= new AppModel();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "genesis-code" is now active!');
	// adding a status bar element 
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.cleancode', () => {

		console.log("current platform is: "+process.platform);
		console.log(appModel.cleanProject());
		
		
	});
	//Create Project Command; create a new Project for SGDK
	let disposablecreate = vscode.commands.registerCommand('extension.createproject', () =>{
		//First, select the folder where the project will be created
		vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false
		}).then(r =>{
			if(r!== undefined){
				let uripath = appModel.createProject(r[0]);
				let sucess = vscode.commands.executeCommand('vscode.openFolder', uripath);
				if( sucess){
					vscode.window.showInformationMessage("Created New SGDK Project");
				}
			}
		});
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposablecreate);
}



// this method is called when your extension is deactivated
export function deactivate() {
	appModel.deactivate();
}
