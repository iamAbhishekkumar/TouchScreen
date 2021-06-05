const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
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
        //   TODO : change icon color according to shell color
      });

      this.add_child(icon);

      // toggle item
      let popupSwitchMenuItem = new PopupMenu.PopupSwitchMenuItem(
        'TouchScreen',
        'value',
        
      );
      // TODO: Extract the current value of touchscreen state
      popupSwitchMenuItem.setToggleState(false);

      popupSwitchMenuItem.connect('toggled', (_, value) => {
        if (value) {
          log("Switch is on");
        } else {
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