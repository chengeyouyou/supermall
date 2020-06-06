import { debounce } from "./utils";
import BackTop from "components/common/backtop/BackTop.vue";

export const imgListener = {
    data() {
        return {
            //goodsList图片加载监听器
            imgLoadedListener: null
        }
    },
    mounted(this: any) {
        //监听图片刷新
        let mydebounce = () => {
            this.$refs.scroll.refresh();
            this.getThemeOffsetTop && this.getThemeOffsetTop();
        }
        let refresh = debounce(mydebounce, 100);
        this.imgLoadedListener = () => {
            refresh();
        };
        this.$bus.$on("imgFinishLoaded", this.imgLoadedListener);
    },
}

export const backTopListener = {
    components:{
        BackTop
    },
    methods: {
        topClick(this: any) {
            this.$refs.scroll.scrollTo(0, 0);
        },
    }
}