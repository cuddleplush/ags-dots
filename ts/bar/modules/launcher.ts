const Launcher = (monitor: number) => Widget.Button({
	label: "󰣨",
	className: "module ctrl",
	tooltipText: "Control Panel",
	on_primary_click: () => App.toggleWindow(`ctrl${monitor}`),
});

export default Launcher
