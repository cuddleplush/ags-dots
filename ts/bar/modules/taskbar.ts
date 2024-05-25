import { substitutes } from "ts/vars"

const hyprland = await Service.import("hyprland")

const isempty = (monitor: number) => !hyprland.clients.find((c: any) => c.workspace.id == hyprland.monitors[monitor].activeWorkspace.id) ? true : false

export const empty = (monitor: number) => Widget.Label({
    className: "module-box-empty",
    label: "Hyprland",
    setup: (self: any) => self
        .hook(hyprland, (self: any, event?: string) => {
            if (event === "movewindow" || "workspace")
            self.visible = isempty(monitor)
        }, "event")
});

// const focus = (wsid: number) => hyprland.messageAsync(
//     `dispatch workspace ${wsid}`)

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
        // on_primary_click: () => focus(wsid),
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
        .hook(hyprland, (w: any, address?: string) => {
            if (typeof address === "string")
            w.children = w.children.filter((ch: any) => ch.attribute.address !== address)
        }, "client-removed")
        .hook(hyprland, (w: any, address?: string) => {
            if (typeof address === "string")
            w.children = reCalcChildren(monitor)
        }, "client-added")
        .hook(hyprland, (w: any, event?: string) => {
            if (event === "movewindow" || "workspace")
            w.children = reCalcChildren(monitor)
        }, "event")
})
