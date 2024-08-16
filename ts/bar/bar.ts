import Clock from "./modules/date";
import Workspaces from "./modules/workspaces";
import Launcher from "./modules/launcher";
import { Taskbar, Empty } from "./modules/taskbar";
import Tray from "./modules/tray";
import Muted from "./modules/muted";
import Lang from "./modules/lang";
import Media from "./modules/player";

const StartModules = (monitor: number) =>
    Widget.Box({
        hpack: "start",
        spacing: 8,
        children: [
            Launcher(monitor),
            Workspaces(monitor),
            Empty(monitor),
            Taskbar(monitor),
        ],
    });

const CenterModules = () =>
	Widget.Box({
		hpack: "center",
		spacing: 8,
		children: [
		]
	})

const EndModules = () =>
    Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
			Media(),
            Tray(),
            Lang(),
            Muted(),
            Clock(),
        ],
    });

export const Bar = (monitor: number) =>
    Widget.Window({
        monitor,
        name: `bar-${monitor}`,
        anchor: ["left", "top", "right"],
        exclusivity: "exclusive",
        margins: [0, 0, 0, 0],
        child: Widget.CenterBox({
            className: "bar",
            startWidget: StartModules(monitor),
            centerWidget: CenterModules(),
            endWidget: EndModules(),
        }),
    });
