import { easyAsync } from "ts/utils";

export const Time = Variable("null", {
    poll: [1000, "date +%H:%M"],
});

export const Date = Variable("null", {
    poll: [1000, "date +%A\\ %d,\\ %H:%M"],
});

const Clock = () => Widget.Box({
    spacing: 8,
    children: [
        Widget.Box({
            children: [
                Widget.Label({ label: "󱪺", className: "icon date" }),
                Widget.Button({ label: Date.bind(), className: "module date", on_clicked: () => easyAsync("gnome-calendar"), tooltipText: "Open Calendar" })
            ],
        }),
        // Widget.Box({
        //     className: "module-box",
        //     children: [
        //         Widget.Label({ label: "󱑎", className: "icon time" }),
        //         Widget.Button({ label: Time.bind(), className: "module time", on_clicked: () => easyAsync("gnome-calendar"), tooltipText: "Open Calendar"  })
        //     ],    
        // }),
    ],
});

export default Clock
