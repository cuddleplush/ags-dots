import { header } from "./modules/header";
import { sliders } from "./modules/sliders";
import { Media } from "./modules/media";

const ctrlBox = () =>
  Widget.Box({
    className: "ctrl-box",
    vertical: true,
    children: [header(), sliders("speaker"), sliders("microphone"), Media()],
  });

export const ctrl = (monitor: number) =>
  Widget.Window({
    monitor,
    visible: false,
    name: `ctrl${monitor}`,
    anchor: ["top", "left"],
    exclusivity: "normal",
    keymode: "on-demand",
    layer: "top",
    margins: [10, 10],
    child: ctrlBox(),
  }).on("key-press-event", () => {
    App.toggleWindow(`ctrl${monitor}`);
  });
