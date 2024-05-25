const Hyprland = await Service.import("hyprland")

const Lang = () => Widget.Box({
    className: "module-box",
    children: [
        Widget.Label({ label: "", className: "icon" }),
        Widget.Button({
            className: "module",
            on_clicked: () => Utils.execAsync(['hyprctl', 'switchxkblayout', 'hs6209-usb-dongle', 'next'])
                .catch((err: any) => print(err)),
            setup: (self: any) => self
                .hook(Hyprland, (label: any, _kbName: any, layoutName = "EN") => {
                    label.label = layoutName.includes("Russian") ? "RU" : "EN"
                }, 'keyboard-layout' )
        })
    ],
});

export default Lang
