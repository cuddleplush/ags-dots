import vars from "ts/vars";
const Hyprland = await Service.import("hyprland");

const WorkspaceButton = (i: number, monitor: number) => {
    const dispatch = (ws: string | number): Promise<string> => Hyprland.messageAsync(`dispatch workspace ${ws}`);
    const icons = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const iconIndex = i - (monitor * 10 + 1);

    return Widget.Button({
        class_name: "ws-button",
        on_primary_click: () => dispatch(i),
        child: Widget.Label({
            label: icons[iconIndex],
            class_name: "ws-button-label"
        })
    })
    .hook(Hyprland.active.workspace, button => {
        button.toggleClassName("active", Hyprland.active.workspace.id === i);
    });
};

const Workspaces = (monitor: number) => Widget.EventBox({
    child: Widget.Box({
        spacing: 8,
        children: Array.from({ length: vars.wsNum }, (_, idx) => {
            const i = idx + (monitor * 10 + 1);
            return WorkspaceButton(i, monitor);
        })
    })
    .hook(Hyprland, box => {
        box.children.forEach((button, idx) => {
            const workspaceIndex = idx + (monitor * 10 + 1);
            const workspace = Hyprland.getWorkspace(workspaceIndex);
            button.toggleClassName("occupied", (workspace?.windows ?? 0) > 0);
        });
    })
});

export default Workspaces;
