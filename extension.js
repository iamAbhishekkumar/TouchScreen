const { St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;



let panelButton, panelButtonText;


let timeout;
function setButtonText() {
    var outputs = [];
    var [ok, out, err, exit] = GLib.spawn_command_line_sync('date');
    outputs.push(out.toString().replace('\n', ''));

    var [ok, out, err, exit] = GLib.spawn_command_line_sync('pgrep gedit');
    if (out.length > 0)
        outputs.push('GEDIT');

    // command using pipelining - have to use bin bash -c flag
    var [ok, out, err, exit] = GLib.spawn_command_line_sync(
        '/bin/bash -c "ifconfig -a | grep tun0"');
    outputs.push(out.toString());

    panelButtonText.set_text(outputs.join('      '));
    return true;
}

function init() {
    panelButton = new St.Bin({
        style_class: "panel-button"
    });
    panelButtonText = new St.Label({
        style_class: "examplePanelText",
        text: "Starting....."

    });
    panelButton.set_child(panelButtonText);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(panelButton, 1);
    timeout = Mainloop.timeout_add_seconds(1.0, setButtonText);
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(panelButton);
}

