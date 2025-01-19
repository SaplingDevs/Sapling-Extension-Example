import { Command, ConfigBuilder, DebugScreen, SaplingExtension } from "lib/sapling";

const Extension = new SaplingExtension({
    extensionId: "my-extension",
    extensionName: "My Extension",
    extensionNamespace: "myextension"
});

// Gamerules patching
Extension.setGameRules({
    clientGR: "client",
    serverGR: "server",
    engineGR: "engine"
});

// Easy command creation
const MyCommand = new Command()
    .setName("mycommand")
    .setUsage("<message: string>")
    .addArgument("string", "message")
    .setCallback((sender, { message }) => {
        new DebugScreen(Extension).displayContent([ "Test: " + message ]);
    })
    .setValidation({ checkAdmin: true })
    .build();

Extension.setCommand(MyCommand);

// Protocol creations
// scriptevent myextension:event_test hiii
Extension.setProtocol("test", ({ message }) => {
    console.warn(message);
});


// Config Builder (optional)
const ExtensionConfig = new ConfigBuilder()
    .setDebugMode(true)
    .automaticTranslations(false)
    .setDescriptionKeys({ "sapling.help.command.mycommand": "This is a test command" });

// Load extension
Extension.load(ExtensionConfig);