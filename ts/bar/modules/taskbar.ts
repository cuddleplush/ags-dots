import { substitutes } from "ts/vars"

const hyprland = await Service.import("hyprland")

const isempty = (monitor: number) => !hyprland.clients.find((c: any) => c.workspace.id == hyprland.monitors[monitor].activeWorkspace.id) ? true : false

export const empty = (monitor: number) => Widget.Label({
    className: "module-box-empty",
    label: "Desktop",
    setup: (self: any) => self
        .hook(hyprland, (self: any, event?: string) => {
            switch(event) {
                case "movewindow":
                case "workspace":
                case "openwindow":
                case "closewindow":
                    self.visible = isempty(monitor)
                break;
            }
        }, "event")
});

const DummyItem = (address: string) => Widget.Box({
    attribute: { address },
    visible: false,
})

const AppItem = (address: string) => {
    const client = hyprland.getClient(address)
    if (!client || client.class === "")
    return DummyItem(address)

    const btn = Widget.Button({
        class_name: "module-box-task",
        tooltip_text: Utils.watch(client.title, hyprland, () =>
            hyprland.getClient(address)?.title || "",
        ),
        child: Widget.Button({label: substitutes[client.class] || client.class, className: "module"}),
        setup: (w: any) => w.hook(hyprland, () => {
            w.toggleClassName("active", hyprland.active.client.address === address)
        }),
    })

    return Widget.Box({
        attribute: { address },
        child: btn,
    })
}

function sortItems<T extends { attribute: { address: string } }>(arr: T[]) {
    return arr.sort(({ attribute: a }, { attribute: b }) => {
        const aclient = hyprland.getClient(a.address)!
        const bclient = hyprland.getClient(b.address)!
        return aclient.workspace.id - bclient.workspace.id
    })
}

const reCalcChildren = (monitor: number) => 
    sortItems(hyprland.clients.filter((c: any) => 
        c.workspace.id === hyprland.monitors[monitor].activeWorkspace.id).map((c: any) => 
            AppItem(c.address)))

export const taskbar = (monitor: number) => Widget.Box({
    spacing: 8,
    children: reCalcChildren(monitor),
    setup: (w: any) => w
        .hook(hyprland, (w: any, event?: string) => {
            switch (event) {
                case "workspace":
                case "movewindow":
                case "openwindow":
                case "closewindow":
                    w.children.forEach((ch: any) => ch.destroy())
                    w.children = reCalcChildren(monitor)
                break;
            }
        }, "event")
})
