import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useUserInfoStore = defineStore('userinfo', {
    state: () => ({
        user_info: {
            country: null,
            province: null,
            city: null,
            date_accessed: moment().format('Y-M-D'),
            time_accessed: moment().format('H:m:s'),
            user_os: null,
            user_browser: null,
            user_device: null,
            user_ip: null,
            user_screen_res: null,
            user_type: 'Guest',
        }
    }),

    getters: {
        u_info: (state) => state.user_info
    },

    actions: {
        async getUserCurrentLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude
                        const longitude = position.coords.longitude
                        resolve({ latitude, longitude })
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },

        async doGeocodingReverse() {
            try {
                const location = await this.getUserCurrentLocation()
                const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
                const response = await axios.get(url)
                const address = response.data.address
                this.user_info.country = address.country
                this.user_info.province = address.state
                this.user_info.city = address.city

                // do something with the address components
                // such as storing them to database

            } catch (error) {
                console.error(error)
            }
        },

        async getUserDevice() {
            const userAgent = navigator.userAgent;

            const osRegex = /(Windows NT \d+\.\d+|Mac OS X \d+[_\.]\d+(?:[_\.]\d+)?|Android \d+(?:\.\d+)?(?:\.\d+)?|iOS \d+(?:[_\.]\d+)?(?:[_\.]\d+)?(?: like Mac OS X)?|Windows Phone \d+(?:\.\d+)?(?:\.\d+)?)/;
            const osMatch = userAgent.match(osRegex);

            const browserRegex = /(Chrome|Firefox|Safari|Opera|Edge|MSIE|Trident)\/([\d\.]+)/;
            const browserMatch = userAgent.match(browserRegex);

            const deviceRegex = /Mobile|Tablet|iPad|iPhone|iPod/;
            const deviceMatch = userAgent.match(deviceRegex);

            const os = osMatch ? osMatch[1] : "Unknown";
            const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : "Unknown";
            const device = deviceMatch ? deviceMatch[0] : "Desktop";

            this.user_info.user_os = os
            this.user_info.user_browser = browser
            this.user_info.user_device = device
        },

        async getUserIp() {
            const response = await axios.get('https://api.ipify.org/?format=json')
            this.user_info.user_ip = response.data.ip
        },

        getUserScreenSize() {
            const screenWidth = window.screen.width * window.devicePixelRatio;
            const screenHeight = window.screen.height * window.devicePixelRatio;
            const screenResolution = screenWidth + " x " + screenHeight;

            this.user_info.user_screen_res = screenResolution
        },
        async storeUserInfo() {
            try {
                await this.doGeocodingReverse()
                await axios.post('/api/user_info', this.user_info)
            } catch (error) {
                console.log(error);
            }
        }
    }
})