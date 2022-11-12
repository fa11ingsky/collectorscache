// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['bootstrap-vue-3/nuxt'],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@fortawesome/fontawesome-free/css/all.css',
        "bootstrap/dist/css/bootstrap.css"
    ],
    nitro: {
        prerender: {
            routes: [
                "/info/urshifu-league-deck",
                "/info/sm12-252",
                "/info/sm12-156",
                "/info/sm11-71",
                "/info/swsh5-163",
                "/info/sm10-204",
                "/info/sm11-1",
                "/info/swsh3-193",
                "/info/sm12-214",
                "/info/swsh4-179",
                "/info/SWSH1_EN_201",
                "/info/SWSH6_EN_223",
                "/info/charizard-base-set",
                "/info/venusaur-playmat",
                "/info/SM3_EN_141",
                "/info/SM10_EN_149",
                "/info/SM11_EN_152",
                "/info/SM12_EN_63",
                "/info/SM12_EN_110",
                "/info/SM12_EN_238",
                "/info/SM12_EN_243",
                "/info/SM12_EN_244",
                "/info/SWSH3_EN_181",
            ]
        }
    }
})
