import { easyAsync } from "ts/utils"

const uptime = Variable('oops', { poll: [10000, ['bash', '-c', 'uptime -p | tail -c +4']] })
const kver = Utils.exec(`bash -c "uname -r | cut -d "-" -f1"`)
const who = Utils.exec(`bash -c "whoami"`) + " • " + Utils.exec(`bash -c "hostname"`)

export const header = () => Widget.Box({
    spacing: 8,
    children: [
        Widget.Box({
            className: "ctrl-header",
            children: [
                Widget.Icon({
                    className: "pic",
                    icon: `${App.configDir}/assets/pfp3.jpg`,
                    size: 70,
                }),
                Widget.Box({
                    vertical: true,
                    vpack: "center",
                    children: [
                        Widget.Label({ label: who + " • " + kver}),
                        Widget.Label({ label: uptime.bind() }),
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
                    on_primary_click: () => easyAsync("rofi-wall.sh")
                        .catch((err: any) => print(err)),
                    on_secondary_click: () => easyAsync("echo 'playlist-next' | socat - /tmp/mpv-socket")
                        .catch((err: any) => print(err)),
                }),
                Widget.Button({
                    label: "󰒓",
                    className: "wp-btn",
                    on_primary_click: () => easyAsync("foot -e nvim ~/.config/ags/mono")
                        .catch((err: any) => print(err)),
                }),
            ]
        })
    ]
})
