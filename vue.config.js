process.env.VUE_APP_VERSION = require('./package.json').version

function getImageFromStorse(name, token) {
    return `https://firebasestorage.googleapis.com/v0/b/june-bnk48.appspot.com/o/${name}.png?alt=media&token=${token}`
}
process.env.VUE_APP_FAVICON = getImageFromStorse(process.env.VUE_APP_FAVICON_NAME, process.env.VUE_APP_FAVICON_TOKEN)
process.env.VUE_APP_LOGO_TRANSPARENT = getImageFromStorse(process.env.VUE_APP_LOGO_TRANSPARENT_NAME, process.env.VUE_APP_LOGO_TRANSPARENT_TOKEN)
process.env.VUE_APP_LOGO_CREATOR = getImageFromStorse(process.env.VUE_APP_LOGO_CREATOR_NAME, process.env.VUE_APP_LOGO_CREATOR_TOKEN)

module.exports = {
    configureWebpack: {
        mode: process.env.VUE_APP_MODE
    },
    pages: {
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: process.env.VUE_APP_TITLE,
            logo: {
                favicon: process.env.VUE_APP_FAVICON,
                transparent: process.env.VUE_APP_LOGO_TRANSPARENT,
                creator: process.env.VUE_APP_LOGO_CREATOR
            },
            output: {
                publicPath: process.env.VUE_APP_NODE_ENV === 'production'
                ? '/June-BNK48'
                : ''
            }
        }
    }
}