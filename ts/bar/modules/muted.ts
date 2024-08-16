const audio = await Service.import("audio")

const Muted = () => Widget.Button({
	label: "",
	className: "module muted",
	tooltipText: "Unmute",
	on_clicked: () => {
		audio.microphone.is_muted = !audio.microphone.is_muted
	},
}).hook(audio, self => self.visible = audio.microphone.is_muted || false)

export default Muted
