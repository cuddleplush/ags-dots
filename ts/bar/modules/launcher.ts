const Launcher = (monitor: number) => Widget.Box({
    children: [
        Widget.Button({
            label: "󰣨",
            className: "launcher",
            on_primary_click: () => App.toggleWindow(`ctrl${monitor}`),
            // on_primary_click: () => Utils.execAsync(["bash", "-c", "echo 'playlist-next' | socat - /tmp/mpv-socket"])
            //     .catch((err: any) => print(err)),
            on_secondary_click: () => Utils.execAsync(["bash", "-c", "echo 'playlist-prev' | socat - /tmp/mpv-socket"])
                .catch((err: any) => print(err)),
        })
    ],
});

export default Launcher
