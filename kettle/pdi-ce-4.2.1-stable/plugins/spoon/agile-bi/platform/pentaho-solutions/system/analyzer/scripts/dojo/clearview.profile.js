// ClearView custom dojo build
// To build custom dojo package for clearview:
// 1. go to (dojo_install_dir)/buildscripts
// 2. copy this file to under ./profiles
// 3. run "ant -Dprofile=clearview clean release intern-strings"
// 4. build results are under (dojo_install_dir)/release/dojo

var dependencies = [ 
	"dojo.lang.common",
	"dojo.lang.array",
	"dojo.lang.extras",
	"dojo.lang.declare",
	"dojo.lang.func",
	"dojo.event",
	"dojo.string.common",
	"dojo.string.extras",
	"dojo.io.*",
	"dojo.io.BrowserIo",
	"dojo.io.cookie",
	"dojo.json",
	"dojo.html.*",
	"dojo.html.display",
	"dojo.html.layout",
	"dojo.html.util",
	"dojo.widget.ContentPane",
	"dojo.widget.FloatingPane",
	"dojo.widget.Dialog",
	"dojo.widget.Menu2",
	"dojo.widget.Button",
	"dojo.widget.Tooltip",
	"dojo.widget.ColorPalette",
	"dojo.dnd.*",
	"dojo.dnd.HtmlDragMove",
	"dojo.dnd.HtmlDragMoveSource",
	"dojo.dnd.HtmlDragMoveObject",
	"dojo.collections.ArrayList",
	"dojo.collections.Dictionary",
	"dojo.collections.Stack"
];

// NOTE: this MUST be included or a list of files must be output via print() manually.
load("getDependencyList.js");

// Example of command line to run to create the dojo js file optimized for Analyzer
// java -jar dev-lib/shrinksafe.jar -c scripts/dojo/dojo.js.uncompressed.js > scripts/dojo/dojo.js
