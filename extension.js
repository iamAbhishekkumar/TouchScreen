const Main = imports.ui.main;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const { St, GLib, Clutter } = imports.gi;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();

let myPopup;

const MyPopup = GObject.registerClass(
  class MyPopup extends PanelMenu.Button {

    _init() {

      super._init(0);
      // shell extension icon
      let icon = new St.Icon({
        gicon: Gio.icon_new_for_string(Me.dir.get_path() + "/assets/clicking.svg"),
        style_class: 'system-status-icon',
        //   TODO Change icon color according to shell color
        // Like when color of shell is dark then icon color should be light adn vice versa
        // labels: enhancement
      });

      this.add_child(icon);

      // toggle item
      let popupSwitchMenuItem = new PopupMenu.PopupSwitchMenuItem(
        'TouchScreen',
        'value',
        
      );
      popupSwitchMenuItem.setToggleState(false);

      popupSwitchMenuItem.connect('toggled', (_, value) => {
        if (value) {
          var [ok, out, err, exit] = GLib.spawn_command_line_sync(`/bin/sh $PWD/scripts/on.sh`);
          log("Switch On");

        } else {
          var [ok, out, err, exit] = GLib.spawn_command_line_sync(`/bin/sh $PWD/scripts/off.sh`);
          log("Switch is off")
        }

      });
      this.menu.addMenuItem(popupSwitchMenuItem);
    }
  });

function init() {
}

function enable() {
  myPopup = new MyPopup();
  Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable() {
  myPopup.destroy();
}