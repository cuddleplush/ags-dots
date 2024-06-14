import { easyAsync } from "ts/utils"

const powerBox = () => Widget.Scrollable({
    // css: "min-width: 500px;",
    vscroll: "never",
    hscroll: "never",
    child: Widget.Box({
        // css: "min-width: 500px;",
        spacing: 8,
        children: [
            Widget.Button({
                className: "power-btn",
                hpack: "start",
                label: "󰿅",
                on_clicked: () => easyAsync("hyprctl dispatch exit")
            }),
            Widget.Button({
                className: "power-btn",
                hpack: "center",
                label: "󰐥",
                on_clicked: () => easyAsync("fctl poweroff")
            }),
            Widget.Button({
                className: "power-btn",
                hpack: "end",
                label: "󰜉",
                on_clicked: () => easyAsync("fctl reboot")
            })
        ]
    })
})

export const power = () => Widget.Window({
    visible: false,
    name: `power`,
    anchor: [],
    exclusivity: 'normal',
    keymode: 'exclusive',
    layer: 'overlay',
    // margins: [10, 10],
    child: powerBox(),
}).keybind("Escape", () => {
    App.closeWindow("power")
})
