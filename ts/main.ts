import { Bar } from "./bar/bar";
import { Desktop } from "./desktop/desktop";
import { ctrl } from "./ctrl/ctrl";
import { power } from "./power/power";
import { Wallpaper, OpenWallpaper } from "./wallpaper";
// import { NotificationPopups } from "./notifs/notifs";

import { forMonitors } from "./utils";

const scss = `${App.configDir}/style/main.scss`
const css = `/tmp/my-style.css`
Utils.exec(`sassc ${scss} ${css}`)
App.applyCss(css)

App.config({
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(Desktop),
        ...forMonitors(ctrl),
        power(),
        Wallpaper()
        // NotificationPopups(),
    ]
})

// Autoreload css
Utils.monitorFile(
    `${App.configDir}/style`,
    function() {
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)

// App.toggleWindow(`ctrl0`)
// App.toggleWindow(`ctrl1`)
