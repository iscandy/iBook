import favor from '../../api/favor';
import { EROOR_CODE } from '../../api/config';
import { TYPE } from '../../common/js/config'
import { mapMutations } from 'vuex'
import { Toast } from 'vant'

export const detailMixin = {
    components: {
        [Toast.name]: Toast,
    },
    methods: {
        //喜欢和取消喜欢
        changeFavor(flag) {
            let art_id = this.classic.id;
            let type = this.classic.type;
            if (flag) { //当需要点击的时候
                favor.setLike({ art_id, type }).then(res => {
                    if (res.data.error_code == EROOR_CODE) {
                        this.classic.like_status = 1
                        this.classic.fav_nums = this.classic.fav_nums + 1
                        if (this.classic.type === TYPE.music) {
                            this.set_music(this.classic);
                        }
                    } else {
                        Toast(res.data.msg)
                    }
                })
            } else {
                favor.cancelLike({ art_id, type }).then(res => {
                    if (res.data.error_code == EROOR_CODE) {
                        this.classic.like_status = 0
                        this.classic.fav_nums = this.classic.fav_nums - 1
                        if (this.classic.type === TYPE.music) {
                            this.set_music(this.classic);
                        }
                    } else {
                        Toast(res.data.msg)
                    }
                })
            }
        },
        //取消分享
        changeShare() {
            Toast("敬请期待");
        },
    },
}

export const toSearchPageMinxin = {
    methods: {
        toSearchPage() {
            this.$router.push({
                path: "/book/search"
            });
        }
    },
}