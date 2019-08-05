
const vscode = require('vscode');


function activate(context) {


	let runJS = vscode.commands.registerCommand('extension.runJS', async () => {

		let document = vscode.window.activeTextEditor.document
		await document.save()
		let terminal = vscode.window.activeTerminal
		if (!terminal) {
			terminal = vscode.window.createTerminal({ "hideFromUser": false, "name": "JavaScript" });
		};
		terminal.show()
		terminal.sendText(`node "${document.fileName}"`)
	});


	let install = vscode.commands.registerCommand('extension.installLibrary', async () => {

		const legend = {

			"discord.py": {
				"voice": { "No Voice": "", "Voice": "[voice]" },
				"default": "discord.py",
				"package_manager": { "pip": "python -m pip install -U " }
			},

			"discord.js": {
				"voice": { "No Voice": "", "Node-Opus": " node-opus", "Opus Script": " opusscript" },
				"default": "discord.js",
				"package_manager": { "npm": "npm install ", "yarn": "yarn add " }
			}


		};


		let library = await vscode.window.showQuickPick(Object.keys(legend), { "placeHolder": "Select the discord library to install" });
		if (library) {
			library = legend[library]
			let voice = await vscode.window.showQuickPick(Object.keys(library.voice), { "placeHolder": `Install ${library.default} with voice support?` });
			let pm = await vscode.window.showQuickPick(Object.keys(library.package_manager), { "placeHolder": 'Select a package manager' });
			if (voice && pm) {
				let terminal = vscode.window.createTerminal({ "hideFromUser": false, "name": library.default });
				terminal.show();
				terminal.sendText(library.package_manager[pm] + library.default + library.voice[voice]);
			};
		};


	});

	context.subscriptions.push(runJS);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
