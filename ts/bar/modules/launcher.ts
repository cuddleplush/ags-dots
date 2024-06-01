const Launcher = (monitor: number) => Widget.Box({
    children: [
        Widget.Button({
            label: "󰣨",
            className: "launcher",
            on_primary_click: () => App.toggleWindow(`ctrl${monitor}`),
        })
    ],
});

export default Launcher
