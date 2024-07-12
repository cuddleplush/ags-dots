const mpris = await Service.import("mpris")
const players = mpris.bind("players")

function Player(player) {
    const title = Widget.Label({
        class_name: "title",
        truncate: 'end',
        maxWidthChars:28,
        hpack: "start",
        label: player.bind("track_title"),
    })

    const artist = Widget.Label({
        class_name: "artist",
        wrap: true,
        hpack: "start",
        label: player.bind("track_artists").transform(a => a.join(", ")),
    })
}

const Media = () => Widget.Box({
    spacing: 8,
    children: [
        Widget.Box({
            className: "module-box",
            children: [
                Widget.Label({ label: "󱪺", className: "icon" }),
                Widget.Button({ label: Date.bind(), className: "module", on_clicked: () => easyAsync("gnome-calendar") })
            ],
        }),
    ],
});

export default Media
