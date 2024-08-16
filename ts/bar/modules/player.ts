const mpris = await Service.import('mpris')

const Player = player => Widget.Button({
	className: "module spotify",
	onClicked: () => player.playPause(),
	child: Widget.Label().hook(player, label => {
		const { track_artists, track_title } = player;
		label.label = `${track_artists.join(', ')} - ${track_title}`;
	}),
})

const Icon = () => Widget.Label({ label: "󰋋", className: "icon spotify" })


const Media = () => {
	return Widget.Box({
		className: "module-box spotify",
	}).hook(mpris, (self, busName) => {
			if (!busName || busName != "org.mpris.MediaPlayer2.spotify") {
				self.visible = false
			} else {
				self.children = [ Icon(), Player(mpris.getPlayer("org.mpris.MediaPlayer2.spotify")) ];
			}
		}, "player-changed")
		.hook(mpris, (self, busName) => {
			if (busName = "org.mpris.MediaPlayer2.spotify") {
				self.visible = false
			} else {
				self.children = [ Icon(), Player(mpris.getPlayer("org.mpris.MediaPlayer2.spotify")) ];
			}
		}, "player-closed")
		.hook(mpris, (self, busName) => {
			if (!busName || busName != "org.mpris.MediaPlayer2.spotify") {
				self.visible = false
			} else {
				self.children = [ Icon(), Player(mpris.getPlayer("org.mpris.MediaPlayer2.spotify")) ];
			}
		}, "player-added")
}

export default Media
