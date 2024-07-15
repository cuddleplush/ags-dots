const audio = await Service.import("audio")

const Muted = () => Widget.Box({
    className: "module-box",
    spacing: 8,
    children: [
        Widget.Button({
            label: "",
            className: "module-muted",
            on_clicked: () => {
                audio.microphone.is_muted = !audio.microphone.is_muted
            },
        })
    ],
}).hook(audio, self => self.visible =
    audio.microphone.is_muted
    || false)

export default Muted
