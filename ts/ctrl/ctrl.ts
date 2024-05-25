const uptime = Variable('oops', { poll: [10000, ['bash', '-c', 'uptime -p | tail -c +4']]})

const header = () => Widget.Box({
    spacing: 8,
    children: [
        Widget.Box({
            className: "ctrl-header",
            children: [
                Widget.Icon({
                    className: "pic",
                    icon: `${App.configDir}/assets/pfp1.jpg`,
                    size: 70,
                }),
                Widget.Box({
                    vertical: true,
                    vpack: "center",
                    children: [
                        Widget.Label({ hpack: "start", label: "max@violet"}),
                        Widget.Label({ hpack: "start", label: uptime.bind()})
                    ]
                }),
            ]
        }),
        Widget.Box({
            spacing: 8,
            vertical: true,
            children: [
                Widget.Button({
                    label: "",
                    className: "wp-btn",
                    on_primary_click: () => Utils.execAsync(["bash", "-c", "wpmgr next &"])
                        .catch((err: any) => print(err)),
                    on_secondary_click: () => Utils.execAsync(["bash", "-c", "wpmgr back &"])
                        .catch((err: any) => print(err)),
                    on_middle_click: () => Utils.execAsync(["bash", "-c", "wpmgr switch &"])
                        .catch((err: any) => print(err)),
                }),
                Widget.Button({
                    label: "󰒓",
                    className: "wp-btn",
                    on_primary_click: () => Utils.execAsync(["bash", "-c", "foot -e nvim ~/.config/ags/mono"])
                        .catch((err: any) => print(err)),
                }),
            ]
        })
    ]
})

const sliders = () => Widget.Box({
    className: "ctrl-sliders",
    children: [
        Widget.Label({ label: "i am sliders"})
    ],
})

const notifs = () => Widget.Box({
    className: "ctrl-sliders",
    children: [
        Widget.Label({ label: "i am notifications"})
    ],
})

const ctrlBox = () => Widget.Box({
    className: "ctrl-box",
    vertical: true,
    children: [
        header(),
        sliders(),
        notifs(),
    ]
})

export const ctrl = (monitor: number) => Widget.Window({
    monitor,
    name: `ctrl${monitor}`,
    anchor: ['top', 'left'],
    exclusivity: 'normal',
    keymode: 'on-demand',
    layer: 'top',
    margins: [10, 10],
    child: ctrlBox(),
}).on("key-press-event", () => {
    App.toggleWindow(`ctrl${monitor}`)
})
