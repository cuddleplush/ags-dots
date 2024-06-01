import { menu } from "./menu"

const DesktopBox = () => Widget.EventBox({
    on_secondary_click: (_, event) => menu.popup_at_pointer(event),
})

export const Desktop = (monitor: number) => Widget.Window({
    monitor,
    keymode: 'none',
    name: `desktop${monitor}`,
    layer: 'background',
    class_name: 'desktop',
    anchor: ['top', 'bottom', 'left', 'right'],
    child: DesktopBox(),
})
