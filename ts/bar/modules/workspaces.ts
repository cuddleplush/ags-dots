const Hyprland = await Service.import("hyprland")

const dispatch = (ws: string | number): any => Hyprland.messageAsync(`dispatch workspace ${ws}`);

const icons = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const WorkspaceButton = (i: number) => Widget.Button({
    class_name: "ws-button",
    on_primary_click: () => dispatch(i),
    child: Widget.Label({
        label: icons[i - (i <= 5 ? 1 : 11)],
        class_name: "ws-button-label"
    })
})
    .hook(Hyprland.active.workspace, button => {
        button.toggleClassName("active", Hyprland.active.workspace.id === i);
    });

const Workspaces = (monitor: number) => Widget.EventBox({
    child: Widget.Box({
        spacing: 8,
        children: Array.from({length: 5}, (_, i) => i + (monitor == 0 ? 1 : 11)).map(i => WorkspaceButton(i)),
    })
    .hook(Hyprland, (box) => {
        box.children.forEach((button, i) => {
            const ws = Hyprland.getWorkspace(i + (monitor == 0 ? 1 : 11));
            button.toggleClassName("occupied", ws?.windows > 0);
        });
    },)
});

export default Workspaces;
