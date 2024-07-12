import Clock from "./modules/date";
import Workspaces from "./modules/workspaces";
import Launcher from "./modules/launcher";
import { taskbar, empty } from "./modules/taskbar";
import Tray from "./modules/tray";
import Muted from "./modules/muted";
import Lang from "./modules/lang";
import { OpenWallpaper } from "../wallpaper";

const StartModules = (monitor: number) =>
  Widget.Box({
    hpack: "start",
    spacing: 8,
    children: [
      Launcher(monitor),
      Workspaces(monitor),
      empty(monitor),
      taskbar(monitor),
    ],
  });

const CenterModules = () =>
  Widget.Box({
    children: [],
  });

const EndModules = () =>
  Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      // OpenWallpaper(),
      Tray(),
      Muted(),
      Lang(),
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
