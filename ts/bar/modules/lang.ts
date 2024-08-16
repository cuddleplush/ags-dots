import { easyAsync } from "ts/utils";
import vars from "ts/vars";

const Hyprland = await Service.import("hyprland")

const Lang = () => Widget.Box({
    // className: "module-box",
    children: [
        Widget.Label({ label: "", className: "icon lang" }),
        Widget.Button({
            className: "module lang",
			tooltipText: "Switch Input Language",
            on_clicked: () => easyAsync(`hyprctl switchxkblayout ${vars.keyboardID} next`)
                .catch((err: any) => print(err)),
            setup: (self: any) => self
                .hook(Hyprland, (label: any, _kbName: any, layoutName = "EN") => {
                    label.label = layoutName.includes("Russian") ? "RU" : "EN"
                }, 'keyboard-layout')
        })
    ],
});

export default Lang
