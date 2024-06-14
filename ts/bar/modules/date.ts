import { easyAsync } from "ts/utils";

export const Time = Variable("null", {
    poll: [1000, "date +%H:%M"],
});

export const Date = Variable("null", {
    poll: [1000, "date +%A\\ %d"],
});

const Clock = () => Widget.Box({
    spacing: 8,
    children: [
        Widget.Box({
            className: "module-box",
            children: [
                Widget.Label({ label: "󱪺", className: "icon" }),
                Widget.Button({ label: Date.bind(), className: "module", on_clicked: () => easyAsync("gnome-calendar") })
            ],
        }),
        Widget.Box({
            className: "module-box",
            children: [
                Widget.Label({ label: "󱑎", className: "icon" }),
                Widget.Button({ label: Time.bind(), className: "module", on_clicked: () => easyAsync("gnome-calendar") })
            ],    
        }),
    ],
});

export default Clock
