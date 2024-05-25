// import Gtk from 'gi://Gtk';
// import Gdk from "gi://Gdk"
// import { openSettings } from '../settings/theme.js';

const Item = (label, on_activate) => Widget.MenuItem({
    on_activate,
    child: Widget.Box({
        children: [
            Widget.Label({
                label,
                hexpand: true,
                xalign: 0,
            }),
        ],
    }),
});

export default () => Widget.Menu({
    class_name: 'desktop-menu',
    children: [
        Item(' Term', () => Utils.execAsync(['foot'])),
        Item('󰋋 Audio', () => Utils.execAsync(['pavucontrol'])),
        Item('󰝚 Music', () => Utils.execAsync(['tidal-hifi'])),
        Item('󰈹 Browser', () => Utils.execAsync(['librewolf'])),
        Item(' Screenshot', () => Utils.execAsync(['grimblast', '--notify', 'copysave', 'area'])),
        Widget.MenuItem({
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: " Games",
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label(" ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item('Steam', () => Utils.execAsync(['steam'])),
                    Item('Prism', () => Utils.execAsync(['prismlauncher',])),
                    Item('Genshin', () => Utils.execAsync(['anime-game-launcher'])),
                ],
            }),
        }),
        Widget.MenuItem({
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: " Messaging",
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label(" ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item('Vesktop', () => Utils.execAsync(['vesktop'])),
                    Item('Telegram', () => Utils.execAsync(['telegram-desktop',])),
                ],
            }),
        }),
        Widget.MenuItem({
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: ' System',
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label(" ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item('Log Out', () => Utils.execAsync(['hyprctl', 'dispatch', 'exit'])),
                    Item('Shutdown', () => Utils.execAsync(['fctl', 'poweroff'])),
                    Item('Reboot', () => Utils.execAsync(['fctl', 'reboot'])),
                ],
            }),
        }),
        // Item('Applications', () => Utils.execAsync(['tofi-drun', '--drun-launch=true'])),
    ],
});

