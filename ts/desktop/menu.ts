import { easyAsync } from "ts/utils";

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

export const menu = Widget.Menu({
    class_name: "desktop-menu",
    children: [
        Item("Terminal", () => easyAsync("foot")),
        Item("Audio", () => easyAsync("pavucontrol")),
        Item("Music", () => easyAsync("spotify")),
        Item("Browser", () => easyAsync("librewolf")),
        Item("Screenshot", () => easyAsync("grimblast --notify copysave area")),
        Widget.MenuItem({ className: "menuitem-label", child: Widget.Separator({ vertical: false }) }),
        Widget.MenuItem({
            // className: "menuitem-label",
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: "Games",
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label("  ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item("Steam", () => easyAsync("steam")),
                    Item("Prism", () => easyAsync("prismlauncher",)),
                    Item("Genshin", () => easyAsync("anime-game-launcher")),
                ],
            }),
        }),
        Widget.MenuItem({
            // className: "menuitem-label",
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: "Messaging",
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label("  ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item("Vesktop", () => easyAsync("vesktop")),
                    Item("Telegram", () => easyAsync("telegram-desktop",)),
                ],
            }),
        }),
        Widget.MenuItem({ className: "menuitem-label", child: Widget.Separator({ vertical: false }) }),
        Widget.MenuItem({
            // className: "menuitem-label",
            child: Widget.Box({
                children: [
                    Widget.Label({
                        label: "Power",
                        hexpand: true,
                        xalign: 0,
                    }),
                    Widget.Label("  ")
                ],
            }),
            submenu: Widget.Menu({
                children: [
                    Item("Log Out", () => easyAsync("hyprctl dispatch exit")),
                    Item("Shutdown", () => easyAsync("fctl poweroff")),
                    Item("Reboot", () => easyAsync("fctl reboot")),
                ],
            }),
        }),
        // Widget.MenuItem({ className: "menuitem-label", child: Widget.Separator({  vertical: false })}),
        // Item("Goblin Mode", () => easyAsync("pavucontrol")),
    ],
});
