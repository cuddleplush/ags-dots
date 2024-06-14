import vars from "ts/vars";

export var muteCheck = Variable(Utils.exec(`pactl get-source-mute ${vars.sourceID}`) === "Mute: no" ? false : true);
globalThis.muteCheck = muteCheck;

const Muted = () => Widget.Box({
    className: "module-box",
    visible: muteCheck.bind(),
    spacing: 8,
    children: [
        Widget.Button({
            label: "",
            className: "module-muted",
            on_clicked: () => {
                muteCheck.value = !muteCheck.value,
                Utils.exec('swayosd-client --input-volume mute-toggle')
            },
        })
    ],
});

export default Muted
