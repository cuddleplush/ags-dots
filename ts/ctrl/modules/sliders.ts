const audio = await Service.import("audio")

const icons = {
    101: "󰝝",
    67: "󰕾",
    34: "󰖀",
    1: "󰕿",
    0: "󰝟",
}

function getIcon() {
    const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
        threshold => threshold <= audio.speaker.volume * 100)

    return icons[icon]
}

const icon = (type = 'speaker') => Widget.Label({
    className: "volicon",
    label: type === 'speaker' ? Utils.watch(getIcon(), audio[type], getIcon) : "󰍬",
})

const volslider = (type = 'speaker') => Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => audio[type].volume = value,
    setup: self => self.hook(audio[type], () => {
        self.value = audio[type].volume || 0
    }),
})

export const sliders = (type: string | undefined) => Widget.Box({
    className: "ctrl-volsliders",
    css: "min-width: 180px",
    children: [icon(type), volslider(type)],
})

